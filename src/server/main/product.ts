import { pzrequest } from '../requestPackage'

// count-top
export function goodsCountListReq() {
  return pzrequest.get({
    url: `/goods/count/list`
  })
}

// count-middle
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
