<template>
  <div>
    <form action="/">
      <van-search
        v-model="searcheText"
        placeholder="请输入搜索关键词"
        show-action
        @search="handleSearch(searcheText)"
      />
    </form>
    <van-cell-group>
      <van-cell v-for="item in searchList" :key="item" :title="item" @click="handleSearch(item)">
        <!-- 使用插槽,定制内容 -->
        <div slot="title" v-html="highLight(item, searcheText)"></div>
      </van-cell>
    </van-cell-group>
    <!-- <van-cell-group title="历史记录">
      <van-cell title="1" />
      <van-cell title="2" />
      <van-cell title="3" />
      <van-cell title="4" />
    </van-cell-group> -->
  </div>
</template>

<script>
import { getSuggestions, getSearchResult } from '@/api/search'
// 加载lodash的debounce
import { debounce } from 'lodash'
export default {
  name: 'search',

  data () {
    return {
      isShowHistory: false, // 控制显示历史记录
      searcheText: '', // 搜索框绑定的内容
      searchList: [] // 联想建议自动补全数据列表
    }
  },
  watch: {
    // 防抖
    searcheText: debounce(async function (val) {
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
    }, 500)
  },
  methods: {
    // 设置关键字高亮
    highLight (text, keyword) {
      return text.toLowerCase().split(keyword).join(`<span style="color: red;">${keyword}</span>`)
    },
    // 点击键盘或回车按钮触发
    handleSearch (q) {
      // 跳转到搜索页面
      this.$router.push({
        name: 'search-result',
        params: {
          q
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
