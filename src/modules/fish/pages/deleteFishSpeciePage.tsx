import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import fishService from '../../../services/fish/fish.service'

interface DeleteFishSpecieProps {
  id: string
  show: boolean
  handleClose: (shouldReload: boolean) => void
}

const DeleteFishSpecie = ({ id, show, handleClose }: DeleteFishSpecieProps) => {
  const [ loading, setLoading ] = useState(false)
  const deleteFishSpecie = async () => {
    setLoading(true)
    try {
      const response = await fishService.deleteFishSpecie({ id })
      if (response.data) {
        setLoading(false)
        toast.dark('Espécie excluída com sucesso.')
        handleClose(true)
      }
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro ao excluir essa espécie.')
    }
  }

  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Espécie</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja mesmo excluir essa espécie ? </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light" onClick={() => handleClose(false)}>Cancelar</button>
        <button className="btn btn-dark" onClick={deleteFishSpecie} disabled={loading}> {loading ? 'Confirmando...' : 'Confirmar'} </button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteFishSpecie