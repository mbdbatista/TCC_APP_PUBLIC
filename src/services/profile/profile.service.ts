import axios from '../base/customAxios'
import { AssociateUsersRequest } from './request/associateUsers.request'
import { CreateProfileRequest } from './request/createProfile.request'
import { DeleteProfileRequest } from './request/deleteProfile.request'
import { ExportProfileRequest } from './request/exportProfile.request'
import { FindUsersRequest } from './request/findUsers.request'
import { GetProfileRequest } from './request/getProfile.request'
import { ListProfileRequest } from './request/listProfile.request'
import { UpdateProfileRequest } from './request/updateProfile.request'
import { AssociateUsersResponse } from './response/associateUsers.response'
import { CreateProfileResponse } from './response/createProfile.response'
import { DeleteProfileResponse } from './response/deleteProfile.response'
import { FindUsersResponse } from './response/findUsers.response'
import { GetProfileResponse } from './response/getProfile.response'
import { ListProfileResponse } from './response/listProfile.response'
import { UpdateProfileResponse } from './response/updateProfile.request'


class ProfileService {
  async listProfile(req: ListProfileRequest): Promise<ListProfileResponse> {
    const response = await axios.get<ListProfileResponse>('/profile', {
      params: req
    })
    return response.data
  }

  async createProfile(req: CreateProfileRequest): Promise<CreateProfileResponse> {
    const response = await axios.post<CreateProfileResponse>('/profile', req)
    return response.data
  }

  async findUsers(req: FindUsersRequest): Promise<FindUsersResponse> {
    const response = await axios.get<FindUsersResponse>(`/profile/${req.id}/users`)
    return response.data
  }

  async deleteProfile(req: DeleteProfileRequest): Promise<DeleteProfileResponse> {
    const response = await axios.delete<DeleteProfileResponse>(`/profile/${req.id}`)
    return response.data
  }

  async getProfile(req: GetProfileRequest): Promise<GetProfileResponse> {
    const response = await axios.get<GetProfileResponse>(`/profile/${req.id}`)
    return response.data
  }

  async updateProfile(req: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    const response = await axios.put<UpdateProfileResponse>(`/profile/${req.id}`, req)
    return response.data
  }

  async associateUsers(req: AssociateUsersRequest): Promise<AssociateUsersResponse> {
    const response = await axios.post<AssociateUsersResponse>(`/profile/${req.id}/users`, req)
    return response.data
  }

  async exportProfile(req: ExportProfileRequest): Promise<Blob> {
    const response = await axios.get<Blob>(`/profile/export`, {
      params: req,
      responseType: 'blob'
    })
    return response.data
  }
}
export default new ProfileService()