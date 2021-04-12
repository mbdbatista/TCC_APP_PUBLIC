import { AxiosRequestConfig } from 'axios'
import authService from '../services/authentication/authentication.service'
export const RequestMiddleware = (config: AxiosRequestConfig) => {
  const session = authService.getSession()
  if (session && config.headers['Authorization'] === undefined) {
    const currentHeaders = config.headers
    config.headers = {
      ...currentHeaders,
      'Authorization': session.accessToken
    }
  }
  return config
}