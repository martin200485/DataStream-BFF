import { Router } from 'express';

const router = Router();

let clients: any[] = [];

router.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);

// Enviamos una bienvenida inicial
  res.write(`data: ${JSON.stringify({ message: 'Conectado al stream!' })}\n\n`);

  req.on('close', () => {
    clients = clients.filter(c => c !== res);
  });
});

router.post('/test', (req, res) => {
  const newPost = {
    id: Math.random(),
    title: 'Nuevo post generado desde el backend',
    body: 'Esto es una actualización SSE simulada',
  };

  broadcastUpdate({ data: [newPost], cached: false });
  res.json({ success: true, sent: newPost });
});

// Función para emitir a todos los clientes conectados
export const broadcastUpdate = (data: any) => {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

export default router;
