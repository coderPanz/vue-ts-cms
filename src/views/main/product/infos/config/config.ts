/*
 * @Author: qs
 * @Date: 2024-11-22 16:27:18
 * @LastEditTime: 2025-05-18 18:04:23
 * @LastEditors: qs
 * @Description:
 * @FilePath: /vue-ts-cms/src/views/main/product/infos/config/config.ts
 *
 */
import { type IConfig } from './config-type'
export const searchConfig = {
  formConfigData: [
    {
      type: 'normal',
      prop: 'id',
      label: 'id',
      initialValue: ''
    },
    {
      type: 'normal',
      prop: 'name',
      label: '商品名',
      initialValue: ''
    },
    {
      type: 'select',
      prop: 'price',
      label: '价格区间',
      initialValue: '',
      options: [
        { label: '0-100', value: '0-100' },
        { label: '100-500', value: '100-500' },
        { label: '500-1000', value: '500-1000' },
        { label: '1000-2000', value: '1000-2000' },
        { label: '2000-3000', value: '2000-3000' },
        { label: '3000-5000', value: '3000-5000' },
        { label: '5000-10000', value: '5000-10000' },
        { label: '10000以上', value: '10000-max' }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createdAt',
      label: '创建时间',
      initialValue: ''
    },

    {
      type: 'select',
      prop: 'status',
      label: '状态',
      initialValue: '',
      options: [
        { label: '上架', value: 1 },
        { label: '下架', value: 0 }
      ]
    }
  ]
}

export const contentConfig = {
  pageName: 'productInfos',
  isShowOperate: true,
  contentTitle: {
    headerName: '商品列表',
    btnName: '新建商品',
    sortPrice: '价格排序',
    sortStock: '库存排序',
  },
  formConfigData: [
    // 普通定制(一般为文本)
    { type: 'index', label: '序号', width: '70' },

    // 普通定制
    { type: 'normal', prop: '_id', label: 'id', width: '230' },
    { type: 'normal', prop: 'name', label: '商品名' },
    { type: 'normal', prop: 'type', label: '类型' },
    { type: 'normal', prop: 'stock', label: '库存' },
    { type: 'normal', prop: 'price', label: '价格' },
    { type: 'custom', prop: 'status', label: '状态', width: '100', slotName: 'status' },

    // 普通定制
    { type: 'time', prop: 'createdAt', label: '创建时间' },
    { type: 'time', prop: 'updatedAt', label: '更新时间' }
  ]
}

export const popUpConfig: IConfig = {
  pageName: 'productInfos',
  createName: '新建商品',
  editName: '编辑商品',
  labelWidth: '70px',
  formConfigData: [
    {
      type: 'normal',
      label: '商品名',
      prop: 'name',
      initialValue: '',
      options: []
    },
    {
      type: 'select',
      label: '所属类型',
      prop: 'type',
      initialValue: [],
      placeholder: '必填项',
      options: []
    },
    {
      type: 'normal',
      label: '库存',
      prop: 'stock',
      initialValue: 0,
      options: []
    },
    {
      type: 'normal',
      label: '价格',
      options: [],
      prop: 'price',
      initialValue: ''
    },
    {
      type: 'select',
      label: '状态',
      prop: 'status',
      initialValue: '',
      options: [
        { name: '上架', _id: 1 },
        { name: '下架', _id: 0 }
      ]
    }
  ]
}
