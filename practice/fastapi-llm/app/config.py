"""Environment-driven configuration for the practice service."""

from __future__ import annotations

import os
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

PACKAGE_DIR = Path(__file__).resolve().parent
KNOWLEDGE_DIR = PACKAGE_DIR.parent / "knowledge"


@dataclass(frozen=True)
class Settings:
    llm_base_url: str
    llm_api_key: str | None
    llm_model: str
    llm_timeout_seconds: float
    retrieval_top_k: int
    knowledge_dir: Path

    @property
    def provider(self) -> str:
        """'openai-compat' when a key is configured, otherwise 'echo'."""
        return "openai-compat" if self.llm_api_key else "echo"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings(
        llm_base_url=os.environ.get("LLM_BASE_URL", "https://api.openai.com/v1").rstrip("/"),
        llm_api_key=os.environ.get("LLM_API_KEY") or None,
        llm_model=os.environ.get("LLM_MODEL", "gpt-4o-mini"),
        llm_timeout_seconds=float(os.environ.get("LLM_TIMEOUT_SECONDS", "30")),
        retrieval_top_k=int(os.environ.get("RETRIEVAL_TOP_K", "3")),
        knowledge_dir=Path(os.environ.get("KNOWLEDGE_DIR", str(KNOWLEDGE_DIR))),
    )
