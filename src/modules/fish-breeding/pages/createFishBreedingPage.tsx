import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FishSizeModel, FishSpecieModel } from '../../../services/fish/model/fishSpecie.model'
import fishBreedingService from '../../../services/fishBreeding/fishBreeding.service'
import { PondModel } from '../../../services/pond/model/pond.model'
import { Input } from '../../shared/components'
import ListFishSpecie from '../components/listFishSpecies'
import ListPonds from '../components/listPonds'
import ListSizes from '../components/listSizes'
import '../styles/createFishBreeding.scss'

const CreateFishBreedingPage = () => {
  const { push } = useHistory()
  const { register, errors, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [fish, setFish] = useState<FishSpecieModel>()
  const [pond, setPond] = useState<PondModel>()
  const [sizes, setSizes] = useState<FishSizeModel[]>([])
  const [maxSize, setMaxSize] = useState<number>(0)

  const createFishBreeding = async (fishSpecie: string, pond: string, quantity: string) => {
    setLoading(true)
    try {
      const result = await fishBreedingService.createFishBreeding({
        fishSpecie,
        pond,
        quantity: Number(quantity),
        createdDate: new Date()
      })

      if (result && result.data) {
        setLoading(false)
        toast.dark('Criação iniciada com sucesso!')
        push('/home/fish-breeding')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro iniciando a criação, tenta novamente.')
    }
  }

  const onSubmit = (form: Record<string, any>) => {
    const { fishSpecie, pond, quantity } = form
    createFishBreeding(fishSpecie, pond, quantity)
  }

  const handleCancel = () => {
    push('/home/fish-breeding')
  }

  const onPondChange = (pond?: PondModel) => {
    setPond(pond)
  }

  const onFishChange = (fish?: FishSpecieModel) => {
    setFish(fish)
    if (fish) {
      setSizes(fish.sizes)
    }
  }

  const onSizeChange = (size?: FishSizeModel) => {
    if (!fish || !size || !pond) {
      setMaxSize(0)
      return
    }
    setMaxSize(size.unitsPerMeter * pond.meters)
  }

  return (
    <div className="create-fish-breeding">
      <h3 className="mb-3">Cadastro de Criação de Peixe</h3>
      <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <ListPonds name='pond' placeholder='Tanque' register={() => register({ required: true })} errors={errors} className="col-md-4" onChange={onPondChange}></ListPonds>
          <ListFishSpecie name='fishSpecie' placeholder='Espécie de Peixe' register={() => register({ required: true })} errors={errors} className="col-md-4" onChange={onFishChange}></ListFishSpecie>
          <ListSizes name='fishSize' placeholder='Espécie de Peixe' register={() => register({ required: true })} errors={errors} className="col-md-4" onChange={onSizeChange} data={sizes}></ListSizes>
          <div className="col-md-4">
            <Input name="quantity" placeholder="Quantidade" register={() => register({ required: true, max: maxSize })} errors={errors}></Input>
          </div>
          <div className="col-md-8">
            <label className="align-text-vertical">Quantidade máxima de alevinos: {maxSize}</label>
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

export default CreateFishBreedingPage