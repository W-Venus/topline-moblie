// 封装search相关的接口

// 加载axios请求模块
import request from '@/utils/request'

// 获取联想建议
export const search = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
