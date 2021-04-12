import axios from '../base/customAxios'
import { CreateFishBreedingRequest } from './request/createFishBreeding.request'
import { ExportFishBreedingRequest } from './request/exportFishBreeding.request'
import { FindOneFishBreedingRequest } from './request/findOneFishBreeding.request'
import { ListFishBreedingRequest } from './request/listFishBreeding.request'
import { UpdateFishBreedingRequest } from './request/updateFishBreeding.request'
import { CreateFishBreedingResponse } from './response/createFishBreeding.response'
import { FindOneFishBreedingResponse } from './response/findOneFishBreeding.response'
import { ListFishBreedingResponse } from './response/listFishBreeding.response'
import { UpdateFishBreedingResponse } from './response/updateFishBreeding.response'
class FishBreedingService {
  async createFishBreeding(req: CreateFishBreedingRequest): Promise<CreateFishBreedingResponse> {
    const response = await axios.post<CreateFishBreedingResponse>('/fish-breeding', req)
    return response.data
  }

  async listFishBreeding(req: ListFishBreedingRequest): Promise<ListFishBreedingResponse> {
    const response = await axios.get<ListFishBreedingResponse>('/fish-breeding', {
      params: req
    })
    return response.data
  }

  async findOneFishBreeding(req: FindOneFishBreedingRequest): Promise<FindOneFishBreedingResponse> {
    const response = await axios.get<FindOneFishBreedingResponse>(`/fish-breeding/${req.id}`)
    return response.data
  }

  async updateFishBreeding(req: UpdateFishBreedingRequest): Promise<UpdateFishBreedingResponse> {
    const response = await axios.put<UpdateFishBreedingResponse>(`/fish-breeding/${req.id}`)
    return response.data
  }

  async exportFishBreeding(req: ExportFishBreedingRequest): Promise<Blob> {
    const response = await axios.get<Blob>(`/fish-breeding/export`, {
      responseType: 'blob',
      params: req
    })
    return response.data
  }
}

export default new FishBreedingService()