import React from 'react'
import Loader from 'react-loader-spinner'
import { FishSpecieModel } from '../../../services/fish/model/fishSpecie.model'
import { ActionButton } from '../../shared/components'
import { ActionTypes } from '../../shared/components/action-button'

interface FishSpecieTableProps {
  loading: boolean
  data: FishSpecieModel[]
  remove: (id: string) => void
  update: (id: string) => void  
}

const FishSpecieTable = ({ data, loading, remove, update }: FishSpecieTableProps) => {
  const headers = ["Nome", "Carnívoro", "Ações"]
  const buildHeader = () => {
    return (
      <thead>
        <tr>
          {headers.map((header, position) => {
            const last = headers.length === position + 1
            return (
              <th key={header} className={last ? 'actions' : ''}>{header}</th>
            )
          })}
        </tr>
      </thead>
    )
  }

  const buildBody = () => {
    return (
      <tbody>
        { data?.length === 0
          ? <tr><td colSpan={headers.length} className="empty-table">Nenhum dado encontrado!</td></tr>
          : data?.map(fishSpecie =>
            <tr key={fishSpecie.id}>
              <td>{fishSpecie.name}</td>
              <td>{fishSpecie.carnivore ? 'Sim' : 'Não'}</td>
              <td className="actions">
                <ActionButton click={() => remove(fishSpecie.id)} type={ActionTypes.delete} light />
                <ActionButton click={() => update(fishSpecie.id)} type={ActionTypes.update} light />                
              </td>
            </tr>
          )}
      </tbody>
    )
  }

  const buildLoading = () => {
    return (
      <tbody className="loading">
        <tr>
          <td colSpan={headers.length}>
            <Loader
              type="Grid"
              visible={loading}
              height={60}
              width={60}
              color='#FFFFFF'>
            </Loader>
          </td>
        </tr>
      </tbody>
    )
  }
  return (
    <div className="table-scroll">
      <table className="table table-dark table-striped table-bordered">
        {buildHeader()}
        {loading
          ? buildLoading()
          : buildBody()
        }
      </table>
    </div>
  )
}

export default FishSpecieTable