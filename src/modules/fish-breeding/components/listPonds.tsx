import React from 'react'
import { useCallback, useEffect, useState } from "react";
import { DeepMap, FieldError } from "react-hook-form";
import { PondModel } from '../../../services/pond/model/pond.model';
import pondService from '../../../services/pond/pond.service';

interface SelectProps {
  name: string
  register: Function
  placeholder?: string
  className?: string
  errors?: DeepMap<Record<string, any>, FieldError>
  disabled?: boolean
  onChange?: (pond?: PondModel) => void
}

const ListPonds = ({ register, name, placeholder, className, errors, disabled, onChange }: SelectProps) => {
  const [loading, setLoading] = useState(false)
  const [ponds, setPonds] = useState<PondModel[]>([])

  const loadFishSpecies = useCallback(async () => {
    setLoading(true)
    try {
      const result = await pondService.listPond({})
      if (result && result.data) {
        setPonds(result.data)
      }
    } catch (error) {
      setPonds([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFishSpecies()
  }, [loadFishSpecies])

  const renderOptions = () => {
    const internalData = ponds.map(e => ({ text: e.name, value: e.id }))
    internalData.unshift({
      text: 'Tanques',
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

    onChange && onChange(ponds.find(e => e.id === event.value))
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
        {!loading && renderOptions()}
      </select>
      {hasError && <small className="error-message">Campo obrigatório</small>}
    </div>
  )
}

export default ListPonds

