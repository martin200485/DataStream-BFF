import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.routes';
import metricsRoutes from './routes/metrics.routes';
import { conexionRedis } from './config/redis';
import dotenv from 'dotenv';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/metrics', metricsRoutes);

dotenv.config(); // carga las variables al process.env

app.use(cors({ origin: process.env.ORIGIN }));

// Inicializa Redis antes de levantar el servidor
conexionRedis()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 BFF corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error conectando Redis:', err);
    process.exit(1);
  });