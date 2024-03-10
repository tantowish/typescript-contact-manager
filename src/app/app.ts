import express from 'express'
import { publicRouter } from '../routes/public-api'
import { errorMiddleware } from '../middleware/error-middleware'

export const app = express()
app.use(express.json())

app.use(publicRouter)

app.use(errorMiddleware)