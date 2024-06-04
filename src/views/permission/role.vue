<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色编码" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入角色编码"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择角色状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['permission:role:add']">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="roleList" border max-height="650">
      <el-table-column label="角色名称" prop="role_name" :show-overflow-tooltip="true" />
      <el-table-column label="角色编码" prop="role_key" :show-overflow-tooltip="true" />
      <el-table-column label="角色描述" prop="description" :show-overflow-tooltip="true" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.status==0">停用</el-tag>
          <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['permission:role:update']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['permission:role:delete']"
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
        <el-form-item label="角色名称" prop="role_name">
          <el-input maxlength="20" v-model="form.role_name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="role_key">
          <el-input maxlength="20" v-model="form.role_key" placeholder="请输入角色编码" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.description" type="textarea" rows="3" maxlength="50" show-word-limit resize="none" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.value"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            :data="menuOptions"
            show-checkbox
            ref="menu"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
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
import { roleListPage, roleDetail, roleAdd, roleUpdate, roleDelete } from "@/api/role";
import { menuTreeSelect, roleMenuTreeSelect } from "@/api/routes";

export default {
  name: "Role",
  data() {
    return {
      // 是否显示选项
      statusOptions: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 }
      ],
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 菜单列表
      menuOptions: [],
      // 查询参数
      queryParams: {
        page_num: 1,
        page_size: 20,
        name: undefined,
        role_key: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 树形格式
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {
        role_name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
          { max: 20, message: "角色名称不能超过20个字"}
        ],
        role_key: [
          {
            pattern: /^[a-zA-Z]{1,}$/,
            message: "角色编码只允许大小写英文字母"
          },
          { required: true, message: "角色编码不能为空", trigger: "blur" },
          { max: 20, message: "角色编码长度不能超过20个字符"},
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 分页列表
    getList() {
      this.loading = true;
      roleListPage(this.queryParams).then(
        response => {
          this.roleList = response.data.list;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },
    // 查询菜单树结构
    getMenuTreeSelect() {
      menuTreeSelect({status: 0}).then(response => {
        this.menuOptions = response.data;
      });
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    // 根据角色ID查询菜单树结构
    getRoleMenuTreeSelect(roleId) {
      return roleMenuTreeSelect({role_id: roleId}).then(response => {
        this.menuOptions = response.data.menus;
        return response;
      });
    },
    // 取消
    cancel() {
      this.open = false;
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.form = {
        role_id: undefined,
        role_name: undefined,
        role_key: undefined,
        sort: 0,
        status: 1,
        menu_ids: [],
        description: undefined
      };
      this.resetForm("form");
    },
    // 搜索
    handleQuery() {
      this.queryParams.page_num = 1;
      this.getList();
    },
    // 重置
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 新增
    handleAdd() {
      this.reset();
      this.menuOptions = [];
      this.getMenuTreeSelect();
      this.open = true;
      this.title = "新增角色";
    },
    // 编辑
    handleUpdate(row) {
      this.reset();
      this.menuOptions = [];
      const roleMenu = this.getRoleMenuTreeSelect(row.role_id);
      roleDetail({role_id: row.role_id}).then(response => {
        this.form = response.data;
        this.open = true;
        this.$nextTick(() => {
          roleMenu.then(res => {
            const role = [];
            res.data.checked_keys.forEach(f => {
              console.log(f);
              if (!this.$refs.menu.getNode(f).childNodes || !this.$refs.menu.getNode(f).childNodes.length) {
                role.push(f)
              }
            })
            this.$refs.menu.setCheckedKeys(role);
          });
        });
        this.title = "编辑角色";
      });
    },
    // 提交
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.role_id != undefined) {
            this.form.menu_ids = this.getMenuAllCheckedKeys();
            roleUpdate(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("编辑成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            this.form.menu_ids = this.getMenuAllCheckedKeys();
            roleAdd(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
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
        return roleDelete({role_id: row.role_id});
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
    }
  }
};
</script>
<style scoped>
.el-tree {
  overflow: auto;
  max-height: 350px;
}
</style>