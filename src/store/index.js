import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    //一个对象，用来存储当前用户信息
    // user: null,
    //初始化为了有数据，应该从本地存储中拿取
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY)) || null,
    user: getItem(TOKEN_KEY),
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      //防止刷新丢失，将数据备份到本地
      //window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    },
  },
  actions: {},
  modules: {},
})
