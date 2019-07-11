// 封装频道内文章列表相关的接口

// 加载axios请求模块
import request from '@/utils/request'

export const getChannelArticles = () => {
  return request({
    method: 'GET',
    url: ' /app/v1_1/articles',
    params: {
      channel_id: '',
      timestamp: '',
      with_top: ''
    }
  })
}
