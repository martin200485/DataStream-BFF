import { Router } from 'express';
import { subscribeClient } from '../services/cache.service';

const router = Router();

router.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  subscribeClient(res);

  // Mandar un ping cada 30s para mantener la conexión viva
  const interval = setInterval(() => res.write(':\n\n'), 30000);
  req.on('close', () => clearInterval(interval));
});

export default router;
