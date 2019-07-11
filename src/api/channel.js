// 封装频道相关的接口

// 加载axios请求模块
import request from '@/utils/request'

export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
