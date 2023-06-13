import { type Request, type Response } from 'express'

import { openDb } from '../../database'

export const remove = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const db = await openDb()

  await db.run('DELETE FROM calendar WHERE id = ?', [id])

  res.status(204).send()
}
