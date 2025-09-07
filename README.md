# URS Property API (Backend)

## Tech
- Node.js, Express
- MongoDB (Atlas or local)
- JWT for admin auth
- CORS enabled for frontend

## Endpoints
- `GET /api/properties` — list (supports `?q=search&minPrice=0&maxPrice=100000`)
- `GET /api/properties/:id` — details
- `POST /api/properties` — create (admin only, Bearer token)
- `POST /api/auth/login` — returns JWT for admin

## Quick Start
```bash
cp .env.example .env   # fill values
npm install
npm run seed           # optional test data
npm run dev            # or npm start
```
