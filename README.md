# Cosmic Image Atlas Client

A Vite-powered React interface for exploring normalized public space imagery and metadata from the Space Metadata API.

## Run locally

Start the backend at `http://localhost:8080`, then run:

```bash
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

Set `VITE_API_BASE_URL` in `.env` when the backend runs at a different URL.

## Checks

```bash
npm test
npm run build
```

The client uses a repository boundary around HTTP access, maps backend DTOs into view models, and keeps search and health-check state in focused React hooks.
