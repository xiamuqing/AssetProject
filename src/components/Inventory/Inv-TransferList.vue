<template>
  <div id="transferList">
    <el-table :data="recordList" style="width: 100%" :max-height="height">
      <el-table-column prop="date" label="迁移日期" width="130" sortable
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler" ></el-table-column>
      <el-table-column prop="name" label="迁移起点">
      </el-table-column>
      <el-table-column prop="name" label="目的地">
      </el-table-column>
      <el-table-column prop="level" label="状态" width="80" :filters="[{ text: '城市', value: 'city' }, { text: '县', value: 'district' }]" :filter-method="filterTagFuc" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level=='city'"
            close-transition>城市</el-tag>
            <el-tag v-if="scope.row.level=='district'"
            type="success"
            close-transition>县</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="迁移原因">
        <el-table-column prop="city" label="搬迁" width="100"></el-table-column>
        <el-table-column prop="address" label="入仓" width="100"></el-table-column>
        <el-table-column prop="zip" label="调遣" width="100"></el-table-column>
        <el-table-column prop="zip" label="电脑分配" width="100"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['recordList', 'height'],
  methods: {
    filterTagFuc (value, row) {
      return row.level === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style scoped>
#transferList{ width: 100%; margin: 0 auto; }
</style>
