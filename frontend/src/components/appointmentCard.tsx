'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { Appointment } from '@/types/appointment'
import { CreateProps } from '@/types/services/api/calendar'

import { Calendar } from '@/services/api/calendar'
import { Input } from '@/components/input'

import styles from '@/styles/components/appointmentCard.module.css'

interface Props {
  title: string
  type: 'create' | 'update'
  appointment?: Appointment
}

interface Errors {
  [key: string]: string
}

export default function AppointmentCard({ title, type, appointment }: Props) {
  const [errors, setErrors] = useState<Errors>({})

  const router = useRouter()

  const { register, handleSubmit} = useForm<CreateProps>({
    defaultValues: appointment
    ? 
    Object.fromEntries(Object.entries(appointment).filter(([k, v]) => !['id', 'createdAt', 'updatedAt'].includes(k)))
    :
    {}
  })

  const onSubmit: SubmitHandler<CreateProps> = async (data) => {
    const { error } = await (async () => {
      if (type === 'create') {
        return await Calendar.create(data)
      } else if (type === 'update' && appointment) {
        return await Calendar.update(appointment.id, data)
      }

      return { error: [] }
    })()

    if (error) {
      const formatedErrors: Errors = {}

      for (const err of error) {
        formatedErrors[err.context.key] = err.message
      }

      setErrors(formatedErrors)
      return
    }

    setErrors({})

    if (type === 'create') {
      router.push('/')
    } else if (type === 'update') {
      alert('Consulta atualizada com sucesso!')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.content}>
            <Input register={register} name="name" placeholder="Nome" error={errors.name} />
            <Input register={register} name="surname" placeholder="Sobrenome" error={errors.surname} />
            <Input register={register} name="email" placeholder="Email" type="email" error={errors.email} />
            <Input register={register} name="phone" placeholder="Telefone" error={errors.phone} />
            <Input register={register} name="date" placeholder="Data" error={errors.date} />
            <Input register={register} name="time" placeholder="Hora" error={errors.time} />
            <Input register={register} name="status" placeholder="Status" error={errors.status} />
            <Input register={register} name="doctor" placeholder="Médico" error={errors.doctor} />
            <Input register={register} name="clinic" placeholder="Consultório" type="number" error={errors.specialty} />
          </div>
          <button type="submit">{type === 'create' ? 'Cadastrar' : 'Atualizar'}</button>
        </form>
      </div>
    </div>
  )
}
