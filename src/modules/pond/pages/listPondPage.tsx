import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PondModel } from '../../../services/pond/model/pond.model'
import pondService from '../../../services/pond/pond.service'
import { FileUtils } from '../../../utils/file.utils'
import { Input } from '../../shared/components'
import DeletePond from '../components/deletePond'
import PondTable from '../components/pondTable'
import '../styles/listPondPage.scss'

const ListPondPage = () => {
  const { push } = useHistory()
  const { register, handleSubmit, errors, reset, clearErrors, getValues } = useForm()
  const [loading, setLoading] = useState(false)
  const [ponds, setPonds] = useState<PondModel[]>([])
  const [remove, setRemove] = useState(false)
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    loadPonds()
  }, [])


  const filter = async (form: Record<string, any>) => {
    const { name } = form
    loadPonds(name)
  }

  const loadPonds = async (name?: string) => {
    setLoading(true)
    try {
      const result = await pondService.listPond({
        name: name ?? ''
      })
      if (result.data) {
        setPonds(result.data)
      }
    } catch (error) {
      setPonds([])
    } finally {
      setLoading(false)
    }
  }

  const clearFilter = () => {
    reset()
    clearErrors()
  }

  const addPond = () => {
    push('/home/pond/create')
  }

  const deletePond = (id: string) => {
    setCurrentId(id)
    setRemove(true)
  }

  const updatePond = (id: string) => {
    push(`/home/pond/${id}`)
  }

  const exportPond = async () => {
    const { name } = getValues()
    try {
      const result = await pondService.exportPond({ name })
      if (result) {
        FileUtils.downloadFile('Tanques', result)
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao exportar os dados.')
    }
  }

  return (
    <div className="list-pond">
      <div className="header mb-3">
        <h3>Lista Tanques</h3>
        <button className="btn btn-dark" onClick={addPond}>+</button>
      </div>
      <div className="card no-padding">
        <div className="card-header">
          Filtro
        </div>
        <div className="card-body filter">
          <form onSubmit={handleSubmit(filter)}>
            <Input name="name" placeholder="Nome" register={() => register()} errors={errors}></Input>
            <button className="btn btn-dark">Filtrar</button>
            <button className="btn btn-light" type="button" onClick={clearFilter}>Limpar</button>
          </form>
        </div>
      </div>
      <div className="mt-5">
        <button className="btn btn-light mb-1" onClick={exportPond} type="button">Exportar</button>
        <PondTable
          data={ponds}
          loading={loading}
          remove={deletePond}
          update={updatePond}
        ></PondTable>
      </div>  
      <DeletePond
        id={currentId}
        show={remove}
        handleClose={(reload: boolean) => {
          setRemove(false)
          if (reload) {
            loadPonds()
          }
        }}
      ></DeletePond>
    </div>
  )
}

export default ListPondPage