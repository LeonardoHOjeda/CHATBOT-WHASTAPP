import { Router } from 'express'
import { sendDataToDialogFlow } from './dialogflow.service'

const router = Router()

router.post('/', async (req, _res) => {
  const { message, session } = req.body
  await sendDataToDialogFlow(message, session, null)
})

export default router
