/* eslint-disable @typescript-eslint/no-extraneous-class */
import SocketIO from 'socket.io'
import { Server } from 'http'
import * as SocketController from './socket.controller'

class Socket {
  private static io: SocketIO.Server
  //
  private constructor () {

  }

  public static init (server: Server) {
    this.io = new SocketIO.Server(server)
    this.io.on('connection', async (socket) =>
      await SocketController.connect(socket, this.io)
    )
  }
}

export default Socket
