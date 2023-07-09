const searchConfig = {
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

export default searchConfig