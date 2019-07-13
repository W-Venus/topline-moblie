<template>
  <van-popup
    v-model="show"
    position="bottom"
    :style="{ height: '90%' }"
  />
</template>

<script>
export default {
  name: 'Channel',
  props: {
      
  },
  data () {
    return {
      show: false
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped></style>
