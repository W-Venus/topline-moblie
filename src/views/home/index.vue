<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="home-nav" title="首页" fixed/>
    <!-- /头部 -->
    <van-tabs class="channel-tabs" v-model="active">
      <!-- 使用组件标签页的插槽来设置图标 -->
      <div slot="nav-right" class="edit-icon" @click="isChannelShow = true">
        <van-icon name="wap-nav"/>
      </div>
      <van-tab
        :title="item.name"
        v-for="item in channels"
        :key="item.id"
      >
        <van-pull-refresh
          :success-text="item.pullRefresh"
          :success-duration="600"
          v-model="item.pullLoading"
          @refresh="onRefresh"
        >
          <!-- 列表 -->
          <van-list
            v-model="item.upLoading"
            :finished="item.upFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="articlesItem in item.articles"
              :key="articlesItem.art_id"
              :title="articlesItem.title"
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
    <!-- 弹出层
    v-model 就等于 :value="" 和 @input="" 的简写
     -->
    <home-channel
      v-model="isChannelShow"
      :user-channels="channels"
      :nowChannelActive="active"
    />
  </div>
</template>

<script>
import { getUserChannel } from '@/api/channel'
import { getChannelArticles } from '@/api/articles'
// 加载组件
import HomeChannel from './components/channel'
export default {
  name: 'homeIndex',
  // 注册子组件
  components: {
    HomeChannel
  },
  data () {
    return {
      channels: [], // 频道数据
      active: 0, // 频道的索引
      footerTabs: 0,
      isChannelShow: false // 控制弹出层的显示与隐藏
    }
  },
  computed: {
    // 当前激活频道
    currentChannels () {
      return this.channels[this.active]
    }
  },
  // watch: { // 监视用户的登录状态
  //   async '$store.state.user' () {
  //     // 登录了,就重新加载频道数据,调用一下onload加载数据
  //     // 因为缓存之后页面不会再重新使用生命周期获取数据了
  //     await this.firstChannel()
  //     this.onLoad()
  //   }
  // },
  created () {
    // 初始化频道数据
    this.firstChannel()
  },
  methods: {
    // 上拉刷新 (每次点进去,都会刷新)
    async onLoad () {
      // 调用定时器,让上拉加载更多有一个缓冲
      await this.$sleep(500)
      // console.log(111)
      let data = []
      // 初始化请求频道内文章列表,获取数据
      data = await this.channelArticles()
      // console.log(data)

      // 先判断时间戳和数据列表时否为空
      // 如果为空的话,说明没有数据了,此时需要结束列表加载状态
      if (!data.pre_timestamp && !data.results.length) {
        // 结束上拉时loading一直转圈加载中的状态
        this.currentChannels.upLoading = false
        // 结束列表加载状态,显示出加载更多
        this.currentChannels.upFinished = true
        // 停止往后继续执行
        return
      }

      // 初次得到数据中文章列表是空,并返回了一个时间戳
      // 我们可以根据这个时间戳去获取上次的数据
      if (data.pre_timestamp && !data.results.length) {
        this.currentChannels.timestamp = data.pre_timestamp
        // 重新发请求,请求数据
        data = await this.channelArticles()
      }
      // console.log(data)
      // 加载完成之后,更新时间戳
      this.currentChannels.timestamp = data.pre_timestamp
      // console.log(this.currentChannels.timestamp)
      // 并将本次得到的文章列表push进当前激活的频道的文章列表中
      this.currentChannels.articles.push(...data.results)
      // 并结束本次上拉loading状态
      this.currentChannels.upLoading = false
    },
    // 下拉刷新
    async onRefresh () {
      // 将上拉请求数据完成后的时间戳进行备份,为了防止没有最新数据时,文章列表为空
      const timestamp = this.currentChannels.timestamp
      // 再改变时间戳为最新数据
      this.currentChannels.timestamp = Date.now()
      // 调用文章列表函数请求数据
      const data = await this.channelArticles()
      // console.log(data)
      // 判断是否有最新数据
      if (data.results.length) {
        // 如果有最新数据,则重置文章列表
        this.currentChannels.articles = data.results
        this.$toast('刷新成功')
        // 当下拉刷新有最新数据且数据不满一屏时,使用onload再次加载数据
        this.onLoad()
      } else {
        // 如果没有最新数据,则添加一个提示消息
        this.currentChannels.pullRefresh = '已是最新数据'
      }
      // 加载完成,停止下拉刷新的loading状态
      this.currentChannels.pullLoading = false
    },
    // 初始化频道数据
    async firstChannel () {
      try {
        let channels = []
        const { user } = this.$store.state
        // 判断是否登录
        if (user) {
          channels = (await getUserChannel().channels)
        } else {
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
        }
        // 循环每个频道,对每个频道内的文章数据进行统一处理,处理成我们想要的格式
        channels.forEach(item => {
          item.articles = [] // 每个频道内文章列表数据
          item.timestamp = Date.now() // 每个频道内数据时间戳
          item.pullLoading = false // 控制每个频道内的下拉刷新状态
          item.upLoading = false // 控制每个频道内的上拉刷新状态
          item.upFinished = false // 控制每个频道内列表加载是否结束
          item.pullRefresh = '' // 下拉刷新成功的提示文本
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
.home-nav {
  background-color: #3296fa;
}
.van-list {
  margin-bottom: 100px;
}
</style>
