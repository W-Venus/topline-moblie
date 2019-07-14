<template>
  <van-dialog
    :value="value"
    :show-cancel-button="false"
    :showConfirmButton="false"
    >
      <template v-if="!nextDialog">
        <van-cell title="不感兴趣" icon="closed-eye" />
        <van-cell title="反馈垃圾内容" @click="nextDialog = true" icon="warning-o" is-link />
        <van-cell title="拉黑作者" icon="delete" />
      </template>
      <template v-else>
        <van-cell arrow-direction="left" is-link @click="nextDialog = false"/>
        <van-cell title="标题夸张" />
        <van-cell title="其它问题" />
      </template>
    </van-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    value: {
      type: Boolean,
      defalut: false
    }
  },
  data () {
    return {
      nextDialog: false // 控制反馈垃圾内容的弹框
    }
  },

  methods: {
    // // 点击返回箭头,返回上一个弹框
    // handleBackDialog () {
      
    // }
  }
}
</script>

<style lang='less' scoped></style>
