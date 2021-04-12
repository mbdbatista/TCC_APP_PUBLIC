export interface FishSpecieModel { 
  id: string
  name: string
  carnivore: boolean
  sizes: FishSizeModel[]
}

export interface FishSizeModel {
  id?: string
  size: number
  unitsPerMeter: number
}