<template>
  <div>
    <van-nav-bar
      title="小智同学"
      fixed
      left-arrow
      @click-left="$router.back()"
    />

    <div class="chatpannel">
      <div class="chat-list" v-for="(e, i) in msgList" :key="i">
        <div name="xz" class="robot" v-if="e.name === 'xz'">
          <van-image
            width="40px"
            height="40px"
            fit="contain"
            round
            :src="robotImg"
          />
          <span class="text">{{ e.msg }}</span>
        </div>
        <div name="user" class="user" v-if="e.name === 'user'">
          <van-image
            width="40px"
            height="40px"
            fit="contain"
            round
            :src="userImg"
          />
          <span class="text">{{ e.msg }}</span>
        </div>
      </div>
      <ul></ul>
    </div>

    <!-- 底部输入框 -->
    <div class="footer">
      <i class="iconfont icon-paint"></i>
      <input
        v-model="chatIn"
        type="text"
        placeholder="请描述您的问题"
        @keydown.enter="putMsg"
      />
      <van-button type="default" size="small" @click="putMsg">发送</van-button>
    </div>
  </div>
</template>

<script>
//获取个人信息
import { getUserInfo } from '@/api/user'
import soekctIO from 'socket.io-client'
import { baseURL } from '@/utils/request'
import robotImg from '@/assets/robot.png'
export default {
  name: 'RobotIndex',
  data() {
    return {
      msgList: [],
      robotImg,
      userImg: '',
      chatIn: '',
    }
  },
  methods: {
    async sendMsg() {
      const token = this.$store.state.user.token
      console.log(token)
    },
    putMsg() {
      if (!this.chatIn) return this.$toast('请输入内容')
      // 发送消息【参数在这边发送】
      this.io.emit('message', { msg: this.chatIn, timestamp: Date.now() })
      this.msgList.push({ name: 'user', msg: this.chatIn })
      this.chatIn = ''
    },
  },
  async created() {
    this.sendMsg()
    //获取个人头像
    const res = await getUserInfo()
    this.userImg = res.data.data.photo
    console.log(baseURL)
    // 1. 建立连接
    //只需要用到根目录，不需要/v1_0/socket.io/
    this.io = soekctIO(baseURL, {
      query: {
        token: this.$store.state.user.token,
      },
      transports: ['websocket'],
    })
    // 2. 连接成功
    this.io.on('connect', () => {
      this.msgList.push({ name: 'xz', msg: '我是小智同学，需要什么帮助吗？' })
    })
    // 3. 接收消息
    this.io.on('message', (data) => {
      this.msgList.push({ name: 'xz', msg: data.msg })
    })
  },
  beforeDestroy() {
    // 4. 关闭连接
    this.io.close()
  },
}
</script>

<style lang="less" scoped>
.chatpannel {
  margin-top: 110px;
  padding-bottom: 100px;
}
.user {
  background-color: #a4d3d7;
  display: flex;
  height: 100px;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 20px;
  margin-bottom: 10px;
  .text {
    margin-right: 30px;
    font-size: 20px;
  }
  .van-image {
    background-color: #fff;
  }
}
.robot {
  background-color: #c1faff;
  height: 100px;
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  .van-image {
    background-color: #fff;
  }
  .text {
    margin-left: 30px;
    font-size: 20px;
  }
}
.footer {
  width: 100%;
  height: 100px;
  background-color: #adadad;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  i {
    position: absolute;
    left: 25px;
    font-size: 40px;
    color: #7bb4ff;
  }
  input {
    height: 50px;
    font-size: 14px;
    width: 75%;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding-left: 70px;
  }
}
</style>
