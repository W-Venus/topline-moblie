// 封装频道内文章列表相关的接口

// 加载axios请求模块
import request from '@/utils/request'
// 获取频道内文章列表
export const getChannelArticles = ({ channelId, timestamp, withTop }) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}

// 举报垃圾信息
export const reportInformation = ({ articleId, type, remark = '' }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: {
      target: articleId,
      type,
      remark
    }
  })
}

// 对文章不感兴趣
export const dislikeArticles = articlesID => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articlesID
    }
  })
}

// 获取文章详情
export const getArticleDetail = articlesID => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articlesID}`
  })
}

// 对文章点赞
export const likeArticle = articlesID => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articlesID
    }
  })
}

// 对文章取消点赞
export const unlikeArticle = articlesID => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articlesID}`
  })
}

// 对文章不喜欢
export const like = articlesID => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articlesID
    }
  })
}

// 取消对文章不喜欢
export const dislike = articlesID => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${articlesID}`
  })
}

// 收藏文章
export const collectArticle = articlesID => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/collections`,
    data: {
      target: articlesID
    }
  })
}

// 取消收藏文章
export const unCollectArticle = articlesID => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articlesID}`
  })
}
