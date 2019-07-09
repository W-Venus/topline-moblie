<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="home-nav" title="首页"/>
    <!-- /头部 -->
    <van-tabs v-model="active">
      <van-tab title="标签 1">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 列表 -->
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
        <!-- /列表 -->
        </van-pull-refresh>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    
    <!-- 底部 -->
    <van-tabbar v-model="footerTabs">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
    <!-- /底部 -->
  </div>
</template>

<script>
export default {
  name: 'homeIndex',

  data () {
    return {
      active: 0,
      footerTabs: 0,
      list: [],
      loading: false, // 列表上拉加载
      finished: false, // 列表加载结束
      isLoading: false // 下拉刷新加载完成
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
    },
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
