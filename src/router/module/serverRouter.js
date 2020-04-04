import Layout from '@/layout';
import {MessageBox} from 'element-ui';

const serverRouter = {
  path: '/server',
  component: Layout,
  name: '服务器管理',
  meta: {
    title: '服务器管理',
    icon: 'component'
  },
  children: [
    {
      path: 'server-list',
      component: ()=>import("@/views/index/serverList"),
      name:'server-list',
      meta:{title:'服务器列表'}
    },
    {
      path: 'dashboard',
      component: ()=>import("@/views/server/dashboard/index"),
      name:'dashboard',
      meta: {title: "信息面板"},
      hidden: true
    }
  ]
};

export default serverRouter
