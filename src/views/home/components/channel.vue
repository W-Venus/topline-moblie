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
                >编辑</van-button>
                </div>
            </div>
            <van-grid class="channel-content" :gutter="10" clickable>
                <van-grid-item
                v-for="(value,index) in userChannels"
                :key="index"
                >
                <span class="text">{{ value.name }}</span>
                <van-icon class="close-icon" name="close" />
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
                v-for="value in 8"
                :key="value"
                text="文字">
                <div class="info">
                    <span class="text">文字</span>
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
    }
  },
  data () {
    return {
    }
  },
  created () {
    // 初始化请求所有频道数据
    this.allchannels()
  },
  computed: {
    // 过滤掉重复的频道
    filterChannel () {
    // 拿到重复的id
    
    //   const data = this.allchannels().includes()
    }
  },
  methods: {
    // 请求所有频道数据
    async allchannels () {
      const data = await getAllChannel()
    //   console.log(data)
    return data
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
