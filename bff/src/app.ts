import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.routes';
import { httpRequestCounter, httpRequestDuration } from './monitoring/metrics';
import { prometheusRouter } from './routes/metrics.routes';
import { initSSE, initRedisListener } from './services/sse.service';

const app = express();
const PORT = 4000;

// Middleware Prometheus para medir cada request
app.use(async (req, res, next) => {
  const end = httpRequestDuration.startTimer()
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    })
    end({ method: req.method, route: req.route?.path || req.path, status: res.statusCode })
  })
  next()
})

app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/metrics', prometheusRouter);

// Endpoint para SSE
app.get('/events', initSSE);

app.listen(PORT, async () => {
  console.log(`✅ BFF running at http://localhost:${PORT}`);
  await initRedisListener(); // 🔥 inicia la escucha Redis -> SSE
});