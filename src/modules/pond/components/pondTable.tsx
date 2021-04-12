import React from "react"
import Loader from "react-loader-spinner"
import { PondModel } from "../../../services/pond/model/pond.model"
import ActionButton, { ActionTypes } from "../../shared/components/action-button"

interface PondTableProps {
  loading: boolean
  data: PondModel[]
  remove: (id: string) => void
  update: (id: string) => void
}

const PondTable = ({ data, loading, remove, update }: PondTableProps) => {
  const headers = ["Nome", "Altura", "Largura", "Comprimento", "Metros Cúbicos", "Ações"]
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
          : data?.map(pond =>
            <tr key={pond.id}>
              <td>{pond.name}</td>
              <td>{pond.height}</td>
              <td>{pond.width}</td>
              <td>{pond.length}</td>
              <td>{pond.meters}</td>
              <td className="actions">
                <ActionButton click={() => remove(pond.id)} type={ActionTypes.delete} light />
                <ActionButton click={() => update(pond.id)} type={ActionTypes.update} light />
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

export default PondTable