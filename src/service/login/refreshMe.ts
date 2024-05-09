import yierRequest1 from '..'

const jwt = localStorage.getItem('jwt')

export async function refreshMe() {
  await yierRequest1.request({
    url: '/api/v1/me',
    headers: {
      Authorization: 'Bearer' + ' ' + jwt
    },
    interceptors: {
      requestSuccessFn(config) {
        return config
      },
      responseSuccessFn(res) {
        return res
      }
    },
    method: 'get'
  })
}
