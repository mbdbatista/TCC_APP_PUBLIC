import { ProfileModel } from "../../profile/model/profile.model";

export type UserModel = {
  id: string
  firstName: string;
  lastName?: string; 
  email: string;
  birthDate?: Date;
  createdDate: Date;
  profile: string | ProfileModel
}