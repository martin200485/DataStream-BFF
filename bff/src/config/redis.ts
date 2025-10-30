import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

let client: RedisClientType | null = null;
let subscriber: RedisClientType | null = null;

/**
 * Crea (o devuelve) el cliente Redis principal.
 * Se usa para operaciones GET/SET y también como publisher.
 */
export const getRedisClient = async (): Promise<RedisClientType> => {
  if (client) return client;

  client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: 19039,
    },
  })

  client.on('error', (err) => console.error('❌ Redis Client Error:', err));
  await client.connect();

  console.log('✅ Redis conectado correctamente');
  return client;
}

/**
 * Crea un duplicado del cliente para usarlo como subscriber (Pub/Sub).
 * Redis no permite hacer GET/SET y SUBSCRIBE con el mismo socket.
 */
export const getRedisSubscriber = async (): Promise<RedisClientType> => {
  if (subscriber) return subscriber;

  const mainClient = await getRedisClient();
  subscriber = mainClient.duplicate();

  subscriber.on('error', (err) => console.error('❌ Redis Subscriber Error:', err));
  await subscriber.connect();

  console.log('👂 Redis Subscriber conectado');
  return subscriber;
}

/**
 * Publica un mensaje en un canal (para notificar cambios a otros servicios o instancias).
 */
export const publishEvent = async (channel: string, message: any) => {
  const redis = await getRedisClient();
  const payload = JSON.stringify(message);
  await redis.publish(channel, payload);
  console.log(`📢 Evento publicado en canal "${channel}"`);
}

/**
 * Se suscribe a un canal y ejecuta un callback al recibir mensajes.
 */
export const subscribeToChannel = async (channel: string, onMessage: (msg: any) => void) => {
  const redisSub = await getRedisSubscriber();
  await redisSub.subscribe(channel, (message) => {
    try {
      const data = JSON.parse(message);
      onMessage(data);
    } catch (e) {
      console.error('Error al parsear mensaje Redis:', e);
    }
  });

  console.log(`🔔 Suscrito al canal "${channel}"`);
}
