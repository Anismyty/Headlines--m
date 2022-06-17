<template>
  <!-- eslint-disable -->
  <div>
    <van-button
      v-if="value"
      round
      :loading="followLoding"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      class="guanzhu"
    >
      已关注
    </van-button>
    <van-button
      v-else
      round
      color="#0094ff"
      class="guanzhu"
      icon="plus"
      :loading="followLoding"
      @click="following"
    >
      关注
    </van-button>
  </div>
</template>

<script>
import { followUser, unfollowUser } from '@/api/user'

export default {
  name: 'FollowUser',
 /*  model:{
    prop:'',  //默认是value
    event:''  //默认是input
  }, */
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    userid: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      followLoding: false, //点击后会转圈圈
    }
  },
  methods: {
    //点击事件[关注/取消关注]
    async following() {
      this.followLoding = true
      try {
        if (this.value) {
          await unfollowUser(Number(this.userid))
        } else {
          await followUser(Number(this.userid))
        }
        // this.userinfom.is_followed = !this.userinfom.is_followed
        this.$emit('input', !this.value)
      } catch (err) {
        //自己不能关注自己
        if (err.response && err.response.status === 400) {
          this.$toast('不能关注自己')
        } else {
          this.$toast('操作失败，请重试！')
        }
      }
      this.followLoding = false
    },
  },
}
</script>

<style lang="less" scoped>
.guanzhu {
  width: 200px;
  height: 60px;
  opacity: 0.8;
  .van-button__text {
    font-size: 16px;
    letter-spacing: 10px;
  }
}
</style>
