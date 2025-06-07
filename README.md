# GamerMatch

GamerMatch es una plataforma web para conectar jugadores según sus intereses, juegos favoritos, plataformas, idioma y región. Incluye chat en tiempo real, sistema de valoraciones y comentarios, y autenticación segura con Clerk.

## Enlace al Repositorio

[Repositorio en GitHub - GamerMatch](https://github.com/CCaliani/GamerMatch--TFG--)

---

## Tecnologías Utilizadas

- **Frontend:**

  - Vue 3 (Vite)
  - Pinia (gestión de estado)
  - Clerk (autenticación)
  - CSS personalizado

- **Backend:**

  - Node.js
  - Express.js
  - Sequelize (ORM)
  - MySQL
  - Socket.IO (chat en tiempo real)
  - Swagger (documentación de la API)
  - Clerk (middleware de autenticación)

- **Otros:**
  - dotenv, bcryptjs, swagger-ui-express, cors

---

## Estructura del Proyecto

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
│   ├── components/          # Componentes Vue
│   ├── composables/         # Composables Vue
│   ├── stores/              # Pinia stores
│
├── public/                  # Archivos estáticos
├── package.json             # Dependencias y scripts del frontend
├── vite.config.js           # Configuración de Vite
├── .env                     # Variables de entorno (frontend)
└── README.md                # Documentación del proyecto
```

---

## Instalación y Despliegue

### 1. Clonar el repositorio

```pwsh
git clone https://github.com/CCaliani/GamerMatch--TFG--.git
cd GamerMatch--TFG--
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

## Características Principales

- Registro y login con Clerk
- Sincronización automática de usuarios con la base de datos
- Buscador avanzado de jugadores (juego, plataforma, idioma, región)
- Chat en tiempo real entre usuarios emparejados
- Sistema de valoraciones y comentarios
- Documentación Swagger en `/api-docs`
- Consentimiento de cookies y privacidad básica

---

## Organización del Código

### Frontend

- Código Vue y lógica de interfaz en `src/`
- Componentes reutilizables en `src/components/`
- Composables y stores en `src/composables/` y `src/stores/`

### Backend

- Lógica de API y base de datos en `backend/`
- Modelos en `backend/models/`
- Rutas en `backend/routes/`
- Middlewares en `backend/middleware/`

---

## Licencia

Este proyecto es parte de un Trabajo de Fin de Grado y se distribuye bajo licencia académica.
