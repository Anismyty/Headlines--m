<template>
  <div class="pic">
    <div class="top"><img ref="img" :src="pictureUrl" alt="" /></div>
    <div class="buttom">
      <div class="left" @click="$emit('cancel')">取消</div>
      <div class="right" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserPhoto } from '@/api/user'

export default {
  name: 'UpdatePhoto',
  props: {
    pictureUrl: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    }
  },
  methods: {
    onConfirm() {
      //如果服务端有配置,可以使用这个传递图片裁剪的参数即可
      //this.cropper.getData()
      //服务端没有配置,就传递剪裁后的图片数据
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData()
        formData.append('photo', blob)
        this.$toast.loading({
          message: '上传中...',
          forbidClick: true,
          duration: 0,
        })
        try {
          const { data } = await editUserPhoto(formData)
          console.log(formData);
          this.$emit('confirm', data.data.photo)
          this.$toast.success('修改成功')
        } catch (err) {
          this.$toast.fail('修改失败')
        }
      })
    },
  },
  //操作dom元素,在mounted生命周期函数中执行
  mounted() {
    const img = this.$refs.img
    this.cropper = new Cropper(img, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    })
  },
}
</script>

<style lang="less" scoped>
.pic {
  background-color: #000000;
  height: 100%;
  position: relative;
  .top {
    height: 92%;
  }
  img {
    display: block;
    max-width: 100%;
  }
  .buttom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 8%;
    display: flex;
    color: white;
    background-color: rgb(0, 0, 0);
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    .left {
      margin-left: 20px;
    }
    .right {
      margin-right: 20px;
    }
  }
}
</style>
