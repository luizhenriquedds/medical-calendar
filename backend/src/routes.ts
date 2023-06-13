import { Router } from 'express'

import controllers from './controllers'

export const router = Router()

router.get('/calendar', controllers.calendar.list)

router.post('/calendar', controllers.calendar.create)

router.get('/calendar/:id', controllers.calendar.find)

router.put('/calendar/:id', controllers.calendar.update)

router.delete('/calendar/:id', controllers.calendar.remove)
