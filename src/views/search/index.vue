<template>
  <div>
    <van-search
      v-model="searcheText"
      placeholder="请输入搜索关键词"
      show-action
    />
    <van-cell-group>
      <van-cell v-for="item in searchList" :key="item" :title="item" />
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
// 加载lodash的debounce
import { debounce } from 'lodash'
export default {
  name: 'search',

  data () {
    return {
      searcheText: '', // 搜索框绑定的内容
      searchList: [] // 联想建议自动补全数据列表
    }
  },
  watch: {
    // 防抖
    searcheText: debounce( async function (val) {
      // 去除首尾空格
      val = val.trim()
      // 判断
      // 如果数据为空,什么都不做
      if (!val) {
        return
      }
      // 如果不为空,则发请求,请求联想建议
      const data = await getSuggestions(val)
      this.searchList = data.options
    },500)
  },
  methods: {}
}
</script>

<style lang='less' scoped>
</style>
