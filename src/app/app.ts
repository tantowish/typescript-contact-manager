import express from 'express'
import { Response, Request } from 'express'
import { publicRouter } from '../routes/public-api'
import { errorMiddleware } from '../middleware/error-middleware'
import dotenv from "dotenv"
import { apiRouter } from '../routes/api'

dotenv.config()

export const app = express()
const port = process.env.PORT

app.use(express.json())

app.get('/api', (req:Request, res: Response)=>{
    res.json({"message": "hello"})
})

app.use(publicRouter)

app.use(apiRouter)

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
})