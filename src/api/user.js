// 用户相关请求模块
import request from '@/utils/request'
//引入存储密钥的仓库
// import store from '@/store'

//登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data,
  })
}

//验证码数据
export const getCaptcha = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
  })
}

//获取用户个人信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    //请求头【密钥】
    // headers: {
    //   'Authorization': `Bearer ${store.state.user.token}`,
    // }
  })
}

//获取频道
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels',
  })
}

//关注用户
export const followUser = (target) => {
  return request({
    method: 'POST',
    url: `/v1_0/user/followings`,
    data: {
      target,
    },
  })
}

//取消关注
export const unfollowUser = (userId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/`,
    data: {
      target: userId,
    },
  })
}