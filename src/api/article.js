// 用户相关请求模块
import request from '@/utils/request'

//根据id获得具体文章列表详情
export const getArticleById = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params,
  })
}

//根据id获取文章详情
export const getArticleDetail = (articleId) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`,
  })
}

//收藏文章
export const collectArticle = (target) => {
  return request({
    method: 'POST',
    url: `/v1_0/article/collections`,
    data: {
      target,
    },
  })
}

//取消收藏文章
export const cancelCollectArticle = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`,
  })
}

//点赞文章
export const likeArticle = (target) => {
  return request({
    method: 'POST',
    url: `/v1_0/article/likings`,
    data: {
      target,
    },
  })
}
//取消点赞文章
export const cancelLikeArticle = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`,
  })
}

