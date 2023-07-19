export const contentConfig = {
  pageName: 'menu',
  isShowOperate: false,
  childrenTree: '_id',
  contentTitle: {
    headerName: '菜单列表',
  },
  formConfigData: [
    // 普通定制(一般为文本)
    { type: 'index', label: '序号', width: '70' },

    // 普通定制
    { type: 'normal', prop: 'name', label: '菜单名称' },
    { type: 'normal', prop: 'url', label: '菜单url' },
    { type: 'normal', prop: 'icon', label: '菜单icon' },

    // 普通定制
    { type: 'time', prop: 'createdAt', label: '创建时间' },
    { type: 'time', prop: 'updatedAt', label: '更新时间' },
  ]
}