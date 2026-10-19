# --- build stage: install dependencies into a virtualenv ---
FROM python:3.12-slim AS build

ENV PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /build
COPY requirements.txt .
RUN python -m venv /opt/venv \
    && /opt/venv/bin/pip install --retries 5 --timeout 60 -r requirements.txt

# --- runtime stage: only what the service needs ---
FROM python:3.12-slim

ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONUNBUFFERED=1

# run as the unprivileged user shipped with the base image
RUN useradd --create-home --uid 10001 appuser
WORKDIR /app

COPY --from=build /opt/venv /opt/venv
COPY app/ ./app/
COPY knowledge/ ./knowledge/

USER appuser
EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=3)"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
