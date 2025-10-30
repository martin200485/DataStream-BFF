import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MetricsService } from '../../services/metrics.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, MatGridListModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  metrics: any = {};
  loading = true;

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.loadMetrics();
    setInterval(() => this.loadMetrics(), 5000); // cada 5s
  }

  loadMetrics() {
    this.metricsService.getMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
        this.loading = false;
      },
      error: (err) => console.error('Error cargando métricas', err)
    });
  }

  get(name: string): number {
    return this.metrics[name] ?? 0;
  }

  getMemoryMB(): number {
    return this.get('process_resident_memory_bytes') / 1024 / 1024;
  }

  getHeapUsagePercent(): number {
    const used = this.get('nodejs_heap_size_used_bytes');
    const total = this.get('nodejs_heap_size_total_bytes');
    return total ? (used / total) * 100 : 0;
  }
}
