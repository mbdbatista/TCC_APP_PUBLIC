import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import pondService from '../../../services/pond/pond.service'
import { Input } from '../../shared/components'
import '../styles/createPondPage.scss'

const CreatePondPage = () => {
  const { push } = useHistory()
  const { register, errors, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)

  const createPond = async (name: string, height: string, width: string, length: string) => {
    setLoading(true)
    try {
      const result = await pondService.createPond({
        name,
        height: parseFloat(height), 
        width: parseFloat(width), 
        length: parseFloat(length)
      })

      if (result && result.data) {
        setLoading(false)
        toast.dark('Tanque cadastrado com sucesso!')
        push('/home/pond')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro criando o tanque, tenta novamente.')
    }
  }

  const onSubmit = (form: Record<string, any>) => {
    const { name, height, width, length } = form
    createPond(name, height, width, length)
  }

  const handleCancel = () => {
    push('/home/pond')
  }

  return (
    <div className="create-pond">
      <h3 className="mb-3">Cadastro de Tanques</h3>
      <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <Input name="name" placeholder="Nome" register={() => register({ required: true })} errors={errors} className="col-md-12"></Input>
          <Input name="height" placeholder="Altura (Metro)" register={() => register({ required: true })} errors={errors} className="col-md-3" type="number"></Input>
          <Input name="width" placeholder="Largura (Metro)" register={() => register({ required: true })} errors={errors} className="col-md-3" type="number"></Input>
          <Input name="length" placeholder="Comprimento (Metro)" register={() => register({ required: true })} errors={errors} className="col-md-3" type="number"></Input>
          <div className="col-md-12">
            <button className="btn btn-dark ml-3" disabled={loading}>{loading ? 'Confirmando ...' : 'Confirmar'}</button>
            <button className="btn btn-light" disabled={loading} onClick={handleCancel} type="button"> Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePondPage