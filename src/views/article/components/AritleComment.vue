<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败,请点击重试"
    :immediate-check="false"
    @load="onLoad"
  >
    <!-- 第一行 -->
    <van-cell title="全部评论">
      <template #icon>
        <van-icon class="iconfont icon-chat" />
      </template>
    </van-cell>
    <!-- 第一行 -->

    <!-- 遍历循环的评论内容 -->
    <CommentItem
      v-for="(e, i) in list"
      :key="i"
      :list="e"
      @reply-click="toIndedx"
      @second-click="second"
      :status='status'
    ></CommentItem>
    <!-- 遍历循环的评论内容 -->
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './CommentItem'

export default {
  name: 'AritleComment',
  components: {
    CommentItem,
  },
  props: {
    artid: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      validator: (val) => ['c', 'a'].includes(val),
      default: 'a',
    },
    //控制按钮是否显示回复条数
    status: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null, //下一页的时间戳
      limit: 10, //每页的条数
      error: false,
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComment({
          type: this.type,
          source: this.artid.toString(),
          offset: this.offset,
          limit: this.limit,
        })
        const { results } = data.data
        //追加数组
        this.list.push(...results)

        this.$emit('onload-success', data.data)

        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    toIndedx(list) {
      this.$emit('reply-click', list)
    },
    second(list) {
      this.$emit('second-click', list)
    },
  },
  //这个导致了数据的重新获取
  //并且手动设置load是不会触发内部的loading方法
  created() {
    this.loading = true
    this.onLoad()
  },
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 50px;
  margin-right: 5px;
}
.van-cell {
  align-items: center;

  .van-image {
    margin-right: 30px;
  }
}
</style>
