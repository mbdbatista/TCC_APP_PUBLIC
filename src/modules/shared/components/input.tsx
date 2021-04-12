import { DeepMap, FieldError } from 'react-hook-form'
import '../styles/input.scss'

interface InputProps {
  type?: string
  register: Function
  name: string
  placeholder?: string
  className?: string
  errors?: DeepMap<Record<string, any>, FieldError>
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Input = ({ type = "text", register, name, placeholder, className, errors, disabled, onChange }: InputProps) => {

  const handleErrors = () => {
    const [internalName] = name.split('[')
    const hasError = errors && errors[internalName]
    if (hasError instanceof Array) {
      const matches = name.match(/\[(.*?)\]/);
      if (matches) {
        const index = Number(matches[1])
        return hasError[index]
      }
    } else { 
      return hasError
    }
  }
  const hasError = handleErrors()
  return (
    <div className={(className || '') + ' form-group input'}>
      <input type={type} className={(hasError ? 'error' : '') + ' form-control'} name={name} placeholder={placeholder ?? name} ref={register()} disabled={disabled} onChange={onChange}/>
      {hasError && <small className="error-message">Campo obrigatório</small>}
    </div>
  )
}
export default Input