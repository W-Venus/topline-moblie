<template>
  <div class="detail-wrap">
      <van-nav-bar
      class="result-nav"
      title="详情页"
      left-arrow
      @click-left="$router.back()"
      />
    <div class="detail-content">
      <h2 class="article-title">{{ articles.title }}</h2>
      <AuthInfo
        :articles="articles"
        class="auth-wrap"
      />
      <div v-html="articles.content"></div>
      <MoreAction
        :articles="articles"
      />
      <!-- @is-replylist-show 表示监听一个事件 -->
      <CommentList @is-replylist-show="handleIsReplyShow" :source="this.articleId"/>
      <ReplyList v-model="isReplyShow" :comment-id="commentId"/>
      <write-comment/>
    </div>
  </div>
</template>

<script>
import AuthInfo from './components/auth-info'
import MoreAction from './components/more-action'
import CommentList from './components/comment-list'
import ReplyList from './components/replylist'
import WriteComment from './components/write-comments'
import { getArticleDetail } from '@/api/articles'
export default {
  name: 'ArticleDetail',
  components: {
    AuthInfo,
    MoreAction,
    CommentList,
    ReplyList,
    WriteComment
  },
  data () {
    return {
      articles: {},
      commentId: null, // 当前点击的评论的id
      isReplyShow: false // 控制回复弹框的展示与隐藏
    }
  },

  created () {
    this.getArticle()
  },
  computed: {
    articleId () {
      return this.$route.params.articleId.toString()
    }
  },
  methods: {
    // 初始化获取文章详情
    async getArticle () {
      const data = await getArticleDetail(this.$route.params.articleId)
      // console.log(data)
      this.articles = data
    },
    // 接收评论列表组件传回的id 并 设置回复组件状态为显示
    handleIsReplyShow (id) {
      this.commentId = id
      this.isReplyShow = true
    }
  }
}
</script>

<style lang='less' scoped>
.detail-content {
    padding: 20px;
}
.van-nav-bar__title, .van-nav-bar .van-icon {
  color: #fff;
}
.result-nav {
  background-color: #3296fa;
}
.auth-wrap {
    position: sticky;
    top: 0;
    background-color: #fff;
    margin-bottom: 30px;
}
</style>
