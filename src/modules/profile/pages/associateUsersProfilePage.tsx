import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import profileService from '../../../services/profile/profile.service'
import { UserModel } from '../../../services/user/model/user.model'
import userService from '../../../services/user/user.service'
import { Input } from '../../shared/components'
import CheckboxList, { CheckboxListModel } from '../../shared/components/checkbox-list'
import '../styles/associateUsersProfile.scss'
interface ParamsProp {
  id: string
}

const AssociateUsersProfilePage = () => {
  const { push, goBack } = useHistory()
  const { handleSubmit, register, reset } = useForm()
  const [users, setUsers] = useState<CheckboxListModel[]>([])
  const [previousSelected, setPreviousSelected] = useState<CheckboxListModel[]>([])
  const [selected, setSelected] = useState<CheckboxListModel[]>([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams<ParamsProp>()

  const mapUsers = useCallback((users: UserModel[]) => {
    return users.map(e => {
      return {
        label: `${e.firstName} ${e.lastName ?? ''}`,
        value: e.id
      }
    })
  }, [])
  const mapSelected = useCallback((users: UserModel[]) => {
    return users.filter(e => e.profile === id).map(e => {
      return {
        label: `${e.firstName} ${e.lastName ?? ''}`,
        value: e.id
      }
    })
  }, [id])

  const getProfile = useCallback(async () => {
    try {
      const profile = profileService.getProfile({ id })
      const users = userService.listUser({})
      const [profileResponse, userResponse] = await Promise.all([profile, users])
      if (profileResponse.data && userResponse.data) {
        setUsers(mapUsers(userResponse.data))
        setPreviousSelected(mapSelected(userResponse.data))
        reset({
          name: profileResponse.data.name
        })
      }
    } catch (error) {
      toast.error('Ocorreu um erro buscando os dados do seu perfil.')
    } finally {
      setLoading(false)
    }
  }, [id, reset, mapSelected, mapUsers])

  useEffect(() => {
    getProfile()
  }, [getProfile])

  const onSubmit = async (form: Record<string, any>) => {
    if (selected && selected.length > 0) {
      setLoading(true)
      try {
        const response = await profileService.associateUsers({
          id,
          users: selected.map(e => e.value)
        })
        if (response.data && response.data.success) {
          setLoading(false)
          push('/home/profile')
          toast.dark('Usuários associados com sucesso.')
        }
      } catch (error) {
        setLoading(false)
        toast.error('Occore um erro associando os usuários.')
      }
    } else {
      toast.warn('Selecione pelo menos uma pessoa para associar ao perfil.')
    }
  }

  const handleSelected = (selected: CheckboxListModel[]) => {
    setSelected(selected)
  }

  const handleCancel = () => {
    goBack()
  }

  return (
    <div className="associate-users-profile">
      <h3 className="mb-3">Associar Usuários</h3>
      <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <div className="col-md-12">
            <Input name="name" register={register} disabled={true} className="col-md-6"></Input>
            <CheckboxList
              className="col-md-6"
              notifyChange={handleSelected}
              values={users}
              previousSelected={previousSelected}
            ></CheckboxList>

            <button className="btn btn-dark ml-3" disabled={loading}>{loading ? 'Confirmando ...' : 'Confirmar'}</button>
            <button className="btn btn-light" disabled={loading} onClick={handleCancel} type="button"> Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AssociateUsersProfilePage