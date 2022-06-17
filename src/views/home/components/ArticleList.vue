<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(e, i) in list"
          :key="i"
          :article="e"
        ></ArticleItem>
        <!-- <van-cell v-for="(e, i) in list" :key="i" :title="e.title" /> -->
      </van-list>
    </van-pull-refresh>
    
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import ArticleItem from '@/components/articleItem'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      finished: false,
      refreshing: false,
      loading: false,
      timestamp: null,
      error: false, //控制失败提示
      successText: '刷新成功！',
    }
  },
  methods: {
    //初始化或滚动到底部会触发【loading自动为true】
    async onLoad() {
      try {
        const { data } = await getArticleById({
          channel_id: this.channel.id,
          //时间戳，最新时间戳相当于第一页
          //返回的数据会有下一页时间戳的信息
          timestamp: this.timestamp || Date.now(),
          //是否包含置顶【0不包含，1包含】
          with_top: 1,
        })

        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        //如果存在长度，就是有内容，自动获取下一页
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // this.$toast('获取文章失败！')
        this.error = true
        this.loading = false
      }
    },
    //下拉刷新
    async onRefresh() {
      // 清空列表数据
      /*       this.list = []
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
      this.refreshing = false
       */
      try {
        //获取数据
        const { data } = await getArticleById({
          channel_id: this.channel.id,
          //下拉刷新就是获取最新时间戳
          timestamp: Date.now(),
          //是否包含置顶【0不包含，1包含】
          with_top: 1,
        })
        //将数据追加到最前面
        const { results } = data.data
        this.list.unshift(...results)
        //关闭下拉刷新
        this.refreshing = false
        this.successText = `刷新成功！更新了${results.length}条数据`
      } catch (err) {
        this.refreshing = false
        this.successText = '刷新失败！'
      }
    },
  },
}
</script>

<style lang="less" scoped>
.article-list {
  //让滚动就处于当前的视口内
  height: 81vh;
  overflow-y: auto;
}
</style>
