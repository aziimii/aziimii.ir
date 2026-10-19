# fastapi-llm — practice service

A tiny FastAPI service that calls an LLM, grown in four deliberate stages.
Each stage is a self-contained milestone: the app runs and the tests pass at
the end of every stage.

| Stage | Added | Files |
|-------|-------|-------|
| 1. LLM service | FastAPI app with `/health` and `/chat`, OpenAI-compatible client + offline echo fallback | `app/main.py`, `app/llm.py`, `app/config.py` |
| 2. Retrieval | Bag-of-words TF-IDF retrieval over a local knowledge base, injected into the prompt | `app/retrieval.py`, `knowledge/*.md` |
| 3. Testing | Pytest suite covering health, chat, retrieval relevance, and validation errors | `tests/` |
| 4. Docker | Non-root image + compose file with env config | `Dockerfile`, `docker-compose.yml` |

## Run

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# offline mode (no API key needed — uses the echo provider)
uvicorn app.main:app --reload

# real LLM (any OpenAI-compatible endpoint: OpenAI, Groq, Ollama, ...)
export LLM_API_KEY=sk-...
export LLM_BASE_URL=https://api.openai.com/v1   # default
export LLM_MODEL=gpt-4o-mini
uvicorn app.main:app --reload
```

Open http://127.0.0.1:8000/docs for interactive API docs.

```bash
curl -s localhost:8000/health
curl -s -X POST localhost:8000/chat \
  -H 'content-type: application/json' \
  -d '{"message": "How is Sherafat deployed?"}'
```

## Test

```bash
pytest -q
```

Tests never touch the network: they run against the echo provider.

## Docker

```bash
docker compose up --build
# or:
docker build -t fastapi-llm .
docker run --rm -p 8000:8000 -e LLM_API_KEY=sk-... fastapi-llm
```

## Design notes

- **Offline-first**: with no `LLM_API_KEY` the service answers through an echo
  provider, so it runs and tests pass on any machine with no network.
- **Provider-agnostic**: `app/llm.py` speaks the OpenAI chat-completions
  protocol, so swapping to Groq/Ollama/vLLM is a base-URL change.
- **Retrieval is stdlib-only**: `app/retrieval.py` implements TF-IDF + cosine
  similarity in ~80 lines with no ML dependencies. It is a teaching baseline,
  not a production vector store.
- **No secrets in the image**: configuration is read from the environment at
  startup (see `.env.example`).
