
---

## ⚙️ **2. README.md — BACKEND (Node.js BFF con SSE y Cache)**

```md
# ⚙️ Datastream BFF (Backend For Frontend)

Backend desarrollado en **Node.js + TypeScript** que actúa como un **intermediario inteligente** entre el frontend Angular y una **API pública**.

Este BFF no solo gestiona las peticiones REST sino que además:
- Implementa **caching** de respuestas para mejorar el rendimiento.
- Expone un **endpoint SSE (Server-Sent Events)** que notifica al frontend ante cambios en los datos.
- Sirve como base para escalar hacia una arquitectura **event-driven** moderna.

---

## 🚀 Objetivos del proyecto

1. **Desacoplar el frontend de la API pública**.
2. **Optimizar tráfico** gracias al cache temporal.
3. **Notificar en tiempo real** mediante SSE sin necesidad de WebSockets.
4. **Proveer un punto único de seguridad y control** (ideal para un entorno corporativo o BFF).

---

## 🧱 Arquitectura general

```text
   ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
   │ API Pública  │◄────►│   BFF Node   │◄────►│  Angular App  │
   │  (jsonplaceholder)  │       │              │ (EventSource) │
   └──────────────┘       └──────────────┘       └──────────────┘
                              │
                              ▼
                     Server-Sent Events (SSE)

🧩 Stack Tecnológico

Node.js v20
TypeScript 5+
Express.js
CORS
SSE (Server-Sent Events)
In-memory Cache (Map)

