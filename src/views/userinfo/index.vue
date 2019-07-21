<template>
  <div>
    <van-nav-bar
      class="result-nav"
      title="个人信息"
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
      <van-cell title="介绍" :value="selfInfo.intro" is-link />
      <van-cell title="性别" :value="selfInfo.gender" is-link />
      <van-cell title="生日" :value="selfInfo.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getMyself, editInfo, editPhoto } from '@/api/user'
export default {
  name: 'myself',

  data () {
    return {
      selfInfo: {}
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
    async loadUser () {
      this.selfInfo = await getMyself()
      // console.log(data)
    },
    handleShowFile () {
      this.$refs['file'].click()
    },
    // 上传头像
    // loadPhoto () {
    //   const formdata = new FormData()
    //   formdata.append('photo', this.file.files[0])
    //   return editPhoto(formdata)
    // },
    // 保存用户信息
    async handleSave () {
    // 1.上传头像
    // const data = this.loadPhoto(formdata)
    // console.log(data)
    // 2.上传其他资料
      const data = await editInfo(this.selfInfo)
      console.log(data)
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
