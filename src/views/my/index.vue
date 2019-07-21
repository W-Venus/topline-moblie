<template>
  <div>
    <van-nav-bar
      class="result-nav"
      title="个人中心"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <un-login v-if="!$store.state.user" />
    <user-info v-else />
    <app-tabbar />
  </div>
</template>

<script>
import UnLogin from './components/un-login'
import UserInfo from './components/user-info'
export default {
  name: 'My',
  components: {
    UnLogin,
    UserInfo
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
.van-nav-bar__right {
    .van-nav-bar__text {
        color: #3296fa
    }
}
</style>
