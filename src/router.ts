import { Router } from 'express'
import sessionsRouter from '@modules/sessions/session.routes'
import dialogflowRouter from '@modules/dialogflow/dialogflow.routes'
import messagesRouter from '@modules/messages/messages.routes'
const router = Router()

// importing all routes here
router.use('/api/sessions', sessionsRouter)
router.use('/api/dialogflow', dialogflowRouter)
router.use('/api/messages', messagesRouter)

export default router
