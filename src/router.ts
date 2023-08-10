import { Router } from 'express'
import sessionsRouter from '@modules/sessions/session.routes'
import dialogflowRouter from '@modules/dialogflow/dialogflow.routes'
const router = Router()

// importing all routes here
router.use('/api/sessions', sessionsRouter)
router.use('/api/dialogflow', dialogflowRouter)

export default router
