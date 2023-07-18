export interface IConfig {
    pageName: string
    createName: string,
    editName: string,
    labelWidth?: string,
    formConfigData: [
      {
        type: string
        label: string
        prop: string
        initialValue: string,
        options?: any[]
      },
      {
        type: string
        label: string
        prop: string
        initialValue: any[],
        placeholder: string
        options: any[]
      },
    ]
}