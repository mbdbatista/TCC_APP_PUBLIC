import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { ProfileModel } from '../../../services/profile/model/profile.model'
import profileService from '../../../services/profile/profile.service'
import { Input } from '../../shared/components'
import ProfileTable from '../components/listProfile/profileTable'
import '../styles/listProfilePage.scss'
import DeleteProfile from './deleteProfilePage'
import { FileUtils } from '../../../utils/file.utils'
import { toast } from 'react-toastify'

const ListProfilePage = () => {
  const { register, handleSubmit, errors, reset, clearErrors, getValues } = useForm()
  const { push } = useHistory()
  const [loading, setLoading] = useState(false)
  const [profiles, setProfiles] = useState<ProfileModel[]>([])
  const [remove, setRemove] = useState(false)
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    loadProfiles()
  }, [])


  const filter = async (form: Record<string, any>) => {
    const { name } = form
    loadProfiles(name)
  }

  const loadProfiles = async (name?: string) => {
    setLoading(true)
    try {
      const result = await profileService.listProfile({
        name: name ?? ''
      })
      if (result.data) {
        setProfiles(result.data)
      }
    } catch (error) {
      setProfiles([])
    } finally {
      setLoading(false)
    }
  }

  const clearFilter = () => {
    reset()
    clearErrors()
  }

  const addProfile = () => {
    push('/home/profile/create')
  }

  const deleteProfile = (id: string) => {
    setCurrentId(id)
    setRemove(true)
  }

  const updateProfile = (id: string) => {
    push(`/home/profile/${id}`)
  }

  const linkUsers = (id: string) => {
    push(`/home/profile/${id}/users`)
  }

  const exportProfile = async () => {
    const { name } = getValues()
    try {
      const result = await profileService.exportProfile({ name })
      if (result) {
        FileUtils.downloadFile('Perfis', result)
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao exportar os dados.')
    } 
  }

  return (
    <div className="list-profile">
      <div className="header mb-3">
        <h3>Lista de Perfis</h3>
        <button className="btn btn-dark" onClick={addProfile}>+</button>
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
        <button className="btn btn-light" onClick={exportProfile} type="button">Exportar</button>
        <ProfileTable
          data={profiles}
          loading={loading}
          linkUsers={linkUsers}
          update={updateProfile}
          remove={deleteProfile}
        ></ProfileTable>
      </div>
      <DeleteProfile
        id={currentId}
        show={remove}
        handleClose={(reload: boolean) => {
          setRemove(false)
          if (reload) {
            loadProfiles()
          }
        }}
      ></DeleteProfile>
    </div>
  )
}

export default ListProfilePage