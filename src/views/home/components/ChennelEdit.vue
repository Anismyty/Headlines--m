<template>
  <div class="edit">
    <van-cell-group>
      <!-- 第一行 -->
      <van-cell :border="false">
        <div slot="title" class="title">我的频道</div>
        <van-button
          round
          size="small"
          type="danger"
          plain
          class="edit-btn"
          @click="isEditShow = !isEditShow"
          >{{ isEditShow ? '完成' : '编辑' }}</van-button
        >
      </van-cell>

      <!-- 宫格 -->
      <van-grid class="edit-grid" :column-num="4">
        <van-grid-item
          v-for="(e, i) in myChannels"
          :key="i"
          class="grid-item"
          @click="changeChannel(e, i)"
        >
          <!-- 文字 -->
          <span class="text" :class="{ stayin: stayin === i }" slot="text">
            {{ e.name }}
          </span>
          <!-- 删除图标作为组件插入 -->
          <van-icon
            slot="icon"
            name="clear"
            v-show="isEditShow && !fixedChannels.includes(e.id)"
          ></van-icon>
        </van-grid-item>
      </van-grid>

      <!-- 第二行 -->
      <van-cell>
        <div slot="title" class="title">频道推荐</div>
      </van-cell>

      <!-- 宫格 -->
      <van-grid class="recommed-grid" :column-num="4">
        <van-grid-item
          v-for="(e, i) in recommendChannels"
          :key="i"
          icon="plus"
          :text="e.name"
          class="grid-item"
          @click="add_chennel(e)"
        />
      </van-grid>
    </van-cell-group>
    
  </div>
</template>

<script>
import { getChannelList, addUserChannel, delUserChannel } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    stayin: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEditShow: false,
      fixedChannels: [0], //固定频道，不允许删除
    }
  },
  methods: {
    async getChannel() {
      try {
        const { data } = await getChannelList()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast('获取频道失败！')
      }
    },
    //添加频道
    async add_chennel(item) {
      //临时频道
      // eslint-disable-next-line
      this.myChannels.push(item)
      if (this.user) {
        //已登录
        try {
          await addUserChannel({
            id: item.id,
            seq: this.myChannels.length,
          })
          this.$toast('添加成功！')
        } catch (err) {
          this.$toast('添加频道失败！')
        }
      } else {
        //未登录
        setItem('TOUTIAO_CHANNEL', this.myChannels)
      }
    },
    //编辑按钮点击事件
    changeChannel(item, index) {
      if (this.isEditShow) {
        //1.设置不允许删除
        if (this.fixedChannels.includes(item.id)) {
          this.$toast('该频道不允许删除！')
          return
        }
        //2.删除操作
        //eslint-disable-next-line
        this.myChannels.splice(index, 1)

        //3.删除频道传递给父级
        if (index <= this.stayin) {
          this.$emit('update', this.stayin - 1, true)
        }

        //4.把删除后的数据传给数据库【太多了，封装一个方法】
        this.delChannel(item.id)
      } else {
        //把点击的索引传给父组件
        this.$emit('update', index)
      }
    },

    //单独封装删除方法
    async delChannel(id) {
      try {
        if (this.user) {
          //已登陆
          await delUserChannel(id)
        } else {
          //未登录
          setItem('TOUTIAO_CHANNEL', this.myChannels)
        }
      } catch (err) {
        this.$toast('删除频道失败！')
      }
    },
  },
  created() {
    this.getChannel()
  },
  computed: {
    //用计算属性计算推荐频道
    recommendChannels() {
      //过滤myChannels
      return this.allChannels.filter((item) => {
        return !this.myChannels.some((myItem) => myItem.id === item.id)
      })
    },
    //映射仓用户信息
    ...mapState(['user']),
  },
}
</script>

<style scoped lang="less">
.edit {
  padding: 85px 0;
  .title {
    font-weight: bold;
    font-size: 30px;
    color: #05388b;
  }
  .edit-btn {
    width: 100px;
    height: 50px;
    background-color: #4083ef;
    border: #05388b 1px solid;
    color: #ebf3ff;
    letter-spacing: 5px;
  }
  /deep/ .grid-item {
    width: 160;
    height: 86px;
    margin-top: 15px;
    &:not(:nth-child(4n)) {
      padding-right: 10px;
    }
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #bcdcff;
    }
    .van-grid-item__text,
    .text {
      margin-top: 0;
      font-size: 25px;
      color: #424242;
    }
    .stayin {
      color: red !important;
      font-weight: bold;
    }
  }
  /deep/ .edit-grid {
    padding: 0 10px;
    .van-icon {
      position: absolute;
      right: -95px;
      top: -38px;
      font-size: 30px;
      color: #970e0e;
      z-index: 1;
    }
  }
  /deep/ .recommed-grid {
    padding: 0 10px;
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        width: 172px;
        .van-icon-plus {
          font-size: 28px;
          color: #0749b4;
          font-weight: bold;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
