import request from '@/utils/request'

//获取用户搜索历史【线上搜索功能不能实现……】
export function getSearchHistory() {
  return request({
    url: '/v1_0/search/histories',
    method: 'get',
  })
}

//搜索建议
export const getSearchSuggest = (q) => {
  return request({
    url: '/v1_0/suggestion',
    method: 'get',
    params: {
      q,
    },
  })
}

//搜索结果
export const getSearchResult = (params) => {
  return request({
    url: '/v1_0/search',
    method: 'get',
    params,
  })
}
