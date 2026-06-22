import express from 'express'
import { SQL } from './config/database.js'

const app = express()
const port = 3000

app.use(express.json())

SQL.connectDB()

app.get('/', (req, res) => {
  res.send('Hello world')
})


app.listen(port, () => {
  console.log(`Server is listening at ${port}`)
})
