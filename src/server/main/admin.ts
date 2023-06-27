import { pzrequest } from '../requestPackage'

// 分页请求
export function getUserListReq(data: any) {
  return pzrequest.post({
    url: '/user//paginationQuery',
    data: data
  })
}

// 删除指定id用户
export function deleteIdUserReq(id: any) {
  return pzrequest.delete({
    url: `user/${id}`
  })
}