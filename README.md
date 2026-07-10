# Sistema de Gestión - Liga Juvenil de Baloncesto 🏀

Documentación oficial del proyecto desarrollado para la asignatura de Desarrollo de Aplicaciones Web.

---

## 1. Arquitectura del Sistema

El proyecto sigue una arquitectura **Cliente-Servidor (Frontend / Backend)** comunicados a través de una API RESTful.

*   **Frontend (Cliente):** Desarrollado como una *Single Page Application (SPA)* utilizando **React** y empaquetado con **Vite**. Todo el enrutamiento se maneja del lado del cliente con `react-router-dom`. El diseño visual es responsivo y está construido estrictamente con **HTML y Vanilla CSS**.
*   **Backend (Servidor):** Construido sobre **Node.js** utilizando el framework **Express.js**. Sigue el patrón de diseño MVC (Modelos, Controladores y Servicios). 
*   **Base de Datos:** Se utiliza **MongoDB** (NoSQL) alojado en la nube mediante *MongoDB Atlas*. Las consultas y esquemas se manejan con `mongoose`.
*   **Seguridad:** Las rutas administrativas están protegidas mediante **JSON Web Tokens (JWT)**. Las contraseñas de los usuarios administradores se encuentran encriptadas en la base de datos utilizando `bcrypt`.

---

## 2. Requisitos Previos

Para poder ejecutar este proyecto de forma local, es necesario contar con:
*   [Node.js](https://nodejs.org/es/) (Versión 18.0.0 o superior).
*   NPM (Instalado por defecto con Node.js).
*   Conexión a internet estable (para conectar con la base de datos MongoDB Atlas).

---

## 3. Instalación y Configuración

### Configuración del Backend (API)
1. Abrir una terminal en la carpeta raíz del proyecto (`TP_API-s`).
2. Instalar las dependencias del servidor:
   ```bash
   npm install
   ```
3. Verificar que exista el archivo `.env` en la raíz con la siguiente estructura:
   ```env
   PORT=3001
   MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombre_db>?retryWrites=true&w=majority&appName=<appName>
   JWT_SECRET=tu_secreto_super_seguro
   ```

### Configuración del Frontend
1. Abrir una terminal y navegar hacia la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instalar las dependencias del cliente:
   ```bash
   npm install
   ```
3. Verificar que exista el archivo `.env` dentro de la carpeta `frontend` indicando la ruta hacia la API:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

---

## 4. Ejecución del Sistema

Para levantar el sistema de manera local, se deben iniciar ambos servidores de forma simultánea.

**Iniciar Backend:**
En la carpeta raíz (`TP_API-s`):
```bash
npm run dev
```
*(El servidor indicará "MongoDB conectado" y se levantará en el puerto 3001).*

**Iniciar Frontend:**
En una **nueva** terminal, dentro de la carpeta `frontend`:
```bash
npm run dev
```
*(El sitio web estará disponible en `http://localhost:5173/`).*

---

## 5. Credenciales de Prueba (Testing)

El sistema cuenta con un administrador precargado para probar las funcionalidades de edición.

*   **Ruta de acceso:** `http://localhost:5173/login`
*   **Usuario:** `admin`
*   **Contraseña:** `Admin1234`

---

## 6. Manual de Usuario

El sistema se divide en dos áreas principales: Pública y Administrativa.

### 6.1. Vista Pública (Sin inicio de sesión)
Cualquier usuario que ingrese a la página principal podrá:
*   **Landing Page:** Ver estadísticas destacadas de la liga y resúmenes.
*   **Clasificación:** Acceder a la tabla de posiciones general ordenada de forma automática según reglas de puntuación y desempate.
*   **Partidos:** Ver el calendario completo. Hacer clic en un partido abre un modal (popup) con detalles de fecha, horario y resultado (si el partido ya finalizó).
*   **Equipos:** Ver todas las franquicias participantes. Hacer clic en un equipo permite ver su plantilla de jugadores, cuerpo técnico y estadísticas.

### 6.2. Área Administrativa (Requiere inicio de sesión)
Una vez ingresadas las credenciales de administrador en la ruta `/login`, el usuario tiene control total:

*   **Gestión de Equipos:** Permite registrar nuevos equipos, editar su nombre y entrenador, o eliminarlos del torneo.
*   **Gestión de Jugadores:** Se pueden agregar jugadores asignándolos a categorías específicas (`Sub-13`, `Sub-15`, `Sub-17`, `Mayor`) y vincularlos a un equipo creado previamente.
*   **Gestión de Partidos:** Permite programar nuevos encuentros definiendo equipo local, visitante, fecha, hora y ubicación. 
*   **Carga de Resultados:** Dentro de la pestaña de Partidos, el administrador puede editar un encuentro que figura como "Pendiente", ingresar el puntaje final y marcarlo como finalizado. Esto **actualiza de forma automática** la tabla de posiciones y las estadísticas de cada equipo.
