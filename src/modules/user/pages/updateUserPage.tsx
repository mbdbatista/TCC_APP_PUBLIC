import React, { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import userService from "../../../services/user/user.service"
import { DateFormat, DateUtils } from "../../../utils/date.utils"
import { Input } from "../../shared/components"
import '../styles/updateUserPage.scss'
interface ParamsProps {
  id: string
}

const UpdateUserPage = () => {
  const { id } = useParams<ParamsProps>()
  const { push } = useHistory()
  const { register, errors, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)

  const getUser = useCallback(async () => {
    setLoading(true)
    try {
      const result = await userService.findOneUser({ id })
      if (result && result.data) {
        reset({
          name: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          birthdate: result.data.birthDate ? DateUtils.formatDate(result.data.birthDate, DateFormat.englishDate) : ''
        })
      }
    } catch (error) {
      toast.error('Ocorreu um erro buscando a informação, tenta novamente!')
    }
    setLoading(false)
  }, [id, reset])

  useEffect(() => {
    getUser()
  }, [getUser])

  const handleCancel = () => {
    push('/home/user')
  }

  const updateUser = async (name: string, lastName: string, email: string, birthdate: string, password: string) => {
    setLoading(true)
    try {
      const result = await userService.updateUser({
        id: id,
        firstName: name,
        lastName,
        birthDate: DateUtils.stringToDate(birthdate),
        email,
        password
      })

      if (result && result.data) {
        setLoading(false)
        toast.dark('Usuário atualizado com sucesso!')
        push('/home/user')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro atualizando o usuário, tenta novamente.')
    }
  }

  const onSubmit = (form: Record<string, any>) => {
    const { name, lastName, email, birthdate, password } = form
    updateUser(name, lastName, email, birthdate, password)
  }

  return (
    <div className="update-user">
      <h3 className="mb-3">Atualizar Usuário</h3>
      <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <Input name="name" placeholder="Nome" register={() => register({ required: true })} className="col-md-6" errors={errors}></Input>
          <Input name="lastName" placeholder="Sobrenome" register={() => register({ required: false })} className="col-md-6" errors={errors}></Input>
          <Input name="email" placeholder="E-mail" register={() => register({ required: true })} className="col-md-4" errors={errors}></Input>
          <Input name="birthdate" placeholder="Data de Nascimento" register={() => register({ required: true, validate: DateUtils.isValidDate })} type="date" className="col-md-4" errors={errors}></Input>
          <div className="col-md-12">
            <button className="btn btn-dark ml-3" disabled={loading}>{loading ? 'Confirmando ...' : 'Confirmar'}</button>
            <button className="btn btn-light" disabled={loading} onClick={handleCancel} type="button"> Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateUserPage