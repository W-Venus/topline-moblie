<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content" placeholder="写评论">
    </div>
    <div class="more-wrap">
      <van-icon
        name="star-o"
      ></van-icon>
      <van-button
        size="small"
        :disabled="!content.length"
      >发布</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WriteComment',

  data () {
    return {
      content: ''
    }
  },

  created () {},
  computed: {},
  methods: {}
}
</script>

<style lang='less' scoped>
.add-comment {
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 1px solid black;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: black;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
