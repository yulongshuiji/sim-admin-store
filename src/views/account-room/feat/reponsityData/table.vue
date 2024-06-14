<template>
  <div>
    <el-table v-loading="tableParams.loading" element-loading-background="rgba(0, 0, 0, 0.7)" element-loading-spinner="el-icon-loading"
      element-loading-text="加载中" :data="tableData" row-key="menu_id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" max-height="650" border>

      <el-table-column v-for="column in columns" :key="column.key" :prop="column.key" :label="column.name">
        <template v-slot="scope">
          <div v-if="column.key === 't8'">
            <div v-if="scope.row.t8 === 0" class="staus-box">
              <span class="suc-cir"></span>
              <span>提交成功</span>
            </div>
            <div v-else class="staus-box">
              <span class="fail-cir"></span>
              <span>提交失败</span>
            </div>
          </div>
          <div v-else>
            {{ scope.row[column.key] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="operateObj.length > 0">
        <template slot-scope="scope">
          <el-button size="mini" style="margin-right: 20px" type="text" v-for="(item, index) in operateObj" :key="index"
            @click="item.method(scope.row)">{{
              item.label }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="tableParams.total > 0" :total="tableParams.total" :page.sync="tableParams.page_size" :limit.sync="tableParams.page_num"
      @pagination="getList" />
  </div>

</template>

<script>
import { codeInResposityList } from '@/api/code'
import { counterList } from '@/api/counter'
import { currencyList } from '@/api/currency'
export default {
  props: {
    columns: {
      type: Array,
      require: true
    },
    tableData: {
      type: Array,
      require: true
    },
    operateObj: {
      type: Array,
    },
    tableParams: {
      type: Object
    }
  },
  data() {
    return {

      codeList: [], // 码种
      currencyList: [] // 币种

    }
  },
  methods: {
    getList() {

    },
    async initData() {
      const res = await counterList()
      this.codeList = res.data
      const res2 = await currencyList()
      this.currencyList = res2.data
    }
  },
  mounted() {
  }

}
</script>

<style></style>
