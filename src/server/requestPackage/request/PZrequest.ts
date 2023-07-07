import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { type PZrequestConfig } from './type'
import { localIns } from '@/utils/cache/cache'

class PZrequest {
  instance: AxiosInstance
  constructor(config: PZrequestConfig) {
    this.instance = axios.create(config)

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = localIns.getCache('token')
        if(token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        return err
      }
    )

    // 实例拦截器
    // 精准化控制: 外部创建具体某个实例的时候, 单独为其添加拦截特定拦截器
    if (config.interceptor) {
      this.instance.interceptors.request.use(
        config.interceptor.requestSuccess,
        config.interceptor.requestFail
      )
      this.instance.interceptors.response.use(
        config.interceptor.responseSuccess,
        config.interceptor.responseFail
      )
    }
  }

  request(config: PZrequestConfig) {
    return this.instance.request(config)
  }

  get(config: PZrequestConfig) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config: PZrequestConfig) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config: PZrequestConfig) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch(config: PZrequestConfig) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default PZrequest
