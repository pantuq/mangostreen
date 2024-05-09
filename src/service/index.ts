import { closeToast, showLoadingToast } from 'vant'
import { BASE_URL, TIME_OUT } from './config'
import YierRequest from './request'

const yierRequest1 = new YierRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  interceptors: {
    requestSuccessFn: (config) => {
      config.headers = { Authorization: 'Bearer' + ' ' + localStorage.getItem('jwt') }
      return config
    }
  }

  // interceptors:{
  //   requestSuccessFn:(config)=>{
  //     console.log('单个实例的请求成功拦截')
  //     return config
  //   },
  //   requestFailureFn:(err)=>{
  //     console.log('单个实例的请求失败拦截')
  //     return err
  //   },
  // responseSuccessFn:(res)=>{
  //   console.log('单个实例的响应成功拦截')
  //   return res
  // },
  //   responseFailureFn:(err)=>{
  //     console.log('单个实例的响应失败拦截')
  //     return err
  //   }

  // }
})

export default yierRequest1

// 创建带有请求加载的YierRequest实例
export const yierRequest2 = new YierRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      showLoadingToast({
        message: '加载中',
        forbidClick: true,
        duration: 0
      })
      config.headers = { Authorization: 'Bearer' + ' ' + localStorage.getItem('jwt') }
      return config
    },
    responseSuccessFn(res) {
      closeToast()
      return res
    },
    responseFailureFn(err) {
      closeToast()
      throw err
    }
  }
})
