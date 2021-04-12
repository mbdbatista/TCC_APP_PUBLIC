import { BaseResponse } from "../../base/response/base.response";

export type AssociateUsersResponse = BaseResponse<AssociateUsersModel>

type AssociateUsersModel = {
  success: boolean
}