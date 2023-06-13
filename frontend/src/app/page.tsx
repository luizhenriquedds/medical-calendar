import Link from 'next/link'

import styles from '@/styles/pages/home.module.css'
import { Table } from '@/components/table'
import { Calendar } from '@/services/api/calendar'

export default async function Home() {
  const { data } = await Calendar.list()

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.header}>
            <h1>Agenda de consultas</h1>
          </div>
          <div className={styles.options}>
            <Link href="/cadastro">
              <button className={styles.add_button}>Adicionar</button>
            </Link>
          </div>
          <div className={styles.content}>
            <Table appointments={data || []} />
          </div>
        </div>
      </div>
    </main>
  )
}
