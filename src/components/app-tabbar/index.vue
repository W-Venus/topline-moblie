<template>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
  name: 'AppTabbar',

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
