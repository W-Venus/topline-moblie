<!--
 * @Date: 2020-09-28 11:03:36
 * @Description: Do not edit
 * @LastEditors: Please set LastEditors
 * @Author: chen
 -->
/*
 * @Date: 2020-09-28 11:03:36
 * @Description: Do not edit
 * @LastEditors:
 * @Author: chen
 */
<template>
    <div class="wrap">
    <!-- 大转盘抽奖 -->
    <LuckyWheel
    style="width: 310px; height: 310px"
    ref="LuckyWheel"
    :default-style="{
      fontColor: '#d64737',
      fontSize: '14px'
    }"
    :blocks="[
      { padding: '13px', background: '#d64737' }
    ]"
    :prizes="prizes"
    :buttons="[
      { radius: '50px', background: '#d64737' },
      { radius: '45px', background: '#fff' },
      { radius: '41px', background: '#f6c66f', pointer: true },
      {
        radius: '35px', background: '#ffdea0',
        fonts: [
        { text: '开始\n抽奖', top: '-20px' },
      ]
      }
    ]"
    @start="startCallBack"
    @end="endCallBack"
  />
     <!-- <LuckDraw
      v-model="currIndex"
      :awards="awards"
      @start="handleStart"
      @end="handleEnd"
    /> -->
    <!-- 九宫格抽奖 -->
    <!-- <LuckyGrid
      style="width: 200px; height: 200px"
    /> -->
    </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      prizes: [],
      currIndex: 0, // 奖品的索引
      awards: [ // 奖品
        { name: '价值5988元华为 P30pro', color: '#f9e3bb' },
        { name: '价值398元车载空气净化器', color: '#f8d384' },
        { name: '价值25元百叶帘遮阳挡', color: '#f9e3bb' },
        { name: '16元油卡套餐红包', color: '#f8d384' },
        { name: '5元油卡直冲红包', color: '#f9e3bb' },
        { name: '3元话费直冲红包', color: '#f8d384' },
        { name: '价值32元重力感应手机支架', color: '#f9e3bb' },
        { name: '价值198元手提迷你车在保温冷藏箱', color: '#f8d384' }
      ]
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.getPrizesList()
    })
  },
  methods: {
    getPrizesList () {
      this.prizes = []
      let data = ['100元红包', '1元红包', '0.5元红包', '2元红包', '10元红包', '50元红包', '0.3元红包', '5元红包']
      data.forEach((item, index) => {
        this.prizes.push({
          title: item,
          background: index % 2 ? '#f9e3bb' : '#f8d384',
          fonts: [{ text: item, top: '8%' }],
          imgs: [{ src: require(`./img/${index}.jpg`), width: '30%', top: '25%' }]
        })
      })
    },
    startCallBack () {
      this.$refs.LuckyWheel.play()
      setTimeout(() => {
        this.$refs.LuckyWheel.stop(Math.floor(Math.random() * 8))
        // this.$refs.LuckyWheel.stop(Math.random() * 8 > 0)
      }, 3000)
    },
    endCallBack (prize) {
      console.log(prize, 'prize')
      alert(`恭喜你获得${prize.title}`)
    }
  }

}
</script>

<style scoped lang="less">

</style>
