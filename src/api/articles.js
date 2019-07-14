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
export const reportInformation = ({ channelId, type, remark }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: {
      channel_id: channelId,
      type,
      remark
    }
  })
}
