<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <template #left>
        <van-icon name="cross" size="18" @click="$router.back()" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" class="form" ref="loginForm">
      <van-cell-group inset>
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="userFormRules.mobile"
        >
          <!-- 具名插槽 -->
          <i slot="left-icon" class="iconfont icon-phone"></i>
        </van-field>

        <van-field
          v-model="user.code"
          name="code"
          placeholder="请输入短信验证码"
          :rules="userFormRules.code"
        >
          <!-- 插槽 -->
          <i slot="left-icon" class="iconfont icon-password"></i>

          <template #button>
            <!-- 倒计时 -->
            <van-count-down
              :time="1000 * 60"
              format="ss s"
              v-if="isCountDownShow"
              @finish="isCountDownShow = false"
            />
            <!-- 按钮 -->
            <van-button
              v-else
              round
              native-type="button"
              size="small"
              color="#bababa"
              type="default"
              class="send-sms-button"
              @click="sendSms"
            >
              获取验证码
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button block type="primary" native-type="submit" color="#1886c6">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCaptcha } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: '',
      },
      //验证规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
          },
          {
            pattern: /^1[3|5|7|8]\d{9}/,
            message: '手机号格式错误',
          },
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误',
          },
        ],
      },
      isCountDownShow: false,
    }
  },
  methods: {
    async onSubmit() {
      const user = this.user
      //弹出提示框
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, //背景禁用点击
        loadingType: 'spinner',
        duration: 0, //持续时间, 0表示会一直存在
      })

      //数据成功或失败
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        //新的 toast都会覆盖旧的toast
        this.$toast.success('登录成功')
        //跳转到主页
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误！')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    },
    async sendSms() {
      //1.校验手机号
      try {
        //返回的是一个promise对象
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return this.$toast.fail(err.message)
      }
      //2.设定倒计时【按钮禁用】
      this.isCountDownShow = true
      //3.发送验证码
      try {
        await getCaptcha(this.user.mobile)
        this.$toast.success('验证码发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.satus === 429) {
          this.$toast.fail('请求频繁，请稍后再试')
        } else {
          this.$toast.fail('验证码发送失败')
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
.icon-phone,
.icon-password {
  font-size: 40px;
  margin-right: 15px;
}
.van-cell {
  align-items: center !important;
}
.send-sms-button {
  width: 160px;
  height: 46px;
  line-height: 46px;
  background-color: #f0f0f0 !important;
  border: 0px solid #e3e3e3 !important;
  color: #888888 !important;
}
.login-btn-wrap {
  padding: 53px 33px;
  button {
    background-color: #3992f1 !important;
    letter-spacing: 30px;
    font-size: 30px;
    border: none;
  }
}
.form {
  padding-top: 50px;
}
</style>
