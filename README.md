# Organization App — Backend

API REST con Node.js, Express y MongoDB.

## Variables de entorno necesarias

| Variable | Descripción |
|---|---|
| `MONGODB_URI` | URI de conexión a MongoDB Atlas |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT (inventá una cadena larga) |
| `FRONTEND_URL` | URL de tu frontend en Render/Vercel |
| `PORT` | Puerto (Render lo asigna automáticamente) |

## Endpoints

### Auth
- `POST /api/auth/register` — Registrar usuario
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Usuario actual (requiere token)

### Notas
- `GET /api/notes` — Obtener notas (requiere token)
- `POST /api/notes` — Crear nota (requiere token)
- `PUT /api/notes/:id` — Actualizar nota (requiere token)
- `PUT /api/notes/:id/pin` — Fijar/desfijar nota (requiere token)
- `DELETE /api/notes/:id` — Eliminar nota (requiere token)

### Tableros
- `GET /api/boards` — Obtener tableros (requiere token)
- `POST /api/boards` — Crear tablero (requiere token)
- `PUT /api/boards/:id` — Actualizar tablero (requiere token)
- `DELETE /api/boards/:id` — Eliminar tablero (requiere token)

## Deploy en Render

1. Subir este repo a GitHub
2. Crear Web Service en Render conectando el repo
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Agregar variables de entorno en Render → Environment
