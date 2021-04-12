import { ProfileModel } from "../../profile/model/profile.model"

export class UserSession { 
  id!: string
  name!: string
  expiration!: Date
  accessToken!: string
  get expired(): boolean {
    const date = new Date()
    const expiration = new Date(this.expiration)
    return expiration < date
  }
  profile?: ProfileModel
}