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

// 获取用户个人资料
export const getMyselfInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`
  })
}

// 编辑用户照片资料（头像、身份证照片）
export const editPhoto = formdata => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/photo`,
    data: formdata
  })
}

// 编辑用户除头像外的资料
export const editInfo = ({
  name = null,
  photo = null,
  gender = null,
  birthday = null,
  realname = null,
  idnumber = null,
  idcardfront = null,
  idcardback = null,
  idcardhandheld = null,
  intro = null
}) => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data: {
      name,
      photo,
      gender,
      birthday,
      real_name: realname,
      id_number: idnumber,
      id_card_front: idcardfront,
      id_card_back: idcardback,
      id_card_handheld: idcardhandheld,
      intro
    }
  })
}
