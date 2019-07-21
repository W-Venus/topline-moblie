<template>
  <div>
    <van-nav-bar
      class="result-nav"
      title="小智同学"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div>
        <van-cell title="小智" value="内容" />
        <van-cell title="我" value="内容" />
    </div>
    <div class="dialog">
      <input type="text" placeholder="请输入内容">
      <van-button round type="danger" >圆形按钮</van-button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'ChatIndex',

  data () {
    return {
      socket: null,
    //   other: [],
    //   selt: []
    }
  },

  created () {
    const socket = io('http://ttapi.research.itcast.cn',{
      query: { // 设置第一次建立连接的请求参数
        token: this.$store.state.user.token
      }
    })
    this.socket = socket
    // 建立连接成功调用
    socket.on('connect', function() {
      console.log('建立连接成功了')
      // 发送消息
      socket.emit('message', {
        msg: '哈哈哈',
        timestamp: Date.now()
      })
    })
    // 触发事件时调用
    socket.on('message', function(data){
      console.log(data)
    })
    // 断开连接调用
    socket.on('disconnect', function(){})
  },
  computed: {},
  methods: {
  }
}
</script>

<style lang='less' scoped>
.dialog {
  position: fixed;
  bottom: 0;
  input {
    width: 500px;
    height: 60px;
    font-size: 28px;
  }
}
.van-nav-bar__right {
    .van-nav-bar__text {
        color: #3296fa
    }
}
</style>
