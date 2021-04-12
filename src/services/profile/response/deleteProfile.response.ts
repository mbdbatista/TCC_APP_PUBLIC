import { BaseResponse } from "../../base/response/base.response";

export type DeleteProfileResponse = BaseResponse<DeleteProfileModel>
type DeleteProfileModel = {
  success: boolean
}