import { FishSpecieModel } from "../../fish/model/fishSpecie.model";
import { PondModel } from "../../pond/model/pond.model";

export interface CreateFishBreedingRequest {
  fishSpecie: FishSpecieModel | string
  pond: PondModel | string
  quantity: number
  createdDate: Date
  endDate?: Date
  userId?: string
}