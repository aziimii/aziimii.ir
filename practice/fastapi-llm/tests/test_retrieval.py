from app.config import KNOWLEDGE_DIR
from app.retrieval import Chunk, Retriever, tokenize


def test_tokenize_drops_stopwords_and_lowercases() -> None:
    tokens = tokenize("The Nginx reverse proxy and a Docker Compose stack")
    assert "the" not in tokens
    assert "nginx" in tokens
    assert "docker" in tokens


def test_retriever_indexes_knowledge_directory() -> None:
    retriever = Retriever.from_directory(KNOWLEDGE_DIR)
    assert len(retriever) >= 3


def test_retriever_ranks_relevant_chunk_first() -> None:
    retriever = Retriever.from_directory(KNOWLEDGE_DIR)
    hits = retriever.retrieve("TLS certificates and Nginx reverse proxy", k=2)
    assert hits
    assert hits[0].score >= hits[-1].score
    assert hits[0].chunk.source in {"linux-and-containers.md", "sherafat-architecture.md"}


def test_retriever_returns_empty_for_stopword_only_query() -> None:
    retriever = Retriever.from_directory(KNOWLEDGE_DIR)
    assert retriever.retrieve("the and a of", k=3) == []


def test_retriever_handles_empty_chunk_list() -> None:
    retriever = Retriever(chunks=[])
    assert retriever.retrieve("anything", k=3) == []
    assert len(retriever) == 0


def test_chunk_sources_come_from_filenames() -> None:
    retriever = Retriever(
        chunks=[Chunk(source="example.md", text="docker compose wires services together on a network")]
    )
    hits = retriever.retrieve("docker compose network", k=1)
    assert hits and hits[0].chunk.source == "example.md"
