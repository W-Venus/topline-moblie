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
    <van-cell-group v-if="searcheText.trim()">
      <van-cell v-for="item in searchList" :key="item" :title="item" @click="handleSearch(item)">
        <!-- 使用插槽,定制内容 {{}}内不能展示带有html标签的内容-->
        <div slot="title" v-html="highLight(item, searcheText)"></div>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon
          v-show="!isDelShow"
          @click="isDelShow = true"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
        />
        <div v-show="isDelShow">
          <span @click="histories = []">全部删除</span>
          &nbsp;
          <span @click="isDelShow = false">完成</span>
        </div>
      </van-cell>
      <van-cell v-for="(item,index) in histories" :key="index" :title="item">
        <van-icon
          @click="histories.splice(index,1)"
          v-show="isDelShow"
          slot="right-icon"
          name="cross"
          style="line-height: inherit;"
        />
      </van-cell>
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
      searchList: [], // 联想建议自动补全数据列表
      histories: JSON.parse(window.localStorage.getItem('search-histories')), // 初始历史记录
      isDelShow: false // 控制历史记录删除按钮的显示与隐藏
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
    }, 500),
    // 深度监视历史记录的变化
    histories: {
      handler () {
        // 保存去重后的历史记录到本地
        window.localStorage.setItem('search-histories', JSON.stringify([...new Set(this.histories)]))
      },
      deep: true
    }
  },
  methods: {
    // 设置关键字高亮
    highLight (text, keyword) {
      return text.toLowerCase().split(keyword).join(`<span style="color: red;">${keyword}</span>`)
    },
    // 点击键盘或回车按钮触发
    handleSearch (q) {
      // console.log(q)
      // 如果搜索框为空,不让页面跳转
      if (!q.length) {
        return
      }
      // 将数据存到历史记录数组中
      this.histories.unshift(q)
      // 保存去重后的历史记录到本地
      window.localStorage.setItem('search-histories', JSON.stringify([...new Set(this.histories)]))
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
