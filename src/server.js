import express from 'express'
import apiRouter from './routes/index.js'
import { env } from './config/environment.js'
import { connectDB } from './config/database.js'

const app = express()
const port = 3000

app.use(express.json())
app.use('/', apiRouter)


connectDB()

app.get('/', (req, res) => {
  res.send('Hello world')
})


app.listen(port, () => {
  console.log(`Server is listening at ${env.SERVER_URI}${env.SERVER_PORT}`)
})
