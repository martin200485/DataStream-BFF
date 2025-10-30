import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  

  constructor(private snackBar: MatSnackBar) {}

  notify(post: Post) {
    this.snackBar.open(`🆕 ${post.title}`, 'Ver', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
