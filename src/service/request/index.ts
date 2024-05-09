import axios from 'axios'
import type { AxiosError, AxiosInstance } from 'axios'
import { YierRequestConfig } from './type'

class YierRequest {
  instance: AxiosInstance

  // request实例 => axios实例
  constructor(config: YierRequestConfig) {
    this.instance = axios.create(config)

    // 全局拦截器(每个实例都添加)
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求成功拦截')
        return config
      },
      (err) => {
        // console.log('全局请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功拦截')
        return res.data
      },
      (err) => {
        if(err.response){
          const axiosError = err as AxiosError
          if(axiosError.response?.status===429){
            alert('请求太频繁了，请稍后再试')
          }
        }
        // console.log(err.response.status,'err status')
        throw err
      }
    )
    // 针对特定实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  request<T = any>(config: YierRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      // 单次请求成功拦截
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应成功拦截
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          // console.log(err)
          // throw err
        })
    })
  }

  get<T = any>(config: YierRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: YierRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: YierRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: YierRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default YierRequest
