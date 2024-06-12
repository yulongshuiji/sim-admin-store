<template>
  <div class="app-container">
    <div class="header">
      <div class="common" @click="back">
        <img src="@/assets/acount-room/back.svg">
      </div>
      <div class="common" @click="goHome">
        <img src="@/assets/acount-room/index.svg">
      </div>
    </div>
    <div class="content">

      <el-form :inline="true">
        <el-form-item>
          <el-button v-hasPermi="['permission:menu:add']" type="success" icon="el-icon-plus" size="mini"
            @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="menuList" row-key="menu_id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" max-height="650" border>
        <el-table-column prop="title" label="菜单名称" :show-overflow-tooltip="true" width="300" />
        <el-table-column prop="icon" label="图标" align="center" width="80">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.icon !== null ? scope.row.icon : ''" />
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="80" />
        <el-table-column prop="perms" label="权限标识" align="center" :show-overflow-tooltip="true" width="200" />
        <el-table-column prop="request_uri" label="接口方法" align="center" :show-overflow-tooltip="true" width="250" />
        <el-table-column prop="component" label="组件路径" align="center" :show-overflow-tooltip="true" width="200" />
        <el-table-column prop="is_show" label="隐藏" align="center" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_show == 0" type="warning">隐藏</el-tag>
            <el-tag v-else type="success">显示</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_disable" label="是否禁用" align="center" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_disable === 1" type="warning">停用</el-tag>
            <el-tag v-else type="success">启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-hasPermi="['permission:menu:update']" size="mini" type="text" icon="el-icon-edit"
              @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.type !== 'A'" v-hasPermi="['permission:menu:add']" size="mini" type="text"
              icon="el-icon-plus" @click="handleAdd(scope.row)">新增</el-button>
            <el-button v-hasPermi="['permission:menu:delete']" size="mini" type="text" icon="el-icon-delete"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加或修改菜单对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="600px" :close-on-click-modal="false" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="上级菜单">
                <treeselect v-model="form.pid" :options="menuOptions" :normalizer="normalizer" :show-count="true"
                  placeholder="选择上级菜单" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="菜单类型" prop="type">
                <el-radio-group v-model="form.type">
                  <el-radio label="M">目录</el-radio>
                  <el-radio label="C">菜单</el-radio>
                  <el-radio label="A">按钮</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item v-if="form.type != 'A'" label="菜单图标">
                <el-popover placement="bottom-start" width="460" trigger="click" @show="$refs['iconSelect'].reset()">
                  <IconSelect ref="iconSelect" @selected="selected" />
                  <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                    <svg-icon v-if="form.icon" slot="prefix" :icon-class="form.icon" class="el-input__icon"
                      style="height: 32px;width: 16px;" />
                    <i v-else slot="prefix" class="el-icon-search el-input__icon"></i>
                  </el-input>
                </el-popover>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="菜单名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入菜单名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示排序" prop="sort">
                <el-input-number v-model="form.sort" controls-position="right" :min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="form.type != 'A'" label="路由地址" prop="path">
                <el-input v-model="form.path" placeholder="请输入路由地址" />
              </el-form-item>
            </el-col>
            <el-col v-if="form.type == 'C'" :span="12">
              <el-form-item label="组件路径" prop="component">
                <el-input v-model="form.component" placeholder="请输入组件路径" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="form.type != 'M'" label="权限标识">
                <el-input v-model="form.perms" placeholder="请输入权限标识" maxlength="100" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.type != 'M'" label="接口方法">
                <el-input v-model="form.request_uri" placeholder="请输入接口方法" maxlength="100" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="form.type != 'A'" label="显示状态">
                <el-radio-group v-model="form.is_show">
                  <el-radio v-for="item in isShowOptions" :key="item.value" :label="item.value">{{ item.label
                    }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.type != 'A'" label="菜单状态">
                <el-radio-group v-model="form.is_disable">
                  <el-radio v-for="item in isDisableOptions" :key="item.value" :label="item.value">{{ item.label
                    }}</el-radio>
                </el-radio-group>
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
  </div>

</template>

<script>
import { routeList, routeDetail, routeAdd, routeDelete, routeUpdate } from '@/api/routes'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import IconSelect from '@/components/IconSelect'

export default {
  name: 'Menu',
  components: { Treeselect, IconSelect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '菜单排序不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '路由地址不能为空', trigger: 'blur' }
        ]
      },
      // 是否显示选项
      isShowOptions: [
        { label: '显示', value: 1 },
        { label: '隐藏', value: 0 }
      ],
      // 状态选项
      isDisableOptions: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 }
      ],
      showBack: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name
    },
    // 转换菜单数据结构
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.menu_id,
        label: node.title,
        children: node.children,
        isDisabled: node.type == 'A',
      }
    },
    // 查询菜单下拉树结构
    getTreeselect() {
      routeList().then(response => {
        this.menuOptions = []
        const menu = { menu_id: 0, title: '主类目', children: [] }
        menu.children = response.data
        this.menuOptions.push(menu)
      })
    },
    // 按钮查询
    handleQuery() {
      this.getList()
    },
    // 获取列表
    getList() {
      this.listLoading = true
      routeList(this.listQuery).then(res => {
        this.menuList = res.data
        this.loading = false
      })
    },
    // 新增
    handleAdd(row) {
      this.reset()
      this.getTreeselect()
      if (row != null && row.menu_id) {
        this.form.pid = row.menu_id
      } else {
        this.form.pid = 0
      }
      this.open = true
      this.title = '添加菜单'
    },
    // 编辑
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      routeDetail({ menu_id: row.menu_id }).then(response => {
        console.log(response);
        this.form = {
          menu_id: response.data.menu_id,
          pid: response.data.pid,
          title: response.data.title,
          icon: response.data.icon,
          type: response.data.type,
          sort: response.data.sort,
          path: response.data.path,
          component: response.data.component,
          perms: response.data.perms,
          request_uri: response.data.request_uri,
          is_show: response.data.is_show,
          is_disable: response.data.is_disable,
        };
        this.open = true;
        this.title = "编辑菜单";
      });
    },
    // 表单重置
    reset() {
      this.form = {
        menu_id: undefined,
        pid: 0,
        type: 'M',
        icon: undefined,
        title: undefined,
        sort: 0,
        path: undefined,
        component: undefined,
        perms: undefined,
        request_uri: undefined,
        is_show: 1,
        is_disable: 0
      }
      this.resetForm('form')
    },
    // 提交
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.menu_id != undefined) {
            routeUpdate(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('编辑成功')
                this.open = false
                this.getList()
              }
            })
          } else {
            routeAdd(this.form).then(response => {
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
      }).then(function () {
        return routeDelete({ menu_id: row.menu_id });
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () { });
    },
    back() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
.app-main {
  height: calc(100vh - 50px);
  width: 100%;
}

.app-container {
  .content {
    background-color: $pageBg2 !important;
    border-radius: 16px;
    width: 100%;
    height: 100%;
    padding: 24px;
  }

  border-radius: 16px;
  width: 100%;

  .header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;

    .common {
      display: flex;
      width: 40px;
      height: 40px;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: 36px;
      background: #2A2631;
      cursor: pointer;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
