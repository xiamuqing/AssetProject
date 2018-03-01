import Vue from 'vue'
import Router from 'vue-router'
import InvList from '@/components/Inventory/Inv-List'
import InvDetails from '@/components/Inventory/Inv-Details'
import InvInvoice from '@/components/Inventory/Inv-Invoice'
import InvInvoiceSearch from '@/components/Inventory/Inv-InvoiceSearch'
import InvTransfer from '@/components/Inventory/Inv-Transference'
import BranchChart from '@/components/Inventory/Inv-BranchChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/InvList'
    },
    {
      path: '/InvList',
      component: InvList,
      name: InvList
    },
    { // 资产详情页面
      path: '/InvDetails/:id',
      name: 'InvDetails',
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
    },
    { // 资产-发票搜索
      path: '/InvInvoiceSearch',
      component: InvInvoiceSearch
    },
    { // 资产迁移查询列表页面
      path: '/InvTransfer',
      component: InvTransfer
    },
    {
      // 最新分行更新图表
      path: '/BranchChart',
      name: 'BranchChart',
      component: BranchChart
    }
  ]
})
