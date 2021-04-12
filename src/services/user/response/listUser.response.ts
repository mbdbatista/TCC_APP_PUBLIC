import { BaseResponse } from "../../base/response/base.response";
import { UserModel } from "../model/user.model";

export type ListUserResponse = BaseResponse<UserModel[]>