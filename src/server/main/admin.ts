import { pzrequest } from '../requestPackage'

// 获取数据列表
export function queryReq(name: string, data?: any) {
  return name === 'user'? pzrequest.post({
    url: `/userpaginationQuery`,
    data: data
  }): pzrequest.post({
    url: `/${name}/paginationQuery`,
    data: data
  })
}

// 删除指定id用户
export function deleteReq(name: string, id: string) {
  return pzrequest.delete({
    url: `/${name}/${id}`
  })
}

// 创建用户
export function createReq(name: string, data: any) {
  console.log(name, data)
  return pzrequest.post({
    url: `/${name}`,
    data: data
  })
}

// 更新数据
export function updateReq(name: string, id: string, data: any) {
  console.log(data)
  return pzrequest.patch({
    url: `/${name}/${id}`,
    data: data
  })
}
