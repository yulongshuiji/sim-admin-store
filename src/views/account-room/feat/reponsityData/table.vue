<template>
  <div>

    <el-table :data="menuList" row-key="menu_id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      max-height="650" border>
      <el-table-column prop="t1" label="清单编号" :show-overflow-tooltip="true" width="300" />

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
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.page_size" :limit.sync="queryParams.page_num"
      @pagination="getList" />
  </div>

</template>

<script>
export default {
  data() {
    return {
      total: 100,
      queryParams: {
        page_size: 10,
        page_num: 1
      },
      menuList: [
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 0
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 1
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 0
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 1
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 0
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 1
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 0
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 1
        }

      ]
    }
  },
  methods: {
    getList() {

    }
  }

}
</script>

<style></style>
