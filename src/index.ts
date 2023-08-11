/* eslint-disable @typescript-eslint/no-unused-vars */
import './alias'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimiterMiddleware } from './middlewares/rate_limiter'
import { handleErrorMiddleware } from './middlewares/error_handler'
import SocketIO from './socket'
import { createServer, Server } from 'http'
import logger from './helpers/logger'

// importing routes
import routes from './router'

// importing configs
import { settings } from './config/settings'
import { initSession } from '@modules/sessions/session.service'

class App {
  public app: express.Application
  public server: Server

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
    this.server = createServer(this.app)
  }

  middlewares () {
    this.app.use(morgan('[:date[iso]] (:status) ":method :url HTTP/:http-version" :response-time ms - [:res[content-length]]'))
    this.app.use(cors({ origin: '*' }))
    this.app.use(rateLimiterMiddleware)
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  routes () {
    this.app.use(routes)
    this.app.use(handleErrorMiddleware)
  }

  start () {
    this.app.listen(settings.PORT, () => {
      logger.info(`🚀 Server listen on port ${settings.PORT}`)
    })
  }
}

const app = new App()
app.start()
SocketIO.init(app.server)
initSession()
