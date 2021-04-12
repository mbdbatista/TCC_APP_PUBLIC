import axios from '../base/customAxios'
import { CreatePondRequest } from './request/createPond.request'
import { DeletePondRequest } from './request/deletePond.request'
import { ExportPondRequest } from './request/exportPond.request'
import { FindOnePondRequest } from './request/findOnePond.request'
import { ListPondRequest } from './request/listPond.request'
import { UpdatePondRequest } from './request/updatePond.request'
import { CreatePondResponse } from './response/createPond.response'
import { DeletePondResponse } from './response/deletePond.response'
import { FindOnePondResponse } from './response/findOnePond.response'
import { ListPondResponse } from './response/listPond.response'
import { UpdatePondResponse } from './response/updatePond.response'

class PondService {
  async createPond(req: CreatePondRequest): Promise<CreatePondResponse> {
    const response = await axios.post<CreatePondResponse>('/pond', req)
    return response.data
  }

  async listPond(req: ListPondRequest): Promise<ListPondResponse> {
    const response = await axios.get<ListPondResponse>('/pond', {
      params: req
    })
    return response.data
  }

  async findOnePond(req: FindOnePondRequest): Promise<FindOnePondResponse> {
    const response = await axios.get<FindOnePondResponse>(`/pond/${req.id}`)
    return response.data
  }

  async updatePond(req: UpdatePondRequest): Promise<UpdatePondResponse> {
    const response = await axios.put<UpdatePondResponse>(`/pond/${req.id}`, req)
    return response.data
  }

  async deletePond(req: DeletePondRequest): Promise<DeletePondResponse> {
    const response = await axios.delete<DeletePondResponse>(`/pond/${req.id}`)
    return response.data
  }

  async exportPond(req: ExportPondRequest): Promise<Blob> {
    const response = await axios.get<Blob>(`/pond/export`, {
      responseType: 'blob',
      params: req
    })
    return response.data
  }
}

export default new PondService()