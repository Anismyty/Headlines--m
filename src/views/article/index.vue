<template>
  <div class="article-container">
    <van-nav-bar title="文章详情" left-arrow fixed @click-left="onClickBack" />

    <!-- 加载中 -->
    <div class="roll" v-if="loading2">
      <van-loading type="spinner" size="50px" vertical color="#0094ff">
        加载中
      </van-loading>
    </div>
    <!-- 加载中 -->

    <!-- 正文部分 -->
    <div v-else-if="userinfom.title" class="third">
      <van-cell :title="this.userinfom.title" class="title" :border="false" />

      <!-- 第二行 -->
      <van-cell :border="false" class="user">
        <div slot="icon">
          <van-image
            round
            width="50px"
            height="50px"
            fit="cover"
            :src="userinfom.aut_photo"
          />
        </div>
        <div slot="title" class="userInfo">
          <span>{{ userinfom.aut_name }}</span>
          <span>{{ userinfom.pubdate | relativeTime }}</span>
        </div>
        <div slot="right-icon">
          <!-- 模板中的$event就是事件参数 -->
          <!-- :isfollowed="userinfom.is_followed" -->
          <!-- @update="userinfom.is_followed = $event" -->
          <FollowUsering
            :userid="userinfom.aut_id"
            v-model="userinfom.is_followed"
          ></FollowUsering>
        </div>
      </van-cell>
      <!-- 第二行 -->

      <div>
        <div class="one markdown-body">
          <p ref="article-content" v-html="this.userinfom.content"></p>
        </div>
        <van-divider>正文结束</van-divider>
      </div>

      <!-- 底部区域 -->
      <footer>
        <!-- 写评论 -->
        <van-button color="#7232dd" plain round class="btn1" @click="writeOne">
          写评论
        </van-button>

        <!-- 第一层评论遮罩层 -->
        <van-popup
          v-model="show"
          position="buttom"
          :style="{ height: '30%', width: '100%' }"
        >
          <PostComment
            :artId="userinfom.art_id"
            @postSuccess="onSuccess"
          ></PostComment>
        </van-popup>
        <!-- 第一层评论遮罩层 -->

        <!-- 看评论 -->
        <van-icon
          class-prefix="iconfont icon-love4"
          class="iconfont"
          :badge="totalcomments"
        />

        <!-- 收藏 -->
        <CollectArticle
          v-model="userinfom.is_collected"
          :artid="userinfom.art_id"
        ></CollectArticle>

        <!-- 点赞 -->
        <LikeArticle
          v-model="userinfom.attitude"
          :artid="userinfom.art_id"
        ></LikeArticle>

        <!-- 分享 -->
        <van-icon
          class-prefix="iconfont icon-share"
          class="iconfont"
          @click="share"
        />
      </footer>
      <!-- 底部区域 -->

      <!-- 评论区域 -->
      <AritleComment
        :artid="userinfom.art_id"
        @onload-success="totalcomments = $event.total_count"
        :list="commentlist"
        @reply-click="onReplyClick"
      ></AritleComment>
      <!-- 评论区域 -->
    </div>
    <!-- 正文部分 -->

    <!-- 404资源不存在 -->
    <div v-else-if="status === 404" class="error">
      <van-empty image="error" description="该资源不存在或已删除" />
    </div>

    <!-- 网络等其他错误 -->
    <div class="otherError" v-else>
      <van-empty image="network" description="内容加载失败">
        <van-button
          round
          type="danger"
          class="bottom-button"
          @click="getDetail"
        >
          重新刷新
        </van-button>
      </van-empty>
    </div>

    <!-- 评论回复 -->
    <van-popup
      v-model="show2"
      position="bottom"
      :style="{ height: '90%', width: '100%' }"
    >
      <ReplyComment
        v-if="show2"
        :current="currentcomment"
        @close="show2 = false"
      ></ReplyComment>
    </van-popup>

    <!-- 分享 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
import FollowUsering from '@/components/followuser'
import CollectArticle from '@/components/collectarticle'
import LikeArticle from '@/components/likearticle'
import AritleComment from './components/AritleComment.vue'
import PostComment from './components/PostComment.vue'
import ReplyComment from './components/ReplyComment.vue'

import { ImagePreview } from 'vant'
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  components: {
    FollowUsering,
    CollectArticle,
    LikeArticle,
    AritleComment,
    PostComment,
    ReplyComment,
  },
  //给所有的后代组件提供数据
  provide() {
    return {
      articleID: this.articleId,
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      userinfom: [],
      loading2: true, //控制顶部加载
      status: 0, //控制网络等其他错误部分的显示
      totalcomments: 0, //评论总数
      show: false, //评论弹窗
      commentlist: [],
      show2: false, //评论回复弹窗
      currentcomment: {}, //当前评论
      showShare: false, //分享弹窗
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    }
  },
  methods: {
    onClickBack() {
      this.$router.back()
    },
    //请求数据
    async getDetail() {
      this.loading = true
      try {
        const { data } = await getArticleDetail(this.articleId)
        //测试随机
        /* if (Math.random() > 0.5) {
          JSON.parse('shdfgeyhjsgbegeb')
        } */
        this.userinfom = data.data

        //设置图片预览[异步操作]
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.status = 404
        } else {
          this.status = 2
        }
      }
      //无论成功失败都关闭
      this.loading2 = false
    },
    //图片预览
    previewImage() {
      const box = this.$refs['article-content']
      const imgs = box.querySelectorAll('img')
      const imgUrls = []
      imgs.forEach((img, i) => {
        imgUrls.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: imgUrls,
            startPosition: i, //点击谁谁出现
          })
        }
      })
    },
    //写评论
    writeOne() {
      this.show = true
    },
    //添加成功后渲染页面
    onSuccess(data) {
      //关闭弹窗
      this.show = false
      //把内容添加到列表最前面
      this.commentlist.unshift(data.new_obj)
      //更新评论总数
      this.totalcomments++
    },
    onReplyClick(comment) {
      //显示评论回复弹出层
      this.show2 = true
      this.currentcomment = comment
    },
    share() {
      this.showShare = true
    },
  },
  created() {
    this.getDetail()
  },
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  background-color: #1f9de6;
  width: 100vw;
  .van-nav-bar__title {
    color: #fff;
    letter-spacing: 10px;
  }
  .van-nav-bar__left {
    .van-icon {
      color: #fff;
    }
  }
}

.user {
  .van-cell__title {
    margin-left: 30px;
    .userInfo {
      display: flex;
      flex-direction: column;
    }
  }
}
.van-tabbar {
  width: 100vw;
  .van-tabbar-item {
    flex: unset;
  }
  .btn1 {
    width: 400px;
    .van-button {
      width: 300px;
      height: 50px;
    }
  }
  .small {
    flex: 1;
  }
}
.roll {
  display: flex;
  width: 100%;
  height: 500px;
  margin-top: 92px;
  align-items: center;
  background-color: #fff;
  .van-loading {
    width: 100%;
  }
}
.one {
  padding-left: 5px;
  padding-right: 5px;
  p {
    font-size: 30px;
  }
}
.error {
  margin-top: 92px;
}
.third {
  padding-top: 92px;
  padding-bottom: 100px;
  width: 100vw;
  overflow: hidden;
  .title {
    font-weight: bold;
  }
}
.otherError {
  padding-bottom: 100px;
  .bottom-button {
    width: 500px;
    height: 60px;
    letter-spacing: 10px;
  }
}

footer {
  width: 100vw;
  height: 100px;
  background-color: #e9f7ff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  border-top: 1px solid #737f86;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .btn1 {
    width: 350px;
    height: 60px;
  }
  .iconfont {
    font-size: 50px;
    position: relative;
  }
}
</style>
