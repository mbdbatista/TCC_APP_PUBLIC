import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import fishService from '../../../services/fish/fish.service'
import { Input, Checkbox } from '../../shared/components'
import SizeLine from '../components/sizeLine'
import '../styles/updateFishSpeciePage.scss'

interface ParamsProps { 
  id: string
}

interface SizeControlType {
  index: number
}

interface SizeType {
  size: number
  unitsPerMeter: number
}

const UpdateFishSpecie = () => {
  const { id } = useParams<ParamsProps>()
  const { push } = useHistory()
  const { register, errors, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [sizes, setSizes] = useState<SizeControlType[]>([{ index: 0 }])

  const getFishSpecie = useCallback(async () => {
    setLoading(true)
    try {
      const result = await fishService.findOneFishSpecie({ id })
      if (result && result.data) {
        setSizes(result.data.sizes.map((_, index) => ({ index: index})))
        reset({
          name: result.data.name,
          isCarnivore: result.data.carnivore,
          sizes: result.data.sizes
        })
      }
    } catch (error) {
      toast.error('Ocorreu um erro buscando a informação, tenta novamente!')
    }
    setLoading(false)
  }, [id, reset])

  useEffect(() => {
    getFishSpecie()
  }, [getFishSpecie])

  const handleCancel = () => {
    push('/home/fish')
  }

  const removeSize = () => {
    const length = sizes.length
    setSizes(sizes.slice(0, length - 1))
  }

  const addSize = () => {
    setSizes([...sizes, {
      index: sizes.length
    }])
  }

  const validateSizes = (sizes: SizeType[]) => {
    if (sizes && sizes.length > 0) {
      return true
    } else {
      toast.warning('É preciso possuir ao menos um tamanho.')
      return false
    }
  }

  const convertSizes = (sizes: any[]) => {
    if (!sizes) {
      return []
    }
    return sizes.map(item => {
      const { size, unitsPerMeter } = item
      return {
        size, unitsPerMeter
      } as SizeType
    })
  }

  const onSubmit = async (data: Record<string, any>) => {
    const { name, isCarnivore, sizes } = data
    const typedSizes = convertSizes(sizes)
    if (validateSizes(typedSizes)) {
      updateFishSpecie(name, isCarnivore ?? false, typedSizes)
    }
  }

  const updateFishSpecie = async (name: string, isCanivore: boolean, sizes: SizeType[]) => {
    setLoading(true)
    try {
      const result = await fishService.updateFishSpecie({
        id,
        carnivore: isCanivore,
        name: name,
        sizes: sizes
      }) 
      if (result && result.data) {
        setLoading(false)
        toast.dark('Espécie atualiada com sucesso!')
        push('/home/fish')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Infelizmente ocorreu um erro, tenta novamente!')
    }
  }

  return (
    <div className="update-fish-specie">
      <h3 className="mb-3">Atualizar Peixes</h3>
      <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <Input name="name" placeholder="Nome" register={() => register({ required: true })} errors={errors} className="col-md-6"></Input>
          <Checkbox
            label="Carnívoro ?"
            name="isCarnivore"
            register={() => register()}
            className="col-md-6"
          />
          <div className="size-form-header col-md-12">
            <h5>Tamanhos</h5>
          </div>
          <div className="sizes">
            {sizes.map(size =>
              <SizeLine
                index={size.index}
                remove={removeSize}
                register={() => register({ required: true })}
                handleclick={addSize}
                key={size.index}
                isLast={size.index === (sizes.length - 1)}
                errors={errors}></SizeLine>
            )}
          </div>
          <div className="actions col-md-12">
            <button className="btn btn-dark ml-3" disabled={loading}>{loading ? 'Confirmando ...' : 'Confirmar'}</button>
            <button className="btn btn-light" disabled={loading} onClick={handleCancel} type="button"> Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateFishSpecie