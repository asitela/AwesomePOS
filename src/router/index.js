import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'

Vue.use(Router)

export default new Router({
  /*
  这里存在一个坑，如果在这里写mode:'history‘去掉#，
  很有可能会导致在最后打包上线的时候出现的页面有问题！
  可能会是一片空白，也有可能是只出现一部分......
   */
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    }
  ]
})
