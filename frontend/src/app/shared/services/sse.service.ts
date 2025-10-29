import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SseService {
  private eventSource!: EventSource;
  private subject = new Subject<any>();
  events$ = this.subject.asObservable();

  connect() {
    this.eventSource = new EventSource('http://localhost:4000/metrics/stream');
    this.eventSource.onmessage = e => this.subject.next(JSON.parse(e.data));
    this.eventSource.onerror = err => console.error('SSE error', err);
  }

  disconnect() {
    this.eventSource?.close();
  }
}
