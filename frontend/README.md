# FRONTEND (Angular SSE Dashboard)

# 🧩 Datastream Frontend

Aplicación **Angular 18** que consume datos en tiempo real desde un **BFF (Backend For Frontend)** implementado en Node.js con soporte **SSE (Server-Sent Events)**.

El objetivo es demostrar una arquitectura moderna, reactiva y escalable donde el frontend se actualiza automáticamente ante cambios en el backend, sin requerir recargas ni pooling.

---

## 🚀 Características principales

- Framework: **Angular 18**
- Comunicación reactiva: **SSE (Server-Sent Events)**
- Interfaz con **Angular Material**
- Notificaciones automáticas al recibir nuevos datos
- Integración con un BFF intermedio que actúa como proxy y capa de caching

---

## 🧠 Flujo general

```text
API Pública → BFF (Node.js) → Angular (Frontend)
                      ↘
                 SSE (push de eventos)


🧰 Tecnologías utilizadas

Angular 18
RxJS para manejo reactivo
Angular Material (snackbar, cards, toolbar)
TypeScript
SSE nativo con EventSource