"""Stage 1 + 2: the FastAPI service.

Endpoints:
  GET  /        — service metadata
  GET  /health  — liveness + active provider/model
  POST /chat    — retrieval-augmented chat completion

The LLM dependency is injected through `get_llm` / `get_retriever` overrides,
which is what lets the test suite run offline against the echo provider.
"""

from __future__ import annotations

from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .config import Settings, get_settings
from .llm import LLMClient, get_llm
from .retrieval import Retriever

SYSTEM_PROMPT = (
    "You are a concise assistant embedded in a personal engineering knowledge base. "
    "Answer using the provided context when it is relevant. If the context does not "
    "cover the question, say so plainly instead of guessing."
)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000, examples=["How is Sherafat deployed?"])
    retrieve: bool = Field(default=True, description="Whether to attach retrieved context.")
    top_k: int = Field(default=3, ge=1, le=10, description="How many chunks to retrieve.")


class Source(BaseModel):
    source: str
    score: float


class ChatResponse(BaseModel):
    reply: str
    provider: str
    model: str
    sources: list[Source]


class HealthResponse(BaseModel):
    status: str
    provider: str
    model: str
    indexed_chunks: int


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    app.state.settings = settings
    app.state.llm = get_llm(settings)
    app.state.retriever = Retriever.from_directory(settings.knowledge_dir)
    yield


app = FastAPI(
    title="fastapi-llm",
    version="0.2.0",
    description="Practice service: FastAPI + LLM + retrieval, grown in four stages.",
    lifespan=lifespan,
)


def get_state_llm() -> LLMClient:
    return app.state.llm


def get_retriever() -> Retriever:
    return app.state.retriever


@app.get("/", tags=["meta"])
def read_root() -> dict[str, str]:
    return {"service": "fastapi-llm", "docs": "/docs"}


@app.get("/health", response_model=HealthResponse, tags=["meta"])
def health() -> HealthResponse:
    settings: Settings = app.state.settings
    return HealthResponse(
        status="ok",
        provider=settings.provider,
        model=app.state.llm.model,
        indexed_chunks=len(app.state.retriever),
    )


@app.post("/chat", response_model=ChatResponse, tags=["chat"])
def chat(payload: ChatRequest) -> ChatResponse:
    settings: Settings = app.state.settings
    retriever = app.state.retriever

    sources: list[Source] = []
    system_prompt = SYSTEM_PROMPT
    if payload.retrieve:
        top_k = min(payload.top_k, settings.retrieval_top_k * 2)
        hits = retriever.retrieve(payload.message, k=top_k)
        if hits:
            context = "\n\n".join(f"[{h.chunk.source}]\n{h.chunk.text}" for h in hits)
            system_prompt = f"{SYSTEM_PROMPT}\n\nContext:\n{context}"
            sources = [Source(source=h.chunk.source, score=h.score) for h in hits]

    try:
        reply = get_state_llm().complete(
            [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": payload.message},
            ]
        )
    except Exception as exc:  # provider/network failure — surface as 502
        raise HTTPException(status_code=502, detail=f"LLM request failed: {exc}") from exc

    return ChatResponse(reply=reply, provider=app.state.llm.provider, model=app.state.llm.model, sources=sources)
