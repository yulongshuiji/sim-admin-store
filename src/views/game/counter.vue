<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="ID" align="center" prop="currency_id" />
      <el-table-column label="币种" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.currency.currency_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="码种名称" align="center" prop="counter_name" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['game:counter:update']"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" :close-on-click-modal="false" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="币种">
          <el-select disabled v-model="form.currency_id" placeholder="请选择币种">
            <el-option v-for="item in currencyList" :key="item.currency_id" :label="item.currency_name" :value="item.currency_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="码种名称" prop="counter_name">
          <el-input maxlength="20" v-model="form.counter_name" placeholder="请输入码种名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.remark" type="textarea" rows="3" maxlength="50" show-word-limit resize="none" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { currencyList } from '@/api/currency'
import { counterList, counterUpdate } from '@/api/counter'

export default {
  name: "CounterList",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 列表
      listData: [],
      // 弹窗
      open: false,
      // 弹出层标题
      title: "",
      // 表单
      form: {},
      // 币种列表
      currencyList: []
    }
  },
  created() {
    this.getCurrencyList()
    this.getList()
  },
  methods: {
    // 获取币种列表
    getCurrencyList() {
      currencyList().then(res => {
        this.currencyList = res.data
      })
    },
    // 列表
    getList() {
      this.loading = true
      counterList().then(res => {
        this.listData = res.data
        this.loading = false
      })
    },
    // 表单重置
    reset() {
      this.form = {
        currency_id: undefined,
        counter_id: undefined,
        counter_name: undefined,
        remark: undefined
      }
    },
    // 打开编辑窗口
    handleUpdate(row) {
      this.reset()
      this.title="编辑"
      this.form = {
        currency_id: row.currency_id,
        counter_id: row.counter_id,
        counter_name: row.counter_name,
        remark: row.remark
      }
      this.open = true
    },
    // 新增管理员
    submitForm() {
      counterUpdate(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess('编辑成功')
          this.open = false
          this.getList()
        }
      })
    },
    // 取消
    cancel() {
      this.open = false
    }
  }
}
</script>
