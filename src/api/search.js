// 封装search相关的接口

// 加载axios请求模块
import request from '@/utils/request'

// 获取联想建议
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索结果
export const getSearchResult = ({
  page = 1,
  perPage = 10,
  q
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}

// 获取历史记录
export const getHistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
