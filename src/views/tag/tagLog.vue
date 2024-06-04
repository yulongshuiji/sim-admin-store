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
        <el-button type="success" icon="el-icon-plus" size="mini" @click="handleSell" v-hasPermi="['tag:tag:sell']">筹码兑换</el-button>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button :type="buttonType(1)" size="mini" @click="toSearch(1)">今天</el-button>
        <el-button :type="buttonType(2)" size="mini" @click="toSearch(2)">昨天</el-button>
        <el-button :type="buttonType(3)" size="mini" @click="toSearch(3)">本周</el-button>
        <el-button :type="buttonType(4)" size="mini" @click="toSearch(4)">上周</el-button>
        <el-button :type="buttonType(5)" size="mini" @click="toSearch(5)">本月</el-button>
        <el-button :type="buttonType(6)" size="mini" @click="toSearch(6)">上月</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="listData" border max-height="650" :show-summary="true" :summary-method="getSummaries">
      <el-table-column label="洗码卡" align="center" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}({{ scope.row.nickname }})</span>
        </template>
      </el-table-column>
      <el-table-column label="代理" align="center" width="250">
        <template slot-scope="scope">
          <span v-if="scope.row.parent_id > 0">{{ scope.row.parent_username }}({{ scope.row.parent_nickname }})</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" width="150">
        <template slot-scope="scope">
          <span style="color:#67c23a" v-if="scope.row.type==1">买码</span>
          <span style="color:#e6a23c" v-if="scope.row.type==2">退码</span>
        </template>
      </el-table-column>
      <el-table-column label="币种" align="center" prop="currency_name" width="150" />
      <el-table-column label="码种" align="center" prop="counter_name" width="150" />
      <el-table-column label="总额" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ numberWithCommas(scope.row.total_denomination) }}</span>
        </template>
      </el-table-column>
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
            v-hasPermi="['tag:tagLog:detail']"
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

    <!-- 兑换筹码弹窗 -->
    <el-dialog :show-close="false" :title="title" :visible.sync="openSell" v-if="openSell" width="60%" :close-on-click-modal="false" append-to-body>
      <SellDialog :key="timer" @doSuccess="doSuccess" @doCancel="doCancel" />
    </el-dialog>

  </div>
</template>

<script>
import { tagLogListPage } from '@/api/tagLog'
import SellDialog from './components/sellDialog'

export default {
  name: "TagLogList",
  components: {
    SellDialog
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
        type: undefined
      },
      // 弹窗
      openDetail: false,
      openSell: false,
      // 弹出层标题
      title: "",
      // 状态选项
      typeOptions: [
        {value: 1, label: "买码"},
        {value: 2, label: "退码"},
      ],
      // 桌子列表
      tableList: [],
      // 时间类型
      dateTime: 1,
      // 弹窗时间戳
      timer: '',
      // 筹码明细
      detail: {},
      // 合计
      sumTotalDenomination: 0,
      sumTotalCount: 0,
      // 服务点ID
      serviceId: undefined
    }
  },
  created() {
    this.serviceId = localStorage.getItem('serviceId')
    this.queryParams = this.addDateTimeRange(this.queryParams, this.dateTime)
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.loading = true
      tagLogListPage(this.queryParams).then(res => {
        this.total = res.data.total
        this.listData = res.data.list
        this.sumTotalDenomination = res.data.sum_total_denomination
        this.sumTotalCount = res.data.sum_total_count
        this.loading = false
      })
    },
    // 搜索
    handleQuery() {
      this.queryParams.page_num = 1;
      this.getList()
    },
    // 重置
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    handleSell(){
      this.title="筹码兑换"
      this.timer = new Date().getTime()
      this.openSell = true
    },
    // 成功
    doSuccess(){
      this.$socket.emit("read-tags-stop", {service_id:this.serviceId})
      this.$socket.removeListener('read-tags-back')
      this.openSell = false
      this.getList();
    },
    // 取消
    doCancel(){
      this.$socket.emit("read-tags-stop", {service_id:this.serviceId})
      this.$socket.removeListener('read-tags-back')
      this.openSell = false
    },
    // 详情弹窗
    handleDetail(row){
      this.detail = row.detail;
      this.openDetail = true
    },
    // 关闭详情弹窗
    cancelDetail(){
      this.openDetail = false
    },
    // 时间范围选择按钮
    buttonType(value){
      if(value === this.dateTime){
        return 'primary'
      } else {
        return ''
      }
    },
    // 时间范围选择
    toSearch(value){
      this.dateTime = value
      this.queryParams = this.addDateTimeRange(this.queryParams, value)
      this.getList()
    },
    // 合计
    getSummaries(param) {
      let that = this
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[0] = '合计'
          return
        }
        if (index === 5) {
          sums[5] = that.numberWithCommas(that.sumTotalDenomination)
          return;
        }
        if (index === 6) {
          sums[6] = that.numberWithCommas(that.sumTotalCount)
          return
        }
        sums[index] = ''
      });
      return sums
    }
  }
}
</script>
