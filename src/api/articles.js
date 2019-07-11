// 封装频道内文章列表相关的接口

// 加载axios请求模块
import request from '@/utils/request'

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
