# Proyecto: Node + Redis + Angular Dashboard + Prometheus

Este proyecto demuestra una arquitectura moderna Node.js + Redis + Angular, implementando:

Cacheo de peticiones HTTP con Redis Cloud

Comunicación en tiempo real vía SSE (Server-Sent Events)

Sistema de Pub/Sub con Redis para sincronizar eventos entre múltiples instancias

Monitoreo con Prometheus en el backend

Dashboard visual de métricas en Angular Material

El objetivo es mostrar buenas prácticas de rendimiento, observabilidad y comunicación en tiempo real entre frontend y backend.

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
bff/
- src/
- - config/
- - - redis.ts # Conexión centralizada a Redis Cloud
- - routes/
- - - api.routes.ts # Rutas REST (GET, POST, DELETE)
- - - metrics.routes.ts # Endpoint para metricas PROMETHEUS
- - services/
- - - cache.service.ts # Lógica de cache, broadcast SSE y operaciones CRUD
      sse.serivce.ts # Lógica pra mensajería SSE
- - app.ts # Entry point del servidor
- .env # Variables sensibles (Redis credentials, API URLs)
- package.json
- tsconfig.json

# Instalar dependencias
npm install

# Configurar variables en .env
- REDIS_HOST=redis-xxxx.c11.us-east-1-3.ec2.redns.redis-cloud.com
- REDIS_PORT=19039
- REDIS_USER=default
- REDIS_PASS=*************
- REDIS_TTL=60
- API_URL=https://jsonplaceholder.typicode.com/posts
- FRONTEND_URL=http://localhost:4200

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
| **Prometheus Client (prom-client)** | Herramienta de latencia |

## Características destacadas

 **Cache inteligente** con TTL en Redis (60s)  
 **SSE en tiempo real** para recibir nuevos posts sin refresh  
 **Arquitectura desacoplada** (frontend/backend independientes)  
 **Deploy-ready** en cualquier nube o entorno Docker  
 **Código limpio y documentado con TypeScript**

## Estructura del proyecto Frontend

src/
- app/
- - - components/
- - - - post-list/
- - - - post-item/
- - - services/
- - - - post.service.ts
- - - - metrcis.service.ts
- - - models/
- - - - post.model.ts
- - - views/
- - - - dashboard (vista)
- - - - post (posteos)
- - app.component.ts (root)
- index.html

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve

# Build de producción
ng build --configuration production
