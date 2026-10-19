from fastapi.testclient import TestClient


def test_chat_returns_echo_reply(client: TestClient) -> None:
    response = client.post("/chat", json={"message": "hello"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["provider"] == "echo"
    assert "hello" in payload["reply"]


def test_chat_attaches_retrieved_sources_for_relevant_query(client: TestClient) -> None:
    response = client.post("/chat", json={"message": "How is Sherafat deployed with Docker Compose?"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["sources"], "expected retrieval hits for a domain-specific question"
    assert payload["sources"][0]["source"] == "sherafat-architecture.md"
    assert payload["sources"][0]["score"] > 0
    assert "context was provided" in payload["reply"]


def test_chat_skips_retrieval_when_disabled(client: TestClient) -> None:
    response = client.post("/chat", json={"message": "anything", "retrieve": False})
    assert response.status_code == 200
    assert response.json()["sources"] == []


def test_chat_rejects_empty_message(client: TestClient) -> None:
    response = client.post("/chat", json={"message": ""})
    assert response.status_code == 422


def test_chat_rejects_out_of_range_top_k(client: TestClient) -> None:
    response = client.post("/chat", json={"message": "hi", "top_k": 50})
    assert response.status_code == 422
