import { type Request, type Response } from 'express'
import Joi from 'joi'

import { openDb } from '../../database'

export const update = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  const db = await openDb()

  if (!(await db.get('SELECT * FROM calendar WHERE id = ?', [id]))) {
    res.status(404).send()
    return
  }

  const schema = Joi.object({
    name: Joi.string(),
    surname: Joi.string(),
    email: Joi.string().email().messages({
      'string.email': 'Email inválido'
    }),
    phone: Joi.string(),
    date: Joi.string(),
    time: Joi.string(),
    status: Joi.string(),
    doctor: Joi.string(),
    clinic: Joi.number()
  })

  const { value, error } = schema.validate(req.body)

  if (error) {
    res.status(400).json({
      error: error.details
    })
    return
  }

  if (!value) {
    res.status(400).json({
      message: 'Invalid request body'
    })
    return
  }

  const toUpdate: string[] = []
  const toUpdateValues: string[] = []

  for (const key in value) {
    const val = value[key]

    toUpdate.push(`${key} = ?`)
    toUpdateValues.push(val)
  }

  const now = new Date().toISOString()

  await db.run(
    `UPDATE calendar SET ${toUpdate.join(', ')}, updatedAt = ? WHERE id = ?`,
    [...toUpdateValues, now, id]
  )

  res.status(204).send()
}
