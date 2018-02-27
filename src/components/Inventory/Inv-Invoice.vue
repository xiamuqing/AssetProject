<template>
  <div class="InvInvoice">
    <el-row  type="flex" justify="center">
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="14">
        <el-form ref="form" label-width="70px" label-position="left">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
              <el-form-item label="发票代码">
                <el-input :disabled="notChange" v-model="invoice.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="发票号码">
                <el-input :disabled="notChange" v-model="invoice.number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="上传PDF">
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="invoice.fileList"
            :on-success="handleAvatarSuccess"
            :disabled="notChange">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="4" :disabled="notChange" v-model="invoice.annotation"></el-input>
          </el-form-item>
          <el-form-item v-show="pageSwitch=='Build'">
            <el-button type="primary" v-on:click="addDate()">上传</el-button>
            <el-button>取消</el-button>
          </el-form-item>
          <el-form-item v-show="pageSwitch=='Details'" style="text-align:center;">
              <el-button type="primary"  v-show="notChange==false" v-on:click="changeDate()">确认</el-button>
              <el-button  v-show="notChange==false" v-on:click="notChange=true">取消</el-button>
              <el-button type="primary" v-show="notChange==true" v-on:click="notChange=false">修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notChange: true, // 判断当前表单元素是否可用
      pageSwitch: '', // 当前页面是新增页还是详情页
      dialogImageUrl: '', // 查看发票图片的图片地址
      dialogVisible: false, // 查看图片的弹窗是否显示
      uploadUrl: 'http://restapi.amap.com/v3/config/district', // 图片上传路径
      invId: '', // 资产ID
      invoiceId: '', // 发票ID
      invoice: { // 发票详情
        code: '2255555', // 发票代码
        number: '55555555', // 发票号码
        fileList: [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        annotation: 'sdgfukrfdguirhgui' // 发票备注
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess (res, file, fileList) {
      console.log(res)
      console.log(file)
      console.log(fileList)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    getDate: function () { // 向后台获取发票数据
      let _this = this
      this.$axios.get(' http://restapi.amap.com/v3/config/district', {
        params: {
          invoiceId: _this.invoiceId
        }
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    changeDate: function () { // 向后台更改发票数据
      let _this = this
      this.$axios.get(' http://restapi.amap.com/v3/config/district', {
        params: {
          invoiceId: _this.invoiceId,
          invoice: _this.invoice
        }
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addDate: function () { // 向后台添加发票数据
      let _this = this
      this.$axios.get(' http://restapi.amap.com/v3/config/district', {
        params: {
          invId: _this.invId,
          invoice: _this.invoice
        }
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  computed: {
  },
  watch: {
    notChange: function (newQuestion, oldQuestion) {
      if (this.notChange === true) {
        document.querySelector('.el-upload--picture-card').style.display = 'none'
      } else {
        document.querySelector('.el-upload--picture-card').style.display = 'inline-block'
      }
    }
  },
  mounted () {
    // alert(this.$route.path)
    if (this.$route.path.indexOf('Build') > 0) { // 当前为新增页面
      this.pageSwitch = 'Build'
      this.invId = this.$route.params[0].split('/')[1]
      this.notChange = false
    } else { // 当前为详情页面
      this.pageSwitch = 'Details'
      this.invoiceId = this.$route.params[0].split('/')[1]
      document.querySelector('.el-upload--picture-card').style.display = 'none'
      this.getDate()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .InvInvoice{
    padding:10px;
  }
</style>
