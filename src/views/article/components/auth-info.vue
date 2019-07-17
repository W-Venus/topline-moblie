<template>
  <div class="auth-info">
    <div class="base-info">
      <img src="http://toutiao.meiduo.site/FuDXeRy6pZqMIr5ZAAW8x7_xuKYj" class="auth-photo" alt="">
      <div>
        <p>作者</p>
        <p>发布时间</p>
      </div>
    </div>
    <div>
      <van-button size="mini" type="danger">关注</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthInfo',

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
