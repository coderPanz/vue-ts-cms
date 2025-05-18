/*
 * @Author: qs
 * @Date: 2024-11-22 16:27:18
 * @LastEditTime: 2025-05-18 17:59:50
 * @LastEditors: qs
 * @Description: 
 * @FilePath: /vue-ts-cms/src/views/main/product/infos/config/config-type.d.ts
 * 
 */
export interface IConfig {
  pageName: string
  createName: string
  editName: string
  labelWidth: string
  formConfigData: [
    {
      type: string
      label: string
      prop: string
      initialValue: string
      options: any[]
    },
    {
      type: string
      label: string
      prop: string
      initialValue: any[]
      placeholder: string
      options: any[]
    },
    {
      type: string
      label: string
      prop: string
      initialValue: number
      options: any[]
    },
    {
      type: string
      label: string
      prop: string
      initialValue: string
      options: any[]
    },
    {
      type: string
      label: string
      prop: string
      initialValue: string
      options: any[]
    }
  ]
}