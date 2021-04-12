import axios from '../base/customAxios'
import { CreateFishSpecieRequest } from './request/createFishSpecie.request'
import { DeleteFishSpecieRequest } from './request/deleteFishSpecie.request'
import { ExportFishSpecieRequest } from './request/exportFishSpecie.request'
import { FindOneFishSpecieRequest } from './request/findOneFishSpecie.request'
import { ListFishSpecieRequest } from './request/listFishSpecie.request'
import { UpdateFishSpecieRequest } from './request/updateFishSpecie.request'
import { CreateFishSpecieResponse } from './response/createFishSpecie.response'
import { DeleteFishSpecieResponse } from './response/deleteFishSpecie.response'
import { FindOneFishSpecieResponse } from './response/findOneFishSpecie.response'
import { ListFishSpecieResponse } from './response/listFishSpecie.response'
import { UpdateFishSpecieResponse } from './response/updateFishSpecie.response'
class FishService {
  async createFishSpecie(req: CreateFishSpecieRequest): Promise<CreateFishSpecieResponse> {
    const response = await axios.post<CreateFishSpecieResponse>('/fish', req)
    return response.data
  }

  async listFishSpecie(req: ListFishSpecieRequest): Promise<ListFishSpecieResponse> {
    const response = await axios.get<ListFishSpecieResponse>('/fish', {
      params: req
    })
    return response.data
  }

  async findOneFishSpecie(req: FindOneFishSpecieRequest): Promise<FindOneFishSpecieResponse> {
    const response = await axios.get<FindOneFishSpecieResponse>(`/fish/${req.id}`)
    return response.data
  }

  async updateFishSpecie(req: UpdateFishSpecieRequest): Promise<UpdateFishSpecieResponse> {
    const response = await axios.put<UpdateFishSpecieResponse>(`/fish/${req.id}`, req)
    return response.data
  }

  async deleteFishSpecie(req: DeleteFishSpecieRequest): Promise<DeleteFishSpecieResponse> {
    const response = await axios.delete<DeleteFishSpecieResponse>(`/fish/${req.id}`)
    return response.data
  }

  async exportFishSpecie(req: ExportFishSpecieRequest): Promise<Blob> {
    const response = await axios.get<Blob>(`/fish/export`, {
      responseType: 'blob',
      params: req
    })
    return response.data
  }
}

export default new FishService()