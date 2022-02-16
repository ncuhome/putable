/*
export type SpaceIndex = string[]
export type ApiIndex = string[]

export interface Space {
  name: string
  login: Login
  apiIndex: ApiIndex
}

export interface Login {
  url: string
  account: string
  token: string
}

export interface Api {
  url: string
  method: string
  description: string
}

 */

export interface Space {
  name: string
  login: Login
  apiIndex: Api[]
}

export interface Login {
  url: string
  account: string
  token: string
}

export interface Api {
  url: string
  method: string
  description: string
}