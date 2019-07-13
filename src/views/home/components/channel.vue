<template>
  <!-- v-model 就等于 :value="" 和 @input="" 的简写
   -->
    <!-- 弹出层 -->
        <van-popup
            :value="value"
            @input="$emit('input', $event)"
            position="bottom"
            :style="{ height: '90%' }"
        >
        <div class="channel">
            <div class="channel-head">
                <div>
                <span class="title">我的频道</span>
                <span class="desc">点击进入频道</span>
                </div>
                <div>
                <van-button
                    type="danger"
                    plain
                    size="mini"
                    @click="isEdit = !isEdit"
                >{{ isEdit ? '完成': '编辑'}}</van-button>
                <!-- 编辑绑定数据默认是false, 点击之后,变为true,如果是true,就显示为完成两字,如果是false,就显示编辑两字 -->
                </div>
            </div>
            <van-grid class="channel-content" :gutter="10" clickable>
                <van-grid-item
                v-for="(item,index) in userChannels"
                :key="index"
                >
                <!-- 让当前激活频道索引等于当前遍历项索引,成立则类名就能用,字体就可以显示为红色
                -->
                <span
                  class="text"
                  :class="{ active: index === nowChannelActive }"
                >{{ item.name }}</span>
                <van-icon class="close-icon" v-show="isEdit" name="close" />
                </van-grid-item>
            </van-grid>
            </div>

            <div class="channel">
            <div class="channel-head">
                <div>
                <span class="title">频道推荐</span>
                <span class="desc">点击添加频道</span>
                </div>
            </div>
            <van-grid class="channel-content" :gutter="10" clickable>
                <van-grid-item
                @click="handleAdd(item)"
                v-for="item in filterChannel"
                :key="item.id"
                >
                <div class="info">
                    <span class="text">{{ item.name }}</span>
                </div>
                </van-grid-item>
            </van-grid>
        </div>
    </van-popup>
</template>

<script>
import { getAllChannel } from '@/api/channel'
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 接收父组件传来的用户频道数据
    userChannels: {
      type: Array,
      default: () => []
    },
    // 获取当前激活频道索引
    nowChannelActive: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allchannels: [],
      isEdit: false
    }
  },
  computed: {
    // 过滤掉重复的频道
    filterChannel () {
      // 拿到用户频道的id  返回一个数组
      const repeatID = this.userChannels.map(item => item.id)
      // console.log(repeatID)
      // 根据得到的id数组在所有频道数据中将其过滤掉
      // repeatID.includes(item.id) 检测重复的id数组中是否含有所有频道数据中相同的id
      return this.allchannels.filter(item => !repeatID.includes(item.id))
    }
  },
  created () {
    // 初始化请求所有频道数据
    this.loadAllchannels()
  },
  methods: {
    // 点击频道,将当前点击项传给父组件,由父组件自己进行添加
    handleAdd (item) {
      // 将用户频道数组从第0个索引开始,把后面的全部截取下来,返回一个新数组
      const newChannels = this.userChannels.slice(0)
      // 再把当前点击项push进去
      newChannels.push(item)
      this.$emit('update:user-channels', newChannels)
      // 判断用户是否登录
      const { user } = this.$store.state
      // 如果登录了,则发请求添加数据
      if (user) {
      } else {
        // 如果没有登录,则直接将之前添加后更新的频道数据添加到本地存储中
        window.localStorage.setItem('channels', JSON.stringify(newChannels))
      }
    },
    // 点击编辑按钮,显示频道右上角的关闭图标
    handleEdit () {

    },
    // 请求所有频道数据
    async loadAllchannels () {
      const data = await getAllChannel()
      //   console.log(data)
      // 循环每个频道,对每个频道内的文章数据进行统一处理,处理成我们想要的格式
      data.channels.forEach(item => {
        item.articles = [] // 每个频道内文章列表数据
        item.timestamp = Date.now() // 每个频道内数据时间戳
        item.pullLoading = false // 控制每个频道内的下拉刷新状态
        item.upLoading = false // 控制每个频道内的上拉刷新状态
        item.upFinished = false // 控制每个频道内列表加载是否结束
        item.pullRefresh = '' // 下拉刷新成功的提示文本
      })
      this.allchannels = data.channels
    }
  }
}
</script>

<style lang='less' scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
