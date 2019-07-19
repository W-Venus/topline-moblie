<template>
   <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in commentlist"
        :key="index"
      >
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt="">
        </div>
        <div slot="title">
          <span>{{ item.aut_name }}</span>
        </div>
        <div slot="default">
          <van-button
            @click="handleLike(item)"
            icon="like-o"
            size="mini"
            plain
          >{{ item.like_count }} 赞</van-button>
        </div>
        <div slot="label">
          <p>{{ item.content }}</p>
          <p>
            <span>{{ item.pubdate | relativeTime }}</span>
            &nbsp;
            <span>{{ item.reply_count }}回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment'
export default {
  name: 'CommentList',
  props: {
    // 数据id，文章id 或是 评论 id
    source: {
      type: [Number, String],
      required: true
    },
    // source 是否是文章，默认当作文章
    isArticle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      commentlist: [],
      loading: false,
      finished: false,
      offset: null, // 评论的id
      limit: 10 // 每页大小
    }
  },

  created () {},
  computed: {},
  methods: {
    async onLoad () {
      const data = await getComment({
        offset: this.offset,
        limit: this.limit,
        isArticle: this.isArticle,
        source: this.source
      })
      console.log(data)
      // this.commentlist = data.results
      // 判断返回数据是否为空
      if (!data.results.length) {
        // 停止loading
        this.loading = false
        this.finished = true
        return
      }
      this.commentlist.push(...data.results)
      this.loading = false
      this.finished = true
      // 更新offset,为了获取下一页数据
      this.offset = data.last_id
    },
    handleLike (item) {
      console.log(item)
    }
  }
}
</script>

<style lang='less' scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
