import client from 'prom-client'

export const register = new client.Registry()

// Métricas estándar del runtime de Node
client.collectDefaultMetrics({ register })

// Métricas personalizadas
export const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Cantidad total de requests HTTP',
  labelNames: ['method', 'route', 'status'],
})

export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duración de las requests HTTP en segundos',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
})


