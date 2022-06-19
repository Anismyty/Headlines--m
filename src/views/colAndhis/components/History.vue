<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(e, i) in list" :key="i" :title="e.title" /> -->
      <ArticleList
        v-for="(e, i) in historyList"
        :key="i"
        :article="e"
      ></ArticleList>
    </van-list>
  </div>
</template>

<script>
import { getUserHistory } from '@/api/user'
import ArticleList from '@/components/articleItem'

export default {
  name: 'MyHistory',
  components: {
    ArticleList,
  },
  data() {
    return {
      historyList: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getUserHistory({
          page: this.page,
          per_page: this.limit,
        })
        this.loading = false
        const { results } = data.data
        this.historyList.push(...results)
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取历史记录失败，请稍后重试！')
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
