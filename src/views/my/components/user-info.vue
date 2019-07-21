<template>
    <div>
    <van-cell-group class="user-info">
        <van-cell class="base-info" is-link :border="false" to="/userinfo">
          <div slot="title">
              <img class="avatar" :src="userinfo.photo" alt="">
              <span class="title">{{ userinfo.name }}</span>
          </div>
        </van-cell>
        <van-cell>{{ userinfo.intro }}</van-cell>
        <van-grid v-model="userinfo" class="data-info" :border="false">
          <van-grid-item>
              <span class="count">{{ userinfo.art_count }}</span>
              <span class="text">头条</span>
          </van-grid-item>
          <van-grid-item>
              <span class="count">2</span>
              <span class="text">关注</span>
          </van-grid-item>
          <van-grid-item>
              <span class="count">{{ userinfo.fans_count }}</span>
              <span class="text">粉丝</span>
          </van-grid-item>
          <van-grid-item>
              <span class="count">{{ userinfo.follow_count }}</span>
              <span class="text">获赞</span>
          </van-grid-item>
        </van-grid>
    </van-cell-group>
    <!-- <van-cell-group>
        <van-grid clickable>
            <van-grid-item icon="star" text="我的收藏"/>
            <van-grid-item icon="chat" text="我的评论"/>
            <van-grid-item icon="like" text="我的点赞"/>
            <van-grid-item icon="browsing-history" text="浏览历史"/>
        </van-grid>
    </van-cell-group> -->
        <van-cell-group>
            <van-cell title="消息通知" is-link />
            <van-cell title="用户反馈" is-link />
            <van-cell title="小智同学" is-link to="/chat"/>
            <van-cell title="系统设置" is-link to="/setting" />
        </van-cell-group>
    </div>
</template>

<script>
import { getMyself } from '@/api/user'
export default {
  name: 'UserInfo',
  data () {
    return {
      userinfo: {} // 用户信息
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      const data = await getMyself()
      // console.log(data)
      this.userinfo = data
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  .base-info {
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center
    }
    .avatar {
      margin-right: 30px;
      width: 100px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 28px;
    }
    .count {
      font-size: 24px;
    }
  }
}
</style>
