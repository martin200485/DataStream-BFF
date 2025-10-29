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