<template>
  <div id="transferList">
    <h2>查询转移记录 <i class="el-icon-caret-bottom"></i></h2>
    <hr>
    <el-form :model="transferFormDat" ref="transferFormDat" label-width="100px" class="demo-ruleForm">
        <el-form-item label="所属分行">
          <el-col :xs="24" :sm="16" :md="16" :lg="16" >
          <el-cascader :options="belongBranchDat" change-on-select :props="{value:'adcode',label:'city',children:''}" v-model="selectBranch" @change="branchChangeFuc"></el-cascader>
        </el-col>
        </el-form-item>
        <el-form-item label="弃置时间">
          <el-col :span="6">
            <el-date-picker v-model="transferFormDat.transferTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"  end-placeholder="结束日期" :picker-options="pickerOptions"> </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormFuc('transferFormDat')">搜索</el-button>
        </el-form-item>
    </el-form>
    <h2>转移记录 <i class="el-icon-caret-bottom"></i></h2>
    <hr>
    <transferList :recordList="recordList" :height="tableheight"></transferList>
    <hr style="border-top:3px solid greenyellow; margin-top:40px;">
    <el-row>
      <el-col  :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <h2>最近资产转移记录 <i class="el-icon-caret-bottom"></i></h2>
        <hr>
        <el-table :data="newRecord" stripe style="width: 100%" max-height="250">
          <el-table-column prop="center" label="所在分行">
          </el-table-column>
          <el-table-column prop="adcode" label="资产编号">
             <template slot-scope="scope">
              <router-link :to="{ name: 'InvDetails', params: { id: scope.row.adcode }}">{{scope.row.adcode}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="资产名称"></el-table-column>
        </el-table>
      </el-col>
      <el-col class="hidden-sm-and-down" :md="4" :lg="4" :xl="4">&nbsp;</el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <h2>最近有转移记录的分行 <i class="el-icon-caret-bottom"></i></h2>
        <hr>
        <el-table :data="banchList" stripe style="width: 100%" max-height="250">
          <el-table-column prop="name" label="分行">
            <template>
              <span>3454</span>
            </template>
          </el-table-column>
          <el-table-column prop="citycode" label="资产转移数量"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import transferList from './Common/Inv-TransferList.vue'
export default {
  data () {
    return {
      tableheight: 500,
      belongBranchDat: [],
      // 选中的分行
      selectBranch: [],
      // 选中的记录
      selectRecord: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 搜索转移
      transferFormDat: {
        // 资产类别选择的值（用于发送给后台）
        belongBranchDat: '',
        transferTime: ''
      },
      // 查询到的转移记录列表
      recordList: [],
      // 最新30条迁移记录
      newRecord: [],
      // 最近15家有迁移记录的分行
      banchList: []
    }
  },
  methods: {
    branchChangeFuc (value) {
      console.log(value)
      let _this = this
      this.ajaxFuc('get', 'http://restapi.amap.com/v3/config/district', { keywords: '湖南', subdistrict: 2, key: '5fd5e55edd11ba47e3876cb93613db29' }, function (res) {
        _this.recordList = res.data.districts[0].districts
      })
    },
    // 提交搜索
    submitFormFuc (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.transferFormDat)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 表格状态筛选
    filterTagFuc (value, row) {
      return row.level === value
    },
    // 分页长度改变
    pageSizeChangeFuc (val) {
      console.log(`每页 ${val} 条`)
    },
    // 分页选择页数变化
    pageCurrentChangeFuc (val) {
      console.log(`当前页: ${val}`)
    },
    // 获取转移列表数据
    getAssetFuc () {
      let _this = this
      this.ajaxFuc('get', 'http://restapi.amap.com/v3/config/district', { keywords: '湖南', subdistrict: 2, key: '5fd5e55edd11ba47e3876cb93613db29' }, function (res) {
        _this.recordList = res.data.districts[0].districts
        _this.newRecord = res.data.districts[0].districts
        _this.banchList = res.data.districts[0].districts
        console.log(res.data.districts[0].districts)
      })
      this.ajaxFuc('get', 'http://restapi.amap.com/v3/weather/weatherInfo', { city: 431081, key: '5fd5e55edd11ba47e3876cb93613db29' }, function (res) {
        _this.belongBranchDat = res.data.lives
      })
    },
    // ajax 请求
    ajaxFuc (method, url, params, callback) {
      this.$axios({
        method: method,
        url: url,
        params: params
      }).then(res => {
        // console.log(res)
        callback(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {transferList},
  // 钩子函数
  mounted: function () {
    this.getAssetFuc()
  }
}
</script>

<style scoped>
#transferList{ width: 80%; margin: 0 auto; }
#transferList h2{ font-size: 2.5vmin; color: #000; height: 20px; line-height: 40px; margin-top: 30px; padding: 0 10px; }
</style>
