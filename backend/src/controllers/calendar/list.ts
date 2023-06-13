import { type Request, type Response } from 'express'

import { openDb } from '../../database'

export const list = async (_req: Request, res: Response): Promise<void> => {
  const db = await openDb()

  const calendar = await db.all('SELECT * FROM calendar')

  res.json(calendar)
}
