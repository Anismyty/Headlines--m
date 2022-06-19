<template>
  <div class="userprofile">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        width="50px"
        height="50px"
        round
        fit="cover"
        :src="userInfo.photo"
      />
      <input type="file" hidden ref="file" @change="getfile" />
    </van-cell>

    <!-- 昵称 -->
    <van-cell title="昵称" is-link :value="userInfo.name" @click="showname" />

    <!-- 性别 -->
    <van-field
      readonly
      clickable
      label="性别"
      :value="value"
      placeholder="选择城市"
      right-icon="arrow"
      @click="showSex = true"
    />

    <van-cell
      title="生日"
      is-link
      :value="userInfo.birthday"
      @click="showDate = true"
    />

    <!-- 编辑昵称 -->
    <van-popup v-model="showName" position="bottom" :style="{ height: '100%' }">
      <NickName @cancel="showName = false" @changeName="changeName"></NickName>
    </van-popup>

    <!-- 性别选择框 -->
    <van-popup v-model="showSex" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showSex = false"
        @confirm="onConfirmSex"
      />
    </van-popup>

    <!-- 生日弹出层 -->
    <van-popup v-model="showDate" position="bottom" :style="{ height: '50%' }">
      <DateTime
        :currentBirth="userInfo.birthday"
        @changeDate="changeDate"
      ></DateTime>
    </van-popup>

    <!-- 照片弹出层 -->
    <van-popup
      v-model="showPhoto"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdatePhoto
        :pictureUrl="picUrl"
        @cancel="showPhoto = false"
        v-if="showPhoto"
        @confirm="updatePhoto"
      ></UpdatePhoto>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, editUserProfile } from '@/api/user'
import NickName from './components/NickName'
import DateTime from './components/DateTime'
import UpdatePhoto from './components/UpdatePhoto'
export default {
  name: 'UserProfile',
  components: {
    NickName,
    DateTime,
    UpdatePhoto,
  },
  data() {
    return {
      userInfo: {},
      columns: ['男', '女'],
      value: '',
      showSex: false,
      showName: false,
      showDate: false,
      showPhoto: false,
      picUrl: null,
    }
  },
  methods: {
    //获取用户资料
    async getUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.userInfo = data.data
        this.value = data.data.gender === 0 ? '男' : '女'
      } catch (err) {
        this.$toast('获取用户失败，请稍后重试！')
        console.log(err)
      }
    },

    //修改昵称
    showname() {
      this.showName = true
    },
    changeName(name) {
      this.showName = false
      this.userInfo.name = name
    },

    //编辑性别[传对象]
    async onConfirmSex(value) {
      try {
        await editUserProfile({
          gender: value === '男' ? 0 : 1,
        })
        this.$toast.success('修改性别成功!')
      } catch (err) {
        this.$toast('修改失败，请稍后重试！')
      }
      this.value = value
      this.showSex = false
    },
    //修改生日
    changeDate(time) {
      this.userInfo.birthday = time
      this.showDate = false
    },
    //监听文件
    getfile() {
      const file = this.$refs.file.files[0]
      this.picUrl = window.URL.createObjectURL(file)
      this.showPhoto = true

      //上传同一张照片,弹出层不会触发:change不会监听同一个行为
      this.$refs.file.value = ''
    },
    //上传照片
    updatePhoto(photoUrl) {
      this.showPhoto = false
      this.userInfo.photo = photoUrl
    },
  },
  created() {
    this.getUserProfile()
  },
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background-color: #43c2ef;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
    letter-spacing: 15px;
  }
}
.van-cell {
  align-items: center;
}
/deep/.van-field__control {
  text-align: right;
}
</style>
