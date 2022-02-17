import axios from "axios";
import {SpaceType} from "../interface/local";
import {BaseType, TableDataReqType, TableDataType} from "../interface/api";
import {axiosReqError, axiosResError} from "./common";

const http = axios.create({
  timeout: 10000,
})

http.interceptors.request.use(undefined, axiosReqError)
http.interceptors.response.use(undefined, axiosResError)

interface RequestProps {
  spaceList: SpaceType[],
  spaceID: number,
  apiID: number,
  data?: TableDataReqType,
}
export async function request({ spaceList, spaceID, apiID, data }: RequestProps) {
  if(spaceList === null
    || spaceList.length - 1 < spaceID
    || spaceList[spaceID].apiList.length - 1 < apiID) {
    throw '对象不存在'
  }
  const login = spaceList[spaceID].login
  const api = spaceList[spaceID].apiList[apiID]
  if(api.method === 'GET') {
    return await http.request<BaseType<TableDataType>>({
      url: api.url,
      method: 'GET',
      headers: {
        'Authorization': login.token
      },
    })
  }
  return await http.request({
    url: api.url,
    method: 'POST',
    headers: {
      'Authorization': login.token
    },
    data: data
  })
}

export {http}