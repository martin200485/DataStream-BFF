import express from 'express'
import { register } from '../monitoring/metrics'

// Endpoint /metrics para Prometheus
export const prometheusRouter = express.Router()

prometheusRouter.get('/monitors', async (_, res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})