# Implementación de GamerMatch

## Enlace a GitHub

> [Repositorio en GitHub - GamerMatch](https://github.com/CCaliani/GamerMatch--TFG--)

---

## Marco Tecnológico

- **Frontend:**  
  - Vue 3 (Vite)
  - Pinia (gestión de estado)
  - Clerk (autenticación)
  - CSS personalizado

- **Backend:**  
  - Node.js
  - Express.js
  - Sequelize (ORM)
  - MySQL (base de datos)
  - Socket.IO (chat en tiempo real)
  - Swagger (documentación de la API)
  - Clerk (middleware de autenticación)

- **Otros:**  
  - dotenv (variables de entorno)
  - bcryptjs (hash de contraseñas)
  - swagger-ui-express (UI de documentación)
  - cors (CORS para desarrollo)

---

## Estructura del Código

```
GamerMatch/
│
├── backend/
│   ├── db.js                # Configuración de Sequelize y conexión a MySQL
│   ├── index.js             # Entrada principal del servidor Express y Socket.IO
│   ├── swagger.js           # Configuración de Swagger
│   ├── middleware/          # Middlewares (auth, clerkAuth, etc)
│   ├── models/              # Modelos Sequelize (Usuario, Juego, Match, etc)
│   ├── routes/              # Rutas de la API REST (usuarios, juegos, auth, etc)
│
├── src/
│   ├── App.vue              # Componente principal de Vue
│   ├── main.js              # Entrada principal del frontend
│   ├── assets/              # Imágenes y estilos globales
│   ├── components/          # Componentes Vue (NavBar, WindowsGame, etc)
│   ├── composables/         # Composables Vue (useJugadores.js, etc)
│   ├── stores/              # Pinia stores
│
├── public/                  # Archivos estáticos
├── package.json             # Dependencias y scripts del frontend
├── vite.config.js           # Configuración de Vite
├── .env                     # Variables de entorno (frontend)
│
└── README.md                # Documentación del proyecto
```

---

## Uso de APIs y Librerías Externas

- **Clerk:**  
  - Autenticación de usuarios en frontend y backend.
  - Middleware para proteger rutas y sincronizar usuarios con la base de datos.

- **Sequelize:**  
  - ORM para interactuar con la base de datos MySQL.
  - Modelos para usuarios, juegos, matchs, mensajes, valoraciones, etc.

- **Socket.IO:**  
  - Comunicación en tiempo real para el chat entre usuarios.

- **Swagger:**  
  - Documentación interactiva de la API RESTful.

- **Pinia:**  
  - Gestión de estado global en el frontend.

- **Otras:**  
  - bcryptjs, cors, dotenv, swagger-ui-express, etc.

---

## Aspectos Destacables

- Sincronización automática de usuarios Clerk con la base de datos al iniciar sesión.
- Chat en tiempo real entre usuarios emparejados.
- Sistema de valoraciones y comentarios para fomentar la comunidad.
- Buscador avanzado de jugadores con filtros por juego, plataforma, idioma y región.
- Documentación Swagger accesible en `/api-docs`.
- Consentimiento de cookies y cumplimiento básico de privacidad.

---

## Despliegue de la Aplicación

### 1. Clonar el repositorio

```pwsh
git clone https://github.com/tu-usuario/GamerMatch.git
cd GamerMatch
```

### 2. Configurar variables de entorno

- **Frontend (`.env` en la raíz):**
  ```
  VITE_CLERK_PUBLISHABLE_KEY=tu_clave_clerk
  VITE_API_URL=http://localhost:3000
  ```

- **Backend (`backend/.env`):**
  ```
  DB_NAME=gamermatch
  DB_USER=tu_usuario
  DB_PASS=tu_contraseña
  DB_HOST=localhost
  JWT_SECRET=loquesea
  ```

### 3. Instalar dependencias

```pwsh
# Frontend
npm install

# Backend
cd backend
npm install
```

### 4. Crear la base de datos y tablas

- Crea la base de datos `gamermatch` en MySQL.
- Sequelize creará las tablas automáticamente al iniciar el backend.
- **IMPORTANTE:** Añade la columna `clerkUserId` a la tabla `usuarios`:
  ```sql
  ALTER TABLE usuarios ADD COLUMN clerkUserId VARCHAR(255) NOT NULL UNIQUE;
  ```

### 5. Levantar el backend

```pwsh
cd backend
node index.js
```
O si tienes un script:
```pwsh
npm start
```

### 6. Levantar el frontend

```pwsh
cd ..
npm run dev
```

---

## Guía de uso y usuarios de prueba

- **Registro:**  
  - Usa el sistema de Clerk para registrarte o iniciar sesión.
  - Al iniciar sesión por primera vez, tu usuario se sincroniza automáticamente con la base de datos.

- **Buscar jugadores:**  
  - Usa los filtros en la pantalla principal para buscar jugadores por juego, plataforma, idioma y región.

- **Enviar solicitudes y chatear:**  
  - Haz clic en "Enviar solicitud" para emparejarte y acceder al chat en tiempo real.

- **Comentar y valorar:**  
  - Deja comentarios y valoraciones sobre la experiencia con otros jugadores.

- **Usuario de prueba:**  
  - Puedes crear usuarios de prueba desde Clerk o insertarlos manualmente en la base de datos (no podrán iniciar sesión si no existen en Clerk).

---

## Organización del código

### Frontend
- Todo el código Vue y lógica de la interfaz está en la carpeta `src/`.
- Componentes reutilizables en `src/components/`.
- Composables y stores en `src/composables/` y `src/stores/`.

### Backend
- Toda la lógica de la API y la base de datos está en la carpeta `backend/`.
- Modelos en `backend/models/`.
- Rutas en `backend/routes/`.
- Middlewares en `backend/middleware/`.
