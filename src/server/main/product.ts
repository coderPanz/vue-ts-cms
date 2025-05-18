import { pzrequest } from '../requestPackage'

// 商品统计-top
export function goodsCountListReq() {
  return pzrequest.get({
    url: `/goods/count/list`
  })
}

// 商品统计-middle
export function goodsCountTypeSaleReq() {
  return pzrequest.get({
    url: `/goods/count/type-sale`
  })
}

// 地图数据的请求
export function goodsMapReq() {
  return pzrequest.get({
    url: `/goods/count/country`
  })
}

// 数据上报
export function goodsDataUploadReq(id: string, data?: any) {
  return pzrequest.post({
    url: `/goods/count/${id}`,
    data: data
  })
}


// 全国销售数据上报
export function goodsSaleCountryUploadReq(data?: any) {
  return pzrequest.post({
    url: `/goods/count/country/data`,
    data: data
  })
}