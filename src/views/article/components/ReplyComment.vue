<template>
  <div class="reply">
    <!-- 标题 -->
    <van-nav-bar
      :title="
        current.reply_count > 0 ? `${current.reply_count}条回复` : '暂无回复'
      "
      fixed
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>

    <div class="scroll">
      <!-- 置顶 评论 -->
      <CommentItem :list="current" :isbutton="false"></CommentItem>
      <!-- 评论回复 -->
      <AritleComment
        :artid="current.com_id"
        type="c"
        :list="comlist"
        @second-click="second"
        :status="status"
      ></AritleComment>
      <!--    <CommentItem v-for="(e, i) in getinfo22" :key="i" :list="e"></CommentItem> -->
    </div>

    <!-- 底部区域 -->
    <div class="buttom">
      <van-button icon="plus" @click="show = true">发布评论</van-button>
    </div>
    <!-- 底部区域 -->

    <!-- 主弹出遮罩层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '20%', weight: '100%' }"
    >
      <PostComment
        :artId="current.com_id"
        @postSuccess="onPostSuccess"
      ></PostComment>
    </van-popup>

    <!-- 副弹出遮罩层 -->
    <van-popup
      v-model="show5"
      position="bottom"
      :style="{ height: '20%', weight: '100%' }"
    >
      <PostComment
        v-if="show5"
        :artId="current.com_id"
        :addcontent="addcontent"
        @postSuccess2="onPostSuccess2"
      ></PostComment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import AritleComment from './AritleComment.vue'
import PostComment from './PostComment.vue'
export default {
  name: 'ReplyComment',
  inject: {
    articleID: {
      type: [Number, String, Object],
      default: null,
    },
  },
  props: {
    current: {
      type: Object,
      required: true,
    },
  },
  components: {
    CommentItem,
    AritleComment,
    PostComment,
  },
  data() {
    return {
      show: false,
      show5: false,
      comlist: [],
      getinfo22: [],
      addcontent: '',
      status: 1,
    }
  },
  methods: {
    onPostSuccess(data) {
      // 更新回复的数量
      this.current.reply_count++

      // 关闭弹层
      this.show = false

      // 将最新回复的内容展示到列表的顶部
      this.comlist.unshift(data.new_obj)
    },
    second(data) {
      this.show5 = true
      this.addcontent = `    <span style="color: red; font-weight: bold;"> @${data.aut_name} :${data.content}</span> `
    },
    onPostSuccess2(data) {
      // 更新回复的数量
      this.current.reply_count++

      // 关闭弹层
      this.show5 = false
      this.comlist.unshift(data.new_obj)
    },
  },
}
</script>

<style lang="less" scoped>
.reply {
  position: relative;
  .van-nav-bar {
    top: 132px;
  }
}
.scroll {
  padding-bottom: 100px;
  padding-top: 90px;
}
.buttom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #b6dcff;
  .van-button {
    width: 80%;
    height: 80%;
    background-color: #adf8ff;
  }
}
</style>
