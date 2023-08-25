// import { Socket } from 'socket.io'

export const mensajeRecibido = async (payload: string) => {
  console.log(`🔗 New message:  ${payload}`)
}

export const mensajeLeido = async (payload: string) => {
  console.log(`🔗 New read:  ${payload}`)
}
