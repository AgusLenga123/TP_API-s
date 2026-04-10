# 🏀 Basketball Liga API

API REST para la gestión integral de una liga de baloncesto juvenil.  
Stack: **Node.js · Express · MongoDB (Mongoose) · JWT**

---

## 🖥️ Setup en nueva máquina

Si clonás este repo en otra computadora, seguí estos pasos:

```bash
# 1. Clonar el repositorio
git clone https://github.com/AgusLenga123/TP_API-s.git
cd TP_API-s

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de entorno
copy .env.example .env   # Windows
# cp .env.example .env   # Mac/Linux
```

Luego abrí el `.env` y completá:
- `MONGODB_URI` → tu connection string de MongoDB Atlas (siempre disponible en [cloud.mongodb.com](https://cloud.mongodb.com) → Connect)
- `JWT_SECRET` → generalo con `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

```bash
# 4. Poblar la base de datos (primera vez)
npm run seed

# 5. Iniciar el servidor
npm run dev
```

> ✅ La base de datos está en MongoDB Atlas (en la nube), así que los datos persisten entre máquinas automáticamente.

---

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 3. Cargar datos de prueba (opcional pero recomendado)
npm run seed

# 4. Iniciar en desarrollo
npm run dev

# 5. Iniciar en producción
npm start
```

> ⚠️ El servidor valida al arrancar que `MONGODB_URI` y `JWT_SECRET` estén definidos. Si falta alguno, el proceso termina con un mensaje claro.

---

## Credenciales de prueba (tras ejecutar `npm run seed`)

| Campo    | Valor       |
|----------|-------------|
| Usuario  | `admin`     |
| Password | `Admin1234` |

---

## Variables de entorno (`.env`)

| Variable        | Descripción                        | Ejemplo                                     |
|-----------------|------------------------------------|---------------------------------------------|
| `PORT`          | Puerto del servidor                | `3001`                                      |
| `MONGODB_URI`   | URI de conexión a MongoDB          | `mongodb://localhost:27017/basketball_liga` |
| `JWT_SECRET`    | Secreto para firmar tokens JWT     | `mi_secreto_seguro`                         |
| `JWT_EXPIRES_IN`| Expiración del token               | `24h`                                       |

---

## Crear el primer administrador

Al iniciar el proyecto por primera vez, crear el admin así:

```http
POST /api/auth/setup
Content-Type: application/json

{
  "usuario": "admin",
  "password": "tu_password"
}
```

> ⚠️ Deshabilitar o proteger este endpoint antes de ir a producción.

---

## Autenticación

Las rutas protegidas requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

El token se obtiene haciendo login en `POST /api/auth/login`.

---

## Endpoints

### AUTH

| Método | Ruta              | Acceso | Descripción                  |
|--------|-------------------|--------|------------------------------|
| POST   | `/api/auth/login` | Público | Login de administrador       |
| POST   | `/api/auth/setup` | Público | Crear el primer admin        |

---

### EQUIPOS

| Método | Ruta               | Acceso      | Descripción                           |
|--------|--------------------|-------------|---------------------------------------|
| GET    | `/api/equipos`     | Público     | Listar todos los equipos              |
| GET    | `/api/equipos/:id` | Público     | Detalle de equipo + partidos          |
| POST   | `/api/equipos`     | Admin (JWT) | Crear equipo                          |
| PUT    | `/api/equipos/:id` | Admin (JWT) | Actualizar equipo                     |
| DELETE | `/api/equipos/:id` | Admin (JWT) | Eliminar equipo y sus jugadores       |

**Body para crear/actualizar equipo:**
```json
{
  "nombre": "Los Cóndores",
  "entrenador": "Juan Pérez"
}
```

---

### JUGADORES

| Método | Ruta                 | Acceso      | Descripción                               |
|--------|----------------------|-------------|-------------------------------------------|
| GET    | `/api/jugadores`     | Público     | Listar jugadores (opcional: `?equipoId=`) |
| GET    | `/api/jugadores/:id` | Público     | Detalle de jugador                        |
| POST   | `/api/jugadores`     | Admin (JWT) | Crear jugador                             |
| PUT    | `/api/jugadores/:id` | Admin (JWT) | Actualizar jugador                        |
| DELETE | `/api/jugadores/:id` | Admin (JWT) | Eliminar jugador                          |

**Body para crear/actualizar jugador:**
```json
{
  "nombre": "Carlos",
  "apellido": "García",
  "categoria": "Sub-17",
  "equipo": "<equipoId>"
}
```

---

### PARTIDOS

| Método | Ruta                          | Acceso      | Descripción                                 |
|--------|-------------------------------|-------------|---------------------------------------------|
| GET    | `/api/partidos`               | Público     | Listar partidos (opcional: `?equipoId=`, `?finalizado=true/false`) |
| GET    | `/api/partidos/:id`           | Público     | Detalle de partido                          |
| POST   | `/api/partidos`               | Admin (JWT) | Crear partido                               |
| PUT    | `/api/partidos/:id`           | Admin (JWT) | Editar partido (no finalizado)              |
| DELETE | `/api/partidos/:id`           | Admin (JWT) | Eliminar partido                            |
| PATCH  | `/api/partidos/:id/resultado` | Admin (JWT) | Cargar resultado y actualizar estadísticas  |

**Body para crear partido:**
```json
{
  "equipoLocal": "<equipoId>",
  "equipoVisitante": "<equipoId>",
  "fecha": "2025-06-15",
  "horario": "18:00",
  "lugar": "Gimnasio Municipal"
}
```

**Body para cargar resultado:**
```json
{
  "puntosLocal": 78,
  "puntosVisitante": 65
}
```

---

### CLASIFICACIÓN

| Método | Ruta                  | Acceso  | Descripción                                |
|--------|-----------------------|---------|--------------------------------------------|
| GET    | `/api/clasificacion`  | Público | Tabla de clasificación ordenada            |

**Respuesta de ejemplo:**
```json
[
  {
    "posicion": 1,
    "nombre": "Los Cóndores",
    "puntos": 9,
    "partidosJugados": 3,
    "partidosGanados": 3,
    "partidosEmpatados": 0,
    "partidosPerdidos": 0,
    "tantosAFavor": 240,
    "tantosEnContra": 180,
    "diferenciaDeTantos": 60
  }
]
```

---

## Reglas de puntuación

| Resultado      | Puntos |
|----------------|--------|
| Partido ganado | 3      |
| Partido empatado | 1    |
| Partido perdido | 0     |

**Desempate:** 1° diferencia de tantos → 2° tantos a favor

---

## Estructura del proyecto

```
basketball-api/
├── src/
│   ├── app.js                    # Entry point
│   ├── config/
│   │   └── db.js                 # Conexión MongoDB
│   ├── models/
│   │   ├── Admin.model.js
│   │   ├── Equipo.model.js
│   │   ├── Jugador.model.js
│   │   └── Partido.model.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── clasificacion.service.js
│   │   ├── equipo.service.js
│   │   ├── jugador.service.js
│   │   └── partido.service.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── clasificacion.controller.js
│   │   ├── equipo.controller.js
│   │   ├── jugador.controller.js
│   │   └── partido.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── clasificacion.routes.js
│   │   ├── equipo.routes.js
│   │   ├── jugador.routes.js
│   │   └── partido.routes.js
│   └── middlewares/
│       ├── auth.middleware.js
│       └── errorHandler.js
├── .env.example
├── .gitignore
└── package.json
```
