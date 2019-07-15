<template>
  <van-dialog
    closeOnClickOverlay
    :beforeClose="handleOptionsClose"
    :value="value"
    :show-cancel-button="false"
    :showConfirmButton="false"
    >
      <template v-if="!nextDialog">
        <van-cell title="不感兴趣" icon="closed-eye" @click="handleDislike"/>
        <van-cell title="反馈垃圾内容" @click="nextDialog = true" icon="warning-o" is-link />
        <van-cell title="拉黑作者" @click="hanleDelUser" icon="delete" />
      </template>
      <template v-else>
        <van-cell arrow-direction="left" is-link @click="nextDialog = false"/>
        <van-cell v-for="item in garbageTypes" :key="item.value" :title="item.label" @click="handleReport(item.value)"/>
      </template>
    </van-dialog>
</template>

<script>
// 加载接口
import { reportInformation, dislikeArticles } from '@/api/articles'
import { blackUser } from '@/api/user'
export default {
  name: 'Dialog',
  // 父子通信
  props: {
    value: {
      type: Boolean,
      defalut: false
    },
    // 当前点击的文章
    clickArticle: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      nextDialog: false, // 控制反馈垃圾内容的弹框
      garbageTypes: [
        { label: '其他问题', value: 0 },
        { label: '标题夸张', value: 1 },
        { label: '低俗色情', value: 2 },
        { label: '错别字多', value: 3 },
        { label: '旧闻重复', value: 4 },
        { label: '广告软文', value: 5 },
        { label: '内容不实', value: 6 },
        { label: '涉嫌违法犯罪', value: 7 },
        { label: '侵权', value: 8 }
      ]
    }
  },
  methods: {
    // 拉黑作者
    hanleDelUser () {
      blackUser(this.clickArticle.aut_id)
      // 隐藏当前弹框
      this.$emit('input', false)
      // 移除当前文章
      this.$emit('dislike')
    },
    // 对文章不感兴趣
    handleDislike () {
      dislikeArticles(this.clickArticle.art_id.toString())
      // 隐藏当前弹框
      this.$emit('input', false)
      // 移除当前文章, 发布一个事件
      this.$emit('dislike')
    },
    // 反馈垃圾信息 注意type类型是数字
    async handleReport (type) {
      try {
        const id = this.clickArticle.art_id.toString()
        // 发送请求举报
        await reportInformation({
          articleId: id,
          type
        })
        // 提示反馈成功
        this.$toast('举报成功')
      } catch (err) {
        // console.log(err)
        if (err.response && err.response.status === 409) {
          this.$toast('该文章已被举报')
        } else {
          this.$toast('操作失败')
        }
      }
    },
    // 点击遮罩层关闭弹框
    handleOptionsClose (action, done) {
      // 瞬间关闭
      done()
      // 将弹框恢复到默认状态
      window.setTimeout(() => {
        // 关闭内层弹框
        this.nextDialog = false
        // 关闭外层
        this.$emit('input', false)
      })
    }
  }
}
</script>

<style lang='less' scoped></style>
