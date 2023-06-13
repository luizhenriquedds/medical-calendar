import dotenv from 'dotenv'

import { appConfig } from './config'
import { createTables } from './database'

(async () => {
  dotenv.config()

  await createTables()

  const app = appConfig()

  const port = process.env.PORT ?? 8080

  app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
  })
})()
