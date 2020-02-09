import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import('@/views/user/login')
    },{
      path:'/gauge',
      name:"gauge",
      component: ()=>import('@/views/demo/gauge')
    },{
      path:'/pieCharts',
      name:'pieCharts',
      component:()=>import('@/views/demo/pieCharts')
    }
  ]
})
