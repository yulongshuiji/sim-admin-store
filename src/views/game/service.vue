<template>
  <div class="app-container">
    <div style="margin-bottom: 15px;">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['game:service:add']">新增</el-button>
    </div>

    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="ID" align="center" prop="service_id"/>
      <el-table-column label="服务点名称" align="center" prop="service_name"/>
      <el-table-column label="服务点类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.service_type==1">仓库</span>
          <span v-else-if="scope.row.service_type==2">码房</span>
          <span v-else-if="scope.row.service_type==3">柜台</span>
          <span v-else-if="scope.row.service_type==4">现场</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['game:service:update']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['game:service:delete']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.page_size"
      :limit.sync="queryParams.page_num"
      @pagination="getList"
    />

    <!-- 添加修改用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" v-if="open" width="30%" :close-on-click-modal="false" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="类型" prop="service_type" class="table-el-form-item">
              <el-select v-model="form.service_type" placeholder="请选择类型">
                <el-option v-for="item in serviceTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="服务点名称" prop="service_name" class="table-el-form-item">
              <el-input v-model="form.service_name" maxlength="18" placeholder="请输入服务点名称" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { serviceListPage, serviceAdd, serviceUpdate, serviceDelete } from '@/api/service'

export default {
  name: "GameService",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 列表
      listData: [],
      // 查询参数
      queryParams: {
        page_num: 1,
        page_size: 20
      },
      // 总条数
      total: 0,
      // 弹窗
      open: false,
      // 弹出层标题
      title: "",
      // 表单
      form: {},
      // 表单验证规则
      rules: {
        service_type: [
          { required: true, message: "请选择类型" },
        ],
        service_name: [
          { required: true, message: "服务点名称不能为空" },
        ]
      },
      // 状态选项
      serviceTypeOptions: [
        {value: 1, label: "仓库"},
        {value: 2, label: "码房"},
        {value: 3, label: "柜台"},
        {value: 4, label: "现场"}
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.loading = true
      serviceListPage(this.queryParams).then(res => {
        this.total = res.data.total
        this.listData = res.data.list
        this.loading = false
      })
    },
    // 表单重置
    reset() {
      this.form = {
        service_id: undefined,
        service_type: undefined,
        service_name: undefined,
      }
      this.resetForm('form')
    },
    // 打开添加窗口
    handleAdd() {
      this.reset()
      this.title="新增"
      this.open = true
    },
    // 打开编辑窗口
    handleUpdate(row) {
      this.reset()
      this.title="编辑"
      this.form = {
        service_id: row.service_id,
        service_type: row.service_type,
        service_name: row.service_name,
      }
      this.open = true
    },
    // 新增管理员
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.service_id != undefined) {
            serviceUpdate(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('编辑成功')
                this.open = false
                this.getList()
              }
            })
          } else {
            serviceAdd(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              }
            })
          }
        }
      })
    },
    // 取消
    cancel() {
      this.open = false
    },
    // 删除
    handleDelete(row) {
      this.$confirm('是否确认删除?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning"
      }).then(function() {
        return serviceDelete({service_id : row.service_id})
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功")
      }).catch(function() {})
    }
  }
}
</script>
