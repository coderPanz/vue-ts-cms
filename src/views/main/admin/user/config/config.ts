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
  contentTitle: {
    headerName: '用户列表',
    btnName: '新建用户'
  },
  formConfigData: [
    { type: 'index', label: '序号', width: '70' },
    { type: 'normal', prop: '_id', label: 'id', width: '230' },
    { type: 'normal', prop: 'name', label: '用户名' },
    { type: 'status', prop: 'status', label: '状态', width: '100' }
  ]
}
