import { BaseResponse } from "../../base/response/base.response";

export type DeleteUserResponse = BaseResponse<DeleteUserModel>
type DeleteUserModel = {
  success: boolean
}
