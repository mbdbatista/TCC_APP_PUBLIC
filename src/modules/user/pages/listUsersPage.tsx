import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserModel } from '../../../services/user/model/user.model'
import userService from '../../../services/user/user.service'
import { FileUtils } from '../../../utils/file.utils'
import { Input } from '../../shared/components'
import DeleteUser from '../components/deleteUser'
import UserTable from '../components/userTable'
import '../styles/listUsersPage.scss'
const ListUsersPage = () => {
  const { push } = useHistory()
  const { register, handleSubmit, errors, reset, clearErrors, getValues } = useForm()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<UserModel[]>([])
  const [remove, setRemove] = useState(false)
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])


  const filter = async (form: Record<string, any>) => {
    const { name, email } = form
    loadUsers(name, email)
  }

  const loadUsers = async (name?: string, email?: string) => {
    setLoading(true)
    try {
      const result = await userService.listUser({
        name: name ?? '',
        email: email ?? ''
      })
      if (result.data) {
        setUsers(result.data)
      }
    } catch (error) {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const clearFilter = () => {
    reset()
    clearErrors()
  }

  const addUser = () => {
    push('/home/user/create')
  }

  const deleteUser = (id: string) => {
    setCurrentId(id)
    setRemove(true)
  }

  const updateUser = (id: string) => {
    push(`/home/user/${id}`)
  }

  const exportUser = async () => {
    const { name, email } = getValues()
    try {
      const result = await userService.exportUser({ name, email })
      if (result) {
        FileUtils.downloadFile('Usuários', result)
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao exportar os dados.')
    }
  }

  return (
    <div className="list-user">
      <div className="header mb-3">
        <h3>Lista de Usuários</h3>
        <button className="btn btn-dark" onClick={addUser}>+</button>
      </div>
      <div className="card no-padding">
        <div className="card-header">
          Filtro
        </div>
        <div className="card-body filter">
          <form onSubmit={handleSubmit(filter)}>
            <div className="row">
              <Input name="name" placeholder="Nome" register={() => register()} errors={errors} className="col-md-6"></Input>
              <Input name="email" placeholder="Email" register={() => register()} errors={errors} className="col-md-6"></Input>
            </div>
            <button className="btn btn-dark">Filtrar</button>
            <button className="btn btn-light" type="button" onClick={clearFilter}>Limpar</button>
          </form>
        </div>
      </div>
      <div className="mt-5">
        <button className="btn btn-light mb-1" onClick={exportUser} type="button">Exportar</button>
        <UserTable
          data={users}
          loading={loading}
          remove={deleteUser}
          update={updateUser}
        ></UserTable>
      </div>
      <DeleteUser
        id={currentId}
        show={remove}
        handleClose={(reload: boolean) => {
          setRemove(false)
          if (reload) {
            loadUsers()
          }
        }}
      ></DeleteUser>
    </div>
  )
}

export default ListUsersPage