# ⚡ DataStream BFF

Arquitectura inteligente de caching y streaming entre un frontend Angular y múltiples microservicios.

## 🧩 Componentes

- **Frontend:** Angular 17 + RxJS + SSE
- **Backend:** Node.js (Express)
- **Cache:** Redis local / in-memory
- **DB:** SQLite o Supabase

## 🚀 Características

- Actualización en tiempo real (SSE)
- Caching dinámico en BFF
- Métricas de rendimiento (cache hits, latencia)
- Compatible con microservicios REST

## 🧱 Estructura

datastream-bff/
├─ backend/ → API + cache + SSE
├─ frontend/ → Angular dashboard
└─ README.md


## 💻 Ejecución local

### 1️⃣ Backend
```bash
cd backend
npm install
npm run dev

cd frontend
npm install
ng serve

