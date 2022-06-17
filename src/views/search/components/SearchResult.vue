<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败,请点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(e, i) in list"
        :key="i"
        :title="e.title"
        :to="`/article/${e.art_id}`"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchContent: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      per_page: 20,
      error: false,
    }
  },
  methods: {
    async onLoad() {
      try {
        //获取数据
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchContent,
        })
        //装载数据
        const { results } = data.data
        this.list.push(...results)
        //调整状态
        this.loading = false
        //如果还有数据继续加载，没有就取消
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.search-result {
  height: 92vh;
  overflow-y: auto;
}
</style>
