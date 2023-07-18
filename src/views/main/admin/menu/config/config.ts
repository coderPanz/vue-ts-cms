import { type IConfig } from '../config/config-type'
export const contentConfig = {
  pageName: 'department',
  contentTitle: {
    headerName: '菜单列表',
    btnName: '新建菜单'
  },
  formConfigData: [
    // 普通定制(一般为文本)
    { type: 'index', label: '序号', width: '70' },

    // 普通定制
    { type: 'normal', prop: 'name', label: '菜单名称' },
    { type: 'normal', prop: 'leader', label: '菜单url' },
    { type: 'normal', prop: 'leader', label: '菜单icon' },

    // 普通定制
    { type: 'time', prop: 'createdAt', label: '创建时间' },
    { type: 'time', prop: 'updatedAt', label: '更新时间' },
  ]
}

export const popUpConfig: IConfig = {
  pageName: 'menu',
  createName: '新建菜单',
  editName: '编辑菜单',
  labelWidth: '80px',
  formConfigData: [
    {
      type: 'normal',
      label: '菜单名称',
      prop: 'name',
      initialValue: ''
    }
  ]
}