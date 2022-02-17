import axios from "axios";
import {SpaceType} from "../interface/local";
import {BaseType, LoginResType, TableDataReqType, TableDataType} from "../interface/api";
import {axiosReqError, axiosResError} from "./common";

const http = axios.create({
  timeout: 10000,
})

http.interceptors.request.use(undefined, axiosReqError)
http.interceptors.response.use(undefined, axiosResError)

interface TableRequestProps {
  spaceList: SpaceType[],
  spaceID: number,
  apiID: number,
  data?: TableDataReqType,
}
export async function getTableRequest({ spaceList, spaceID, apiID, data }: TableRequestProps) {
  if(spaceList === null
    || spaceList.length - 1 < spaceID
    || spaceList[spaceID].apiList.length - 1 < apiID) {
    throw '对象不存在'
  }
  const login = spaceList[spaceID].login
  const api = spaceList[spaceID].apiList[apiID]
  return await http.get<BaseType<TableDataType>>(api.url, {headers: {
    'Authorization': login.token
  }}).then(res => res.data.data)
}

export async function postTableRequest({ spaceList, spaceID, apiID, data }: TableRequestProps) {
  if(spaceList === null
    || spaceList.length - 1 < spaceID
    || spaceList[spaceID].apiList.length - 1 < apiID) {
    throw '对象不存在'
  }
  const login = spaceList[spaceID].login
  const api = spaceList[spaceID].apiList[apiID]
  return await http.post(api.url, data, {headers: {
    'Authorization': login.token
  }})
}

interface LoginRequestProps {
  url: string,
  account: string,
  password: string
}
export async function loginRequest({ url, account, password }: LoginRequestProps) {
  return await http.post<BaseType<LoginResType>>(url, {
      account: account,
      password: password
    }
  ).then(res => res.data.data)
}