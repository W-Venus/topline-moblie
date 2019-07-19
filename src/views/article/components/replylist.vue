<template>
    <van-popup
      :value="value"
      @input="$emit('input', $event)"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <comment-list v-if="value" ref="comment-list" :source="commentId" :isArticle="false" />
      <write-comment :target="commentId" />
    </van-popup>
</template>

<script>
import CommentList from './comment-list'
import WriteComment from './write-comments'
export default {
  name: 'ReplyList',
  components: {
    CommentList,
    WriteComment
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    commentId: {
      type: [Number, String]
    }
  },
  data () {
    return {
    }
  },

  created () {},
  computed: {},
  methods: {}
}
</script>

<style lang='less' scoped>

</style>
