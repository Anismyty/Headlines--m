<template>
  <div class="aritle-item">
    <van-cell
      :to="{ name: 'article', params: { articleId: article.art_id } }"
    >
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <div
            class="cover-item"
            v-for="(e, i) in article.cover.images"
            :key="i"
          >
            <van-image class="cover-item-img" fit="cover " :src="e" />
          </div>
        </div>
        <!-- 底部的文本信息 -->
        <div class="text">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <van-image
        slot="default"
        v-if="article.cover.type === 1"
        class="cover-one"
        width="100"
        height="100"
        fit="cover "
        :src="article.cover.images[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  // 过滤时间【包含时分秒】---这里用别人的包
  /*   filters: {
    //把时间转化为当前时间的相对时间【年月日时分秒】
    formatRelativeTime(time) {
      //把输入时间转化成毫秒数
      const date = new Date(time)
      const now = new Date()
      const diff = now - date
      const year = now.getFullYear() - date.getFullYear()
      const day = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hour = Math.floor(diff / (1000 * 60 * 60))
      const minute = Math.floor(diff / (1000 * 60))
      const second = Math.floor(diff / 1000)
      if (year > 0) {
        return `${year}年前`
      } else if (day > 0) {
        return `${day}天前`
      } else if (hour > 0) {
        return `${hour}小时前`
      } else if (minute > 0) {
        return `${minute}分钟前`
      } else if (second > 0) {
        return `${second}秒前`
      } else {
        return '刚刚'
      }
    },
  }, */
}
</script>

<style lang="less" scoped>
.aritle-item {
  .van-cell {
    .van-cell__title {
      .title {
        font-weight: bold;
        font-size: 32px;
      }
    }
    .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
      padding-left: 25px;
    }
    .cover-one {
      width: 232px !important;
      height: 146px !important;
    }
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      //不包括最后一个盒子
      &:not(:last-child) {
        padding-right: 4px !important;
      }
    }

    .cover-item-img {
      width: 100%;
      height: 146px;
    }
    justify-content: center;
    align-items: center;
  }
  .text span {
    font-style: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
}
</style>
