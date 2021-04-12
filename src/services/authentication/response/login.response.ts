import { BaseResponse } from "../../base/response/base.response";

export interface LoginResponse extends BaseResponse<LoginModel> { }

type LoginModel = {
  accessToken: string
  expiration: Date
}