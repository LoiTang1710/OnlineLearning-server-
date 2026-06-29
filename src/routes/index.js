import express from 'express'
import authRoute from '../features/auth/auth.route.js'


const apiRouter = express.Router()

apiRouter.use('/', authRoute)

export default apiRouter
