<template>
  <div class="hello">
    <el-form label-position="left" ref="form" label-width="72px" class="bd">
      <el-form-item label="资产种类">
        <el-cascader
          :options="options"
          v-model="selectedOptions3"
          :props="{value:'id',label:'value',children:'children'}"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <InvoiceSearch></InvoiceSearch>
  </div>
</template>

<script>
import InvoiceSearch from './InvoiceSearch.vue'
export default {
  data () {
    return {
      selectedOptions3: [],
      options: []
    }
  },
  components: {
    InvoiceSearch
  },
  methods: {
    getData: function () { // 当前页面为详情页时，向后台获取数据
      let _this = this
      this.$axios.get('http://10.88.22.54/api/Inventory/TeatData', {
        id: '555554'
      })
        .then(function (response) {
          console.log(response)
          _this.options = response.data
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
