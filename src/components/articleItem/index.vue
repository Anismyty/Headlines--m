<template>
  <div class="aritle-item" v-if="a">
    <van-cell :to="{ name: 'article', params: { articleId: article.art_id } }">
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
    <div class="isShowOther" v-if="isShowOther === 1">
      <span>
        <van-badge :content="article.comm_count">
          <i class="iconfont icon-love4"></i>
        </van-badge>
        评论
      </span>
      <span>
        <van-badge :content="article.like_count">
          <i class="iconfont icon-nice2"> </i>
        </van-badge>
        点赞
      </span>
      <span @click="fresh">
        <CollectArticle v-model="a" :artid="article.art_id"> </CollectArticle>
        收藏
      </span>
    </div>
  </div>
</template>

<script>
import CollectArticle from '@/components/collectarticle'

export default {
  name: 'ArticleList',
  components: {
    CollectArticle,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
    isShowOther: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      a: true,
    }
  },
  methods: {
    //获取文章详情
    fresh() {
      //点击刷新页面
      this.a = !this.a
    },
  },
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
.isShowOther {
  width: 100%;
  display: flex;
  height: 80px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  background-color: #fdfdfd;
  span {
    flex: 1;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 40px;
      margin-right: 20px;
    }
  }
  span:nth-child(2) {
    border-right: #d8d8d8 1px solid;
    border-left: #d8d8d8 1px solid;
  }
  .like {
    color: #ffc0c0;
  }
}
/deep/.van-badge--fixed {
  top: 20px;
  right: 15px;
}
</style>
