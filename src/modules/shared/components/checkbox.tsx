import React from 'react'
import { DeepMap, FieldError } from 'react-hook-form'
import '../styles/checkbox.scss'
interface CheckboxProps {
  register: Function
  label: string
  name: string
  id?: string
  className?: string
  errors?: DeepMap<Record<string, any>, FieldError>
}

const Checkbox = ({ className, register, label, name, id, errors }: CheckboxProps) => {
  const customClass = className ? `checkbox custom-control custom-checkbox ${className}` : 'custom-control custom-checkbox'
  const internalId = id || name
  const hasError = errors && errors[name]
  return (
    <div className={customClass}>
      <input type="checkbox" name={name} id={internalId} ref={register()} className="custom-control-input" />
      <label className="custom-control-label" htmlFor={internalId}> {label}</label>
      {hasError && <small className="error-message">Campo obrigatório</small>}
    </div>
  )
}

export default Checkbox