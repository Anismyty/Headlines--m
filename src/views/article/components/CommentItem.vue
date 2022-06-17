<template>
  <div>
    <van-cell>
      <!-- 头像 -->
      <van-image
        slot="icon"
        round
        width="50px"
        height="50px"
        fit="cover"
        :src="list.aut_photo"
      />
      <!-- 标题 -->
      <div slot="title" class="title">
        <div>{{ list.aut_name }}</div>
        <van-button
          size="normal"
          :icon="list.is_liking ? 'good-job' : 'good-job-o'"
          class="good"
          :loading="commLoding"
          :class="{ red: list.is_liking }"
          @click="onCommentLike"
        >
          {{ list.like_count || '赞' }}
        </van-button>
      </div>

      <!-- 标签 -->
      <div slot="label" class="label">
        <span class="content" v-html="list.content"></span>
        <div class="other">
          <span>{{ list.pubdate | relativeTime }}</span>
          <van-button
            size="normal"
            class="comment"
            @click.prevent="toreply"
            @click="second"
            v-if="isbutton"
          >
            回复 {{ status === 0 ? list.reply_count : '' }}
          </van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addCommentLike, delCommentLike } from '@/api/comment.js'
export default {
  name: 'CommentItem',
  props: {
    list: {
      type: [Array, Object],
      required: true,
    },
    isbutton: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      commLoding: false,
    }
  },
  methods: {
    async onCommentLike() {
      this.commLoding = true
      try {
        if (this.list.is_liking) {
          await delCommentLike(this.list.com_id)
          this.list.like_count--
        } else {
          await addCommentLike(this.list.com_id)
          this.list.like_count++
        }
        this.list.is_liking = !this.list.is_liking
      } catch (err) {
        this.$toast('操作失败,请重试!')
      }
      this.commLoding = false
    },
    toreply() {
      this.$emit('reply-click', this.list)
    },
    second() {
      this.$emit('second-click', this.list)
    },
  },
}
</script>

<style lang="less" scoped>
.van-cell {
  .van-image {
    margin-right: 30px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .good {
      background-color: transparent;
      border: none;
    }
  }
  .label {
    display: flex;
    flex-direction: column;
    .content {
      color: #181818;
      font-style: italic;
      padding-bottom: 20px;
    }
    .other {
      display: flex;
      align-items: center;
      .comment {
        width: 100px;
        height: 50px;
        font-size: 20px;
        white-space: nowrap;
        margin-left: 30px;
      }
    }
  }
}
.red {
  color: #ba0000;
}
</style>
