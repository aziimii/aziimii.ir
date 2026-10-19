"""Shared fixtures. Tests run fully offline against the echo provider."""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.config import get_settings
from app.main import app


@pytest.fixture()
def client(monkeypatch: pytest.MonkeyPatch) -> TestClient:
    """A TestClient whose lifespan loads fresh, keyless (echo) settings."""
    monkeypatch.delenv("LLM_API_KEY", raising=False)
    monkeypatch.delenv("KNOWLEDGE_DIR", raising=False)
    get_settings.cache_clear()
    with TestClient(app) as test_client:
        yield test_client
    get_settings.cache_clear()
