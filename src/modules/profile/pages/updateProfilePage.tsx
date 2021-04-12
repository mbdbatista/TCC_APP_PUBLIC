import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { AccessType } from '../../../services/profile/model/profile.model'
import profileService from '../../../services/profile/profile.service'
import { Input } from '../../shared/components'
import ActionsTable from '../components/createProfile/actionsTable'
import '../styles/updateProfilePage.scss'

interface ParamsProps {
  id: string
}

const UpdateProfilePage = () => {
  const { handleSubmit, register, errors, reset, getValues } = useForm()
  const [loading, setLoading] = useState(true)
  const { push, goBack } = useHistory()
  const { id } = useParams<ParamsProps>()

  const getProfile = useCallback(async () => {
    try {
      const response = await profileService.getProfile({ id })
      if (response.data) {
        const actions = response.data.actions.reduce<{ [key: string]: AccessType }>((obj, item) => Object.assign(obj, { [item.route]: item.access }), {});
        reset({
          name: response.data.name,         
          actions: actions
        })
      }
    } catch (error) {
      toast.error('Ocorreu um erro buscando os dados do seu perfil.')
    }
    setLoading(false)
  }, [id, reset])

  useEffect(() => {
    getProfile()
  }, [getProfile])

  const onSubmit = async (form: Record<string, any>) => {
    const { name, actions } = form
    const validActions = validateActions(actions)
    if (validActions.length === 0) {
      toast.error('É necessário selecionar ao menos um acesso.')
      return
    }
    setLoading(true)
    try {
      const response = await profileService.updateProfile({
        id,
        name,
        actions: validActions.map(e => {
          return {
            route: e,
            access: Number(actions[e])
          }
        }),
        active: true
      })
      if (response.data) {
        toast.dark('Perfil atualizado com sucesso!')
        setLoading(false)
        push('/home/profile')
      }
    } catch (error) {
      setLoading(false)
      toast.warning('Ocorreu um problema atualizando o perfil, da uma conferida nos dados e tenta novamente.')
    }
  }

  const validateActions = (actions: any) => {
    const actionsSerialize = Object.getOwnPropertyNames(actions)
    const result = actionsSerialize.filter(e => actions[e])
    return result
  }


  const handleCancel = () => {
    goBack()
  }
  const isAdmin = getValues('isAdmin')
  return (
    <div className="update-profile">
      <h3 className="mb-3">Atualizar Perfil</h3>
      <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <Input name="name" placeholder="Nome" register={() => register({ required: true })} errors={errors} className="col-md-6"></Input>
          <div className="col-md-12">
            <ActionsTable disabled={isAdmin} register={() => register({ required: false })}></ActionsTable>
          </div>
          <div className="col-md-12">
            <button className="btn btn-dark ml-3" disabled={loading}>{loading ? 'Confirmando ...' : 'Confirmar'}</button>
            <button className="btn btn-light" disabled={loading} onClick={handleCancel} type="button"> Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfilePage