import axios from "../base/customAxios";
import { CreateUserRequest } from "./request/createUser.request";
import { DeleteUserRequest } from "./request/deleteUser.request";
import { ExportUserRequest } from "./request/exportUser.request";
import { FindOneUserRequest } from "./request/findOneUser.request";
import { ListUserRequest } from "./request/listUser.request";
import { UpdateUserRequest } from "./request/updateUser.request";
import { CreateUserResponse } from "./response/createUserResponse";
import { DeleteUserResponse } from "./response/deleteUser.response";
import { FindOneUserResponse } from "./response/findOneUser.response";
import { ListUserResponse } from "./response/listUser.response";
import { UpdateUserResponse } from "./response/updateUser.response";

class UserService {
  async createUser(req: CreateUserRequest): Promise<CreateUserResponse> {
    const response = await axios.post<CreateUserResponse>('/user', req)
    return response.data
  }

  async listUser(req: ListUserRequest): Promise<ListUserResponse> {
    const response = await axios.get<ListUserResponse>('/user', {
      params: req
    })
    return response.data
  }

  async findOneUser(req: FindOneUserRequest): Promise<FindOneUserResponse> {
    let headers = {}
    if (req.token) {
      headers = {
        'Authorization': req.token
      }
    }
    const response = await axios.get<FindOneUserResponse>(`/user/${req.id}`, {
      headers: headers
    })
    return response.data
  }

  async updateUser(req: UpdateUserRequest): Promise<UpdateUserResponse> {
    const response = await axios.put<UpdateUserResponse>(`/user/${req.id}`, req)
    return response.data
  }

  async deleteUser(req: DeleteUserRequest): Promise<DeleteUserResponse> {
    const response = await axios.delete<DeleteUserResponse>(`/user/${req.id}`)
    return response.data
  }

  async exportUser(req: ExportUserRequest): Promise<Blob> {
    const response = await axios.get<Blob>(`/user/export`, {
      responseType: 'blob',
      params: req
    })
    return response.data
  }
}

export default new UserService()