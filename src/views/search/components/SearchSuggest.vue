<template>
  <div class="search-suggest">
    <van-cell
      v-for="(e, i) in list"
      :key="i"
      icon="search"
      @click="$emit('search', e)"
      v-show="list[0] != null"
    >
      <!-- 设置搜索文字部分高亮，设置插槽 -->
      <!-- 思路：把需要高亮的加上html标签样式 -->
      <!-- 不要修改原始数组，定义一个方法来返回带标签的e -->
      <div slot="title" v-html="hightlight(e)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggest } from '@/api/search'
//按需加载
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    async getSuggest(val) {
      try {
        const { data } = await getSearchSuggest(val)
        this.list = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试！')
      }
    },
    hightlight(e) {
      if (this.list[0] != null) {
        const hightlightStr = `<span class="active">${this.searchText}</span>`
        //直接写的正则表达式里面任何内容都会被解析为需要匹配的字符串
        //除非用new RegExp来定义正则,括号里可以传入数据变量，第二个参数是末尾的规则
        const reg = new RegExp(this.searchText, 'gi')
        return e.replace(reg, hightlightStr)
      } else {
        return e
      }
    },
  },
  watch: {
    //监视谁写谁
    searchText: {
      /* handler(val) {
        this.getSuggest(val)
      }, */
      //添加防抖动
      handler: debounce(function (val) {
        this.getSuggest(val)
      }, 200),
      //立即调用
      immediate: true,
    },
  },
}
</script>

<style scoped lang="less">
/deep/.active {
  color: #ce110e;
  font-weight: bold;
}
</style>
