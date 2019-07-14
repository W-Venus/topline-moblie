// 处理发布时间的格式的过滤器
import dayjs from 'dayjs' // 加载插件
import relativeTime from 'dayjs/plugin/relativeTime' // 扩展dayjs插件里的相对时间插件
import 'dayjs/locale/zh-cn' // 加载中文语言包

dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 设置使用中文

export default (value) => {
  return dayjs().from(dayjs(value))
}
