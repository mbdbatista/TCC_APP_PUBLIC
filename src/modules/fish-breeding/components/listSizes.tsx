import { DeepMap, FieldError } from "react-hook-form"
import { FishSizeModel } from "../../../services/fish/model/fishSpecie.model"

interface SelectProps {
  name: string
  register: Function
  data: FishSizeModel[]
  placeholder?: string
  className?: string
  errors?: DeepMap<Record<string, any>, FieldError>
  disabled?: boolean
  onChange?: (size?: FishSizeModel) => void
}

const ListSizes = ({ register, name, placeholder, className, errors, disabled, data, onChange }: SelectProps) => {
  const renderOptions = () => {
    const internalData = data.map(e => ({ text: `${e.size}`, value: e.id }))
    internalData.unshift({
      text: 'Tamanhos',
      value: ''
    })

    return internalData.map(item => {
      return (
        <option value={item.value} key={item.value}>{item.text}</option>
      )
    })
  }

  const getCurrentOption = (event: HTMLSelectElement | undefined) => {
    if (!event){
      return
    }

    onChange && onChange(data.find(e => e.id === event.value))
  }

  const hasError = errors && errors[name]

  return (
    <div className={(className || '') + ' form-group select'}>
      <select
        className={(hasError ? 'error' : '') + ' form-control'}
        name={name}
        placeholder={placeholder ?? name}
        ref={register()}
        disabled={disabled}
        onChange={e => getCurrentOption(e.target)}
      >
        {renderOptions()}
      </select>
      {hasError && <small className="error-message">Campo obrigatório</small>}
    </div>
  )
}

export default ListSizes