<template>
  <el-row :gutter="20" id="AreaSelection">
    <el-col :xs="24" :sm="12">
      <el-form-item label="Area">
        <el-select v-model="areaIndex" placeholder="请选择Area" @change="selectArea">
          <el-option
            v-for="(item,index) in allArea" :key="index" :label="item.AreaCode" :value="index">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12">
      <el-form-item label="branch">
        <el-select v-model="branchIndex" placeholder="请选择branch" @change="selectBranch">
          <el-option
            v-for="(item,index) in allBranch" :key="index" :label="item.BranchCode" :value="index">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12">
      <el-form-item label="costCtr">
    <el-select v-model="costCtrIndex" placeholder="请选择costCtr" @change="selectCostCtr">
      <el-option
        v-for="(item,index) in allCostCtr" :key="index" :label="item.costCentreCode" :value="index">
      </el-option>
    </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ['defaultArea', 'defaultBranch', 'defaultCost'],
  data () {
    return {
      data: [],
      // 列出区域可选项
      allArea: [],
      allBranch: [],
      allCostCtr: [],
      // 用户 默认 选择的 区域
      area: Number(this.defaultArea) || 0,
      branch: Number(this.defaultBranch) || 0,
      costCtr: Number(this.defaultCost) || 0,
      areaIndex: 0,
      branchIndex: 0,
      costCtrIndex: 0
    }
  },
  methods: {
    // 选择区域改变时运行
    selectArea: function () {
      this.allBranch = this.data[this.areaIndex].children
      this.allCostCtr = this.data[this.areaIndex].children[0].children
      this.area = this.data[this.areaIndex].AreaId
      this.$emit('ensureArea', this.area)
    },
    selectBranch: function () {
      this.allCostCtr = this.data[this.areaIndex].children[this.branchIndex].children
      this.branch = this.data[this.areaIndex].children[this.branchIndex].BranchId
      this.$emit('ensureBranch', this.branch)
    },
    selectCostCtr: function () {
      this.costCtr = this.data[this.areaIndex].children[this.branchIndex].children[this.costCtrIndex].costCentreId
      this.$emit('ensureCostCtr', this.costCtr)
    }
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: 'http://restapi.amap.com/v3/config/district',
      params: { keywords: '湖南', subdistrict: 2, key: '5fd5e55edd11ba47e3876cb93613db29' }
    }).then(res => {
      // data 后台发送的数组
      this.data = [
        {
          'AreaId': 1,
          'AreaCode': '1',
          'children': [{
            'BranchId': 1,
            'BranchCode': '1.1',
            '"BranchName': '1.1',
            'children': [{
              'costCentreId': 1,
              'costCentreCode': '1.1.1',
              'costCentreName': '1.1.1'
            },
            {
              'costCentreId': 2,
              'costCentreCode': '1.1.2',
              'costCentreName': '1.1.2'
            }]
          },
          {
            'BranchId': 2,
            'BranchCode': '1.2',
            '"BranchName': '1.2',
            'children': [{
              'costCentreId': 1,
              'costCentreCode': '1.2.1',
              'costCentreName': '1.2.1'
            },
            {
              'costCentreId': 2,
              'costCentreCode': '1.2.2',
              'costCentreName': '1.2.2'
            }]
          }]
        },
        {
          'AreaId': 2,
          'AreaCode': '2',
          'children': [{
            'BranchId': 1,
            'BranchCode': '2.1',
            '"BranchName': '2.1',
            'children': [{
              'costCentreId': 1,
              'costCentreCode': '2.1.1',
              'costCentreName': '2.1.1'
            },
            {
              'costCentreId': 2,
              'costCentreCode': '2.1.2',
              'costCentreName': '2.1.2'
            }]
          },
          {
            'BranchId': 2,
            'BranchCode': '2.2',
            '"BranchName': '2.2',
            'children': [{
              'costCentreId': 1,
              'costCentreCode': '2.2.1',
              'costCentreName': '2.2.1'
            },
            {
              'costCentreId': 2,
              'costCentreCode': '2.2.2',
              'costCentreName': '2.2.2'
            }]
          }]
        }
      ]
      this.allArea = this.data
      this.allBranch = this.data[this.areaIndex].children
      this.allCostCtr = this.data[this.branchIndex].children[this.branchIndex].children
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
span{ color: #A0A0A0; }
.el-select{
  display: block;
}
</style>
