import React from "react"
import Loader from "react-loader-spinner"
import { UserModel } from "../../../services/user/model/user.model"
import ActionButton, { ActionTypes } from "../../shared/components/action-button"
import moment from 'moment-timezone'

interface UserTableProps {
  loading: boolean
  data: UserModel[]
  remove: (id: string) => void
  update: (id: string) => void
}

const UserTable = ({ data, loading, remove, update }: UserTableProps) => {
  const headers = ["Nome", "Sobrenome", "E-mail", "Data de Nascimento", "Ações"]
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
          : data?.map(user =>
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.birthDate ? moment.tz(user.birthDate, 'America/Sao_Paulo').format('DD/MM/YYYY') : ''}</td>
              <td className="actions">
                <ActionButton click={() => remove(user.id)} type={ActionTypes.delete} light />
                <ActionButton click={() => update(user.id)} type={ActionTypes.update} light />
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

export default UserTable