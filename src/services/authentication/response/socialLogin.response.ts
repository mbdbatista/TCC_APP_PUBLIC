import { BaseResponse } from "../../base/response/base.response";

export interface SocialLoginResponse extends BaseResponse<SocialLoginModel> { }

type SocialLoginModel = {
  accessToken: string
  expiration: Date
}