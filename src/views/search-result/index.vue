<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
    class="result-nav"
    title="搜索结果"
    fixed
    left-arrow
    @click-left="$router.back()"/>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
    <van-cell
        v-for="item in articles"
        :key="item.art_id"
        :title="item.title"
    />
</van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'search-result',

  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 10
    }
  },
  computed: {
    q () {
      return this.$route.params.q
    }
  },
  methods: {
    async onLoad () {
      // 添加一个延时时间,让数据加载慢点
      await this.$sleep(800)
      const data = await this.getResults()
    //   console.log(data)
      // 判断返回结果是否为空
      if (!data.results.length) {
        // 停止页面的加载状态
        this.loading = false
        this.finished = true
        return
      }
      // 不为空 把数据push进去
      this.articles.push(...data.results)
      // 更新页码
      this.page++
      // 结束loading
      this.loading = false
    },
    // 封装请求搜索结果的函数
    getResults () {
      return getSearchResult({
        page: this.page,
        perPage: this.perpage,
        q: this.q
      })
    }
  }
}
</script>

<style lang='less' scoped>
.channel-tabs .edit-icon {
    position: sticky;
    right: 0;
    align-items: center;
    display: flex;
    background-color: #fff;
}
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 92px;
}
.van-nav-bar__title, .van-nav-bar .van-icon {
  color: #fff;
}
.result-nav {
  background-color: #3296fa;
}
.van-list {
    margin-top: 92px;
}
</style>
