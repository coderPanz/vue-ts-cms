export interface IConfig {
    pageName: String
    createName: String,
    editName: String,
    labelWidth: String,
    formConfigData: [
      {
        type: String
        label: String
        prop: String
        initialValue: any,
        placeholder?: String
        options?: any[]
      },
      {
        type: String
        label: String
        prop: String
        initialValue: any,
        placeholder?: String
        options?: any[]
      },
      {
        type: String
        label: String
        prop: String
        initialValue: any,
        placeholder?: String
        options?: any[]
      },
      {
        type: String
        label: String
        prop: String
        initialValue: any,
        placeholder?: String
        options?: any[]
      }
    ]
  }