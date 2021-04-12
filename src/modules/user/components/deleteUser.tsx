import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import userService from '../../../services/user/user.service'

interface DeleteUserProps {
  id: string
  show: boolean
  handleClose: (shouldReload: boolean) => void
}

const DeleteUser = ({ id, show, handleClose }: DeleteUserProps) => {
  const [ loading, setLoading ] = useState(false)
  const deleteUser = async () => {
    setLoading(true)
    try {
      const response = await userService.deleteUser({ id })
      if (response.data) {
        setLoading(false)
        toast.dark('Usuário excluído com sucesso.')
        handleClose(true)
      }
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro ao excluir esse usuário, tenta novamente.')
    }
  }

  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Espécie</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja mesmo excluir esse usuário? </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light" onClick={() => handleClose(false)}>Cancelar</button>
        <button className="btn btn-dark" onClick={deleteUser} disabled={loading}> {loading ? 'Confirmando...' : 'Confirmar'} </button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteUser