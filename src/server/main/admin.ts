import { pzrequest } from '../requestPackage'

// 分页请求
export function getUserListReq(data: any) {
  return pzrequest.post({
    url: '/user//paginationQuery',
    data: data
  })
}