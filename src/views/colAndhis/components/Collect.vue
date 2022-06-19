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
        v-for="(e, i) in list"
        :key="i"
        :article="e"
        :isShowOther="1"
      ></ArticleList>
    </van-list>
  </div>
</template>

<script>
import { getUserCollect } from '@/api/user'
import ArticleList from '@/components/articleItem'

export default {
  name: 'MyCollect',
  components: {
    ArticleList,
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      limit: 10,
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getUserCollect({
          page: this.page,
          per_page: this.limit,
        })
        this.loading = false
        const { results } = data.data
        this.list.push(...results)
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
    },
  },
  created() {},
}
</script>

<style lang="less" scoped></style>
