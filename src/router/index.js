import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/* {
  path: '/',
  redirect: '/login',
}, */

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', //默认子路由【只能有一个】
        name: 'home',
        component: () => import('@/views/home'),
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video'),
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my'),
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
  },
  {
    path: '/article/:articleId', //动态拼接文章id
    name: 'article',
    component: () => import('@/views/article'),
    props: true, //开启props传参
  },
  {
    path: '/user/profile',
    name: 'userprofile',
    component: () => import('@/views/userprofile'),
  },{
    path: '/my/colAndhis',
    name: 'colAndhis',
    component: () => import('@/views/colAndhis'),
  },{
    path: '/my/robot',
    name: 'robot',
    component: () => import('@/views/robot'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
