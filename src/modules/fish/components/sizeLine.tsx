import React from 'react'
import { DeepMap, FieldError, FieldValues } from 'react-hook-form'
import { ActionButton, Input } from '../../shared/components'
import { ActionTypes } from '../../shared/components/action-button'

interface SizeLineProps {
  index: number
  register: Function
  errors: DeepMap<FieldValues, FieldError>
  isLast?: boolean
  remove: (index: number) => void
  handleclick: () => void
}

const SizeLine = ({ index, register, errors, isLast, remove, handleclick }: SizeLineProps) => {
  const lastItem = isLast ?? false
  const firstItem = index === 0
  return (
    <div className='size-line'>
      <Input name={`sizes[${index}].size`} placeholder="Tamanho (CM)" register={register} className="col-md-3" errors={errors} type="number"></Input>
      <Input name={`sizes[${index}].unitsPerMeter`} placeholder="Unidades por metro³" register={register} className="col-md-3" errors={errors} type="number"></Input>
      <div className="actions">
        {!firstItem && <ActionButton click={() => remove(index)} className="remove" light type={ActionTypes.delete}></ActionButton>}
        {lastItem && <button className="btn btn-light" type="button" onClick={handleclick}>+</button>}
      </div>
    </div>
  )
}

export default SizeLine
