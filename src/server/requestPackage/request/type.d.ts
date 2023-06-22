import type { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from "axios"
export interface Iinterceptor {
  requestSuccess: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFail?: (err: any) => any
  responseSuccess?: (res: AxiosResponse) => AxiosResponse
  responseFail?: (err: any) => any
}
// 针对原来的config: AxiosRequestConfig类型进行类型扩展, 因为我们需要在外部的config配置信息中多传入interceptor属性以便进行精准自由添加各自实例的拦截器.
export interface PZrequestConfig extends AxiosRequestConfig {
  interceptor?: Iinterceptor
}
