import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import fishBreedingService from '../../../services/fishBreeding/fishBreeding.service'


interface UpdatefishBreedingProps {
  id: string
  show: boolean
  handleClose: (shouldReload: boolean) => void
}

const UpdateFishBreeding = ({ id, show, handleClose }: UpdatefishBreedingProps) => {
  const [ loading, setLoading ] = useState(false)
  const updateFishBreeding = async () => {
    setLoading(true)
    try {
      const response = await fishBreedingService.updateFishBreeding({ id })
      if (response.data) {
        setLoading(false)
        toast.dark('Criação de Peixe finalizada com sucesso.')
        handleClose(true)
      }
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro ao finalizar essa criação.')
    }
  }

  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Atualizar Criação de Peixe</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja mesmo encerrar essa criação ? </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light" onClick={() => handleClose(false)}>Cancelar</button>
        <button className="btn btn-dark" onClick={updateFishBreeding} disabled={loading}> {loading ? 'Confirmando...' : 'Confirmar'} </button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateFishBreeding