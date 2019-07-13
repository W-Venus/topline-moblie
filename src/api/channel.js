// 封装频道相关的接口

// 加载axios请求模块
import request from '@/utils/request'
// 请求默认频道数据
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 请求所有频道数据
export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
