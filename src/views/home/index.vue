<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <div class="top-logo">
      <van-nav-bar class="page-nav-bar">
        <!-- 左侧logo图标 -->
        <template #left>
          <van-image width="100" height="45" fit="contain" :src="imgUrl" />
        </template>
        <!-- 按钮 -->
        <van-button
          class="search-btn"
          slot="title"
          type="info"
          size="small"
          round
          icon="search"
          to='/search'
        >
          搜索
        </van-button>
      </van-nav-bar>
    </div>

    <!-- 频道列表 -->
    <div class="center-content">
      <van-tabs v-model="active" animated swipeable class="channel-tabs">
        <van-tab v-for="e in channelList" :key="e.id" :title="e.name">
          <ArticleList :channel="e"></ArticleList>
        </van-tab>
        <!-- 占位的盒子 -->
        <div slot="nav-right" class="placeholder"></div>
        <div class="list" slot="nav-right" @click="isChennelEditShow = true">
          <i class="iconfont icon-list"></i>
        </div>
      </van-tabs>
    </div>

    <!-- 频道弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 弹出层内容封装成组件 -->
      <ChennelEdit
        @update="update"
        :myChannels="channelList"
        :stayin="active"
      ></ChennelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/ArticleList'
import ChennelEdit from './components/ChennelEdit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

import imgUrl from '@/assets/logo.png'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChennelEdit,
  },
  data() {
    return {
      active: 0,
      channelList: [],
      imgUrl,
      isChennelEditShow: false,
    }
  },
  methods: {
    async loadChannels() {
      try {
        let channelNow = []
        //判断逻辑
        //1.是否登录
        if (this.user) {
          const { data } = await getUserChannels()
          channelNow = data.data.channels
        } else {
          //2.未登录，获取默认频道
          const defaultChannels = getItem('TOUTIAO_CHANNEL')
          if (defaultChannels) {
            //2.1如果本地有存储默认
            channelNow = defaultChannels
          } else {
            //2.2本地没有存储默认，直接拿到默认列表
            const { data } = await getUserChannels()
            channelNow = data.data.channels
          }
        }
        //3.更新频道列表
        this.channelList = channelNow
      } catch (error) {
        this.$toast('获取频道失败！')
      }
    },
    //给一个默认值参数控制遮罩层
    update(index, show = false) {
      this.active = index
      this.isChennelEditShow = show
    },
  },
  created() {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<style lang="less" scoped>
.top-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 92px;
  background: #fff;
  z-index: 999;
}
.center-content {
  padding-top: 90px;
  position: relative;
  .van-tabs__wrap {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
}

.home-container {
  padding-top: 80px;
  .page-nav-bar {
    .van-nav-bar__title {
      max-width: unset !important;
      .search-btn {
        width: 300px;
        height: 64px;
        background-color: #a5dbfe;
        border: none;
        font-size: 28px;
        margin-left: 400px;
        .van-icon {
          font-size: 38px;
        }
      }
    }
  }
}
/deep/ .channel-tabs {
  .van-tabs__wrap {
    height: 82px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    margin-top: 90px;
  }
  .van-tab {
    min-width: 200px;
    border-right: 1px solid #e8e8e8;
    font-size: 30px;
    color: #777777;
  }
  .van-tab--active {
    color: #414141;
    font-weight: bold;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background-color: #056cfe;
    margin-bottom: 8px;
  }
  .list {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.8;
    i {
      font-size: 50px;
      color: #4f4f4f;
      font-weight: bold;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      display: inline-block;
      width: 2px;
      height: 100%;
      background-image: linear-gradient(#e8e8e8, #797979, #e8e8e8);
    }
  }
  .placeholder {
    //因为父级元素有flex，所以这个宽度会被自动设置为0
    //解决方法：脱离flex布局
    flex-shrink: 0;
    width: 50px;
    height: 82px;
  }
  //因为超过五个才会自动滚动并且居中，小于五个的时候会有标签显示不全
  .van-tabs__nav--line {
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>
