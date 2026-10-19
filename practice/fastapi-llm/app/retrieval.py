"""Stage 2: retrieval.

A deliberately small TF-IDF + cosine-similarity retriever over the markdown
files in `knowledge/`. Pure stdlib — no embeddings, no vector store — so the
RAG mechanics stay visible. Chunks are paragraphs; scoring is word overlap
weighted by inverse document frequency.
"""

from __future__ import annotations

import math
import re
from dataclasses import dataclass
from pathlib import Path

_WORD_RE = re.compile(r"[a-z0-9]+")

STOPWORDS = frozenset(
    "a an and are as at be by for from has have i in is it of on or that the this to was we with".split()
)


def tokenize(text: str) -> list[str]:
    return [t for t in _WORD_RE.findall(text.lower()) if t not in STOPWORDS]


@dataclass(frozen=True)
class Chunk:
    source: str
    text: str


@dataclass(frozen=True)
class ScoredChunk:
    chunk: Chunk
    score: float


class Retriever:
    def __init__(self, chunks: list[Chunk]) -> None:
        self._chunks = chunks
        # document frequency per term
        df: dict[str, int] = {}
        tokenized = [tokenize(c.text) for c in chunks]
        for tokens in tokenized:
            for term in set(tokens):
                df[term] = df.get(term, 0) + 1
        n = max(len(chunks), 1)
        self._idf = {term: math.log((n + 1) / (count + 1)) + 1.0 for term, count in df.items()}
        self._vectors = [self._vectorize(tokens) for tokens in tokenized]

    @classmethod
    def from_directory(cls, directory: Path) -> "Retriever":
        chunks: list[Chunk] = []
        for path in sorted(directory.glob("*.md")):
            for paragraph in (p.strip() for p in path.read_text(encoding="utf-8").split("\n\n")):
                # skip markdown headings/tables-ish blocks with no sentence content
                body = "\n".join(
                    line for line in paragraph.splitlines() if not line.lstrip().startswith("#")
                ).strip()
                if len(tokenize(body)) >= 5:
                    chunks.append(Chunk(source=path.name, text=body))
        return cls(chunks)

    def _vectorize(self, tokens: list[str]) -> dict[str, float]:
        if not tokens:
            return {}
        tf: dict[str, int] = {}
        for t in tokens:
            tf[t] = tf.get(t, 0) + 1
        vec = {t: (count / len(tokens)) * self._idf.get(t, 1.0) for t, count in tf.items()}
        norm = math.sqrt(sum(w * w for w in vec.values())) or 1.0
        return {t: w / norm for t, w in vec.items()}

    def retrieve(self, query: str, k: int = 3) -> list[ScoredChunk]:
        query_vec = self._vectorize(tokenize(query))
        if not query_vec:
            return []
        scored: list[ScoredChunk] = []
        for chunk, vec in zip(self._chunks, self._vectors):
            small, large = (query_vec, vec) if len(query_vec) < len(vec) else (vec, query_vec)
            score = sum(w * large.get(t, 0.0) for t, w in small.items())
            if score > 0:
                scored.append(ScoredChunk(chunk=chunk, score=round(score, 4)))
        scored.sort(key=lambda s: s.score, reverse=True)
        return scored[:k]

    def __len__(self) -> int:
        return len(self._chunks)
