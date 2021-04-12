import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { Link, useHistory, useLocation } from 'react-router-dom'
import authService from '../../../services/authentication/authentication.service'
import { SocialTypes } from '../models/socialTypesEnum'
import errorIcon from '../../../assets/icons/error_icon.svg'
import '../styles/socialPage.scss'
import userService from '../../../services/user/user.service'

const SocialPage = () => {
  const { search } = useLocation()
  const { push } = useHistory()
  const [loading, setLoading] = useState(search.includes("code"))
  const [error, setError] = useState(!search.includes("code"))

  useEffect(() => {
    if (!error) {
      const params = getParams(search)
      const registerSocialLogin = async ({ type, code }: { type: SocialTypes, code: string }) => {
        try {
          const { data } = await authService.registerSocialLogin({ type, code })
          const tokenData = authService.decodeToken(data.accessToken)
          const userData = await userService.findOneUser({ id: tokenData.id, token: data.accessToken })
          setLoading(false)
          if (data) {
            authService.saveSession(data.accessToken, userData.data)
            push('/topics')
          }
        } catch (error) {
          setLoading(false)
          setError(true)
        }
      }
      registerSocialLogin(params)
    }
  }, [error, search, push])


  const getParams = (queryParams: string): { code: string, type: SocialTypes } => {
    const params = new URLSearchParams(queryParams)
    return {
      code: params.get('code') ?? '',
      type: Number(params.get('state')) ?? SocialTypes.ND
    }
  }

  const renderSuccess = () => {
    return (
      <p> Estamos carregando seus dados.<br />Aguarde alguns intantes.</p>
    )
  }

  const renderFailure = () => {
    return (
      <p> Ocorreu um erro durante o processo.<br /><Link to="/" className="error-link">Por favor, tente novamente.</Link></p>
    )
  }

  return (
    <div className="social-login">
      {error
        ? <img className="error-icon" src={errorIcon} alt="error icon"></img>
        : <Loader type="Grid" visible={loading} color='#507CC0' width={90} height={90}></Loader>}
      <div className="info-text">
        {!error ? renderSuccess() : renderFailure()}
      </div>
    </div>
  )
}

export default SocialPage