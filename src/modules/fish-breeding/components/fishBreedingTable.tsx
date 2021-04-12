import React from 'react'
import Loader from 'react-loader-spinner'
import { FishBreedingModel } from '../../../services/fishBreeding/model/fishBreeding.model'
import { DateFormat, DateUtils } from '../../../utils/date.utils'
import { ActionButton } from '../../shared/components'
import { ActionTypes } from '../../shared/components/action-button'

interface FishBreedingTableProps {
  loading: boolean
  data: FishBreedingModel[]
  update: (id: string) => void
}

const FishBreedingTable = ({ data, loading, update }: FishBreedingTableProps) => {
  const headers = ["Espécie de Peixe", "Tanque", "Quantidade", "Data de Criação", "Data de Finalização", "Ações"]
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
          : data?.map(fishBreeding =>
            <tr key={fishBreeding.id}>
              <td>{fishBreeding.fishSpecie.name}</td>
              <td>{fishBreeding.pond.name}</td>
              <td>{fishBreeding.quantity}</td>
              <td>{DateUtils.formatDate(fishBreeding.createdDate, DateFormat.datetime)}</td>
              <td>{
                fishBreeding.endDate
                  ? DateUtils.formatDate(fishBreeding.endDate, DateFormat.datetime)
                  : ''
              }</td>
              <td className="actions">
                {!fishBreeding.endDate && <ActionButton click={() => update(fishBreeding.id)} type={ActionTypes.update} light />}
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
      <table className="table table-dark table-striped table-bordered mt-1">
        {buildHeader()}
        {loading
          ? buildLoading()
          : buildBody()
        }
      </table>
    </div>
  )
}

export default FishBreedingTable