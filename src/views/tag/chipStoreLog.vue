<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="桌子" prop="table_id">
        <el-select
          v-model="queryParams.table_id"
          placeholder="请选择桌子"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="item in tableList"
            :key="item.table_id"
            :label="item.table_name"
            :value="item.table_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="请选择类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd(1)" v-hasPermi="['tag:store:type1']">出码</el-button>
        <el-button type="warning" icon="el-icon-plus" size="mini" @click="handleAdd(2)" v-hasPermi="['tag:store:type2']">收码</el-button>
        <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd(3)" v-hasPermi="['tag:store:type3']">加彩</el-button>
        <el-button type="warning" icon="el-icon-plus" size="mini" @click="handleAdd(4)" v-hasPermi="['tag:store:type4']">提彩</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="桌子" align="center" prop="table_name" />
      <el-table-column label="类型" align="center" width="150">
        <template slot-scope="scope">
          <span style="color:#67c23a" v-if="scope.row.type==1">出码</span>
          <span style="color:#e6a23c" v-if="scope.row.type==2">收码</span>
          <span style="color:#67c23a" v-if="scope.row.type==3">加彩</span>
          <span style="color:#e6a23c" v-if="scope.row.type==4">提彩</span>
        </template>
      </el-table-column>
      <el-table-column label="币种" align="center" prop="currency_name" width="150" />
      <el-table-column label="码种" align="center" prop="counter_name" width="150" />
      <el-table-column label="总额" align="center" prop="total_denomination" width="150" />
      <el-table-column label="个数" align="center" prop="total_count" width="150" />
      <el-table-column label="操作人" align="center" prop="admin_name" width="120" />
      <el-table-column label="操作时间" align="center" prop="created_at" width="160" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleDetail(scope.row)"
            v-hasPermi="['tag:store:detail']"
          >详情</el-button>
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

    <!-- 明细 -->
    <el-dialog :show-close="false" title="详情" :visible.sync="openDetail" width="60%" :close-on-click-modal="false" append-to-body>
      <el-row>
        <el-col :span="24">
          <div>
            <el-tag type="info" v-for="(value,key) in detail" :key="key" style="margin-right: 10px;">{{ key }} <span style="color: #67c23a;">({{ value }})</span></el-tag>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="cancelDetail">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 弹窗 -->
    <el-dialog :title="title" :show-close="false" :visible.sync="open" v-if="open" width="60%" :close-on-click-modal="false" append-to-body>
      <ChipStoreLogDialog  :key="timer" :type="type" @doSuccess="doSuccess" @doCancel="doCancel" />
    </el-dialog>

  </div>
</template>

<script>
import { chipStoreLogListPage } from '@/api/chipStoreLog'
import { tableList } from '@/api/table'
import ChipStoreLogDialog from './components/chipStoreLogDialog'

export default {
  name: "ChipStoreLogList",
  components: {
    ChipStoreLogDialog
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
        table_id: undefined,
        type: undefined
      },
      // 弹窗
      openDetail: false,
      open: false,
      // 弹出层标题
      title: "",
      // 状态选项
      typeOptions: [
        {value: 1, label: "出码"},
        {value: 2, label: "收码"},
        {value: 3, label: "加彩"},
        {value: 4, label: "提彩"}
      ],
      // 桌子列表
      tableList: [],
      // 弹窗事件
      type: 1,
      // 弹窗时间戳
      timer: '',
      // 明细
      detail: {},
      // 服务点ID
      serviceId: undefined
    }
  },
  created() {
    this.serviceId = localStorage.getItem('serviceId')
    this.getList()
    this.getTableList()
  },
  methods: {
    // 获取桌子列表
    getTableList() {
      tableList().then(res => {
        this.tableList = res.data
      })
    },
    // 列表
    getList() {
      this.loading = true
      chipStoreLogListPage(this.queryParams).then(res => {
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
    handleAdd(value) {
      let that = this;
      switch(value){
        case 1:
          that.title="出码"
          break
        case 2:
          that.title="收码"
          break
        case 3:
          that.title="加彩"
          break
        case 4:
          that.title="提彩"
          break
      }
      that.type = value
      that.timer = new Date().getTime()
      that.open = true
    },
    // 成功
    doSuccess(){
      this.$socket.emit("read-tags-stop", {service_id:this.serviceId})
      this.$socket.removeListener('read-tags-back')
      this.open = false;
      this.getList();
    },
    // 取消
    doCancel(){
      this.$socket.emit("read-tags-stop", {service_id:this.serviceId})
      this.$socket.removeListener('read-tags-back')
      this.open = false;
    },
    handleDetail(row){
      this.detail = row.detail;
      this.openDetail = true;
    },
    cancelDetail(){
      this.openDetail = false;
    },
  }
}
</script>
