<template>
  <div class="auth-info">
    <div class="base-info">
      <img :src="articles.aut_photo" class="auth-photo" alt="">
      <div>
        <p>{{ articles.aut_name }}</p>
        <p>{{ articles.pubdate | relativeTime }}</p>
      </div>
    </div>
    <div>
      <van-button
        @click="handleFollow"
        class="base-btn"
        size="mini"
        :type="articles.is_followed ? 'default' : 'danger'"
      >{{ articles.is_followed ? '已关注' : '关注' }}</van-button>
    </div>
  </div>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user'
export default {
  name: 'AuthInfo',
  props: {
    articles: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // isFollows: false
    }
  },

  created () {},
  computed: {},
  methods: {
    async handleFollow () {
      try {
        // 判断关注状态
        // 如果关注了,点击之后,发请求取消关注
        if (this.articles.is_followed) {
          await unFollowUser(this.articles.aut_id)
          // 更改articles.is_followed状态
          this.articles.is_followed = false
        } else {
          // 如果没有关注,发请求关注
          await followUser(this.articles.aut_id)
          this.articles.is_followed = true
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
   .base-info {
     display: flex;
     align-items: center;
   }
  .auth-photo {
    margin-right: 20px;
    width: 100px;
    height: 100px;
    border-radius: 100%
  }
}
</style>
