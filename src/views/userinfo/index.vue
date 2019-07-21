<template>
  <div>
    <van-nav-bar
      class="result-nav"
      title="我"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-right="handleSave"
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="handleShowFile">
        <div slot="default">
          <img width="30" :src="selfInfo.photo" alt="">
        </div>
        <input ref="file" style="display: none;" type="file">
      </van-cell>
      <van-cell title="昵称" :value="selfInfo.name" is-link />
      <!-- <van-popup
        v-model="nickShow"
        position="bottom"
        :style="{ height: '20%' }"
      >
        <van-field v-model="nickname" placeholder="请输入用户名" />
      </van-popup> -->
      <van-cell title="介绍" :value="selfInfo.intro" is-link />
      <van-cell title="性别" :value="selfInfo.gender" is-link />
      <van-cell title="生日" :value="selfInfo.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getMyselfInfo, editInfo, editPhoto } from '@/api/user'
export default {
  name: 'myself',

  data () {
    return {
      selfInfo: {},
      // nickShow: false,
    }
  },
  computed: {
    file () {
      return this.$refs['file']
    }
  },
  created () {
    this.loadUser()
  },
  mounted () {
    // 监视input的change事件
    this.file.addEventListener('change', this.handleFileChange)
  },
  methods: {
    handleFileChange () {
      // 获取input输入框的文件对象
      const file = this.file.files[0]
      // 浏览器读取用户使用input选取的文件
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        this.selfInfo.photo = reader.result
        // console.log(reader.result)
      })
    },
    // 初始化请求用户信息
    async loadUser () {
      this.selfInfo = await getMyselfInfo()
      // console.log(data)
    },
    // 点击弹出上传文件的框
    handleShowFile () {
      this.$refs['file'].click()
    },
    // 上传头像
    loadPhoto () {
      const formdata = new FormData()
      formdata.append('photo', this.file.files[0])
      return editPhoto(formdata)
    },
    // 保存用户信息
    async handleSave () {
      try {
        // 1.上传头像
        const r1 =  this.loadPhoto(this.formdata)
        // console.log(data)
        // 2.上传其他资料
        const r2 =  editInfo({
          name: this.selfInfo.name,
          gender: this.selfInfo.gender,
          birthday: this.selfInfo.birthday
        })
        await Promise.all([r1,r2])
        this.$toast('更新成功')
        // console.log(data)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
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
