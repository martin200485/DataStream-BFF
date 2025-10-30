import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.routes';
import { initSSE, initRedisListener } from './services/sse.service';

const app = express();
const PORT = 4000;

app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.json());

app.use('/api', apiRoutes);

// Endpoint para SSE
app.get('/events', initSSE);

app.listen(PORT, async () => {
  console.log(`✅ BFF running at http://localhost:${PORT}`);
  await initRedisListener(); // 🔥 inicia la escucha Redis -> SSE
});