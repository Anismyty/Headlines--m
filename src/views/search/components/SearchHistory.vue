<template>
  <div class="search-history">
    <van-cell title="搜素历史">
      <van-button
        round
        size="mini"
        v-if="isdel"
        color="#7232dd"
        plain
        @click="allDel"
      >
        全部删除
      </van-button>
      <van-button
        round
        size="mini"
        v-if="isdel"
        color="#7232dd"
        plain
        @click="changeFn2"
      >
        完成
      </van-button>
      <van-icon name="delete" v-else @click="changeFn" />
    </van-cell>
    <van-cell
      v-for="(e, i) in stayList"
      :key="i"
      :title="e"
      @click="searchChose(e)"
    >
      <van-icon name="close" class="search-icon" @click="fn(i)" v-if="isdel" />
    </van-cell>
  </div>
</template>

<script>
// import { getSearchHistory } from '@/api/search'
export default {
  name: 'SearchHistory',
  props: {
    stayList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isdel: false,
    }
  },
  methods: {
    /* async getHistory() {
      try {
        const res = await getSearchHistory()
        console.log(res);
      } catch (err) {
        console.log(err)
      }
    }, */

    //删除某一个
    fn(i) {
      this.$emit('delkey', i)
    },
    //删除全部
    allDel() {
      this.$emit('allDel')
    },
    //删除图标状态变化
    changeFn() {
      if (this.stayList.length === 0) {
        this.$toast('没有搜索历史记录')
        return
      }
      this.isdel = !this.isdel
    },
    //完成状态变化
    changeFn2() {
      this.isdel = !this.isdel
    },
    searchChose(e) {
      if (!this.isdel) {
        this.$emit('search', e)
      }
    },
  },
  created() {
    // this.getHistory()
  },
}
</script>

<style lang="less" scoped>
.search-icon {
  font-size: 40px;
  color: #890101;
}
.van-button__text {
  font-size: 20px;
  color: #481414;
}
</style>
