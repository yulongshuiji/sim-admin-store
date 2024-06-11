<template>
  <div>
    <el-table :data="tableData" row-key="menu_id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      max-height="650" border>

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
          <el-button size="mini" style="margin-right: 20px" type="text" v-for="(item,index) in operateObj" :key="index" @click="handleUpdate(scope.row)">{{
            item.label }}</el-button>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="t1" label="清单编号" :show-overflow-tooltip="true" width="300" />

      <el-table-column prop="t2" label="入库时间" align="center" />
      <el-table-column prop="t3" label="币种" align="center" :show-overflow-tooltip="true" width="200" />
      <el-table-column prop="t4" label="筹码类型" align="center" :show-overflow-tooltip="true" width="250" />
      <el-table-column prop="t5" label="筹码面额" align="center" :show-overflow-tooltip="true" width="200" />
      <el-table-column prop="t6" label="筹码数量" align="center" :show-overflow-tooltip="true" width="200" />
      <el-table-column prop="t7" label="操作人" align="center" :show-overflow-tooltip="true" width="200" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div class="staus-box" v-if="scope.row.t8 == 0">
            <span class="suc-cir"></span>
            <span>提交成功</span>
          </div>
          <div class="staus-box" v-else>
            <span class="fail-cir"></span>
            <span>提交失败</span>
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.page_size" :limit.sync="queryParams.page_num"
      @pagination="getList" />
  </div>

</template>

<script>
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
    }
  },
  data() {
    return {
      total: 100,
      queryParams: {
        page_size: 10,
        page_num: 1
      },

    }
  },
  methods: {
    getList() {

    }
  }

}
</script>

<style></style>
