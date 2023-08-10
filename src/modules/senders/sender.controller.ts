import { NextFunction, Request, Response } from 'express'
import { createSender, getAllSenders, getSenderById, updateSender } from './sender.service'

export const obtenerTodosLosSenders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const senders = await getAllSenders()

    res.json(senders)
  } catch (error) {
    console.log('Error en obtenerTodosLosSenders: ', error)
    next(error)
  }
}

export const obtenerSenderPorId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const sender = await getSenderById(Number(id))

    res.json(sender)
  } catch (error) {
    console.log('Error en obtenerSenderPorId: ', error)
    next(error)
  }
}

export const crearSender = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const senderData = req.body
    const sender = await createSender(senderData)

    res.json(sender)
  } catch (error) {
    console.log('Error en crearSender: ', error)
    next(error)
  }
}

export const actualizarSender = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const senderData = req.body
    const sender = await updateSender(Number(id), senderData)

    res.json(sender)
  } catch (error) {
    console.log('Error en actualizarSender: ', error)
    next(error)
  }
}
