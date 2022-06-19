<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <img :src="userInfo.photo" alt="" />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button
            type="default"
            size="mini"
            round
            color="#A0A0A0"
            to="/user/profile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span
          ><span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span
          ><span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span
          ><span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span
          ><span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div class="header" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img :src="imgUrl" alt="" />
        <span>登录 / 注册</span>
      </div>
    </div>

    <div class="content-tab">
      <van-grid clickable :column-num="2">
        <van-grid-item :to="{ name: 'colAndhis', params: { part: 0 } }">
          <i slot="icon" class="iconfont icon-love2"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item :to="{ name: 'colAndhis', params: { part: 1 } }">
          <i slot="icon" class="iconfont icon-clock"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="cell">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link :to="{ name: 'robot' }" />
    </div>
    <van-cell
      v-if="user"
      clickable
      title="退出登录"
      class="layout-cell"
      @click="onLogout"
    />
  </div>
</template>

<script>
//引入图片
import imgUrl from '@/assets/mobile.png'
//vuex内置的方法，可以访问store中的数据
import { mapState } from 'vuex'
//引入接口
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data() {
    return {
      imgUrl,
      userInfo: {},
    }
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: '确认退出么？',
        })
        .then(() => {
          //确认的操作【清除登陆状态】,把状态修改未null即可
          this.$store.commit('setUser', null)
        })
        .catch((err) => {
          console.log(err)
        })

      // this.$store.dispatch('user')
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取用户失败，请稍后重试！')
        //跳转回登陆页面
        this.$router.push('/login')
      }
    },
  },
  computed: {
    ...mapState(['user']), //如果只用到一次可以直接作为表达式插入，如果多次就写到这里
  },
  created() {
    if (this.user) {
      //加载用户信息
      this.loadUserInfo()
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  height: 361px;
  background: url('~@/assets/banner.png');
  background-size: cover;
  .login-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      margin-top: 30px;
      width: 150px;
      height: 150px;
    }
    span {
      font-size: 30px;
      color: #fff;
      letter-spacing: 5px;
      margin-top: 30px;
    }
  }
}
.user-info {
  .base-info {
    height: 200px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: #fff 5px solid;
      }
      span {
        font-size: 30px;
        margin-left: 23px;
      }
    }
  }
  .data-stats {
    height: 110px;
    color: #fff;
    display: flex;
    align-items: center;
    .data-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
.content-tab {
  .icon-love2 {
    font-size: 50px;
    color: #ffb4b4;
  }
  .icon-clock {
    font-size: 40px;
    color: #ffbe8f;
  }
  .text {
    margin-top: 10px;
    font-size: 30px;
  }
}
.cell {
  margin-top: 10px;
  margin-bottom: 10px;
}
.layout-cell {
  text-align: center;
  color: red;
}
</style>
