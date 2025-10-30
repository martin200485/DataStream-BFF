import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private apiUrl = 'http://localhost:4000/metrics/monitors'; // cambiar por tu backend

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<any> {
    return this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
      map((rawData) => this.parsePrometheus(rawData))
    );
  }

  private parsePrometheus(data: string): Record<string, number> {
    const metrics: Record<string, number> = {};
    const lines = data.split('\n');
    for (const line of lines) {
      if (line.startsWith('#') || !line.trim()) continue;
      const [name, value] = line.split(' ');
      if (name && value) metrics[name.trim()] = Number(value.trim());
    }
    return metrics;
  }
}
