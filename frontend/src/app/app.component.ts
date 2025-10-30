import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Post, PostResponse } from './models/post.model';
import { NotifyService } from './shared/services/notify.service';
import { SseService } from './shared/services/sse.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostListComponent } from "./components/post-list";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, MatCardModule, MatIconModule, MatProgressSpinnerModule, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  cached = false;
  cacheHits = 0;
  apiHits = 0;
  loading = true;

  constructor(
    private notifyService: NotifyService,
    private postsService: PostsService,
    private sseService: SseService,
  ) {}

  ngOnInit() {
    this.sseService.connect();
    this.loadPosts();
    this.initSSE();
  }

  ngOnDestroy() {
    this.sseService.disconnect();
  }

  // Función para obtener la primera carga de datos
  // GET /api/data → para obtener la primera carga de datos (rápido y directo).
  loadPosts() {
    this.postsService.getPosts().subscribe({
      next: (response: PostResponse) => {
        this.posts = response.data; 
        this.cached = response.cached ?? false;
        this.cacheHits = response.cacheHits ?? 0;
        this.apiHits = response.apiHits ?? 0;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Inicializar SSE (Server-Sent Events)
  initSSE() {
    this.sseService.events$.subscribe(event => {
      if (!event?.data?.length) return;

      const newPost = event.data[0];
      this.posts = [newPost, ...this.posts];
      this.notifyService.notify(newPost);
    });
  }

  createPost() {
    this.postsService.createPost({ userId: Math.random(), id: Math.random(), title: 'Nuevo post', body: 'Contenido del nuevo post' }).subscribe({
      next: (response: PostResponse) => {
        alert('Post creado');
      },
      error: (err) => console.error(err)
    });
  }
}
