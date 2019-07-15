<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
    />
  </div>
</template>

<script>
export default {
  name: 'search',

  data () {
    return {
      value: ''
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
</style>
