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
              v-for="(item,index) in articlesList"
              :key="index"
              :title="item.title"
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
import { getChannelArticles } from '@/api/articles'
export default {
  name: 'homeIndex',

  data () {
    return {
      channels: [], // 频道数据
      active: 0, // 频道的索引
      footerTabs: 0,
      articlesList: [], // 文章列表
      loading: false, // 列表上拉加载更多
      finished: false, // 控制列表加载是否结束
      isLoading: false // 下拉刷新加载完成
    }
  },
  computed: {
    // 当前选中频道
    currentChannels () {
      return this.channels[this.active]
    }
  },
  created () {
    // 初始化频道数据
    this.firstChannel()
  },
  methods: {
    // 上拉刷新 (每次点进去,都会刷新)
    async onLoad () {
      // console.log(111)
      let data = []
      // 初始化请求频道内文章列表,获取数据
      data = await this.channelArticles()
      // console.log(data)
      // 初次得到数据中文章列表是空,并返回了一个时间戳,我们可以根据这个时间戳去获取前一天的数据
      if (data.pre_timestamp && !data.results.length) {
        this.currentChannels.timestamp = data.pre_timestamp
        // 重新发请求,请求数据
        data = await this.channelArticles()
      }
      console.log(data)
      this.articlesList = data.results
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    // 初始化频道数据
    async firstChannel () {
      try {
        let channels = []
        // 从本地获取频道数据
        const localChannels = window.localStorage.getItem('channels')
        // 判断是否有本地数据
        if (localChannels) {
          // 有本地数据,就使用本地数据
          channels = localChannels
        } else {
          // 没有本地数据,使用默认的
          const data = await getUserChannel()
          // console.log(data)
          channels = data.channels
        }
        // 循环每个频道,对每个频道内的文章数据进行统一处理,处理成我们想要的格式
        channels.forEach(item => {
          item.articles = [] // 每个频道内文章列表数据
          item.timestamp = Date.now() // 每个频道内数据时间戳
          item.pullLoading = false // 控制每个频道内的下拉刷新状态
          item.upLoading = false // 控制每个频道内的上拉刷新状态
          item.finished = false // 控制每个频道内列表加载是否结束
        })
        this.channels = channels
        // console.log(channels)
      } catch (err) {
        console.log(err)
      }
    },
    // 请求当前频道内文章列表,只是用来请求数据的
    async channelArticles () {
      // 从当前激活的频道中获取相应数据
      const { id: channelId, timestamp } = this.currentChannels
      // 传参
      const data = await getChannelArticles({
        channelId,
        timestamp,
        withTop: 1
      })
      // console.log(data)
      // 把数据返回
      return data
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
