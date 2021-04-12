import React from 'react'
import '../styles/radio.scss'
interface RadioProps {
  name: string
  values: { text: string, value: string }[]
  register: Function
}

const Radio = ({ values, name, register }: RadioProps) => {
  return (
    <div className="radio">
      {values?.map((item, index) => {
        const id = `${name}${index}`
        return (
          <div className="custom-control custom-radio custom-control-inline" key={id}>
            <input type="radio" id={id} name={name} className="custom-control-input" value={item.value} ref={register()}/>
            <label className="custom-control-label" htmlFor={id}>{item.text}</label>
          </div>
        )
      })}

    </div>
  )
}

export default Radio