export interface CreateProfileRequest {
  name: string
  actions: {
    route: string,
    access: number
  }[]
}
