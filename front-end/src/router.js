import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/components/signup'),
      meta: {title: '注册'}
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/components/signin'),
      meta: {title: '注册'}
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/home'),
      meta: {title: '注册'}
    },
    {
      path: '/writeEssay',
      name: 'writeEssay',
      component: () => import('@/components/writeEssay'),
      meta: {title: '注册'}
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/home'),
      meta: {title: '注册'}
    },
    {
      path: '/essayInfo',
      name: 'essayInfo',
      component: () => import('@/components/essayInfo'),
      meta: {title: '注册'}
    }
  ]

})