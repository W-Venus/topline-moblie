// 封装频道内评论列表相关的接口

// 加载axios请求模块
import request from '@/utils/request'

// 获取评论列表
export const getComment = ({
  isArticle, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
  source, // 源id，文章id或评论id
  offset = null, // 如果数据值为null,则axios不会发送这个字段
  limit = 10 // 每页大小
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}

// 对评论或评论的回复点赞
export const commentLike = commentId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

// 取消对评论或评论的回复点赞
export const unCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}

// 添加评论或评论回复
export const addComment = ({
  target,
  content,
  artId
}) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: {
      target, // 文章id或评论id
      content, // 评论内容
      art_id: artId // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
    }
  })
}
