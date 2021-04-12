import React from 'react'
import { Radio } from '../../../shared/components'

interface ActionsTableProps {
  disabled: boolean
  register: Function
}

const ActionsTable = ({ disabled, register }: ActionsTableProps) => {
  const tableStyle = disabled ? 'actions-table disabled' : 'actions-table'
  const actions = [
    'home',
    'profile',
    'user',
    'fish',
    'fish-breeding',
    'pond'
  ]

  const buildRadioInline = (name: string) => {
    const items = [
      {
        text: 'Escrita',
        value: '1'
      },
      {
        text: 'Leitura',
        value: '2'
      },
      {
        text: 'Ambos',
        value: '0'
      }
    ]
    return (
      <Radio
        name={`actions.${name}`}
        register={register}
        values={items}
      ></Radio>
    )
  }
  const buildBody = () => {
    return (
      <tbody>
        {
          actions.map((action, index) =>
            <tr key={index}>
              <td>{action}</td>
              <td>
                {buildRadioInline(action)}
              </td>
            </tr>
          )
        }
      </tbody>
    )
  }


  return (
    <div className={`table-scroll ${tableStyle}`}>
      <table className='table table-dark table-striped table-bordered'>
        <thead>
          <tr>
            <th>Módulo da Aplicação</th>
            <th>Nível de acesso</th>
          </tr>
        </thead>

        {buildBody()}
      </table>
    </div>
  )
}

export default ActionsTable