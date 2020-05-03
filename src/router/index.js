import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import serverRouter from "./module/serverRouter";
import configRouter from './module/configRouter'

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
  {
    path:'/register',
    component:()=>import('@/views/login/register'),
    hidden: true
  },
  {
    path:'/codeMirror',
    component: Layout,
    name:'配置文件',
    children: [
      {
        path: 'index/:configName',
        name:'index',
        component:() =>import('@/components/codeMirror/codeMirror'),
        meta: {title: "配置文件"},
        hidden: true
      },
      {
        path:'create',
        name:'CreateCodeMirror',
        component:()=>import('@/components/codeMirror/createCodeMirror'),
        hidden: true
      }
    ]
  },
  serverRouter,
  configRouter
];

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher
}

export default router
