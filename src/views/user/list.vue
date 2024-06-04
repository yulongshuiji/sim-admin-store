<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="洗码卡" prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入洗码卡"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
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
        <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['user:user:add']">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="ID" align="center" prop="user_id" width="60" />
      <el-table-column label="类型" align="center" width="80">
        <template slot-scope="scope">
          <span style="color:#67c23a" v-if="scope.row.user_type==1">代理</span>
          <span style="color:#e6a23c" v-else>会员</span>
        </template>
      </el-table-column>
      <el-table-column label="上级代理" align="center" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.parent_username != null">{{ scope.row.parent_username }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="洗码卡" align="center" prop="username" />
      <el-table-column label="姓名" align="center" prop="nickname" />
      <el-table-column label="占股率" align="center" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.user_type == 1">{{ scope.row.share_rate }} %</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="占股分担码费" align="center" width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.user_type == 1 && scope.row.wash_share == 0">不分担</span>
          <span v-else-if="scope.row.user_type == 1 && scope.row.wash_share == 1">按占股比例分担码费</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="洗码方式" align="center" width="100">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.wash_type==1">单边洗码</el-tag>
          <el-tag type="warning" v-if="scope.row.wash_type==2">双边洗码</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="洗码率" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.wash_rate }} %</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center" width="80">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.sex==1">男</el-tag>
          <el-tag type="info" v-else-if="scope.row.sex==2">女</el-tag>
          <el-tag type="info" v-else>未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center" prop="phone" width="120" />
      <el-table-column label="状态" align="center" width="80">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
          <el-tag type="warning" v-else>停用</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['user:user:update']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['user:user:delete']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.page_num"
      :limit.sync="queryParams.page_size"
      @pagination="getList"
    />

    <!-- 添加修改用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" :close-on-click-modal="false" append-to-body>
      <Edit :key="timer" :userId="userId" :addEdit="addEdit" @doSuccess="doSuccess" @doCancel="doCancel" />
    </el-dialog>

  </div>
</template>

<script>
import { userListPage, userDelete } from '@/api/account'
import Edit from './components/edit'

export default {
  name: "UserList",
  components: {
    Edit
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 列表
      listData: [],
      // 查询参数
      queryParams: {
        page_num: 1,
        page_size: 20,
        username: undefined,
        status: undefined
      },
      // 弹窗
      open: false,
      // 弹出层标题
      title: "",
      // 状态选项
      statusOptions: [
        {value: 1, label: "正常"},
        {value: 0, label: "停用"}
      ],
      // 弹窗事件
      addEdit: 1,
      // 用户ID
      userId: 0,
      // 弹窗时间戳
      timer: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.loading = true
      userListPage(this.queryParams).then(res => {
        this.total = res.data.total
        this.listData = res.data.list
        this.loading = false
      })
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
    // 打开新增窗口
    handleAdd() {
      this.title="新增"
      this.addEdit = 1
      this.userId = 0
      this.timer = new Date().getTime()
      this.open = true
    },
    // 打开编辑窗口
    handleUpdate(row) {
      this.title = "编辑"
      this.addEdit = 2
      this.userId = parseInt(row.user_id)
      this.timer = new Date().getTime()
      this.open = true
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
        return userDelete({user_id : row.user_id});
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
    },
    // 成功
    doSuccess(){
      this.open = false;
      this.getList();
    },
    // 取消
    doCancel(){
      this.open = false;
    }
  }
}
</script>
