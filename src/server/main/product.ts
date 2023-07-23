import { pzrequest } from '../requestPackage'

export function goodsCountListReq() {
  return pzrequest.get({
    url: `/goods/count/list`
  })
}
