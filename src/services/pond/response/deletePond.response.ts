import { BaseResponse } from "../../base/response/base.response";

export type DeletePondResponse = BaseResponse<DeleteFishSpecieModel>
type DeleteFishSpecieModel = {
  success: boolean
}