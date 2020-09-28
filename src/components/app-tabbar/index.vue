<!--
 * @Date: 2020-09-28 10:58:44
 * @Description: Do not edit
 * @LastEditors: Please set LastEditors
 * @Author: chen
 -->
<template>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/choujiang">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">{{ $store.state.user ? '我的' : '未登录' }}</van-tabbar-item>
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
