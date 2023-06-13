import { Appointment } from '@/types/appointment'
import { AxiosError } from 'axios'

export interface CreateProps {
  name: string
  surname: string
  email: string
  phone: string
  date: string
  time: string
  status: string
  doctor: string
  clinic: number
}

export interface UpdateProps extends Partial<CreateProps> {}

interface ApiError {
  message: string
  type: string
  context: {
    key: string
    label: string
    value: string
    invalids: string[]
  }
  path: string[]
}

export interface CalendarResponse<T> {
  data?: T
  error?: ApiError[]
}
