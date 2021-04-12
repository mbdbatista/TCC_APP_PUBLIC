import { FishSizeModel } from "../model/fishSpecie.model";

export interface UpdateFishSpecieRequest { 
  id: string
  name: string
  carnivore: boolean
  sizes: FishSizeModel[]
}