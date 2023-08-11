import { Server, Socket } from 'socket.io'

export const connect = async (socket: Socket, _io: Server) => {
  console.log('🔗 New Connection: ' + socket.id)
}
