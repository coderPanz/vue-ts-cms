import { type IConfig } from "./config-type"
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
        { label: '激活', value: 1 },
        { label: '关闭', value: 0 }
      ]
    }
  ]
}

export const contentConfig = {
  pageName: 'productInfos',
  isShowOperate: true,
  contentTitle: {
    headerName: '商品列表',
    btnName: '新建商品'
  },
  formConfigData: [
    // 普通定制(一般为文本)
    { type: 'index', label: '序号', width: '70' },

    // 普通定制
    { type: 'normal', prop: '_id', label: 'id', width: '230' },
    { type: 'normal', prop: 'name', label: '商品名' },
    { type: 'normal', prop: 'type', label: '类型' },
    { type: 'normal', prop: 'stock', label: '库存' },
    { type: 'custom', prop: 'img', label: '图例', slotName: 'productInfos' },

    // 普通定制
    // { type: 'time', prop: 'createdAt', label: '创建时间' },
    // { type: 'time', prop: 'updatedAt', label: '更新时间' }
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
      label: '图例链接',
      prop: 'img',
      initialValue: '',
      options: []
    },
  ]
}
