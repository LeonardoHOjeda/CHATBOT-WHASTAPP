import { NextFunction, Request, Response } from 'express'
import { getAllLatestMessages, getAllMessages, getAllMessagesByIdConversation } from './message.service'

export const obtenerTodosLosMensajes = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('Intento de obtener todos los mensajes')

    const mensajes = await getAllMessages()

    res.json(mensajes)
  } catch (error) {
    console.log('Error en obtenerTodosLosMensajes: ', error)
    next(error)
  }
}

export const obtenerTodosLosUltimosMensajes = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // const idConversation = req.params.idConversation
    const mensajes = await getAllLatestMessages()

    res.json(mensajes)
  } catch (error) {
    console.log('Error en obtenerTodosLosMensajesPorIdConversacion: ', error)
    next(error)
  }
}

export const obtenerTodosLosMensajesPorIdConversacion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idConversation = req.params.idConversation
    const mensajes = await getAllMessagesByIdConversation(Number(idConversation))

    res.json(mensajes)
  } catch (error) {
    console.log('Error en obtenerTodosLosMensajesPorIdConversacion: ', error)
    next(error)
  }
}
