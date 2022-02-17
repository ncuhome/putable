export function axiosReqError(error: any): any {
  throw '请求发生错误，请检查网络后重试'
}

export function axiosResError(error: any): any {
  if (error?.message === 'Network Error') {
    throw '请求错误，请检查网络后重试'
  }
  throw error?.response?.data?.message || '服务器错误'
}