<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="home-nav" title="首页" fixed/>
    <!-- /头部 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
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
    </van-tabs>
    <!-- 底部 -->
    <van-tabbar v-model="footerTabs">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
    <!-- /底部 -->
  </div>
</template>

<script>
import { getUserChannel } from '@/api/channel'
export default {
  name: 'homeIndex',

  data () {
    return {
      channels: [], // 频道数据
      active: 0,
      footerTabs: 0,
      list: [],
      loading: false, // 列表上拉加载更多
      finished: false, // 控制列表加载是否结束
      isLoading: false // 下拉刷新加载完成
    }
  },
  created () {
    // 初始化频道数据
    this.firstChannel()
  },
  methods: {
    // 上拉刷新
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
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    async firstChannel () {
      try {
        // 从本地获取频道数据
        const localChannels = window.localStorage.getItem('channels')
        // 判断是否有本地数据
        if (localChannels) {
          // 有本地数据,就使用本地数据
          this.channels = localChannels
        } else {
          // 没有本地数据,使用默认的
          const data = await getUserChannel()
          // console.log(data)
          this.channels = data.channels
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang='less' scoped>
// /deep/ 的作用（深度作用选择器）
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 92px;
}
.van-nav-bar__title {
  color: #fff;
}
.home-nav {
  background-color: #3296fa;
}
.van-list {
  margin-bottom: 100px;
}
</style>
