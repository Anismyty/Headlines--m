<template>
  <van-button
    class="btn2"
    @click="liking"
    :class="{ red: value === 1 }"
    :loading="loading"
  >
    <span slot="icon" class="iconfont icon-nice2"></span>
  </van-button>
</template>

<script>
import { likeArticle, cancelLikeArticle } from '@/api/article'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true,
    },
    artid: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async liking() {
      this.loading = true
      try {
        if (this.value === 1) {
          //取消点赞
          await cancelLikeArticle(this.artid)
          this.$emit('input', -1)
          this.$toast({
            message: '取消点赞！',
            icon: 'clear',
          })
        } else {
          await likeArticle(this.artid)
          this.$emit('input', 1)
          this.$toast({
            message: '点赞成功！',
            icon: 'good-job',
          })
        }
      } catch (err) {
        this.$toast.fail('操作失败,请重试!')
      }
      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
.red {
  color: #ff4646;
}
.btn2 {
  width: auto;
  background-color: transparent;
  border: none;
  padding: 0;
  .iconfont {
    font-size: 50px;
  }
}
</style>
