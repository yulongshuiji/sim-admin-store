<template>
  <div class="app-container">
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
        <el-form-item label="游戏" prop="game_id">
          <el-select v-model="queryParams.game_id" placeholder="请选择游戏" clearable size="small" style="width: 150px">
            <el-option v-for="item in gameList" :key="item.game_id" :label="item.game_name" :value="item.game_id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="桌子" prop="table_id">
          <el-select v-model="queryParams.table_id" placeholder="请选择桌子" clearable size="small" style="width: 150px">
            <el-option v-for="item in tableList" :key="item.table_id" :label="item.table_name" :value="item.table_id"/>
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
    
    <el-table v-loading="loading" :data="listData" border max-height="650" :show-summary="true" :summary-method="getSummaries">
      <el-table-column label="游戏" align="center" prop="game_name" width="150" />
      <el-table-column label="桌子" align="center" prop="table_name" />
      <el-table-column label="结算日" align="center" prop="day" width="120" />
      <el-table-column label="靴号" align="center" prop="boot_num" width="80" />
      <el-table-column label="铺号" align="center" prop="number" width="80" />
      <el-table-column label="下注区域" align="center" prop="area" width="160" />
      <el-table-column label="座位号" align="center" prop="num" width="80" />
      <el-table-column label="洗码卡" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}({{ scope.row.nickname }})</span>
        </template>
      </el-table-column>
      <el-table-column label="下注金额" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ numberWithCommas(scope.row.amount) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="输赢" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ numberWithCommas(scope.row.win_total) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下注时间" align="center" prop="created_at" width="160" />
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

import { gameList } from '@/api/game'
import { tableList } from '@/api/table'
import { betListPage } from '@/api/bet'
import { currencyList } from '@/api/currency'
import { counterList } from '@/api/counter'

export default {
  name: "ReportBet",
  components: {
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
        currency_id: 1,
        counter_id: undefined,
        game_id: undefined,
        table_id: undefined,
        username: undefined
      },
      // 桌子列表
      tableList: [],
      // 游戏列表
      gameList: [],
      // 时间类型
      dateTime: 1,
      // 明细
      detail: {},
      // 币种
      currencyList: [],
      // 码种列表
      counterList: [],
      // 合计
      totalAmount: 0,
      totalWinTotal: 0
    }
  },
  created() {
    this.getCurrencyList()
    this.getCounterList(this.queryParams.currency_id)
    this.getTableList()
    this.getGameList()
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
    // 获取桌子列表
    getGameList() {
      gameList().then(res => {
        this.gameList = res.data
      })
    },
    // 获取桌子列表
    getTableList() {
      tableList().then(res => {
        this.tableList = res.data
      })
    },
    // 列表
    getList() {
      this.loading = true
      betListPage(this.queryParams).then(res => {
        this.totalAmount = res.data.total_amount
        this.totalWinTotal = res.data.total_win_total
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
        if (index === 8) {
          sums[8] = that.numberWithCommas(that.totalAmount)
          return;
        }
        if (index === 9) {
          sums[9] = that.numberWithCommas(that.totalWinTotal)
          return
        }
        sums[index] = ''
      });
      return sums
    }
  }
}
</script>
