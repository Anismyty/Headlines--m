// 用户相关请求模块
import request from '@/utils/request'

//全部频道列表
export const getChannelList = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels',
  })
}

//添加用户频道

export const addUserChannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel],
    },
  })
}

//删除用户频道
export const delUserChannel = (id) => {
    return request({
      method: 'DELETE',
      url: `/v1_0/user/channels/${id}`,
    })
  }