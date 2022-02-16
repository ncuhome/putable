export interface Space {
  name: string
  login: Login
  api: Api[]
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