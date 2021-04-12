import axios, { AxiosInstance } from 'axios'
import { RequestMiddleware } from '../../middlewares/request.middleware'

const customAxios = () : AxiosInstance => {
  const customAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API
  })
  customAxios.interceptors.request.use(RequestMiddleware)

  return customAxios
}

export default customAxios()