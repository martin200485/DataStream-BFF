import { Response } from 'express';
import { subscribeToChannel } from '../config/redis';

type SSEClient = Response;
let clients: SSEClient[] = [];

/**
 * Inicializa el endpoint SSE.
 */
export const initSSE = (req: any, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);
  console.log(`🟢 Cliente SSE conectado (${clients.length} total)`);

  req.on('close', () => {
    clients = clients.filter(c => c !== res);
    console.log(`🔴 Cliente SSE desconectado (${clients.length} total)`);
  });
};

/**
 * Envía un mensaje SSE a todos los clientes conectados.
 */
export const broadcastUpdate = (data: any) => {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(client => client.write(payload));
  console.log(`📡 Notificando ${clients.length} clientes SSE`);
};

/**
 * Escucha los eventos publicados en Redis y los reenvía por SSE.
 */
export const initRedisListener = async () => {
  await subscribeToChannel('posts_channel', (newPost) => {
    console.log('🧩 Nuevo post recibido desde Redis, enviando por SSE...');
    broadcastUpdate({ data: [newPost], cached: false });
  });
};
