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
      <van-button class="base-btn" size="mini" type="danger">关注</van-button>
    </div>
  </div>
</template>

<script>
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
    }
  },

  created () {},
  computed: {},
  methods: {}
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
