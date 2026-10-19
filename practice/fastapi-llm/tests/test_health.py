from fastapi.testclient import TestClient


def test_root_returns_service_metadata(client: TestClient) -> None:
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["service"] == "fastapi-llm"


def test_health_reports_provider_and_index_size(client: TestClient) -> None:
    response = client.get("/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["provider"] == "echo"  # no API key in tests
    assert payload["model"] == "echo"
    assert payload["indexed_chunks"] > 0  # knowledge base was indexed at startup
