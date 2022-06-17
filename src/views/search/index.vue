<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- form表单的【/】可以让用户在移动端输入的时候自动出现搜索按钮 -->
    <form class="top-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#00A2FC"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShow = false"
      >
      </van-search>
    </form>
    <!-- 搜索栏 -->

    <div class="content">
      <!-- 搜索结果 -->
      <SearchResult v-if="isShow" :searchContent="searchText"></SearchResult>
      <!-- 搜索结果 -->

      <!-- 联想建议 -->
      <SearchSuggest
        v-else-if="searchText"
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
      <!-- 联想建议 -->

      <!-- 搜索历史纪录-->
      <SearchHistory
        v-else
        :stayList="searchHistory"
        @delkey="delKey"
        @allDel="alldel"
        @search="onSearch"
      ></SearchHistory>
      <!-- 搜索历史纪录 -->
    </div>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import SearchResult from './components/SearchResult.vue'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult,
  },
  data() {
    return {
      searchText: '',
      isShow: false,
      searchHistory: getItem('TOUTIAO_SEARCH_HISTORIES') || [], //搜索历史记录
    }
  },
  methods: {
    //只有按回车才会进入这个函数
    onSearch(val) {
      //更新文本框内容
      this.searchText = val

      //存储搜索历史
      //要求：1、新的在前面；2、不要有重复
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)

      //渲染搜索结果
      this.isShow = true
    },
    onCancel() {
      this.$router.back()
    },
    //删除搜索历史记录
    delKey(i) {
      this.searchHistory.splice(i, 1)
    },
    //全部删除搜索历史记录
    alldel() {
      this.searchHistory = []
    },
  },
  watch: {
    searchHistory(N) {
      setItem('TOUTIAO_SEARCH_HISTORIES', N)
    },
  },
}
</script>

<style lang="less" scoped>
.van-search {
  .van-search__action {
    color: #700404;
    font-weight: bold;
  }
}
.top-form {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  right: 0;
}
.content {
  margin-top: 112px;
}
</style>
