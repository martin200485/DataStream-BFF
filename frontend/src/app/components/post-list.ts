import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Post } from '../models/post.model';
import { PostItemComponent } from './post-item';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PostItemComponent,
  ],
  template: `
      <div class="posts-list">
        <mat-card *ngFor="let post of posts" class="post-card">
          <app-post-item [post]="post"></app-post-item>
        </mat-card>
      </div>
    `,
  styles: [
    `
      .posts-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1rem;
      }

      .post-card {
        display: flex;
        flex-direction: column;
        height: 100%; /* asegura que todas las tarjetas tengan altura automática según el contenido */
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        background-color: #cfa2ff;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      }
    `,
  ],
})
export class PostListComponent {
  @Input() posts: Post[] = [];
}
