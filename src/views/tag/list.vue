<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="UID" prop="uid">
        <el-input
          v-model="queryParams.uid"
          placeholder="请输入UID"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['tag:tag:add']">发行</el-button>
        <el-button type="warning" icon="el-icon-search" size="mini" @click="handleParse" v-hasPermi="['tag:tag:parse']">检测</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete" v-hasPermi="['tag:tag:delete']">销毁</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="listData" border max-height="650" :show-summary="true" :summary-method="getSummaries" @selection-change="handleSelection">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="UID" align="center" prop="uid" />
      <el-table-column label="币种" align="center" prop="currency_name" />
      <el-table-column label="码种" align="center" prop="counter_name" />
      <el-table-column label="面额" align="center">
        <template slot-scope="scope">
          <span>{{ numberWithCommas(scope.row.denomination) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="拥有者" align="center" prop="username" />
      <el-table-column label="发行时间" align="center" prop="created_at" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.page_num"
      :limit.sync="queryParams.page_size"
      @pagination="getList"
    />

    <!-- 发行筹码弹窗 -->
    <el-dialog :show-close="false" :title="title" :visible.sync="open" v-if="open" width="60%" :close-on-click-modal="false" append-to-body>
      <ListDialog :key="timer" @doSuccess="doSuccess" @doCancel="doCancel" />
    </el-dialog>

    <!-- 查验筹码弹窗 -->
    <el-dialog :show-close="false" :title="title" :visible.sync="openParse" v-if="openParse" width="80%" :close-on-click-modal="false" append-to-body>
      <TagParseDialog :key="timer" @doSuccessParse="doSuccessParse" @doCancelParse="doCancelParse" />
    </el-dialog>

  </div>
</template>

<script>
import { tagListPage, tagParse } from '@/api/tag'
import ListDialog from './components/listDialog'
import TagParseDialog from './components/tagParseDialog'

export default {
  name: "TagList",
  components: {
    ListDialog,
    TagParseDialog
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
        uid: undefined,
        username: undefined
      },
      // 弹窗
      open: false,
      openParse: false,
      // 弹出层标题
      title: "",
      // 弹窗时间戳
      timer: '',
      // 合计
      sumTotalDenomination: 0,
      sumTotalCount: 0,
      // 多选
      selectedTags: [],
      // 服务点ID
      serviceId: undefined
    }
  },
  created() {
    this.serviceId = localStorage.getItem('serviceId')
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.loading = true
      tagListPage(this.queryParams).then(res => {
        this.total = res.data.total
        this.listData = res.data.list
        this.sumTotalDenomination = this.numberWithCommas(res.data.sum_total_denomination)
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
      this.title="发行"
      this.timer = new Date().getTime()
      this.open = true
    },
    // 打开查验窗口
    handleParse() {
      this.title="筹码操作"
      this.timer = new Date().getTime()
      this.openParse = true
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
    // 成功
    doSuccessParse(){
      this.$socket.emit("read-tags-stop", {service_id:this.serviceId})
      this.$socket.removeListener('read-tags-back')
      this.openParse = false;
      this.getList();
    },
    // 取消
    doCancelParse(){
      this.$socket.emit("read-tags-stop", {service_id:this.serviceId})
      this.$socket.removeListener('read-tags-back')
      this.openParse = false;
    },
    // 删除
    handleDelete() {
      let that = this
      if(that.selectedTags.length == 0){
        that.msgError('请选择要销毁的标签')
        return false
      }
      this.$confirm('是否确认销毁?操作后不能恢复！', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning"
      }).then(function() {
        let formDelete = {
          type: 1,
          tags: that.selectedTags
        }
        return tagParse(formDelete);
      }).then(() => {
        that.getList();
        that.msgSuccess("销毁成功");
      }).catch(function() {});
    },
    // 合计
    getSummaries(param) {
      let that = this
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 4) {
          sums[4] = '总发行面额 ' + that.sumTotalDenomination
          return;
        }
        sums[index] = ''
      });
      return sums
    },
    // 多选框选中数据
    handleSelection(selection) {
      this.selectedTags = selection.map(item => item.uid);
    },
  }
}
</script>
