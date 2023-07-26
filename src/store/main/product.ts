import { defineStore } from 'pinia'
import { goodsCountListReq, goodsCountTypeSaleReq, goodsMapReq } from '@/server/index'

interface IState {
  localProductList: [
    {
      _id: string
      keywords: string
      title: string
      tips: string
      subTitle: string
      number1: number
      number2: number
    }
  ]
  localProductTypeSaleList: [
    {
      _id: string
      name: string
      sale: number
      count: number
      favor: number
    }
  ]
  localProductMapDataList: [
    {
      address: string
      count: number
    }
  ]
  localProductTypeList: [
    {
      _id: string
      name: string
      type: number
    }
  ]
}
const useProductStore = defineStore('product', {
  state: (): IState => ({
    localProductList: [
      {
        _id: '',
        keywords: '',
        title: '',
        tips: '',
        subTitle: '',
        number1: 0,
        number2: 0
      }
    ],
    localProductTypeSaleList: [
      {
        _id: '',
        name: '',
        sale: 0,
        count: 0,
        favor: 0,
      }
    ],
    localProductMapDataList: [
      {
        address: '',
        count: 0
      }
    ],
    localProductTypeList: [
      {
        _id: '',
        name: '',
        type: 0
      }
    ]
  }),
  actions: {
    // 商品统计-top
    async getProductListAction() {
      const res = await goodsCountListReq()
      this.localProductList = res.data.data
    },
    // 商品统计-middle
    async getProductTypeSaleActon() {
      const res = await goodsCountTypeSaleReq()
      this.localProductTypeSaleList  = res.data.data
    },
    // 地图数据-data
    async getProductMapDataAction() {
      const res = await goodsMapReq()
      this.localProductMapDataList = res.data.data
    }
  }
})

export default useProductStore