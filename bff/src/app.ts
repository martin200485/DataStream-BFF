import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.routes';
import metricsRoutes from './routes/metrics.routes';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/metrics', metricsRoutes);

app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(PORT, () => {
  console.log(`✅ BFF running at http://localhost:${PORT}`);
});
