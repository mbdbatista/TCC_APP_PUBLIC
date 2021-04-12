import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import fishService from '../../../services/fish/fish.service'
import { FishSpecieModel } from '../../../services/fish/model/fishSpecie.model'
import { FileUtils } from '../../../utils/file.utils'
import { Input } from '../../shared/components'
import FishSpecieTable from '../components/fishTable'
import DeleteFishSpecie from './deleteFishSpeciePage'
import '../styles/listFishSpeciePage.scss'

const ListFishSpeciesPage = () => {
  const { push } = useHistory()
  const { register, handleSubmit, errors, reset, clearErrors, getValues } = useForm()
  const [loading, setLoading] = useState(false)
  const [fishSpecies, setFishSpecies] = useState<FishSpecieModel[]>([])
  const [remove, setRemove] = useState(false)
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    loadFishSpecies()
  }, [])


  const filter = async (form: Record<string, any>) => {
    const { name } = form
    loadFishSpecies(name)
  }

  const loadFishSpecies = async (name?: string) => {
    setLoading(true)
    try {
      const result = await fishService.listFishSpecie({
        name: name ?? ''
      })
      if (result.data) {
        setFishSpecies(result.data)
      }
    } catch (error) {
      setFishSpecies([])
    } finally {
      setLoading(false)
    }
  }

  const clearFilter = () => {
    reset()
    clearErrors()
  }

  const addFishSpecie = () => {
    push('/home/fish/create')
  }

  const deleteFishSpecie = (id: string) => {
    setCurrentId(id)
    setRemove(true)
  }

  const updateFishSpecie = (id: string) => {
    push(`/home/fish/${id}`)
  }

  const exportFish = async () => {
    const { name } = getValues()
    try {
      const result = await fishService.exportFishSpecie({ name })
      if (result) {
        FileUtils.downloadFile('Espécies de Peixe', result)
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao exportar os dados.')
    } 
  }

  return (
    <div className="list-fish-specie">
      <div className="header mb-3">
        <h3>Lista de Espécies de Peixes</h3>
        <button className="btn btn-dark" onClick={addFishSpecie}>+</button>
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
      <button className="btn btn-light" onClick={exportFish} type="button">Exportar</button>
        <FishSpecieTable
          data={fishSpecies}
          loading={loading}
          remove={deleteFishSpecie}
          update={updateFishSpecie}
        ></FishSpecieTable>
      </div>
      <DeleteFishSpecie
        id={currentId}
        show={remove}
        handleClose={(reload: boolean) => {
          setRemove(false)
          if (reload) {
            loadFishSpecies()
          }
        }}
      ></DeleteFishSpecie>
    </div>
  )
}

export default ListFishSpeciesPage