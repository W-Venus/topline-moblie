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

// 添加用户频道数据 channels需要传一个数组
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}

// 删除用户指定频道
export const delUserChannel = channelID => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelID}`
  })
}
