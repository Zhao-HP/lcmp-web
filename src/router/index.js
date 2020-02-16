import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
      path: '/',
      name: 'login',
      component: ()=>import('@/views/user/login'),
      meta:{title:'登录'}
    },{
      path: '/index',
      name: 'index',
      component: ()=>import('@/views/index/index'),
      meta:{title:'主页'}
    }
];

const createRouter =() => new Router({
    mode: 'history',
    scrollBehavior: ()=>({y: 0}),
    routes: constantRoutes
})

const router = createRouter();
export default router
