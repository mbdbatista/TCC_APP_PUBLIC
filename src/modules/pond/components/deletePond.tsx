import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import pondService from '../../../services/pond/pond.service'

interface DeletePondProps {
  id: string
  show: boolean
  handleClose: (shouldReload: boolean) => void
}

const DeletePond = ({ id, show, handleClose }: DeletePondProps) => {
  const [ loading, setLoading ] = useState(false)
  const deletePond = async () => {
    setLoading(true)
    try {
      const response = await pondService.deletePond({ id })
      if (response.data) {
        setLoading(false)
        toast.dark('Tanque excluído com sucesso.')
        handleClose(true)
      }
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro ao excluir esse tanque, tenta novamente.')
    }
  }

  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Espécie</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja mesmo excluir esse tanque? </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light" onClick={() => handleClose(false)}>Cancelar</button>
        <button className="btn btn-dark" onClick={deletePond} disabled={loading}> {loading ? 'Confirmando...' : 'Confirmar'} </button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeletePond