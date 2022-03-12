import axios from 'axios'
import {
  BaseType,
  LoginResType,
  TableDataReqType,
  TableDataType,
} from '../interface/api'
import { axiosReqError, axiosResError } from './common'

const http = axios.create({
  timeout: 10000,
})

http.interceptors.request.use(undefined, axiosReqError)
http.interceptors.response.use(undefined, axiosResError)

interface TableRequestProps {
  url: string
  token: string
  data?: TableDataReqType
}
export async function getTableRequest({ url, token }: TableRequestProps) {
  return await http
    .get<BaseType<TableDataType>>(url, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data.data)
}

export async function postTableRequest({
  url,
  token,
  data,
}: TableRequestProps) {
  return await http.post(url, data, {
    headers: {
      Authorization: token,
    },
  })
}

interface LoginRequestProps {
  url: string
  account: string
  password: string
}
export async function loginRequest({
  url,
  account,
  password,
}: LoginRequestProps) {
  return await http
    .post<BaseType<LoginResType>>(url, {
      account: account,
      password: password,
    })
    .then((res) => res.data.data)
}
