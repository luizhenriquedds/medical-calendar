import { type Request, type Response } from 'express'

import { openDb } from '../../database'

export const find = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  const db = await openDb()

  const calendar = await db.get('SELECT * FROM calendar WHERE id = ?', [id])

  if (!calendar) {
    res.status(404).send()
    return
  }

  res.json(calendar)
}
