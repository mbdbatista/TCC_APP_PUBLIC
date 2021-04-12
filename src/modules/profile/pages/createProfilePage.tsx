import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import profileService from '../../../services/profile/profile.service'
import { Input } from '../../shared/components'
import ActionsTable from '../components/createProfile/actionsTable'
import '../styles/createProfilePage.scss'

const CreateProfilePage = () => {
  const { push, goBack } = useHistory()
  const { register, errors, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const onSubmit = (data: Record<string, any>) => {
    const { name, actions } = data
    createProfile(name, actions)
  }

  const createProfile = async (name: string, actions: any) => {
    const validActions = validateActions(actions)
    if (validActions.length === 0) {
      toast.error('É necessário selecionar ao menos um acesso.')
      return
    }
    setLoading(true)
    try {
      const response = await profileService.createProfile({
        name,
        actions: validActions.map(e => {
          return {
            route: e,
            access: Number(actions[e])
          }
        })
      })
      if (response.data) {
        toast.dark('Perfil criado com sucesso!')
        setLoading(false)
        push('/home/profile')
      }
    } catch (error) {
      setLoading(false)
      toast.warning('Ocorreu um problema criando o perfil, da uma conferida nos dados e tenta novamente.')
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

  return (
    <div className="create-profile">
      <h3 className="mb-3">Cadastro de Perfil</h3>
      <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <Input name="name" placeholder="Nome" register={() => register({ required: true })} errors={errors} className="col-md-6"></Input>
          <div className="col-md-12">
            <ActionsTable disabled={loading} register={() => register({ required: false })}></ActionsTable>
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

export default CreateProfilePage
