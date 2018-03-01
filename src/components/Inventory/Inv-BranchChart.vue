<template>
<div>
  <h2 id="pie">最新分行更新饼图<small>(最近三个月)</small></h2>
    <figure>
      <chart :options="pie" ref="pie" auto-resize/>
    </figure>
</div>
</template>

<style>
.echarts {
  height: 900px;
  width: 700px;
}
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'

export default {
  components: {
    chart: ECharts
  },
  data () {
    return {
      branches: [],
      timer: '',
      pie: {
        title: {
          text: '最新分行更新',
          x: '35%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          height: 200,
          data: []
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['40%', '45%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: 'http://restapi.amap.com/v3/config/district',
      params: { keywords: '湖南', subdistrict: 2, key: '5fd5e55edd11ba47e3876cb93613db29' }
    }).then(res => {
      this.branches = [
        {value: 487, name: 'KKY'},
        {value: 298, name: 'HZH'},
        {value: 244, name: 'HPP'},
        {value: 234, name: 'HCK'},
        {value: 184, name: 'KAU'},
        {value: 168, name: 'KSI'},
        {value: 165, name: 'NHB'},
        {value: 133, name: 'KAY'},
        {value: 127, name: 'NYR'},
        {value: 125, name: 'NCQ'},
        {value: 124, name: 'NTT'},
        {value: 91, name: 'KAI'},
        {value: 53, name: 'NBD'},
        {value: 49, name: 'NNG'},
        {value: 44, name: 'HGL'}
      ]
      this.pie.legend.data = this.branches
      this.pie.series[0].data = this.branches
      console.log(this.branches)
    }).catch(err => {
      console.log(err)
    })
  }
}

</script>
