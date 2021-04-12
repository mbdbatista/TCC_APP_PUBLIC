import React, { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import pondService from "../../../services/pond/pond.service"
import { Input } from "../../shared/components"
import '../styles/updatePondPage.scss'
interface ParamsProps {
  id: string
}

const UpdatePond = () => {
  const { id } = useParams<ParamsProps>()
  const { push } = useHistory()
  const { register, errors, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)  

  const getPond = useCallback(async () => {
    setLoading(true)
    try {
      const result = await pondService.findOnePond({ id })
      if (result && result.data) {        
        reset({
          name: result.data.name,
          height: result.data.height,
          width: result.data.width,
          length: result.data.length
        })
      }
    } catch (error) {
      toast.error('Ocorreu um erro buscando a informação, tenta novamente!')
    }
    setLoading(false)
  }, [id, reset])

  useEffect(() => {
    getPond()
  }, [getPond])

  const handleCancel = () => {
    push('/home/pond')
  }

  const updatePond = async (name: string, height: string, width: string, length: string) => {
    setLoading(true)
    try {
      const result = await pondService.updatePond({
        id: id,
        name,
        height: parseFloat(height), 
        width: parseFloat(width), 
        length: parseFloat(length)
      })

      if (result && result.data) {
        setLoading(false)
        toast.dark('Tanque atualizado com sucesso!')
        push('/home/pond')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro atualizando o tanque, tenta novamente.')
    }
  }

  const onSubmit = (form: Record<string, any>) => {
    const { name, height, width, length } = form
    updatePond(name, height, width, length)
  }

  return (
    <div className="update-pond">
      <h3 className="mb-3">Atualizar Tanque</h3>
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

export default UpdatePond