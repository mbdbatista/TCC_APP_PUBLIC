import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import userService from '../../../services/user/user.service'
import { DateUtils } from '../../../utils/date.utils'
import { Input } from '../../shared/components'
import { toast } from 'react-toastify'
import '../styles/registerPage.scss'
import { AxiosError } from 'axios'

export default function RegistrationPage() {
  const { push } = useHistory()
  const { register, handleSubmit, errors } = useForm()
  const [loading, setLoading] = useState(false)
  const onSubmit = async (form: Record<string, any>) => {
    const {
      name,
      lastName,
      email,
      birthdate,
      password,
      confirmPassword
    } = form
    if (!validatePasswords(password, confirmPassword))
      return
    setLoading(true)
    try {
      const { data } = await userService.createUser({
        firstName: name,
        lastName: lastName,
        birthDate: new Date(birthdate),
        email: email,
        password: password
      })
      setLoading(false)
      if (data) {
        toast.dark('Seu usuário já está pronto para acessar a aplicação!')
        push('/login')
      }
    } catch (error) {
      const axiosError = error as AxiosError
      const { data } = axiosError.response!
      if (data) {
        if (data.error.code === 'USR-001') {
          toast.error('Usuário já cadastrado.')
        } else {
          toast.error('Ocorreu erro ao registrar o usuário.')
        }
      }
      setLoading(false)
    }
  }

  const validatePasswords = (password: string, confirmPassword: string): boolean => {
    const isValid = password === confirmPassword
    if (!isValid) {
      toast.warning('As senhas não estão iguais, da uma conferida pra gente continuar.')
    }
    return isValid
  }

  return (
    <div className="register">
      <h2 className="title">Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form row">
          <Input name="name" placeholder="Nome" register={() => register({ required: true })} className="col-lg-6" errors={errors}></Input>
          <Input name="lastName" placeholder="Sobrenome" register={() => register({ required: false })} className="col-lg-6" errors={errors}></Input>
          <Input name="email" placeholder="E-mail" register={() => register({ required: true })} className="col-lg-6" errors={errors}></Input>
          <Input name="birthdate" placeholder="Data de Nascimento" register={() => register({ required: true, validate: DateUtils.isValidDate })} type="date" className="col-lg-6" errors={errors}></Input>
          <Input name="password" placeholder="Senha" register={() => register({ required: true })} type="password" className="col-lg-6" errors={errors}></Input>
          <Input name="confirmPassword" placeholder="Confirmar Senha" register={() => register({ required: true })} type="password" className="col-lg-6" errors={errors}></Input>
        </div>
        <div className="actions col-md-12">
          <button className="btn btn-dark" type="submit" disabled={loading}>{loading ? 'Carregando...' : 'Registrar'}</button>
        </div>
      </form>
    </div>
  )
}