<template>
  <div class="not-login">
    <div class="circle" @click="$router.push({ name: 'login', query: { redirect: '/my' } })">
      <span>登录</span>
    </div>
    <div class="choose">
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="用户反馈" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell title="系统设置" is-link to="/settings" />
      </van-cell-group>
    </div>
     
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.circle {
    width: 140px;
    height: 140px;
    padding: 40px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
    margin: 80px auto;
}
</style>