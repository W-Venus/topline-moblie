<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content" placeholder="写评论">
    </div>
    <div class="more-wrap">
      <van-icon
        name="star-o"
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
export default {
  name: 'WriteComment',
  props: {
    // 当前点击的文章id
    target: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      content: ''
    }
  },
  inject: ['articleId'],
  created () {},
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
      this.$router.go(0) // 刷新页面
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
