import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import serverRouter from "./module/serverRouter";

Vue.use(Router);

export const constantRoutes = [

  {
    path:'/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/login',
  },
  serverRouter,
];

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher
}

export default router
