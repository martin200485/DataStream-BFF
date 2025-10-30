import { Component } from '@angular/core';
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { PostComponent } from './views/post/post.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent, PostComponent],
  template: `
    <app-dashboard></app-dashboard>
    <app-post></app-post>
  `
})
export class AppComponent {
  
}
