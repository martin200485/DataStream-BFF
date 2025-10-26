import fetch from 'node-fetch';
import API_URL from '../shared/env';

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

let cache: Post[] = [];
let timestamp = 0;
const CACHE_TTL = 60 * 1000; // 1 minuto
let cacheHits = 0;
let apiHits = 0;

// Suscriptores SSE
let subscribers: ((data: PostResponse) => void)[] = [];

export async function getPosts(): Promise<PostResponse> {
  const now = Date.now();
  if (cache.length && now - timestamp < CACHE_TTL) {
    cacheHits++;
    return { data: cache, cached: true, cacheHits, apiHits };
  }

  // Llamada a API pública
  const res = await fetch(API_URL.API_URL);
  const json: unknown = await res.json();

  if (Array.isArray(json)) {
    cache = json.map(p => ({ ...p, cached: false }));
  } else {
    cache = [];
  }

  timestamp = now;
  apiHits++;

  const response = { data: cache, cached: false, cacheHits, apiHits };

  // Notificar a suscriptores SSE
  subscribers.forEach(fn => fn(response));

  return response;
}

// Función para suscribirse a SSE
export function subscribeToPosts(fn: (data: PostResponse) => void) {
  subscribers.push(fn);
  return () => {
    subscribers = subscribers.filter(f => f !== fn);
  };
}
