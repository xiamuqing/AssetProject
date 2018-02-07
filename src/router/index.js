import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import InvList from '@/components/Inv-List'
import InvDetails from '@/components/Inv-Details'

Vue.use(Router)
Vue.prototype.$axios = axios

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Inv-List'
    },
    {
      path: '/Inv-List',
      name: 'InvList',
      component: InvList
    },
    {
      path: '/Inv-Details/:id',
      name: 'InvDetails',
      component: InvDetails
    },
    {
      path: '/InvBuild',
      name: 'InvBuild',
      component: InvDetails
    }
  ]
})
