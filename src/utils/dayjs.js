import Vue from 'vue'
import dayjs from 'dayjs'

//加载中文语言包
import 'dayjs/locale/zh-cn'

//全局配置中文
dayjs.locale('zh-cn')

//获取当前最新时间并且格式化
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

//配置相对时间
let relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

//XX年前
// console.log(dayjs().to(dayjs('2018')));

//定义全局过滤器
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
