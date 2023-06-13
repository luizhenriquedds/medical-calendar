import { redirect } from 'next/navigation'

import AppointmentCard from '@/components/appointmentCard'
import { Calendar } from '@/services/api/calendar'

interface Props {
  params: {
    id: string
  }
}

export default async function Item({ params }: Props) {
  const { data, error } = await Calendar.get(params.id)

  if (error || !data) {
    redirect('/')
  }

  return (
    <AppointmentCard title='Atualizar consulta' type='update' appointment={data} />
  )
}
 