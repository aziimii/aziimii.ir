# FastAPI service design

FastAPI is a Python web framework built on Starlette and Pydantic. Request and
response models are declared as Pydantic classes, which generates OpenAPI docs
at `/docs` for free. Dependencies are injected with `Depends`, and application
startup work belongs in the `lifespan` async context manager.

For an LLM-backed service, keep the provider behind a small interface so the
web layer never imports an SDK directly. That makes the provider swappable and
lets tests replace it with a fake.

# Calling an LLM

Most providers expose the OpenAI chat-completions protocol: POST
`{base_url}/chat/completions` with a bearer token and a `messages` array of
role/content dicts. The response contains `choices[0].message.content`.
Groq, Ollama, vLLM, and OpenRouter all implement the same shape, so pointing
at a different provider is a base-URL and model-name change.

# Retrieval (RAG)

Retrieval-augmented generation finds chunks of local documents relevant to the
user's question and injects them into the system prompt. A TF-IDF +
cosine-similarity retriever in plain Python is enough to demonstrate the
mechanics: tokenize, weight terms by inverse document frequency, score
candidates by cosine similarity, and pass the top-k chunks as context.
