import React from 'react'
import { useCallback, useEffect, useState } from "react";
import { DeepMap, FieldError } from "react-hook-form";
import fishService from "../../../services/fish/fish.service";
import { FishSpecieModel } from "../../../services/fish/model/fishSpecie.model";

interface SelectProps {
  name: string
  register: Function
  placeholder?: string
  className?: string
  errors?: DeepMap<Record<string, any>, FieldError>
  disabled?: boolean
  onChange?: (fish?: FishSpecieModel) => void
}

const ListFishSpecie = ({ register, name, placeholder, className, errors, disabled, onChange }: SelectProps) => {
  const [loading, setLoading] = useState(false)
  const [fishSpecies, setFishSpecies] = useState<FishSpecieModel[]>([])

  const loadFishSpecies = useCallback(async () => {
    setLoading(true)
    try {
      const result = await fishService.listFishSpecie({})
      if (result && result.data) {
        setFishSpecies(result.data)
      }
    } catch (error) {
      setFishSpecies([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFishSpecies()
  }, [loadFishSpecies])

  const renderOptions = () => {
    const internalData = fishSpecies.map(e => ({ text: e.name, value: e.id }))
    internalData.unshift({
      text: 'Espécie de Peixes',
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

    onChange && onChange(fishSpecies.find(e => e.id === event.value))
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

export default ListFishSpecie

