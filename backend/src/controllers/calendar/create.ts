import { type Request, type Response } from 'express'
import Joi from 'joi'
import { v4 as uuidv4 } from 'uuid'

import { openDb } from '../../database'

export const create = async (req: Request, res: Response): Promise<void> => {
  const db = await openDb()

  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Nome é obrigatório'
    }),
    surname: Joi.string().required().messages({
      'string.empty': 'Sobrenome é obrigatório'
    }),
    email: Joi.string().required().email().messages({
      'string.email': 'Email inválido',
      'string.empty': 'Email é obrigatório'
    }),
    phone: Joi.string().required().messages({
      'string.empty': 'Telefone é obrigatório'
    }),
    date: Joi.string().required().messages({
      'string.empty': 'Data é obrigatória'
    }),
    time: Joi.string().required().messages({
      'string.empty': 'Horário é obrigatório'
    }),
    status: Joi.string().required().messages({
      'string.empty': 'Status é obrigatório'
    }),
    doctor: Joi.string().required().messages({
      'string.empty': 'Médico é obrigatório'
    }),
    clinic: Joi.number().required().messages({
      'string.empty': 'Clínica é obrigatória'
    })
  })

  const { value, error } = schema.validate(req.body)

  if (error) {
    res.status(400).json({
      error: error.details
    })
    return
  }

  const { name, surname, email, phone, date, time, status, doctor, clinic } = value

  const id = uuidv4()

  const now = new Date().toISOString()

  try {
    await db.run(
      'INSERT INTO calendar (id, name, surname, email, phone, date, time, status, doctor, clinic, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, surname, email, phone, date, time, status, doctor, clinic, now, now]
    )

    res.status(201).send()
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error
    })
  }
}
