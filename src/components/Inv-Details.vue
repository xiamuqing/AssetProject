<template>
  <div class="Inv-Details">
   <el-row  type="flex" justify="center">
    <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="10">
      <div class="hd">
        <span class="hd-title">资产编号：65454545</span>
        <el-dropdown class="hd-manipulate" trigger="click">
          <el-button type="primary" size="mini"  plain class="hidden-xs-only">
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-button type="primary" plain class="xs-button hidden-sm-and-up">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>返回主页</el-dropdown-item>
            <el-dropdown-item>弃置</el-dropdown-item>
            <el-dropdown-item v-on:click.native="changeData(false)">修改</el-dropdown-item>
            <el-dropdown-item>转移</el-dropdown-item>
            <el-dropdown-item>报修</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-form label-position="left" ref="form" :model="form" label-width="72px" class="bd">

        <h4 class="bd-title">状态信息：</h4>

        <el-form-item label="所属区域">
          <el-cascader
            :options="options"
            v-model="selectedOptions3"
            :disabled="isChange"
          ></el-cascader>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="当前状态">
              <el-select v-model="form.region" placeholder="请选择活动区域" :disabled="isChange">
                <el-option label="使用中" value="1"></el-option>
                <el-option label="已弃置" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="弃置时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" :disabled="!((form.region==2) && (isChange==false))"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <h4 class="bd-title">资产特征：</h4>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="颜色">
              <el-select v-model="value" placeholder="颜色" :disabled="isChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="尺寸">
              <el-row>
                <el-col :span="8">
                  <el-input v-model="form.name"  placeholder="长(cm)" :disabled="isChange"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="form.name" placeholder="宽(cm)" :disabled="isChange"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="form.name" placeholder="高(cm)" :disabled="isChange"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="型号">
              <el-input v-model="form.name" :disabled="isChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
          <el-form-item label="机身编号">
            <el-input v-model="form.name" :disabled="isChange"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="旧编号">
              <el-input v-model="form.name" :disabled="isChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="资产种类">
              <el-cascader
                :options="options"
                v-model="selectedOptions3"
                :disabled="isChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <h4 class="bd-title">供应商信息：</h4>

        <el-form-item label="供应商">
          <el-select v-model="value" placeholder="供应商" :disabled="isChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row  :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="价格">
              <el-input v-model="form.name" placeholder="Net Price" :disabled="isChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="维修费">
              <el-input v-model="form.name" placeholder="Maintainance Fee" :disabled="isChange"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="交货日期">
              <el-date-picker type="date" placeholder="Delivery Date" v-model="form.date1" :disabled="isChange"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="到期日">
              <el-date-picker type="date" placeholder="Main. Expire Date" v-model="form.date1" :disabled="isChange"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <h4 class="bd-title">附加图片：</h4>

        <el-form-item label="备注/详情">
          <el-input type="textarea" v-model="form.desc" :disabled="isChange"></el-input>
        </el-form-item>

        <h4 class="bd-title">备注：</h4>

        <el-form-item label="备注/详情">
          <el-input type="textarea" v-model="form.desc" :disabled="isChange"></el-input>
        </el-form-item>

        <h4 class="bd-title">迁移记录：</h4>
          <ul class="record-list">
            <li v-for="(data,index) in tableData3" :key="index">
              {{data.date}} ， 从 {{data.name}} 迁移到 {{data.name}} 。迁移原因 ： {{data.address}}
            </li>
          </ul>

        <el-form-item v-show="!isChange">
          <el-button type="primary">立即创建</el-button>
          <el-button v-on:click="changeData(true)">取消</el-button>
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
      form: {
        name: '',
        region: '2',
        date1: '',
        date2: '',
        type: [],
        resource: '',
        desc: ''
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '来电反馈结股份回购果恢复骨结核开国皇帝库房隔开i未婚夫ui领导风格iu回复流进大海v不'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普结股份回购果恢复骨结核开国皇帝库房隔开i未婚夫ui领导风格iu回复流进大1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      selectedOptions3: ['zujian', 'data', 'tag'],
      value: '',
      isChange: true
    }
  },
  // 在 `methods` 对象中定义方法
  methods: {
    changeData: function (temp) {
      this.isChange = temp
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Inv-Details .hd{
    padding:10px;
    border-bottom:1px solid #ccc;
    margin-bottom:10px;
  }
  .Inv-Details .hd:after{
    content: "";
    height: 0;
    width: 0;
    clear: both;
    display: block;
  }
  .Inv-Details .hd .hd-title{
    font-size:1.4em;
    font-weight: bold;
  }
  .Inv-Details .hd .hd-manipulate{
    float:right;
  }
  .Inv-Details .hd .xs-button{
    padding:5px 8px;
  }
  .Inv-Details .hd .xs-button .icon-bar{
    display: block;
    height: 1px;
    width: 30px;
    margin:5px 0;
    background: #409EFF;
  }
  .Inv-Details .hd .xs-button:focus .icon-bar,
  .Inv-Details .hd .xs-button:hover .icon-bar{
    background: #fff;
  }
  .Inv-Details .bd{
    padding:10px;
  }
  .Inv-Details .bd .bd-title{
    border-bottom: 1px solid #ccc;
    padding:10px;
    margin:0 0 20px;
  }
  .Inv-Details .bd .el-cascader,
  .Inv-Details .bd .el-input,
  .Inv-Details .bd .el-select{
    display: block;
  }
  .Inv-Details .bd .el-date-editor.el-input,
  .Inv-Details .bd .el-date-editor.el-input__inner{
    width: 100%;
  }
  .Inv-Details .bd .record-list li{
    padding:10px 0;
  }
</style>
