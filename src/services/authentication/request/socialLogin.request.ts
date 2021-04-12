import { SocialTypes } from "../../../modules/authentication/models/socialTypesEnum";

export interface SocialLoginRequest { 
  type: SocialTypes
  code: string
}