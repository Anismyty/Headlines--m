<template>
  <div>
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('cancel')"
      @click-right="onClickRight"
    />

    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'NickName',
  data() {
    return {
      message: '',
    }
  },
  methods: {
    async onClickRight() {
      try {
        if (this.message.length === 0) {
          return this.$toast('请输入昵称')
        }
        await editUserProfile({
          name: this.message,
        })
        this.$toast.success('修改成功！')
        this.$emit('changeName', this.message)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped lang="less">
/deep/.van-cell {
  .van-field__control {
    text-align: left !important;
  }
  margin: 10px auto;
  width: 95vw;
  border: dashed 5px #64c7d2;
}
</style>
