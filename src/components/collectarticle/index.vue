<template>
  <van-button
    class="btn2"
    @click="collection"
    :class="{ red: value }"
    :loading="loading"
  >
    <span slot="icon" class="iconfont icon-love"></span>
  </van-button>
</template>

<script>
import { collectArticle, cancelCollectArticle } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
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
    //收藏
    async collection() {
      this.loading = true
      try {
        if (this.value) {
          //取消收藏
          await cancelCollectArticle(this.artid)
          this.$emit('input', !this.value)
          this.$toast({
            message: '取消收藏！',
            icon: 'clear',
          })
        } else {
          await collectArticle(this.artid)
          this.$emit('input', !this.value)
          this.$toast({
            message: '收藏成功！',
            icon: 'like',
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
  color: #efb1b1;
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
