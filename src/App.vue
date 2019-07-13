<template>
  <div class="App">
    <!-- keep-alive 处理路由缓存,多用于移动端,后退不刷新页面 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>

</style>
