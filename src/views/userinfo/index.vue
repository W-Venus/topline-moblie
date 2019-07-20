<template>
  <div>
    <van-nav-bar
      class="result-nav"
      title="个人信息"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group v-model="selfInfo">
      <van-cell title="头像" is-link >
        <div slot="default">
          <img width="30" :src="selfInfo.photo" alt="">
        </div>
        <input ref="file" style="display: none;" type="file" @change="handleUpdate">
      </van-cell>
      <van-cell title="昵称" :value="selfInfo.name" is-link />
      <van-cell title="性别" :value="selfInfo.gender" is-link />
      <van-cell title="生日" :value="selfInfo.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getMyself } from '@/api/user'
export default {
  name: 'myself',

  data () {
    return {
      selfInfo: {}
    }
  },

  created () {
    this.loadUser()
  },
  computed: {},
  methods: {
    async loadUser() {
      const data = await getMyself()
      console.log(data)
      this.selfInfo = data
    },
    handleUpdate () {
        
    }
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar__right {
    .van-nav-bar__text {
        color: #3296fa
    }
}
</style>
