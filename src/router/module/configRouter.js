import Layout from '@/layout';
import {MessageBox} from 'element-ui';

const configRouter = {
  path: '/config',
  component: Layout,
  name: 'config',
  meta: {
    title: '配置文件管理',
    icon: 'example'
  },
  children: [
    {
      path: 'config-file-manage',
      component: ()=>import("@/views/server/config/configFileManage"),
      name:'config-file-manage',
      meta:{ title:'配置文件管理'}
    }
  ]
};

export default configRouter
