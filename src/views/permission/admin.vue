<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="账号" prop="admin_name">
        <el-input
          v-model="queryParams.admin_name"
          placeholder="请输入账号"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="admin_nickname">
        <el-input
          v-model="queryParams.admin_nickname"
          placeholder="请输入姓名"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号码"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select
          v-model="queryParams.role_id"
          placeholder="请选择角色"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="item in queryRoles"
            :key="item.role_id"
            :label="item.role_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择状态"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['permission:admin:add']">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="用户账号" align="center" prop="admin_name" />
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.role_name" :key="item" type="info" style="margin-right: 8px;">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 1">男</span>
          <span v-else-if="scope.row.sex == 2">女</span>
          <span v-else>"未知"</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center" prop="phone" width="200" />
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.status==0">停用</el-tag>
          <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="指纹" align="center" width="100">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.is_fingerprint==0">未注册</el-tag>
          <el-tag type="success" v-if="scope.row.is_fingerprint==1">已注册</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.root != 1"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['permission:admin:update']"
          >编辑</el-button>
          <el-button
            v-if="scope.row.root != 1"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="toLinkFingerprint(scope.row)"
            v-hasPermi="['permission:admin:fingerprint']"
          >指纹录取</el-button>
          <el-button
            v-if="scope.row.root != 1"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['permission:admin:delete']"
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
    <el-dialog :title="title" :visible.sync="open" v-if="open" width="50%" :close-on-click-modal="false" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="帐号" prop="admin_name">
              <el-input v-model="form.admin_name" maxlength="18" placeholder="请输入帐号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="admin_nickname">
              <el-input v-model="form.admin_nickname" maxlength="12" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色" prop="role_id">
              <el-select v-model="form.role_id" multiple multiple-limit="1" placeholder="请选择角色" >
                <el-option
                  v-for="item in formRoles"
                  :key="item.role_id"
                  :label="item.role_name"
                  :value="item.role_id"
                  :disabled="item.role_id == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.value"
                >{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.id == undefined">
          <el-col :span="12">
            <el-form-item  label="登录密码" prop="password">
              <el-input type="password" maxlength="12" v-model="form.password" placeholder="请输入密码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="confirm_password">
              <el-input type="password" maxlength="12" v-model="form.confirm_password" placeholder="请输入确认密码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.value"
                >{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input maxlength="30" v-model="form.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" maxlength="30" rows="2" show-word-limit resize="none" type="textarea" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加修改用户对话框 -->
    <el-dialog :show-close="false" title="指纹录取" :visible.sync="openFingerprint" v-if="openFingerprint" width="400px" :close-on-click-modal="false" append-to-body>
      <Fingerprint :key="timerFingerprint" :userData="userData" @doSuccess="doSuccess" @doCancel="doCancel" />
    </el-dialog>

  </div>
</template>

<script>
import { adminListPage, adminAdd, adminDetail, adminUpdate, adminDelete } from '@/api/admin'
import { roleList } from '@/api/role'
import Fingerprint from './components/fingerprint'

export default {
  name: "PermissionAdmin",
  components: {
    Fingerprint
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 列表
      listData: [],
      // 角色列表
      queryRoles: [],
      // 角色列表
      formRoles: [],
      // 查询参数
      queryParams: {
        page_num: 1,
        page_size: 20,
        admin_name: undefined,
        admin_nickname: undefined,
        phone: undefined,
        role_id: undefined
      },
      // 弹窗
      open: false,
      // 弹出层标题
      title: "",
      // 表单
      form: {},
      // 表单验证规则
      rules: {
        role_id: [
          { required: true, message: "请选择角色" },
        ],
        admin_name: [
          {
            pattern: /^[0-9a-zA-Z]{1,}$/,
            message: "帐号只允许英文字母、数字"
          },
          { required: true, message: "请输入账号" },
          { min: 3, max: 18, message: "帐号长度为3~18位字符"}
        ],
        admin_nickname: [
          { required: true, message: "请输入姓名" },
          { min: 3, max: 18, message: "帐号长度为2~12位字符"}
        ],
        password: [
          { required: true, message: "请输入密码" },
          { min: 6, max: 12, message: "密码长度为6~12位字符"}
        ],
        confirm_password: [
          { required: true, message: "请输入确认密码" },
          { validator: validatePass, trigger: 'blur', required: true }
        ],
        sex: [
          { required: true, message: "请选择性别" },
        ],
        status: [
          { required: true, message: "请选择状态" },
        ]
      },
      // 状态字典
      statusOptions: [
        {value: 1, label: "正常"},
        {value: 0, label: "停用"}
      ],
      // 性别字典
      sexOptions: [
        {value: 1, label: "男"},
        {value: 2, label: "女"}
      ],
      // 用户信息
      userData: {},
      // 指纹录取显示
      openFingerprint: false,
      // 指纹录取显示时间戳
      timerFingerprint: '',
      // 服务点ID
      serviceId: undefined
    }
  },
  created() {
    this.serviceId = localStorage.getItem('serviceId')
    this.getList()
    this.getRolesList()
  },
  methods: {
    // 列表
    getList() {
      this.loading = true
      adminListPage(this.queryParams).then(res => {
        this.total = res.data.total
        this.listData = res.data.list
        this.loading = false
      })
    },
    // 获取角色列表
    getRolesList() {
      roleList().then(res => {
        this.queryRoles = res.data
      })
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        admin_name: undefined,
        admin_nickname: undefined,
        role_id: [],
        status: 1,
        password: undefined,
        phone: undefined,
        sex: 1,
        remark: undefined
      }
      this.resetForm('form')
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
    // 打开添加窗口
    handleAdd() {
      this.reset()
      this.title="新增"
      this.open = true
      roleList().then(res => {
        this.formRoles = res.data
      })
    },
    // 打开编辑窗口
    handleUpdate(row) {
      this.reset()
      this.title="编辑"
      adminDetail({id: row.id}).then(response => {
        this.form = {
          id: response.data.id,
          admin_name: response.data.admin_name,
          admin_nickname: response.data.admin_nickname,
          role_id: response.data.role_id,
          status: response.data.status,
          phone: response.data.phone,
          sex: response.data.sex,
          remark: response.data.remark
        }
        roleList().then(res => {
          this.formRoles = res.data
        })
        this.open = true
        this.title = "编辑角色"
      });
    },
    // 新增管理员
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            adminUpdate(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('编辑成功')
                this.open = false
                this.getList()
              }
            })
          } else {
            adminAdd(this.form).then(response => {
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
        return adminDelete({id : row.id});
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
    },
    // 指纹录取
    toLinkFingerprint(row){
      this.userData = row;
      this.openFingerprint = true;
      this.timerFingerprint = new Date().getTime();
    },
    // 录制指纹成功
    doSuccess(){
      this.$socket.emit("fingerprint-register-stop", {service_id:this.serviceId})
      this.$socket.removeListener('fingerprint-register-back')
      this.openFingerprint = false;
      this.getList();
    },
    // 取消
    doCancel(){
      this.$socket.emit("fingerprint-register-stop", {service_id:this.serviceId})
      this.$socket.removeListener('fingerprint-register-back')
      this.openFingerprint = false;
    }
  }
}
</script>
