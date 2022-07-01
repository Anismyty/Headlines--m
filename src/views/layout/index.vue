<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <!-- 设置缓存，include写的是页面name属性 -->
    <keep-alive :include="['HomeIndex']">
      <router-view></router-view>
    </keep-alive>

    <!-- 标签底部 -->
    <!-- 开启路由模式，active就多余了 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item :to="{ name: 'home' }">
        <i slot="icon" class="iconfont icon-home"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{ name: 'qa' }">
        <i slot="icon" class="iconfont icon-problem"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{ name: 'video' }">
        <i slot="icon" class="iconfont icon-vedio2"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{ name: 'my' }">
        <i slot="icon" class="iconfont icon-my"></i>
        <span>{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {}
  },
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    .iconfont {
      font-size: 40px;
    }
    span {
      font-size: 20px;
      letter-spacing: 5px;
      margin-left: 5px;
    }
  }
  .top {
    padding-bottom: 100px;
  }
}
</style>
