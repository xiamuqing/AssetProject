<template>
  <div class="InvoiceSearch">
    <el-row  type="flex" justify="center">
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="14">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="发票代码">
            <el-input v-model.number="number" placeholder="请输入发票代码或发票号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          max-height="400"
          style="width: 100%">
          <el-table-column
            prop="adcode"
            fixed="left"
            label="发票代码"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="图片">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="60">
            <template slot-scope="scope">
              <router-link :to="'/InvInvoice/Build/'+scope.row.adcode">
                <el-button type="text">查看</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      number: '',
      tableData: []
    }
  },
  methods: {
    getData: function () { // 向后台获取数据
      let _this = this
      this.$axios.get(' http://restapi.amap.com/v3/config/district', {
        params: {
          keywords: '江西',
          subdistrict: 2,
          key: '5fd5e55edd11ba47e3876cb93613db29'
        }
      })
        .then(function (response) {
          console.log(response)
          _this.tableData = response.data.districts[0].districts
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input-number .el-input__inner{
  text-align:left;
}
</style>
