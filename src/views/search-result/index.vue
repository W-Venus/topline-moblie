<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="result-nav" title="搜索结果" fixed/>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
    <van-cell
        v-for="item in list"
        :key="item"
        :title="item"
    />
</van-list>
  </div>
</template>

<script>
export default {
  name: 'search-result',

  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },

  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
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
.van-nav-bar__title {
  color: #fff;
}
.result-nav {
  background-color: #3296fa;
}
.van-list {
    margin-top: 92px;
}
</style>
