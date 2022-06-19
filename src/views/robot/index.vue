<template>
  <div>机器人[暂时实现不了]</div>
</template>

<script>
import { message } from '@/api/robot'
export default {
  name: 'RobotIndex',
  data() {
    return {
      msg: '',
      msgList: [],
      userInfo: {},
      token: '753ec614-04b2-4e29-b3ab-eb2fc2a545db',
    }
  },
  methods: {
    async sendMsg() {
      try {
        let msg = {
          msg: '你好',
          timestamp: new Date(),
        }
        const res = message(this.token, msg)
        console.log(res)
      } catch (err) {
        this.$toast('发送失败，请稍后重试！')
      }
    },
  },
  created() {
    /* this.sendMsg() */
  },
}
</script>

<style lang="less" scoped></style>
