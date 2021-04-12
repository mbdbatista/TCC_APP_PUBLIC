import React, { useState } from 'react'
import { AxiosError } from 'axios'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../../../services/authentication/authentication.service'
import { Input } from '../../shared/components'
import '../styles/loginPage.scss'
import { toast } from 'react-toastify'
import userService from '../../../services/user/user.service'

export default function LoginPage() {
  const { register, handleSubmit, errors } = useForm()
  const [loading, setLoading] = useState(false)
  const { push } = useHistory()

  const onSubmit = async (form: Record<string, any>) => {
    setLoading(true)
    try {
      const { data } = await authService.login({
        username: form["email"],
        password: form["password"]
      })
      const tokenData = authService.decodeToken(data.accessToken)
      const userData = await userService.findOneUser({ id: tokenData.id, token: data.accessToken })
      if (data && userData) {
        authService.saveSession(data.accessToken, userData.data)
        setLoading(false)
        push('/home/dashboard')
      }
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.data) {
        toast.error('Usuário ou senha inválidos')
      }
      setLoading(false)
    }
  }

  const redirectToRegister = () => {
    push('/register')
  }

  return (
    <div className="login">
      <h2 className="title">Acesso</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Input type="email" name="email" register={() => register({
          required: true
        })} errors={errors} className="col-md-6"></Input>
        <Input type="password" name="password" register={() => register({
          required: true
        })} errors={errors} className="col-md-6"></Input>
        <div className="actions col-md-6">
          <button className="btn btn-link" type="button" onClick={redirectToRegister}> Registre-se</button>
          <button className="btn btn-dark" type="submit" disabled={loading}> {loading ? 'Carregando...' : 'Acessar'}</button>
        </div>
      </form>
    </div>
  )
}
