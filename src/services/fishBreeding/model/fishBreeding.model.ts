import { FishSpecieModel } from "../../fish/model/fishSpecie.model";
import { PondModel } from "../../pond/model/pond.model";

export interface FishBreedingModel {
  id: string
  fishSpecie: FishSpecieModel
  pond: PondModel
  quantity: number
  createdDate: Date
  endDate?: Date
  userId: string
}