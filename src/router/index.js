import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import InvList from '@/components/Inventory/Inv-List'
import InvDetails from '@/components/Inventory/Inv-Details'
import InvInvoice from '@/components/Inventory/Inv-Invoice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/InvList',
      name: 'InvList',
      component: InvList
    },
    { // 资产详情页面
      path: '/InvDetails/:id',
      name: 'InvDetails', // 有传参时，name不可缺少
      component: InvDetails
    },
    { // 资产新增页面
      path: '/InvBuild',
      name: 'InvBuild',
      component: InvDetails
    },
    { // 资产-发票上传页面
      path: '/InvInvoice',
      component: InvInvoice,
      children: [
        {path: '*', component: InvInvoice},
        {path: 'Details/:id', component: InvInvoice},
        {path: 'Build/:id', component: InvInvoice}
      ]
    }
  ]
})
