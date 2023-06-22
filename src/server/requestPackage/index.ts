import { BASE_URL, TIME_OUT } from './config/index'
import PZrequest from './request/PZrequest'

// 这里是对每个请求的实例对象进行拦截器的自由配置, 也就是可以在创建实例时添加拦截器
export const pzrequest = new PZrequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
