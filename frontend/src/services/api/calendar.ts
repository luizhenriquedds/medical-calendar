import axios, { AxiosError, isAxiosError } from 'axios'

import { Appointment } from '@/types/appointment'
import { CreateProps, UpdateProps, CalendarResponse } from '@/types/services/api/calendar'

const api = axios.create({
  baseURL: `${process.env.API_URL}/calendar`,
})

export class Calendar {
  static async list(): Promise<CalendarResponse<Appointment[]>> {
    try {
      const { data } = await api.get('')

      return {
        data
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          error: error.response?.data.error
        }
      } else {
        return {}
      }
    }
  }

  static async create(params: CreateProps): Promise<CalendarResponse<void>> {
    try {
      await api.post('', params)

      return {}
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          error: error.response?.data.error
        }
      } else {
        return {}
      }
    }
  }

  static async get(id: string): Promise<CalendarResponse<Appointment>> {
    try {
      const { data } = await api.get(`/${id}`)

      return {
        data
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          error: error.response?.data.error
        }
      } else {
        return {}
      }
    }
  }

  static async update(id: string, params: UpdateProps): Promise<CalendarResponse<void>> {
    try {
      await api.put(`/${id}`, params)

      return {}
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          error: error.response?.data.error
        }
      } else {
        return {
          error: 'Erro ao atualizar o agendamento' as any
        }
      }
    }
  }

  static async delete(id: string): Promise<CalendarResponse<void>> {
    try {
      await api.delete(`/${id}`)

      return {}
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          error: error.response?.data.error
        }
      } else {
        return {}
      }
    }
  }
}
