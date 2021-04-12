import React from 'react'
import trash from '../../../assets/icons/trash.svg'
import pencil from '../../../assets/icons/pencil.svg'
import user from '../../../assets/icons/user.svg'

export enum ActionTypes {
  update,
  delete,
  user
}
interface ActionButtonProps {
  click: () => void
  type: ActionTypes
  light?: boolean
  className?: string
}

const ActionButton = ({ click, type, className, light = false }: ActionButtonProps) => {

  const mapTypeToIcon = () => {
    switch (type) {
      case ActionTypes.delete:
        return trash
      case ActionTypes.update:
        return pencil
      case ActionTypes.user:
        return user
    }
  }

  const customClass = light ? `btn btn-light` : 'btn btn-dark'
  const internalClass = className ? `${customClass} ${className}` : `${customClass}`
  return (
    <button className={internalClass} onClick={click}>
      <img src={mapTypeToIcon()} alt={type.toString()} />
    </button>
  )
}

export default ActionButton