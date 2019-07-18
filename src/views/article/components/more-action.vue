<template>
  <div class="action-wrap">
    <van-button icon="thumb-circle-o" type="default">点赞</van-button>
    <van-button icon="browsing-history-o" type="default">不喜欢</van-button>
  </div>
</template>

<script>
export default {
  name: 'MoreAction',

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
.action-wrap {
  display: flex;
  justify-content: space-around;
}
</style>
