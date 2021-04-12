import { BaseResponse } from "../../base/response/base.response";
import { ProfileModel } from "../model/profile.model";

export interface ListProfileResponse extends BaseResponse<ProfileModel[]> {

}