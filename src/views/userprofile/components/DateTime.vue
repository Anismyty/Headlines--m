<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
    :formatter="formatter"
  />
</template>

<script>
import { editUserProfile } from '@/api/user'

export default {
  name: 'DateTime',
  props: {
    currentBirth: {
      default: '',
    },
  },
  data() {
    return {
      currentDate: new Date(this.currentBirth),
      minDate: new Date(new Date().getFullYear() - 100, 1, 1),
      maxDate: new Date(new Date()),
      formatter: (type, val) => {
        if (type === 'year') {
          return `${val}年`
        }
        if (type === 'month') {
          return `${val}月`
        }
        if (type === 'day') {
          return `${val}日`
        }
      },
      birthday: '',
    }
  },
  methods: {
    async onConfirm(date) {
      try {
        this.birthday = formatDate(date)
        await editUserProfile({
          birthday: this.birthday,
        })
        this.$emit('changeDate', this.birthday)
        this.$toast.success('修改成功！')
      } catch (err) {
        this.$toast.fail('修改失败！')
      }
    },
  },
}
function formatDate(time) {
  var date = new Date(time)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return year + '-' + month + '-' + day
}
</script>

<style lang="less" scoped></style>
