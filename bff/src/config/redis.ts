import { createClient, RedisClientType } from 'redis';

let client: RedisClientType | null = null;

export const conexionRedis = async () => {
  if (client) return client; // evita reconectar si ya existe

  client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: 19039,
    }
  });
  
  client.on('error', (err) => console.error('Redis Client Error', err));

  await client.connect();

  console.log('✅ Redis conectado correctamente');

  return client; 
}
