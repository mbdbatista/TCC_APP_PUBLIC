
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FishBreedingModel } from '../../../services/fishBreeding/model/fishBreeding.model'
import { FileUtils } from '../../../utils/file.utils'
import FishBreedingTable from '../components/fishBreedingTable'
import ListFishSpecie from '../components/listFishSpecies'
import ListPonds from '../components/listPonds'
import fishBreedingService from '../../../services/fishBreeding/fishBreeding.service'
import '../styles/listFishBreedingPage.scss'
import UpdateFishBreeding from '../components/updateFishBreeding'

const ListFishBreedingPage = () => {
  const { push } = useHistory()
  const { register, handleSubmit, errors, reset, clearErrors, getValues } = useForm()
  const [loading, setLoading] = useState(false)
  const [fishBreedings, setFishBreedings] = useState<FishBreedingModel[]>([])
  const [update, setUpdate] = useState(false)
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    loadFishBreedings()
  }, [])

  const filter = async (form: Record<string, any>) => {
    const { fishSpecie, pond } = form
    loadFishBreedings(fishSpecie, pond)
  }

  const loadFishBreedings = async (fishSpecie?: string, pond?: string) => {
    setLoading(true)
    try {
      const result = await fishBreedingService.listFishBreeding({ fishSpecie, pond })
      if (result.data) {
        setFishBreedings(result.data)
      }
    } catch (error) {
      setFishBreedings([])
    } finally {
      setLoading(false)
    }
  }

  const clearFilter = () => {
    reset()
    clearErrors()
  }

  const addFishBreeding = () => {
    push('/home/fish-breeding/create')
  }

  const exportFishBreeding = async () => {
    const { fishSpecie, pond } = getValues()
    try {
      const result = await fishBreedingService.exportFishBreeding({ fishSpecie, pond })
      if (result) {
        FileUtils.downloadFile('Criações de Peixes', result)
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao exportar os dados.')
    }
  }

  const updateFishBreeding = (id: string) => {
    setCurrentId(id)
    setUpdate(true)
  }

  return (
    <div className="list-fish-breeding">
      <div className="header mb-3">
        <h3>Lista de Criações de Peixe</h3>
        <button className="btn btn-dark" onClick={addFishBreeding}>+</button>
      </div>
      <div className="card no-padding">
        <div className="card-header">
          Filtro
        </div>
        <div className="card-body filter">
          <form onSubmit={handleSubmit(filter)}>
            <div className="row">
              <ListFishSpecie name='fishSpecie' placeholder='Espécie de Peixe' register={() => register()} errors={errors} className="col-md-6"></ListFishSpecie>
              <ListPonds name='pond' placeholder='Tanque' register={() => register()} errors={errors} className="col-md-6"></ListPonds>
            </div>
            <button className="btn btn-dark">Filtrar</button>
            <button className="btn btn-light" type="button" onClick={clearFilter}>Limpar</button>
          </form>
        </div>
      </div>
      <div className="mt-5">
        <button className="btn btn-light" onClick={exportFishBreeding} type="button">Exportar</button>
        <FishBreedingTable
          data={fishBreedings}
          loading={loading}
          update={updateFishBreeding}
        ></FishBreedingTable>
      </div>
      <UpdateFishBreeding
        id={currentId}
        show={update}
        handleClose={(reload: boolean) => {
          setUpdate(false)
          if (reload) {
            loadFishBreedings()
          }
        }}
      ></UpdateFishBreeding>
    </div>
  )
}

export default ListFishBreedingPage