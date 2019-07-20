<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content" placeholder="写评论">
    </div>
    <div class="more-wrap">
      <van-icon
        @click="handleCollect"
        :name="this.articles.is_collected ? 'star' : 'star-o'"
      ></van-icon>
      <van-button
        size="small"
        :disabled="!content.length"
        @click="handleAddComment"
      >发布</van-button>
    </div>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
import { collectArticle, unCollectArticle } from '@/api/articles'
export default {
  name: 'WriteComment',
  props: {
    // 当前点击的文章id
    target: {
      type: [Number, String],
      required: true
    },
    articles: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      content: ''
    }
  },
  inject: ['articleId'],
  computed: {},
  methods: {
    async handleAddComment () {
      // 对文章进行评论
      const data = await addComment({
        target: this.target, // 文章或评论的id
        content: this.content,
        artId: this.articleId // 文章id,对评论进行回复时需要传
      })
      // console.log(data)
    },
    // 收藏文章
    async handleCollect () {
      // 判断,如果文章已经被收藏,再点击则是取消收藏
      if (this.articles.is_collected) {
        await unCollectArticle(this.articleId)
        this.articles.is_collected = false
      } else {
        await collectArticle(this.articleId)
        this.articles.is_collected = true
      }
    }
  }
}
</script>

<style lang='less' scoped>
.add-comment {
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 1px solid black;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: black;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
