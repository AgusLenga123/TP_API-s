# Trabajo Práctico Obligatorio: Liga de Baloncesto Juvenil

**Materia / Curso:** [Completar]  
**Integrantes:** [Nombre 1], [Nombre 2]  

---

## 1. Arquitectura del Sistema

Para el desarrollo del sistema optamos por una arquitectura cliente-servidor tradicional, separando las responsabilidades en dos proyectos distintos para garantizar modularidad y escalabilidad:

### Frontend (Cliente)
Desarrollado como una Single Page Application (SPA).
- **Librería principal:** React (inicializado mediante Vite para mayor velocidad en desarrollo).
- **Estilos:** Decidimos utilizar CSS puro (Vanilla CSS) armando un sistema de diseño propio basado en variables. No se utilizaron frameworks externos de estilos pesados para mantener el proyecto ligero y demostrar dominio del lenguaje base.
- **Ruteo:** React Router DOM para manejar la navegación entre la zona pública y el panel administrativo sin recargar la página.

### Backend (Servidor)
- **Entorno y Framework:** Node.js junto con Express.js para levantar la API REST.
- **Base de Datos:** MongoDB. Elegimos NoSQL por la flexibilidad que nos da al manejar documentos anidados (como las estadísticas dentro de los equipos). Utilizamos MongoDB Atlas (en la nube) para no depender de instalaciones locales. La interacción desde Node se hace a través del ODM Mongoose.
- **Seguridad:** 
  - La autenticación administrativa se maneja mediante JSON Web Tokens (JWT).
  - Las contraseñas en la base de datos se almacenan encriptadas con la librería `bcryptjs`.

---

## 2. Configuración e Instalación

Al estar la base de datos alojada en MongoDB Atlas, no es necesario instalar motores de bases de datos locales. Solamente se requiere tener instalado **Node.js**.

### Paso a paso para levantar el proyecto:

1. **Clonar el repositorio y abrir una terminal en la carpeta principal.**
2. **Instalar las dependencias del backend:**
   ```bash
   npm install
   ```
3. **Configurar variables de entorno (Backend):**
   Duplicar el archivo `.env.example`, renombrarlo a `.env` y asegurarse de que tenga los valores correctos (la URI de MongoDB y la clave secreta para los JWT).
4. **Instalar las dependencias del frontend:**
   ```bash
   cd frontend
   npm install
   ```
5. **Ejecutar el sistema:**
   Se deben levantar ambos servidores en paralelo usando dos terminales distintas.
   - *Terminal 1 (En la raíz del proyecto):* `npm run dev` (Levanta el backend en el puerto 3001)
   - *Terminal 2 (Dentro de la carpeta /frontend):* `npm run dev` (Levanta el cliente de React en el puerto 5173)

---

## 3. Credenciales de Prueba

Si se corrió el script de poblar la base de datos (`npm run seed`), el sistema cuenta con usuarios y datos de prueba precargados.

- **Usuario Administrador:** `admin`
- **Contraseña:** `Admin1234`

*(En caso de arrancar con la base de datos en blanco, se puede crear un primer administrador enviando una petición POST a `/api/auth/setup` con el usuario y contraseña deseados).*

---

## 4. Manual de Usuario

El sistema se divide claramente en dos grandes áreas: el acceso al público general y el panel de administración.

### Vista Pública (No requiere inicio de sesión)
Cualquier persona que ingrese al sistema aterrizará en la **Landing Page**. Desde allí, la barra de navegación superior permite acceder a:
- **Clasificación:** Muestra la tabla general del torneo. Los equipos se ordenan automáticamente según los criterios del reglamento (1° Mayor cantidad de puntos, 2° Mayor diferencia de tantos, 3° Mayor cantidad de tantos a favor).
- **Partidos:** Funciona como un calendario interactivo. Permite buscar encuentros y filtrarlos entre "Pendientes" o "Finalizados".
- **Equipos:** Una galería visual con todos los equipos inscriptos. Haciendo clic en "Ver Detalles" dentro de cualquier equipo, el usuario puede revisar qué jugadores componen el plantel, el nombre del entrenador y el historial de sus últimos partidos disputados.

### Panel de Administración (Requiere inicio de sesión)
Accediendo al botón "Acceso Administrador" en la barra de navegación, el sistema solicitará credenciales. Una vez validados, se ingresa al panel de control interno, cuyo menú lateral permite gestionar todo el torneo:

1. **Dashboard:** Pantalla inicial con un resumen estadístico (cantidad de equipos, partidos pendientes, etc.) y un feed automático de actividad reciente.
2. **Equipos:** Permite dar de alta nuevos equipos (Nombre y Entrenador), editar sus datos y eliminarlos del sistema. *Nota: Eliminar un equipo borra en cascada a sus jugadores.*
3. **Jugadores:** Sección para registrar a los deportistas indicando Nombre, Apellido, Categoría (ej. Sub 17) y a qué equipo pertenecen.
4. **Partidos:** Zona para armar el fixture del torneo. Se selecciona quién es el local, quién el visitante (no permite que sea el mismo equipo), la fecha, horario y lugar de encuentro.
5. **Resultados:** Esta pantalla lista exclusivamente los partidos. Posee un botón rápido (ícono amarillo) que abre un formulario para ingresar el marcador final. 

**Lógica de Puntuación:** 
Al guardar un resultado, el sistema automáticamente:
- Marca el partido como "Finalizado".
- Otorga 3 puntos al equipo ganador (o 1 punto a cada uno en caso de empate).
- Suma los tantos a favor y en contra al acumulado de ambos equipos.
- Re-ordena la tabla de clasificación pública de forma instantánea.
