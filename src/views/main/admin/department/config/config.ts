import { type IConfig } from '../config/config-type'
export const searchConfig = {
  formConfigData: [
    {
      type: 'normal',
      prop: 'id',
      label:'上级id',
      initialValue: ''
    },
    {
      type: 'normal',
      prop: 'name',
      label:'部门名称',
      initialValue: ''
    },
    {
      type: 'normal',
      prop: 'leader',
      label: '部门领导',
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
  pageName: 'department',
  isShowOperate: true,
  contentTitle: {
    headerName: '部门列表',
    btnName: '新建部门'
  },
  formConfigData: [
    // 普通定制(一般为文本)
    { type: 'index', label: '序号', width: '70' },

    // 普通定制
    { type: 'normal', prop: 'name', label: '部门名称' },
    { type: 'normal', prop: 'leader', label: '部门领导' },

    { type: 'normal', prop: 'parentId', label: '上级部门编号', width: '250', slotName: 'parentId' },

    // 普通定制
    { type: 'time', prop: 'createdAt', label: '创建时间' },
    { type: 'time', prop: 'updatedAt', label: '更新时间' },
  ]
}

export const popUpConfig: IConfig = {
  pageName: 'department',
  createName: '新建部门',
  editName: '编辑部门',
  labelWidth: '80px',
  formConfigData: [
    {
      type: 'normal',
      label: '部门名称',
      prop: 'name',
      initialValue: ''
    },
    {
      type: 'normal',
      label: '部门领导',
      prop: 'leader',
      initialValue: ''
    },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      initialValue: [],
      placeholder: '必填项',
      options: []
    }
  ]
}