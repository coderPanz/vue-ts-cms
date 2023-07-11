export const searchConfig = {
  formConfigData: [
    {
      type: 'input',
      prop: 'id',
      label:'id'
    },
    {
      type: 'input',
      prop: 'name',
      label: '用户名',
    },
    {
      type: 'date-picker',
      prop: 'createdAt',
      label: '创建时间'
    },
    {
      type: 'select',
      prop: 'status',
      label: '状态',
      options: [
        { label: '激活', value: 1 },
        { label: '关闭', value: 0 }
      ]
    }
  ]
}

export const contentConfig = {
  pageName: 'user',
  contentTitle: {
    headerName: '用户列表',
    btnName: '新建用户'
  },
  formConfigData: [
    // 普通定制(一般为文本)
    { type: 'index', label: '序号', width: '70' },

    // 普通定制
    { type: 'normal', prop: '_id', label: 'id', width: '230' },
    { type: 'normal', prop: 'name', label: '用户名' },

    // 特殊定制(按钮, 特殊样式等等)
    { type: 'custom', prop: 'status', label: '状态', width: '100', slotName: 'status' },

    // 普通定制
    { type: 'time', prop: 'createdAt', label: '创建时间' },
    { type: 'time', prop: 'updatedAt', label: '更新时间' },
  ]
}
