// 封装login相关的接口

// 加载axios请求模块
import request from '@/utils/request'

export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 拉黑作者
export const blackUser = userID => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: userID
    }
  })
}

// 关注用户
export const followUser = userID => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userID
    }
  })
}

// 取消关注用户
export const unFollowUser = userID => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userID}`
  })
}

// 获取用户自己信息
export const getMyself = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}
