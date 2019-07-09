<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="login-nav" title="登录"/>
    <!-- 表单 -->
    <form>
        <van-cell-group>
            <van-field
                v-model="user.mobile"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
            />

            <van-field
                v-model="user.code"
                type="password"
                label="验证码"
                placeholder="请输入验证码"
                required
            />
        </van-cell-group>
        <!-- 按钮 -->
        <div class="login-btn-box">
            <van-button
                :loading="loginLoading"
                loading-text="登录中..."
                class="login-btn"
                type="info"
                size="large"
                @click.prevent="handleLogin"
            >登录</van-button>
        </div>
    </form>
  </div>
</template>

<script>
// 引入login接口
import { login } from '@/api/user'
export default {
  name: 'loginIndex',

  data () {
    return {
      user: {
        mobile: '15236485854',
        code: '123456'
      },
      loginLoading: false
    }
  },

  methods: {
    async handleLogin () {
      try {
        // 点击登录,开始loading
        this.loginLoading = true
        const data = await login(this.user)
        // console.log(data)
        // 提交mutation,完成对状态的修改
        this.$store.commit('saveItem', data)
        // 登录成功,先跳转首页
        // this.$router.push({
        //     name: 'home'
        // })
        // 登录成功,结束loading
        this.loginLoading = false
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar__title {
    color: #fff;
}
.login-nav {
    background-color: #1989fa;
    margin-bottom: 10px;
}
.login-btn-box {
    padding: 25px;
    .login-btn {
        border-radius: 10px;
    }
}
</style>
