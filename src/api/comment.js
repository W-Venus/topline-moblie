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
    query: {
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}
