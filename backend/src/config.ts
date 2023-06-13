import express, { type Application } from 'express'
import cors from 'cors'

import { router } from './routes'

export const appConfig = (): Application => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(router)

  return app
}
