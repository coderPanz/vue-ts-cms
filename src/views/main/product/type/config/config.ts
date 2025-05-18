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
      label: '类型',
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
        { label: '上架', value: 1 },
        { label: '下架', value: 0 }
      ]
    }
  ]
}

export const contentConfig = {
  pageName: 'productType',
  isShowOperate: true,
  contentTitle: {
    headerName: '商品类型列表',
    btnName: '新建类型'
  },
  formConfigData: [
    // 普通定制(一般为文本)
    { type: 'index', label: '序号', width: '70' },

    // 普通定制
    { type: 'normal', prop: '_id', label: 'id', width: '230' },
    { type: 'normal', prop: 'name', label: '类型' },
    { type: 'custom', prop: 'img', label: '图例', slotName: 'productInfos' },
    { type: 'custom', prop: 'status', label: '状态', width: '100', slotName: 'status' },

    // 普通定制
    { type: 'time', prop: 'createdAt', label: '创建时间' },
    { type: 'time', prop: 'updatedAt', label: '更新时间' }
  ]
}

export const popUpConfig = {
  pageName: 'productType',
  createName: '新建类型',
  editName: '编辑类型',
  labelWidth: '70px',
  formConfigData: [
    {
      type: 'normal',
      label: '类型',
      prop: 'name',
      initialValue: ''
    },
    {
      type: 'normal',
      label: '图例链接',
      prop: 'img',
      initialValue: '',
      options: []
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
