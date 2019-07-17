<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      class="result-nav"
      title="详情页"
      left-arrow
      @click-left="$router.back()"
    />
    <AuthInfo class="auth-wrap"/>
    <CommentList/>
    <MoreAction/>
    <RecommendArticle/>
    <ReleaseComments/>
    <ReplyList/>
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
    }
  },

  created () {
    this.getArticle()
  },
  computed: {},
  methods: {
    getArticle () {
      getArticleDetail()
    }
  }
}
</script>

<style lang='less' scoped>
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
