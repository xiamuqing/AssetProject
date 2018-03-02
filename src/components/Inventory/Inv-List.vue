<template>
  <div id="invList">
    <!-- 顶部选择分行-->
    <div id="searchInput">
      <h2>所属区域&gt;&gt;&gt;{{area}}/{{branch}}/{{costCtr}}</h2>
      <hr>
      <el-form ref="form" label-width="70px" label-position="left">
        <AreaSelection @ensureArea="ensureAreaS" @ensureBranch="ensureBranch" @ensureCostCtr="ensureCostCtr" :default-area="area" :default-branch="branch" :default-cost="costCtr" ></AreaSelection>
      </el-form>
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
     <h2 @click="detailFlag = !detailFlag" style="cursor:pointer;">详细搜寻 <i class="el-icon-arrow-down"></i></h2>
      <hr>
      <el-form :model="detailedFormDat" ref="detailedFormDat"  label-width="70px" label-position="left" class="demo-ruleForm" v-show="detailFlag==true" id="complexForm">
          <AreaSelection @ensureArea="ensureAreaS" @ensureBranch="ensureBranch" @ensureCostCtr="ensureCostCtr" :default-area="area" :default-branch="branch" :default-cost="costCtr" ></AreaSelection>
        <el-form-item label="资产种类">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" >
             <el-cascader :options="belongBranchDat" :props="{value:'adcode',label:'city',children:''}" v-model="detailedFormDat.showBranch" @change="branchChangeFuc"></el-cascader>
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
        <el-form-item label="是否有图片" prop="img">
          <el-radio-group v-model="detailedFormDat.img" size="small">
            <el-radio-button label="0">无</el-radio-button>
            <el-radio-button label="1">有</el-radio-button>
            <el-radio-button label="2">全部</el-radio-button>
          </el-radio-group>
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
      <router-link to="/BranchChart"><el-button type="primary" plain  size="mini" id="BranchChart">查看最新分行更新</el-button></router-link>
      <div id="seat"></div>
      <div id="tableOpts">
        <el-button type="warning" plain size="mini" @click="transferAssetFuc(selectAsset)">资产转移</el-button>
        <el-button type="danger" plain size="mini" @click="discardAssetFuc(selectAsset)">资产弃置</el-button>
        <el-button type="info" plain size="mini" @click="copyAssetFuc(selectAsset)">资产复制</el-button>
      </div>
      <router-link to="Inv-Details">
        <router-link to="/InvBuild"><el-button type="primary" plain id="addAssBtn" size="mini">新增资产</el-button></router-link>
      </router-link>
      <el-table  ref="multipleTable" :data="assetList" max-height="1000" border style="width: 100%; margin-top:5px;" tooltip-effect="dark" @selection-change="selectAssetChangeFuc">
        <el-table-column type="selection" width="30" > </el-table-column>
        <el-table-column prop="adcode" label="编号" width="70" fixed>
          <template slot-scope="scope">
            <router-link :to="{ name: 'InvDetails', params: { id: scope.row.adcode }}">{{scope.row.adcode}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="" label="旧编号"> </el-table-column>
        <el-table-column prop="" label="资产种类"> </el-table-column>
        <el-table-column prop="name" label="资产名称"> </el-table-column>
        <el-table-column prop="" label="种类"> </el-table-column>
        <el-table-column prop="" label="颜色"> </el-table-column>
        <el-table-column prop="" label="Area"> </el-table-column>
        <el-table-column prop="" label="Branch"> </el-table-column>
        <el-table-column prop="" label="CostCtr"> </el-table-column>
        <el-table-column prop="" label="供应商"> </el-table-column>
        <el-table-column prop="level" label="机身编号"></el-table-column>
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
      </el-table>
      <!-- 底部操作 -->
      <div id="paging">
        <el-pagination @size-change="pageSizeChangeFuc" @current-change="pageCurrentChangeFuc" :current-page="pageDat.currentPage" :page-sizes="[2, 5, 10, 20]" :page-size="pageDat.defaultSize" layout="total, sizes, prev, pager, next,  jumper" :total="pageDat.total">
        </el-pagination>
      </div>
    </div>
    <!-- 转移模态框 -->
    <el-dialog title="资产转移" :visible.sync="dialogFormVisible" width="90%">
      <el-form :model="detailedFormDat" ref="detailedFormDat"  label-width="70px" label-position="left">
        <el-form-item label="转移时间">
          <el-date-picker v-model="detailedFormDat.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <span>目的分行:</span>
          <AreaSelection @ensureArea="ensureAreaS" @ensureBranch="ensureBranch" @ensureCostCtr="ensureCostCtr" :default-area="area" :default-branch="branch" :default-cost="costCtr" ></AreaSelection>
        <el-form-item label="转移原因">
          <el-select v-model="detailedFormDat.deliveryTime" placeholder="请选择">
            <el-option v-for="item in reasons" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferSubmitFuc(detailedFormDat)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弃置模态框 -->
    <el-dialog title="弃置资产" :visible.sync="dialogDiscardVisible" width="90%">
      <el-form :model="detailedFormDat" ref="detailedFormDat">
        <el-form-item label="弃置时间">
          <el-date-picker v-model="detailedFormDat.deliveryTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="弃置原因">
          <el-input type="textarea" v-model="detailedFormDat.deliveryTime"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDiscardVisible = false">取 消</el-button>
        <el-button type="primary" @click="discardSubmitFuc(detailedFormDat)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 复制模态框 -->
    <el-dialog title="弃置资产" :visible.sync="dialogCopyVisible" width="90%">
      <el-form :model="detailedFormDat" ref="detailedFormDat"  label-width="70px" label-position="left">
        <p>选择的资产：</p>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" v-for="item in selectAsset" :key="item.citycode">
          <span style="color:red;" >{{item.citycode}}&nbsp;</span>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24">
          <span>所属分行：</span>
          <AreaSelection @ensureArea="ensureAreaS" @ensureBranch="ensureBranch" @ensureCostCtr="ensureCostCtr" :default-area="area" :default-branch="branch" :default-cost="costCtr" ></AreaSelection>
        </el-col>
        <el-form-item label="复制次数">
          <el-input type="number"></el-input>
        </el-form-item>
        <el-form-item label="机身编号">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCopyVisible = false">取 消</el-button>
        <el-button type="primary" @click="copySubmitFuc(detailedFormDat)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AreaSelection from './Common/Inv-AreaSelection.vue'
export default {
  data () {
    return {
      // 接收ensureArea(选择的地区ID)值
      area: 1,
      branch: 2,
      costCtr: 2,
      // 收放详细搜寻
      detailFlag: false,
      tableOptsOffsetTop: 0,
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
        img: 2,
        deliveryTime: '',
        discardTime: '',
        showBranch: []
      },
      // 查询到的资产列表
      assetList: [],
      // 显示隐藏资产转移
      dialogFormVisible: false,
      // 显示隐藏资产弃置
      dialogDiscardVisible: false,
      // 显示资产复制弹
      dialogCopyVisible: false,
      // 已选择的资产列表信息
      selectAssetList: [],
      // 迁移原因（后台数据）
      reasons: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  components: {AreaSelection},
  methods: {
    ensureAreaS: function (msg) {
      this.area = msg
    },
    ensureBranch: function (msg) {
      this.branch = msg
    },
    ensureCostCtr: function (msg) {
      this.costCtr = msg
    },
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
    // 资产转移弹出框
    transferAssetFuc (asset) {
      if (asset.length === 0) {
        alert('请选择资产')
        return
      }
      this.dialogFormVisible = true
    },
    // 弃置弹出框
    discardAssetFuc (asset) {
      if (asset.length === 0) {
        alert('请选择资产')
        return
      }
      this.dialogDiscardVisible = true
    },
    // 资产复制
    copyAssetFuc (asset) {
      if (asset.length === 0) {
        alert('请选择资产')
        return
      }
      this.dialogCopyVisible = true
    },
    // 转移资产提交
    transferSubmitFuc (formName) {
      // 发送数据给后台
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.detailedFormDat)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.dialogFormVisible = false
    },
    // 弃置资产提交
    discardSubmitFuc (formName) {
      // 发送数据给后台
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.detailedFormDat)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.dialogFormVisible = false
    },
    // 资产复制提交
    copySubmitFuc (formName) {
      // 发送数据给后台
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.detailedFormDat)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.dialogFormVisible = false
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
  // 钩子函数
  mounted: function () {
    console.log(1)
    this.getAssetFuc()
  },
  updated: function () {
    console.log(2)
    if (!this.detailFlag) {
      this.tableOptsOffsetTop = document.getElementById('tableOpts').offsetTop + document.getElementById('complexForm').offsetHeight
    } else {
      this.tableOptsOffsetTop = document.getElementById('tableOpts').offsetTop
    }
    var tableOpts = document.getElementById('tableOpts')
    var scrollTop = 0
    var tableOptsHeight = document.getElementById('tableOpts').offsetHeight
    var tableOptsOffsetTop = this.tableOptsOffsetTop
    window.onscroll = function () {
      console.log(tableOptsOffsetTop)
      // tableOpts 距离顶部的距离
      scrollTop = document.getElementsByTagName('body')[0].scrollTop || window.pageYOffset || document.body.scrollTop
      if (tableOptsOffsetTop - 7 <= scrollTop) {
        // fixed
        tableOpts.style.cssText = 'position:fixed; top:0px;z-index:100;background:#fff;width:100%;padding:10px 0;margin-bottom:5px;'
        document.getElementById('seat').style.height = tableOptsHeight + 'px'
      } else {
        tableOpts.style.cssText = ''
        document.getElementById('seat').style.height = 0 + 'px'
      }
    }
  }
}
</script>

<style scoped>
p{ margin: 0; padding: 0;}
#invList .el-dialog__body{ padding-top: 10px; }
#invList{ width: 80%; margin: 0 auto; }
#invList h2{ font-size: 2.5vmin; color: #000; height: 20px; line-height: 40px; margin-top: 30px; padding: 0 10px; }
#fasttips{ height: 150px; }
#fasttips h2{ text-align: right; margin-top: 20px; }
#searchInput .el-col{ margin: 10px 0px; }
#invList span.el-cascader{ width: 100%; margin: 0 auto; }
#invList .el-row{ margin-top: 20px; }
#assetList .el-table{ text-align: center; }
#assetList #tableOpts button{padding:7px; margin-left: 2px; }
#BranchChart{float: right; margin-top: -42px; padding: 7px;}
#addAssBtn{ float: right; margin-top: -28px; padding: 7px; }
/*取消选择和分页*/
#paging { margin-top: 10px; }
#paging .el-pagination{ float: right; }
#paging:after,#addAssBtn:after,#BranchChart:after{ content:""; height:0; line-height:0; display:block; visibility:hidden; clear:both; }
</style>
