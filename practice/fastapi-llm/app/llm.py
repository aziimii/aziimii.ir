"""LLM clients.

Stage 1 of the practice service: a chat-completions client with a deterministic
offline fallback, so the service (and its tests) work without network access
or API keys.

The real client speaks the OpenAI chat-completions protocol, which is also
implemented by Groq, Ollama, vLLM, and most local servers — switching providers
is an LLM_BASE_URL / LLM_MODEL change, not a code change.
"""

from __future__ import annotations

from typing import Protocol

import httpx

from .config import Settings


class LLMClient(Protocol):
    """Minimal interface the app depends on."""

    provider: str
    model: str

    def complete(self, messages: list[dict[str, str]]) -> str: ...


class OpenAICompatClient:
    """Calls POST {base_url}/chat/completions with an API key."""

    provider = "openai-compat"

    def __init__(self, settings: Settings, transport: httpx.BaseTransport | None = None) -> None:
        self.model = settings.llm_model
        self._url = f"{settings.llm_base_url}/chat/completions"
        self._headers = {"Authorization": f"Bearer {settings.llm_api_key}"}
        self._client = httpx.Client(timeout=settings.llm_timeout_seconds, transport=transport)

    def complete(self, messages: list[dict[str, str]]) -> str:
        response = self._client.post(
            self._url,
            headers=self._headers,
            json={"model": self.model, "messages": messages, "temperature": 0.2},
        )
        response.raise_for_status()
        payload = response.json()
        return payload["choices"][0]["message"]["content"]


class EchoClient:
    """Deterministic offline provider used when no API key is configured."""

    provider = "echo"
    model = "echo"

    def complete(self, messages: list[dict[str, str]]) -> str:
        user_message = next(
            (m["content"] for m in reversed(messages) if m["role"] == "user"), ""
        )
        context = next((m["content"] for m in messages if m["role"] == "system"), "")
        has_context = "Context:" in context
        prefix = "[echo mode: no LLM_API_KEY set] "
        return f"{prefix}You said: {user_message!r}. Retrieved context was {'provided' if has_context else 'empty'}."


def get_llm(settings: Settings) -> LLMClient:
    """Factory: real client when a key exists, echo provider otherwise."""
    if settings.llm_api_key:
        return OpenAICompatClient(settings)
    return EchoClient()
