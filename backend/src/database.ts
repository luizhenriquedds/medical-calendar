import sqlite3 from 'sqlite3'
import { open, type Database } from 'sqlite'

export const openDb = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
  return await open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}

export const createTables = async (): Promise<void> => {
  const db = await openDb()
  await db.exec(`
    CREATE TABLE IF NOT EXISTS calendar (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      status TEXT NOT NULL,
      doctor TEXT NOT NULL,
      clinic INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `)
  await db.close()
}
