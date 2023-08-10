import { Router } from 'express'
import SessionService from './session.service'

const router = Router()

router.get('/', (_req, _res) => {
  SessionService.startClient('514111181431')
})

export default router
