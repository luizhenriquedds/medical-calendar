'use client'

import { Appointment } from '@/types/appointment'
import styles from '@/styles/components/table.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from '@/services/api/calendar'

interface Props {
  appointments: Appointment[]
}

export const Table = ({ appointments }: Props) => {
  const handleDelete = async (id: string) => {
    await Calendar.delete(id)

    window.location.reload()
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Data</th>
          <th>Horário</th>
          <th>Status</th>
          <th>Doutor</th>
          <th>Consultório</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {appointments && appointments.map((appointment) => (
          <tr key={appointment.id}>
            <td>
              <Link href={`/${appointment.id}`}>
                {appointment.name}
              </Link>
            </td>
            <td>{appointment.surname}</td>
            <td>{appointment.email}</td>
            <td>{appointment.phone}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.status}</td>
            <td>{appointment.doctor}</td>
            <td>{appointment.clinic}</td>
            <td>
              <Image className={styles.trash} src="/trashcan.svg" width={25} height={25} alt="Lixeira" onClick={() => handleDelete(appointment.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}