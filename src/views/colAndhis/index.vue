<template>
  <div>
    <van-nav-bar
      title="收藏/历史"
      left-arrow
      @click-left="$router.back()"
      fixed
      z-index="9999"
    />
    <div class="tag">
      <van-tabs v-model="active">
        <van-tab title="收藏" class="title"><Collect></Collect></van-tab>
        <van-tab title="历史" class="title"><History></History></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Collect from './components/Collect'
import History from './components/History'

export default {
  name: 'MyCollection',
  components: {
    Collect,
    History,
  },
  data() {
    return {
      active: Number(this.$route.params.part),
      articlCollect: [],
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__content {
  background-color: #0083db;
  .van-nav-bar__title {
    color: #fff;
    letter-spacing: 10px;
  }
  .van-nav-bar__left {
    .van-icon {
      color: #fff !important;
    }
  }
}
/deep/.tag {
  margin-top: 95px;
  position: relative;
  .van-tabs__wrap{
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 899;
  }
  .van-tabs__content{
    margin-top: 200px;
  }
}
</style>
