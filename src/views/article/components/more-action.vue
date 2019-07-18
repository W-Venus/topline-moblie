<template>
  <div class="action-wrap">
    <van-button
      @click="handleLike"
      round
      :icon="islikeShow ? 'youzan-shield' : 'thumb-circle-o'"
      type="default"
    >点赞</van-button>
    <van-button
      @click="handleDisLike"
      round
      :icon="isDisLike ? 'browsing-history' : 'browsing-history-o'"
      type="default"
    >不喜欢</van-button>
  </div>
</template>

<script>
import { likeArticle, unlikeArticle, like, dislike } from '@/api/articles'
export default {
  name: 'MoreAction',
  props: {
    articles: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  created () {},
  computed: {
    // 点赞的状态
    islikeShow () {
      return this.articles.attitude === 1
    },
    // 不喜欢的状态
    isDisLike () {
      return this.articles.attitude === 0
    }
  },
  methods: {
    async handleLike () {
      // 判断是否登录
      // 如果没有登录,则去登录
      if (!this.$checkLogin) {
        return
      }
      // 如果已经点赞,则点击之后取消点赞
      if (this.articles.attitude === 1) {
        await unlikeArticle(this.articles.art_id)
        this.articles.attitude = -1
      } else {
        // 如果没有点赞,则去点赞
        await likeArticle(this.articles.art_id)
        this.articles.attitude = 1
      }
    },
    async handleDisLike () {
      if (!this.$checkLogin) {
        return
      }
      // 如果已经点了不喜欢,则点击之后取消不喜欢
      if (this.articles.attitude === 0) {
        await dislike(this.articles.art_id)
        this.articles.attitude = -1
      } else {
        await like(this.articles.art_id)
        this.articles.attitude = 0
      }
    }
  }
}
</script>

<style lang='less' scoped>
.action-wrap {
  display: flex;
  justify-content: space-around;
}
</style>
