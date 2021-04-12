export interface UpdateProfileRequest {
  id: string
  name: string
  actions: {
    route: string,
    access: number
  }[]
  active: boolean
}