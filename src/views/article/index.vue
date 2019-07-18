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
      <MoreAction/>
      <CommentList/>
      <RecommendArticle/>
      <ReleaseComments/>
      <ReplyList/>
    </div>
  </div>
</template>

<script>
import AuthInfo from './components/auth-info'
import MoreAction from './components/more-action'
import CommentList from './components/comment-list'
import RecommendArticle from './components/recommend-article'
import ReleaseComments from './components/release-comments'
import ReplyList from './components/replylist'
import { getArticleDetail } from '@/api/articles'
export default {
  name: 'ArticleDetail',
  components: {
    AuthInfo,
    MoreAction,
    CommentList,
    RecommendArticle,
    ReleaseComments,
    ReplyList
  },
  data () {
    return {
      articles: {}
    }
  },

  created () {
    this.getArticle()
  },
  computed: {},
  methods: {
    // 初始化获取文章详情
    async getArticle () {
      const data = await getArticleDetail(this.$route.params.articleId)
      // console.log(data)
      this.articles = data
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
