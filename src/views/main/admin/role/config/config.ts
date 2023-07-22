import { type IConfig } from '../config/config-type'
export const searchConfig = {
  formConfigData: [
    {
      type: 'normal',
      prop: 'id',
      label:'id',
      width: '230',
      initialValue: ''
    },
    {
      type: 'normal',
      prop: 'name',
      label: '角色名称',
      initialValue: ''
    },
    {
      type: 'date-picker',
      prop: 'createdAt',
      label: '创建时间'
    },
  ]
}

export const contentConfig = {
  pageName: 'role',
  isShowOperate: true,
  contentTitle: {
    headerName: '角色列表',
    btnName: '新建角色'
  },
  formConfigData: [
    // 普通定制(一般为文本)
    { type: 'index', label: '序号', width: '70' },

    // 普通定制
    { type: 'normal', prop: '_id', label: 'id', width: '230' },
    { type: 'normal', prop: 'name', label: '角色名称' },


    // 普通定制
    { type: 'time', prop: 'createdAt', label: '创建时间' },
    { type: 'time', prop: 'updatedAt', label: '更新时间' },
  ]
}

export const popUpConfig: IConfig = {
  pageName: 'role',
  createName: '新建角色',
  editName: '编辑角色',
  labelWidth: '80px',
  formConfigData: [
    {
      type: 'normal',
      label: '角色名称',
      prop: 'name',
      initialValue: ''
    },
    {
      type: 'custom',
      slotName: 'permissions',
    }
  ]
}