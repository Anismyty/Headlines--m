<template>
  <div class="box">
    <van-cell-group inset class="insert">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-cell-group>
    <van-button
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      @click="pubComment"
      :disabled="!message.length"
    >
      发 <br />布
    </van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  props: {
    //目标id[可能是文章id也可能是评论id]
    artId: {
      type: [Number, String, Object],
      required: true,
    },
    addcontent: {
      type: String,
      default: '',
    },
  },
  //最外面文章id
  inject: {
    articleID: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      message: '',
    }
  },
  methods: {
    async pubComment() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0,
      })
      if (this.message.trim() === '') {
        this.$toast('请输入留言')
        return
      } else {
        try {
          const { data } = await addComment({
            //评论目标id [评论文章则为文章id,评论评论则为评论的id]
            target: this.artId,
            content: this.message + this.addcontent,
            art_id: this.articleID ? this.articleID.toString() : this.articleID,
          })
          this.$toast.success('发布成功')
          this.message = ''
          this.$emit('postSuccess', data.data)
          this.$emit('postSuccess2', data.data)
        } catch (err) {
          this.$toast.fail('操作失败,请重试!')
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  .insert {
    flex: 1;
    height: 200px;
    border: 1px solid rgb(211, 25, 25);
  }
  .van-button {
    margin-right: 10px;
    height: 200px;
  }
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
}
</style>
