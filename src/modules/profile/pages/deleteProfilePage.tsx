import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import profileService from '../../../services/profile/profile.service'

interface DeleteProfileProps {
  id: string
  show: boolean
  handleClose: (shouldReload: boolean) => void
}

const DeleteProfile = ({ id, show, handleClose }: DeleteProfileProps) => {
  const [users, setUsers] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    loadUsersAffected()
  })
  const loadUsersAffected = async () => {
    const response = await profileService.findUsers({ id })
    if (response.data) {
      setUsers(response.data.total)
    }
  }

  const deleteUser = async () => {
    setLoading(true)
    try {
      const response = await profileService.deleteProfile({ id })
      if (response.data) {
        setLoading(false)
        toast.dark('Perfil excluído com sucesso.')
        handleClose(true)
      }
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro ao excluir esse perfil.')
    }
  }
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja mesmo excluir esse perfil ? {users} usuário(s) serão afetados.</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light" onClick={() => handleClose(false)}>Cancelar</button>
        <button className="btn btn-dark" onClick={deleteUser} disabled={loading}> {loading ? 'Confirmando...' : 'Confirmar'} </button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteProfile