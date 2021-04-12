import { FishSizeModel } from "../model/fishSpecie.model";

export interface CreateFishSpecieRequest {
  name: string
  carnivore: boolean
  sizes: FishSizeModel[]
}