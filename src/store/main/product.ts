import { defineStore } from 'pinia'
import { goodsCountListReq } from '@/server/index'

interface IState {
  localProductList: [
    {
      keywords: string
      title: string
      tips: string
      subTitle: string
      number1: number
      number2: number
    }
  ]
}
const useProductStore = defineStore('product', {
  state: () => ({
    localProductList: []
  }),
  actions: {
    async getProductListAction() {
      const res = await goodsCountListReq()
      this.localProductList = res.data.data
    }
  }
})

export default useProductStore