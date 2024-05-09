import type { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from "axios"

// 针对AxiosRequestConfig进行扩展，使满足不同实例请求、响应拦截
interface YierInterceptors<T=AxiosResponse>{
  requestSuccessFn?: (config: any) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface YierRequestConfig<T=AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YierInterceptors<T>
}