import React, { useEffect, useState } from 'react'
import Input from './input'
import { useForm } from 'react-hook-form'
import '../styles/checkbox-list.scss'

export interface CheckboxListModel {
  value: any
  label: string
}
interface CheckboxListProps {
  values: CheckboxListModel[]
  previousSelected?: CheckboxListModel[]
  className?: string
  notifyChange?: (selected: CheckboxListModel[]) => void
}

const CheckboxList = ({ values, className, previousSelected, notifyChange }: CheckboxListProps) => {
  const [internalValues, setInternalValues] = useState(values)
  const [selected, setSelected] = useState<CheckboxListModel[]>(previousSelected ?? [])
  const { register, getValues } = useForm()

  useEffect(() => {
    setInternalValues(values)
    setSelected(previousSelected ?? [])
  }, [values, previousSelected])

  const filter = () => {
    const filter = getValues('filter') as string
    const newValues = values.filter(e => e.label.toLowerCase().includes(filter.toLowerCase()))
    setInternalValues(newValues)
  }

  const toogleItem = (item: CheckboxListModel) => {
    const previousItem = !!selected.find(e => e.value === item.value)
    if (previousItem) {
      const newValues = selected.filter(e => e.value !== item.value)
      setSelected(newValues)
      notifyChange && notifyChange(newValues)
    } else {
      const newValues = [...selected, item]
      setSelected(newValues)
      notifyChange && notifyChange(newValues)
    }
  }

  const buildList = () => {
    return internalValues.map((item, index) => {
      const customId = `CheckboxList${index}`
      const checked = !!selected.find(e => e.value === item.value)
      return (
        <div key={customId} className="custom-control custom-checkbox">
          <input type='checkbox' value={item.value} id={customId} onClick={() => toogleItem(item)} checked={checked} readOnly className="custom-control-input"></input>
          <label htmlFor={customId} className="custom-control-label">{item.label}</label>
        </div>
      )
    })
  }

  const customClass = className ? `checkbox-list ${className}` : 'checkbox-list'

  return (
    <div className={customClass}>
      <Input register={register} name="filter" placeholder="Filtro" onChange={filter}></Input>
      <div className="list-content">
        {buildList()}
      </div>
    </div>
  )
}

export default CheckboxList