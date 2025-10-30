import { Component, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatProgressSpinnerModule],
  template: ` 
    <mat-card-header>
      <mat-icon mat-card-avatar color="accent">article</mat-icon>
      <mat-card-title>{{ post.title }}</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <p>{{ post.body }}</p>
    </mat-card-content>`,
  styles: [
    `
      mat-card-header {
        background: #fafafa;
        border-bottom: 1px solid #eee;
      }

      mat-card-content {
        padding-top: 0.5rem;
        overflow-wrap: break-word; /* evita que el texto salga de la tarjeta */
      }
    `,
  ],
})
export class PostItemComponent {
  @Input() post: Post = { userId: 0, id: 0, title: '', body: '' };
}
