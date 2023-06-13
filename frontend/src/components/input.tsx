import { UseFormRegister, FieldValues, Path } from 'react-hook-form'

import styles from '@/styles/components/input.module.css'

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>
  name: Path<T>
  placeholder: string
  required?: boolean
  type?: string
  error: string
}

export const Input = <T extends FieldValues>({ register, name, placeholder, required, type, error }: InputProps<T>) => {
  return (
    <div className={styles.container}>
      <input {...register(name)} placeholder={placeholder} required={required || true} type={type || 'text'} />
      {error && <span>{error}</span>}
    </div>
  )
}