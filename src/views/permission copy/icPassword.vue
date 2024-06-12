<template>
  <div class="app-container">
    <div style="margin-bottom: 15px;">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['permission:role:add']">新增</el-button>
    </div>

    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="ID" prop="ic_password_id" />
      <el-table-column label="验证密码" prop="password" />
      <el-table-column label="管理员" prop="admin_name" />
      <el-table-column label="创建时间" prop="created_at" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['permission:icPassword:delete']"
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

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" :close-on-click-modal="false" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="管理员" prop="admin_id">
          <el-select v-model="form.admin_id" placeholder="请选择管理员">
            <el-option v-for="item in adminList" :key="item.id" :label="item.admin_name + ' ('+item.admin_nickname+')'" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="验证密码" prop="password">
          <el-input type="password" maxlength="10" v-model="form.password" placeholder="请输入验证密码" />
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
import { icPasswordListPage, icPasswordAdd, icPasswordDelete } from "@/api/icPassword";
import { adminList } from "@/api/admin";
export default {
  name: "IcPassword",
  data() {
    return {
      adminList: [],
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        page_num: 1,
        page_size: 20
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        admin_id: [
          { required: true, message: "请选择管理员"}
        ],
        password: [
          { required: true, message: "验证密码不能为空"}
        ]
      },
      // 列表
      listData: [],
    };
  },
  created() {
    this.getAdminList()
    this.getList()
  },
  methods: {
    // 获取管理员列表
    getAdminList() {
      adminList().then(res => {
        this.adminList = res.data
      })
    },
    // 分页列表
    getList() {
      this.loading = true;
      icPasswordListPage(this.queryParams).then(
        response => {
          this.listData = response.data.list
          this.total = response.data.total
          this.loading = false
        }
      );
    },
    // 取消
    cancel() {
      this.open = false
    },
    // 表单重置
    reset() {
      this.form = {
        admin_id: undefined,
        password: undefined
      };
      this.resetForm("form");
    },
    // 新增
    handleAdd() {
      this.reset()
      this.open = true
      this.title = "新增验证密码"
    },
    // 提交
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          icPasswordAdd(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              this.open = false
              this.getList()
            }
          });
        }
      });
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确认删除?', "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning"
      }).then(function() {
        return icPasswordDelete({ic_password_id: row.ic_password_id});
      }).then(() => {
        this.getList()
        this.msgSuccess("删除成功")
      }).catch(function() {})
    }
  }
};
</script>