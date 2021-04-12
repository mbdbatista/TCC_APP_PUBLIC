import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import userService from '../../../services/user/user.service'
import { DateUtils } from '../../../utils/date.utils'
import { Input } from '../../shared/components'
import '../styles/createUserPage.scss'

const CreateUserPage = () => {
  const { push } = useHistory()
  const { register, errors, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)

  const createUser = async (name: string, lastName: string, email: string, birthdate: string, password: string) => {
    setLoading(true)
    try {
      const result = await userService.createUser({
        firstName: name,
        lastName,
        birthDate: DateUtils.stringToDate(birthdate),
        email,
        password
      })

      if (result && result.data) {
        setLoading(false)
        toast.dark('Usuário cadastrado com sucesso!')
        push('/home/user')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro criando o usuário, tenta novamente.')
    }
  }

  const onSubmit = (form: Record<string, any>) => {
    const { name, lastName, email, birthdate, password } = form
    createUser(name, lastName, email, birthdate, password)
  }

  const handleCancel = () => {
    push('/home/user')
  }

  return (
    <div className="create-user">
      <h3 className="mb-3">Cadastro de Usuário</h3>
      <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <Input name="name" placeholder="Nome" register={() => register({ required: true })} className="col-md-6" errors={errors}></Input>
          <Input name="lastName" placeholder="Sobrenome" register={() => register({ required: false })} className="col-md-6" errors={errors}></Input>
          <Input name="email" placeholder="E-mail" register={() => register({ required: true })} className="col-md-4" errors={errors}></Input>
          <Input name="birthdate" placeholder="Data de Nascimento" register={() => register({ required: true, validate: DateUtils.isValidDate })} type="date" className="col-md-4" errors={errors}></Input>
          <Input name="password" placeholder="Senha" register={() => register({ required: true })} type="password" className="col-md-4" errors={errors}></Input>
          <div className="col-md-12">
            <button className="btn btn-dark ml-3" disabled={loading}>{loading ? 'Confirmando ...' : 'Confirmar'}</button>
            <button className="btn btn-light" disabled={loading} onClick={handleCancel} type="button"> Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateUserPage