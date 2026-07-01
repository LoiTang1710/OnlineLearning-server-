import express from 'express'
import authRoute from '../features/auth/auth.route.js'
import courseRoute from '../features/courses/course.route.js'


const apiRouter = express.Router()

apiRouter.use('/', authRoute)
apiRouter.use('/course', courseRoute)

export default apiRouter
