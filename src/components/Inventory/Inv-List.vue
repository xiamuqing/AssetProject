<template>
  <div id="invList">
    <!-- 顶部选择分行-->
    <div id="searchInput">
      <h2>所属分行&gt;&gt;&gt;</h2>
      <hr>
      <el-col :xs="24" :sm="16" :md="16" :lg="16" >
        <el-cascader :options="belongBranchDat" change-on-select :props="{value:'adcode',label:'city',children:''}" v-model="showBranch" @change="branchChangeFuc"></el-cascader>
      </el-col>
    </div>
    <!-- 快速查询 -->
    <div id="fasttips">
      <h2>&lt;&lt;&lt;快速查询</h2>
      <hr>
      <el-form ref="form" :model="branchIDDat" label-width="80px">
        <el-row>
          <el-col :sm="4" :md="6" :lg="7" class="hidden-xs-only">&nbsp;</el-col>
          <el-col :xs="17" :sm="12" :md="8" :lg="6" >
            <el-input placeholder="输入Asset ID查询" v-model.number="branchIDDat.id" clearable autofocus></el-input>
          </el-col>
          <el-col :xs="5" :sm="4" :md="4" :lg="4" >
            <el-button type="primary" icon="el-icon-search" @click="SearchIDFuc()">&nbsp;搜&nbsp;&nbsp;索</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="4" :md="6" :lg="7" class="hidden-xs-only">&nbsp;</el-col>
          <el-col :xs="17" :sm="12" :md="8" :lg="6" >
            <el-input placeholder="舊資產編號、供應商、型號等等查询" v-model.number="branchIDDat.id" clearable autofocus></el-input>
          </el-col>
          <el-col :xs="5" :sm="4" :md="4" :lg="4" >
            <el-button type="primary" icon="el-icon-search" @click="SearchIDFuc()">关键字</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--  复杂查询表单 -->
    <div id="searchForm">
     <h2 @click="detailFlag=!detailFlag">详细搜寻 <i class="el-icon-arrow-down"></i></h2>
      <hr>
      <el-form :model="detailedFormDat" ref="detailedFormDat" label-width="100px" class="demo-ruleForm" v-show="detailFlag==true">
        <el-form-item label="所属分行">
          <el-col :xs="24" :sm="16" :md="16" :lg="16" >
          <el-cascader :options="belongBranchDat" change-on-select :props="{value:'adcode',label:'city',children:''}" v-model="showBranch" @change="branchChangeFuc"></el-cascader>
        </el-col>
        </el-form-item>
        <el-form-item label="资产种类">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" >
             <el-cascader :options="belongBranchDat" :props="{value:'adcode',label:'city',children:''}" v-model="showBranch" @change="branchChangeFuc"></el-cascader>
          </el-col>
        </el-form-item>
        <el-form-item label="资产类别" prop="variety">
          <el-select v-model="detailedFormDat.variety" placeholder="请选择资产类别">
            <el-option v-for="item in arr" :key="item.id" :label="item.text" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="颜色" prop="variety">
          <el-select v-model="detailedFormDat.variety" placeholder="请选择资产类别">
            <el-option v-for="item in arr" :key="item.id" :label="item.text" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" prop="provider">
          <el-select v-model="detailedFormDat.provider" placeholder="请选择供应商">
            <el-option v-for="item in arr" :key="item.id" :label="item.text" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产价格">
          <el-col :span="4">
            <el-input type="number" v-model.number="detailedFormDat.provider"></el-input>
          </el-col>
          <el-col class="line" :span="1"> -</el-col>
          <el-col :span="4">
            <el-input type="number" v-model.number="detailedFormDat.provider"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="购置时间">
          <el-col :span="6">
            <el-date-picker v-model="detailedFormDat.deliveryTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"  end-placeholder="结束日期" :picker-options="pickerOptions"> </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="弃置时间">
          <el-col :span="6">
            <el-date-picker v-model="detailedFormDat.discardTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"  end-placeholder="结束日期" :picker-options="pickerOptions"> </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="资产状态" prop="type">
          <el-checkbox-group v-model="detailedFormDat.type">
            <el-checkbox  v-for="type in types" :key="type.id" :label="type.id" :xs="12" :sm="12" :md="4" :lg="4">{{type.text}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="已上传图片" prop="img">
          <el-switch v-model="detailedFormDat.img"> </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormFuc('detailedFormDat')">搜索</el-button>
          <el-button @click="resetFormFuc('detailedFormDat')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 资产列表 -->
    <div id="assetList">
      <h2>资产列表 <i class="el-icon-caret-bottom"></i></h2>
      <hr>
      <router-link to="Inv-Details">
        <router-link to="/InvBuild"><el-button type="primary" plain id="addAssBtn" size="mini">新增资产</el-button></router-link>
      </router-link>
      <el-table  ref="multipleTable" :data="assetList" max-height="500" border style="width: 100%" tooltip-effect="dark" @selection-change="selectAssetChangeFuc">
        <el-table-column type="selection" width="55" > </el-table-column>
        <el-table-column prop="adcode" label="编号" fixed>
          <template slot-scope="scope">
            <router-link :to="{ name: 'InvDetails', params: { id: scope.row.adcode }}">{{scope.row.adcode}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="" label="资产种类" width="100"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="level" label="级别">
         <template slot-scope="scope">
           <span v-if="scope.row.level=='city'">城市</span>
           <span v-if="scope.row.level=='district'">县</span>
         </template>
        </el-table-column>
        <el-table-column prop="" label="省份"> </el-table-column>
        <el-table-column prop="" label="供应商"> </el-table-column>
        <el-table-column prop="" label="型号"> </el-table-column>
        <el-table-column prop="level" label="状态" width="100" :filters="[{ text: '城市', value: 'city' }, { text: '县', value: 'district' }]" :filter-method="filterTagFuc" filter-placement="bottom-end">
           <template slot-scope="scope">
            <el-tag v-if="scope.row.level=='city'"
              close-transition>城市</el-tag>
              <el-tag v-if="scope.row.level=='district'"
              type="success"
              close-transition>县</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="" label="备注"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="transferAssetFuc(scope.row.adcode)">转移</el-button>
            <el-button type="text" size="small" @click="discardAssetFuc(scope.row.adcode)">弃置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部操作 -->
      <div id="paging">
        <el-button type="warning" plain id="assTranBtn" size="mini" @click="transferAssetFuc(selectAsset)">资产转移</el-button>
         <el-button type="danger" plain id="assTranBtn" size="mini" @click="discardAssetFuc(selectAsset)">批量弃置</el-button>
        <el-button @click="toggleSelection()" size="mini">取消选择</el-button>
        <el-pagination @size-change="pageSizeChangeFuc" @current-change="pageCurrentChangeFuc" :current-page="pageDat.currentPage" :page-sizes="[2, 5, 10, 20]" :page-size="pageDat.defaultSize" layout="total, sizes, prev, pager, next,  jumper" :total="pageDat.total">
        </el-pagination>
      </div>
    </div>
    <!-- 转移模态框 -->
    <el-dialog title="选择目的分行" :visible.sync="dialogFormVisible">
      <el-form :model="detailedFormDat">
        <el-cascader :options="destinationBranch" :props="{value:'adcode',label:'name',children:'districts'}" v-model="goToBranch" @change="branchChangeFuc"></el-cascader>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureTransferFun()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 收放详细搜寻
      detailFlag: false,
      // 所属分行，资产种类三级联动数据
      belongBranchDat: [],
      // 选中分行层级（用于发送给后台）
      showBranch: [],
      // 转移目的地分行
      destinationBranch: [],
      // 目的分行（用于发送给后台）
      goToBranch: [],
      // 查询AssetID
      branchIDDat: {
        id: ''
      },
      // 选中的资产
      selectAsset: [],
      // 资产类别选项(后台给数据)
      arr: [{
        id: 1,
        text: '种类一'
      }, {
        id: 2,
        text: '种类二'
      }],
      // 资产状态选项（后台给数据）
      types: [{
        id: 1,
        text: '其  他'
      }, {
        id: 2,
        text: '一手盘'
      }, {
        id: 3,
        text: '已入库'
      }, {
        id: 4,
        text: '已使用'
      }, {
        id: 5,
        text: '已弃置'
      }],
      pageDat: {
        currentPage: 4,
        total: 0,
        defaultSize: 20
      },
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
      // 详细查询表单
      detailedFormDat: {
        // 资产类别选择的值（用于发送给后台）
        variety: '',
        provider: '',
        type: [],
        img: false,
        deliveryTime: '',
        discardTime: ''
      },
      // 查询到的资产列表
      assetList: [],
      // 显示隐藏资产转移
      dialogFormVisible: false,
      // 已选择的资产列表信息
      selectAssetList: []
    }
  },
  methods: {
    // 分行联动
    branchChangeFuc (value) {
      console.log(value)
      let _this = this
      this.ajaxFuc('get', 'http://restapi.amap.com/v3/config/district', { keywords: '湖南', subdistrict: 2, key: '5fd5e55edd11ba47e3876cb93613db29' }, function (res) {
        _this.assetList = res.data.districts[0].districts
      })
    },
    // ID查询
    SearchIDFuc () {
      let id = this.branchIDDat.id
      let _this = this
      this.ajaxFuc('get', 'http://restapi.amap.com/v3/weather/weatherInfo', { city: id, key: '5fd5e55edd11ba47e3876cb93613db29' }, function (res) {
        _this.assetList = res.data.districts[0].districts
      })
    },
    // 详细搜索ID
    submitFormFuc (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.detailedFormDat)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetFormFuc (formName) {
      this.$refs[formName].resetFields()
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
    // 获取资产列表数据
    getAssetFuc () {
      let _this = this
      this.ajaxFuc('get', 'http://restapi.amap.com/v3/config/district', { keywords: '湖南', subdistrict: 2, key: '5fd5e55edd11ba47e3876cb93613db29' }, function (res) {
        _this.pageDat.total = res.data.districts[0].districts.length
        _this.assetList = res.data.districts[0].districts
        _this.destinationBranch = res.data.districts
        console.log(res.data.districts[0].districts)
      })
      this.ajaxFuc('get', 'http://restapi.amap.com/v3/weather/weatherInfo', { city: 431081, key: '5fd5e55edd11ba47e3876cb93613db29' }, function (res) {
        _this.belongBranchDat = res.data.lives
      })
    },
    // 选择资产
    selectAssetChangeFuc (val) {
      this.multipleSelection = val
      this.selectAsset = val
    },
    // 取消选择列表中的资产
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 资产转移弹出框
    transferAssetFuc (asset) {
      this.assetOperationFuc(asset, 'transfer')
    },
    // 请求转移资产
    sureTransferFun () {
      this.dialogFormVisible = false
      this.$message({
        type: 'success',
        message: '转移成功!'
      })
    },
    // 弃置
    discardAssetFuc (asset) {
      this.assetOperationFuc(asset, 'discard')
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
    },
    // 资产处理
    assetOperationFuc (asset, type) {
      console.log(asset)
      if (asset.length === 0) {
        alert('请选择资产')
        return
      }
      // var params = ''
      if (typeof (asset) === 'string') {
        // 操作一个
        // params = Number(asset)
        console.log('操作一个')
      } else {
        // 操作一个或者多个
        // params = asset[0].abcode
        console.log('操作一个或者多个')
      }
      if (type === 'transfer') {
        // 转移
        this.dialogFormVisible = true
      } else {
        // 弃置
        this.$confirm('确定弃置？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '弃置成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消弃置'
          })
        })
      }
    }
  },
  // 钩子函数
  mounted: function () {
    this.getAssetFuc()
  }
}
</script>

<style scoped>
#invList{ width: 80%; margin: 0 auto; }
#invList #searchInput{ height: 110px; }
#invList h2{ font-size: 2.5vmin; color: #000; height: 20px; line-height: 40px; margin-top: 30px; padding: 0 10px; }
#fasttips{ height: 150px; }
#fasttips h2{ text-align: right; margin-top: 20px; }
#searchInput .el-col{ margin: 10px 0px; }
#invList span.el-cascader{ width: 100%; margin: 0 auto; }
#invList .el-row{ margin-top: 20px; }
#assetList .el-table{ text-align: center; }
#addAssBtn{ float: right; margin-top: -42px; margin-right: 10px; padding: 7px; }
/*取消选择和分页*/
#paging { margin-top: 10px; }
#paging .el-pagination{ float: right; }
#paging:after,#addAssBtn:after{ content:""; height:0; line-height:0; display:block; visibility:hidden; clear:both; }
</style>
