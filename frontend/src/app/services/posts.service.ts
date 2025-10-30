import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostResponse } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.baseUrl}/data`);
  }

  createPost(post: any): Observable<PostResponse> {
    return this.http.post<PostResponse>(`${this.baseUrl}/create`, post);
  }
}