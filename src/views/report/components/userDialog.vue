<template>
  <div>
    <!-- 搜索 -->
    <div class="search-left" style="width: 65%; float: left;">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="币种" prop="currency_id">
          <el-select v-model="queryParams.currency_id" placeholder="请选择币种" @change="getCounterList">
            <el-option v-for="item in currencyList" :key="item.currency_id" :label="item.currency_name" :value="item.currency_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="码种" prop="counter_id">
          <el-select v-model="queryParams.counter_id" placeholder="请选择码种">
            <el-option v-for="item in counterList" :key="item.counter_id" :label="item.counter_name" :value="item.counter_id"></el-option>
          </el-select>
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
        </el-form-item>
      </el-form>
    </div>
    <div class="search-right" style="width: 35%; float: right; text-align: right; padding-top: 5px;">
      <el-button :type="buttonType(1)" size="mini" @click="toSearch(1)">今天</el-button>
      <el-button :type="buttonType(2)" size="mini" @click="toSearch(2)">昨天</el-button>
      <el-button :type="buttonType(3)" size="mini" @click="toSearch(3)">本周</el-button>
      <el-button :type="buttonType(4)" size="mini" @click="toSearch(4)">上周</el-button>
      <el-button :type="buttonType(5)" size="mini" @click="toSearch(5)">本月</el-button>
      <el-button :type="buttonType(6)" size="mini" @click="toSearch(6)">上月</el-button>
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="洗码卡" align="center" prop="username" width="150" />
      <el-table-column label="类型" align="center" width="80">
        <template slot-scope="scope">
          <span style="color:#67c23a" v-if="scope.row.user_type==1">代理</span>
          <span style="color:#e6a23c" v-else>会员</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" prop="nickname" />
      <el-table-column label="买码" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ numberWithCommas(scope.row.pay) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="退码" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ numberWithCommas(scope.row.return) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="输赢" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ numberWithCommas(scope.row.win_total) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="输赢" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ numberWithCommas(scope.row.win_total) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="码费账户" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ numberWithCommas(scope.row.wash_money) }}</span>
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

  </div>
</template>

<script>

import { reportUserListPage } from '@/api/account'
import { currencyList } from '@/api/currency'
import { counterList } from '@/api/counter'

export default {
  name: "UserDialog",
  props: {
    parentId: {
      type: [Number]
    },
    dateTime: {
      type: [Number]
    },
    currencyId: {
      type: [Number]
    },
    counterId: {
      type: [Number]
    }
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
        currency_id: undefined,
        counter_id: undefined,
        username: undefined,
        parent_id: undefined,
      },
      // 币种
      currencyList: [],
      // 码种列表
      counterList: []
      
    }
  },
  created() {
    this.getCurrencyList()
    if(this.currencyId !== undefined){
      this.getCounterList(this.queryParams.currency_id)
      this.queryParams.currency_id = this.currencyId
      if(this.counterId !== undefined){
        this.queryParams.counter_id = this.counterId
      }
    }
    if(this.parentId !== undefined){
      this.queryParams.parent_id = this.parentId
    }
    this.queryParams = this.addDateTimeRange(this.queryParams, this.dateTime)
    this.getList()
  },
  methods: {
    // 获取币种列表
    getCurrencyList() {
      currencyList().then(res => {
        this.currencyList = res.data
      })
    },
    // 获取码种列表
    getCounterList(value) {
      this.queryParams.counter_id = undefined
      counterList({currency_id: value}).then(res => {
        this.counterList = res.data
      })
    },
    // 列表
    getList() {
      this.loading = true
      reportUserListPage(this.queryParams).then(res => {
        this.total = res.data.total
        this.listData = res.data.list
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
    }
  }
}
</script>
