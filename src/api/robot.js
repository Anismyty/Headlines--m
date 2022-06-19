// 用户相关请求模块
import request from '@/utils/request'

export const message = (token, data) => {
  return request({
    method: 'POST',
    url: '/socket.io',
    params: {
      token,
    },
    data,
  })
}
