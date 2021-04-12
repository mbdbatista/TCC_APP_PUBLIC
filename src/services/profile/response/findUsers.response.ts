import { BaseResponse } from "../../base/response/base.response";

export interface FindUsersResponse extends BaseResponse<FindUsersModel> {}

type FindUsersModel = {
  total: number
}