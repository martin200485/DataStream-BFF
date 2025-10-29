import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Post, PostResponse } from './models/post';
import { NotifyService } from './shared/services/notify.service';
import { SseService } from './shared/services/sse.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatIconModule, MatProgressSpinnerModule],
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
  // GET /api/stream → para mantener actualizados los datos sin volver a pedirlos.
  initSSE() {
    this.sseService.events$.subscribe(event => {
      if (event.data === undefined) return;
      this.posts = [...event.data, ...this.posts];
      this.notifyService.notify(event.data[0]);
    });
  }
}
