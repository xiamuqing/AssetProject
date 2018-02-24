<template>
  <div class="InvDetails">
   <el-row  type="flex" justify="center">
    <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="14">
      <!-- 更多操作 只在详情页或修改页显示 -->
      <el-dropdown trigger="click" class="hd-manipulate details-nav" v-if="pageSwitch==='details'">
        <el-button size="small" type="primary" plain class="details-nav-button">
          更多操作
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-on:click.native="changeDetails(false)">修改</el-dropdown-item>
          <el-dropdown-item>转移</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 更多操作 只在详情页或修改页显示 -->
      <!-- 头部 -->
      <div class="hd">
        <span class="hd-title">
          <!-- 只在详情页或修改页显示 -->
          <template v-if="pageSwitch==='details'">
            资产编号：{{form.id}}
          </template>
          <!-- 只在详情页或修改页显示 -->
          <!-- 只在新增页显示 -->
          <template v-if="pageSwitch==='build'">
            新增资产
          </template>
          <!-- 只在新增页显示 -->
        </span>
        <router-link to="/InvList" class="goBack">返回 >></router-link>
      </div>
      <!-- 头部 -->
      <!-- 主体 -->
      <el-form label-position="left" ref="form" :model="form" label-width="72px" class="bd">

        <h4 class="bd-title">资产特征：</h4>
        <el-row :gutter="20">
          <!-- 资产种类 -->
          <el-col :xs="24" :sm="12">
            <el-form-item label="资产种类">
              <el-cascader
                :options="options"
                v-model="selectedOptions3"
                :disabled="notChange"
                :props="{value:'adcode',label:'name',children:'districts'}"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <!-- 资产种类 -->
          <!-- 颜色 -->
          <el-col :xs="24" :sm="12">
            <el-form-item label="颜色">
              <el-select v-model="value" placeholder="颜色" :disabled="notChange">
              <el-option
                v-for="item in options"
                :key="item.adcode"
                :label="item.name"
                :value="item.adcode">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <!-- 颜色 -->
        </el-row>
        <el-row  :gutter="20">
          <!-- 型号 -->
          <el-col :xs="24" :sm="12">
            <el-form-item label="型号">
              <el-input v-model="form.name" :disabled="notChange"></el-input>
            </el-form-item>
          </el-col>
          <!-- 型号 -->
          <!-- 尺寸 -->
          <el-col :xs="24" :sm="12">
            <el-form-item label="尺寸">
              <el-row>
                <el-col :span="8">
                  <el-input v-model="form.name"  placeholder="长(cm)" :disabled="notChange"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="form.name" placeholder="宽(cm)" :disabled="notChange"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="form.name" placeholder="高(cm)" :disabled="notChange"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <!-- 尺寸 -->
        </el-row>
        <el-row  :gutter="20">

          <!-- 只在新增页显示 -->
          <!-- 新增件数 -->
          <template v-if="pageSwitch==='build'">
            <el-col :xs="24" :sm="12">
              <el-form-item label="新增件数">
                <el-input-number v-model="form.num" :min="1" label="新增件数"></el-input-number>
              </el-form-item>
            </el-col>
          </template>
          <!-- 新增件数 -->
          <!-- 只在新增页显示 -->
          <!-- 机身编号 -->
          <el-col :xs="24" :sm="12">
            <el-form-item label="机身编号">
              <el-input v-model="form.name" :disabled="notChange"></el-input>
            </el-form-item>
          </el-col>
          <!-- 机身编号 -->
          <!-- 只在详情页或修改页显示 -->
          <!-- 旧编号 -->
          <template v-if="pageSwitch==='details'">
            <el-col :xs="24" :sm="12">
              <el-form-item label="旧编号">
                <el-input v-model="form.name" :disabled="notChange"></el-input>
              </el-form-item>
            </el-col>
          </template>
          <!-- 旧编号 -->
          <!-- 只在详情页或修改页显示 -->
        </el-row>

        <h4 class="bd-title">状态信息：</h4>

        <!-- 所属区域 -->
        <el-form-item label="所属区域">
          <el-cascader
            :options="options"
            v-model="selectedOptions3"
            :disabled="notChange"
            :props="{value:'citycode',label:'name',children:'districts'}"
          ></el-cascader>
        </el-form-item>
        <!-- 所属区域 -->
        <!-- 只在详情页或修改页显示 -->
        <template v-if="pageSwitch==='details'">
          <el-row :gutter="20">
            <!-- 当前状态 -->
            <el-col :xs="24" :sm="12">
              <el-form-item label="当前状态">
                <el-select v-model="form.region" placeholder="请选择活动区域" :disabled="notChange">
                  <el-option label="使用中" value="1"></el-option>
                  <el-option label="已弃置" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 当前状态 -->
            <!-- 弃置时间 -->
            <el-col :xs="24" :sm="12" v-show="form.region==2">
              <el-form-item label="弃置时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" :disabled="notChange"></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- 弃置时间 -->
          </el-row>
        </template>
        <!-- 只在详情页或修改页显示 -->

        <h4 class="bd-title">供应商信息：</h4>

        <!-- 供应商 -->
        <el-form-item label="供应商">
          <el-select v-model="value" placeholder="供应商" :disabled="notChange">
            <el-option
              v-for="item in options2"
              :key="item.adcode"
              :label="item.city"
              :value="item.adcode">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 供应商 -->
        <el-row  :gutter="20">
          <!-- 价格 -->
          <el-col :xs="24" :sm="12">
            <el-form-item label="价格">
              <el-input v-model="form.name" placeholder="Net Price" :disabled="notChange"></el-input>
            </el-form-item>
          </el-col>
          <!-- 价格 -->
          <!-- 维修费 -->
          <el-col :xs="24" :sm="12">
            <el-form-item label="维修费">
              <el-input v-model="form.name" placeholder="Maintainance Fee" :disabled="notChange"></el-input>
            </el-form-item>
          </el-col>
          <!-- 维修费 -->
        </el-row>
        <el-row  :gutter="20">
          <!-- 交货日期 -->
          <el-col :xs="24" :sm="12">
            <el-form-item label="交货日期">
              <el-date-picker type="date" placeholder="Delivery Date" v-model="form.date1" :disabled="notChange"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 交货日期 -->
          <!-- 到期日 -->
          <el-col :xs="24" :sm="12">
            <el-form-item label="到期日">
              <el-date-picker type="date" placeholder="Main. Expire Date" v-model="form.date1" :disabled="notChange"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 到期日 -->
        </el-row>

        <h4 class="bd-title">附加图片：</h4>

        <!-- 附加图片 -->
        <el-form-item label="附加图片">

          <!-- 只在新增页或修改页显示 -->
          <!-- <template v-if="notChange==false"> -->
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :disabled="notChange">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          <!-- </template> -->
          <!-- 只在新增页或修改页显示 -->
        </el-form-item>
        <!-- 附加图片 -->

        <h4 class="bd-title">发票：</h4>

        <!-- 发票 -->
        <el-form-item label="发票">
          <el-switch
            v-model="value3"
            active-text="有发票"
            inactive-text="无发票"
            :disabled="notChange">
          </el-switch>
          <template v-if="pageSwitch==='details'">
            <router-link :to="'/InvInvoice/Build/'+2544545465" class="el-button el-button--primary is-plain el-button--mini" v-if="notChange==false && value3">上传发票</router-link>

            <router-link :to="'/InvInvoice/Details/'+55111" class="el-button el-button--primary is-plain el-button--mini" v-if="value3 && notChange==true">查看发票</router-link>            批量上传时，上传的多个资产的发票共用，如需一次上传多个资产但发票不同，则分几次上传）(请在保存资产信息之后再上传发票/发票上传只能在修改页面显示)
          </template>
        </el-form-item>
        <!-- 发票 -->

        <h4 class="bd-title">备注：</h4>

        <!-- 备注/详情 -->
        <el-form-item label="备注/详情">
          <el-input type="textarea" v-model="form.desc" :disabled="notChange" :rows="4"></el-input>
        </el-form-item>
        <!-- 备注/详情 -->

        <!-- 只在详情页或修改页显示 -->
        <template v-if="pageSwitch==='details'">

          <h4 class="bd-title">迁移记录：</h4>

          <!-- 迁移记录 -->
          <transferList :recordList="recordList" :height="500"></transferList>
          <!-- 迁移记录 -->
          <!-- 只在修改页显示 -->
          <el-form-item v-if="notChange==false">
            <el-button type="primary">确认</el-button>
            <el-button v-on:click="changeDetails(true)">取消</el-button>
          </el-form-item>
          <!-- 只在修改页显示 -->
        </template>
        <!-- 只在详情页或修改页显示 -->

          <!-- 只在新增显示 -->
          <el-form-item v-if="pageSwitch==='build'">
            <el-button type="primary">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
          <!-- 只在新增显示 -->

      </el-form>
      <!-- 主体 -->
    </el-col>
  </el-row>
  </div>
</template>

<script>
import transferList from './Inv-TransferList.vue'
export default {
  data () {
    return {
      form: {
        id: '',
        name: '',
        region: '2',
        date1: '',
        date2: '',
        type: [],
        resource: '',
        desc: '',
        num: 1
      },
      options: [],
      options2: [],
      selectedOptions3: ['360000', '360700', '360704'],
      value: '',
      value3: true,
      notChange: true,
      pageSwitch: '',
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl: 'http://restapi.amap.com/v3/config/district',
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ],
      // 查询到的转移记录列表
      recordList: []
    }
  },
  // 在 `methods` 对象中定义方法
  methods: {
    getData: function () { // 当前页面为详情页时，向后台获取资产详情数据
      let _this = this
      this.$axios.get(' http://restapi.amap.com/v3/weather/weatherInfo', {
        params: {
          city: 431081,
          key: '5fd5e55edd11ba47e3876cb93613db29'
        }
      })
        .then(function (response) {
          console.log(response)
          _this.options2 = response.data.lives
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addDate: function () { // 向后台添加资产数据
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
          _this.options = response.data.districts
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    changeData: function () { // 向后台传输修改后的资产数据
      this.$axios.post('http://restapi.amap.com/v3/weather/weatherInfo?parameters',
        {
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    changeDetails: function (temp) { // 页面输入框状态是否可用改变
      this.notChange = temp
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    branchChangeFuc (value) { // 临时的获取资产迁移记录的函数，正式时删除
      console.log(value)
      let _this = this
      this.$axios.get(' http://restapi.amap.com/v3/config/district', {
        params: {
          keywords: '江西',
          subdistrict: 2,
          key: '5fd5e55edd11ba47e3876cb93613db29'
        }
      })
        .then(function (res) {
          _this.recordList = res.data.districts[0].districts
        })
    }
  },
  computed: {
  },
  watch: {
    notChange: function (newQuestion, oldQuestion) {
      if (this.notChange === true) {
        document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'none'
      } else {
        document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'inline-block'
      }
    }
  },
  mounted () {
    this.addDate()
    this.getData()
    this.branchChangeFuc()
    if (this.$route.path === '/InvBuild') { // 当前为新增页面
      // this.form = {}
      this.pageSwitch = 'build'
      this.changeDetails(false)
    } else { // 当前为详情页面
      this.form.id = this.$route.params.id
      this.pageSwitch = 'details'
      document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'none'
    }
  },
  components: {transferList}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .InvDetails a{
    text-decoration:none;
  }
  /*右下角更多操作导航*/
  .InvDetails .details-nav{
    position: fixed;
    z-index: 3;
    bottom:20px;
    right: 4%;
  }
  .InvDetails .details-nav .details-nav-button{
    font-weight: bold;
    border-radius: 50%;
    height: 4em;
    width: 4em;
    white-space:normal;
    padding:10px;
    animation:water 2s infinite;
    -o-animation:water 2s infinite;
    -moz-animation:water 2s infinite;
    -webkit-animation:water 2s infinite; /* Safari 和 Chrome */
  }
  @keyframes water{
    0% {box-shadow: 0 0 5px #409EFF;}
    50% {box-shadow: 0 0 50px #409EFF;}
    100% {box-shadow: 0 0 5px #409EFF;}
  }
  @-o-keyframes water{
    0% {box-shadow: 0 0 5px #409EFF;}
    50% {box-shadow: 0 0 50px #409EFF;}
    100% {box-shadow: 0 0 5px #409EFF;}
  }
  @-moz-keyframes water{
    0% {box-shadow: 0 0 5px #409EFF;}
    50% {box-shadow: 0 050px #409EFF;}
    100% {box-shadow: 0 0 5px #409EFF;}
  }
  @-webkit-keyframes water{
    0% {box-shadow: 0 0 5px #409EFF;}
    50% {box-shadow: 0 0 50px #409EFF;}
    100% {box-shadow: 0 0 5px #409EFF;}
  }
  /*头部*/
  .InvDetails .hd{
    padding:10px;
    border-bottom:1px solid #ccc;
    margin-bottom:10px;
  }
  .InvDetails .hd:after{
    content: "";
    height: 0;
    width: 0;
    clear: both;
    display: block;
  }
  .InvDetails .hd .hd-title{
    font-size:1.4em;
    font-weight: bold;
  }
  .InvDetails .hd .goBack{
    float: right;
    padding-top: 8px;
    color: #666;
  }
  /*主体部分*/
  .InvDetails .bd{
    padding:10px;
  }
  .InvDetails .bd .bd-title{
    border-bottom: 1px solid #ccc;
    padding:10px;
    margin:0 0 20px;
  }
  .InvDetails .bd .el-cascader,
  .InvDetails .bd .el-input,
  .InvDetails .bd .el-select{
    display: block;
  }
  .InvDetails .bd .el-date-editor.el-input,
  .InvDetails .bd .el-date-editor.el-input__inner,
  .InvDetails .bd .el-input-number{
    width: 100%;
  }
  .InvDetails .bd .record-list li{
    padding:10px 0;
  }
  .InvDetails .bd .change-num{
    padding:12px 0;
    display:block;
    width: 100%;
  }
</style>
