import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
import fr from 'element-ui/src/locale/lang/fr'
import storageUtil from './utils/storageUtil'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import VueElementExtends from 'vue-element-extends'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

Vue.use(ElementUI)
Vue.use(VueElementExtends)
Vue.use(VXETable)
Vue.use(codemirror)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const path = to.path;
  if (!path.includes("login") && !path.includes("register")){
    if (storageUtil.readData("userInfo") === null ){
      next('/login')
    }else{
      next()
    }
  }else{
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
