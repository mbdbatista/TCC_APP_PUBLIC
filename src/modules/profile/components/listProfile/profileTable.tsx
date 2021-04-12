import React from 'react'
import Loader from 'react-loader-spinner'
import { ProfileModel } from '../../../../services/profile/model/profile.model'
import { ActionButton } from '../../../shared/components'
import { ActionTypes } from '../../../shared/components/action-button'

interface ProfileTableProps {
  loading: boolean
  data: ProfileModel[]
  remove: (id: string) => void
  update: (id: string) => void
  linkUsers: (id: string) => void
}

const ProfileTable = ({ data, loading, remove, update, linkUsers }: ProfileTableProps) => {
  const headers = ["Nome", "Acessos", "Situação", "Ações"]
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
          ? <tr><td colSpan={4} className="empty-table">Nenhum dado encontrado!</td></tr>
          : data?.map(profile =>
            <tr key={profile.id}>
              <td>{profile.name}</td>
              <td>{profile.actions.length > 0 ? profile.actions.map(action => action.route).join(', ') : 'Acesso Liberado'}</td>
              <td>{profile.active ? 'Ativo' : 'Inativo'}</td>
              <td className="actions">
                <ActionButton click={() => remove(profile.id)} type={ActionTypes.delete} light />
                <ActionButton click={() => update(profile.id)} type={ActionTypes.update} light />
                <ActionButton click={() => linkUsers(profile.id)} type={ActionTypes.user} light />
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
          <td colSpan={4}>
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

export default ProfileTable