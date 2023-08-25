import { Router } from 'express'
import { obtenerTodosLosMensajes, obtenerTodosLosMensajesPorIdConversacion, obtenerTodosLosUltimosMensajes } from './message.controller'

const router = Router()

router.get('/', obtenerTodosLosMensajes)
router.get('/ultimos-mensajes', obtenerTodosLosUltimosMensajes)
router.get('/:idConversation', obtenerTodosLosMensajesPorIdConversacion)

export default router
