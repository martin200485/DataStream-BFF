# BFF + Angular Frontend con Redis Cloud y SSE (Server Sent Events)

Este proyecto demuestra un patrón **BFF (Backend for Frontend)** moderno implementado con **Node.js + Express + TypeScript**, que sirve datos cacheados desde **Redis Cloud** y mantiene el **Frontend Angular** sincronizado en tiempo real mediante **SSE (Server-Sent Events)**.

El objetivo fue construir una arquitectura simple pero escalable, mostrando cómo reducir latencia y mantener una UI reactiva sin recurrir a WebSockets o polling continuo.

---

## Características principales

- **BFF con Express + TypeScript**  
  Backend intermedio que abstrae y unifica el acceso a APIs externas.

- **Cache distribuido con Redis Cloud**  
  Minimiza llamadas HTTP, mejora tiempos de respuesta y permite compartir datos entre instancias del backend.

- **Actualización en tiempo real con SSE (Server-Sent Events)**  
  El backend notifica automáticamente al frontend cada vez que se agrega o borra un post.

- **Integración Angular (Frontend)**  
  Aplicación SPA conectada al BFF.  
  Escucha actualizaciones vía `EventSource` y mantiene la UI sincronizada.

- **Arquitectura limpia y extensible**  
  Organizada en capas: `routes`, `services`, `config`, `models`, con manejo desacoplado del cache.

---

## Estructura del proyecto Backend
📦 bff/
┣ 📂 src/
┃ ┣ 📂 config/
┃ ┃ ┣ redis.ts # Conexión centralizada a Redis Cloud
┃ ┃ ┗ config.ts # Variables de entorno (API_URL, TTL, etc)
┃ ┣ 📂 routes/
┃ ┃ ┣ api.routes.ts # Rutas REST (GET, POST, DELETE)
┃ ┃ ┗ sse.routes.ts # Endpoint para conexión SSE
┃ ┣ 📂 services/
┃ ┃ ┗ cache.service.ts # Lógica de cache, broadcast SSE y operaciones CRUD
┃ ┗ app.ts # Entry point del servidor
┣ .env # Variables sensibles (Redis credentials, API URLs)
┣ package.json
┗ tsconfig.json

# Instalar dependencias
npm install

# Configurar variables en .env
REDIS_HOST=redis-xxxx.c11.us-east-1-3.ec2.redns.redis-cloud.com
REDIS_PORT=19039
REDIS_USER=default
REDIS_PASS=*************
REDIS_TTL=60
API_URL=https://jsonplaceholder.typicode.com/posts
FRONTEND_URL=http://localhost:4200

# Ejecutar el backend
npm run dev

## Tecnologías principales

| Tecnología | Descripción |
|-------------|--------------|
| **Angular 18+** | Framework SPA moderno para UI reactiva. |
| **RxJS + Observables** | Comunicación reactiva con SSE. |
| **Angular Material** | UI components con estilo minimalista. |
| **Node.js + Express** | Backend REST + SSE Server. |
| **Redis Cloud** | Cache distribuido y Pub/Sub. |
| **dotenv** | Configuración de entorno segura. |
| **TypeScript** | Tipado estático en todo el proyecto. |


## Características destacadas

✅ **Cache inteligente** con TTL en Redis (60s)  
✅ **SSE en tiempo real** para recibir nuevos posts sin refresh  
✅ **Arquitectura desacoplada** (frontend/backend independientes)  
✅ **Deploy-ready** en cualquier nube o entorno Docker  
✅ **Código limpio y documentado con TypeScript**

## Estructura del proyecto Frontend

src/
├── app/
│ ├── components/
│ │ ├── post-list/
│ │ └── post-item/
│ ├── services/
│ │ ├── post.service.ts
│ │ └── sse.service.ts
│ ├── models/
│ │ └── post.model.ts
│ └── app.component.ts
├── environments/
│ ├── environment.ts
│ └── environment.prod.ts
└── index.html

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve

# Build de producción
ng build --configuration production
