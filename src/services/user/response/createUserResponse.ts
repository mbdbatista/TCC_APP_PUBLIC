import { BaseResponse } from "../../base/response/base.response";
import { UserModel } from "../model/user.model";

export interface CreateUserResponse extends BaseResponse<UserModel> { }
