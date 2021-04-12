import axios from '../base/customAxios'
import { GetCreatedFishSpeciesReportRequest } from './request/getCreatedFishSpeciesReport.request'
import { GetCreatedPondsReportRequest } from './request/getCreatedPondsReport.request'
import { GetCreatedUsersReportRequest } from "./request/getCreatedUsersReport.request"
import { GetFishBreedingReportRequest } from './request/getFishBreedingReport.request'
import { GetCreatedFishSpeciesReportResponse } from './response/getCreatedFishSpeciesReport.response'
import { GetCreatedPondsReportResponse } from './response/getCreatedPondsReport.response'
import { GetCreatedUsersReportResponse } from "./response/getCreatedUsersReport.response"
import { GetFishBreedingReportResponse } from './response/getFishBreedingReport.response'

class ReportService {
  async getCreatedUsers(req: GetCreatedUsersReportRequest): Promise<GetCreatedUsersReportResponse> {
    const response = await axios.get<GetCreatedUsersReportResponse>('/report/createdUsers', {
      params: req
    })
    return response.data
  }
  async getCreatedPonds(req: GetCreatedPondsReportRequest): Promise<GetCreatedPondsReportResponse> {
    const response = await axios.get<GetCreatedPondsReportResponse>('/report/createdPonds', {
      params: req
    })
    return response.data
  }
  async getCreatedFishSpecies(req: GetCreatedFishSpeciesReportRequest): Promise<GetCreatedFishSpeciesReportResponse> {
    const response = await axios.get<GetCreatedFishSpeciesReportResponse>('/report/createdFishSpecies', {
      params: req
    })
    return response.data
  }
  async geFishBreeding(req: GetFishBreedingReportRequest): Promise<GetFishBreedingReportResponse> {
    const response = await axios.get<GetFishBreedingReportResponse>('/report/fishBreeding', {
      params: req
    })
    return response.data
  }
}

export default new ReportService()