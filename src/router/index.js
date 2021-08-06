import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => {
        require(['../views/index.vue'], resolve)
      }
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => {
        require(['../views/home/index.vue'], resolve)
      }
    }
  ]
})
export default router
