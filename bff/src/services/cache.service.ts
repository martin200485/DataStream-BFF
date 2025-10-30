import fetch from 'node-fetch';
import { env } from "process";
import { getRedisClient, publishEvent } from '../config/redis';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostResponse {
  data: Post[];
  cached: boolean;
  cacheHits: number;
  apiHits: number;
}

let cacheHits = 0;
let apiHits = 0;

// Lista de clientes SSE conectados
const clients: any[] = [];

// --- FUNCIONES SSE ---

// Suscribirse
export function subscribeClient(client: any) {
  clients.push(client);

  // Cuando se cierra la conexión, removemos
  client.on('close', () => {
    const index = clients.indexOf(client);
    if (index !== -1) clients.splice(index, 1);
  });
}

// Notificar a todos los SSE
export const broadcastUpdate = (data: PostResponse) => {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

export async function getPosts(): Promise<PostResponse> {
  try {
    const client = await getRedisClient();

    let cacheKey = 'posts';
  
    // Verificamos si ya hay datos cacheados
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      cacheHits++;
      const parsed = JSON.parse(cachedData);
      return { data: parsed, cached: true, cacheHits, apiHits };
    }
  
    // No hay cache → llamada a la API
    const res = await fetch(process.env.API_URL ?? "https://jsonplaceholder.typicode.com/posts");
    const json = await res.json();
  
    const data = Array.isArray(json) ? json : [];
  
    // Guardamos en Redis con TTL de 60s
    await client.set(cacheKey, JSON.stringify(data), { EX: 60 });
    apiHits++;
  
    const response = { data, cached: false, cacheHits, apiHits };
  
    return response;  
  } catch (error) {
    return { data: [], cached: false, cacheHits, apiHits };
  }
}

export async function addPost(newPost: Post): Promise<PostResponse> {
  const client = await getRedisClient();
  const postsKey = 'posts';

  // Obtener cache existente
  const cached = await client.get(postsKey);
  const posts = cached ? JSON.parse(cached) : [];

  // Agregar nuevo post
  posts.unshift(newPost);

  // Guardar nuevamente en Redis
  await client.set(postsKey, JSON.stringify(posts), { EX: 60 });

  // Notificar a otros suscriptores
  await publishEvent('posts_channel', newPost);

  return { data: posts, cached: false, cacheHits, apiHits };
}
