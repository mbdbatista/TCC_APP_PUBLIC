export type ProfileModel = {
  id: string
  name: string
  actions: Actions[]
  active: boolean
}

type Actions = { 
  route: string
  access: AccessType
}

export enum AccessType { 
  all = 0,
  read = 1,
  write = 2
}