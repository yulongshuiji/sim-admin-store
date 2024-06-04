<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true">
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
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="游戏" align="center" prop="game_name" width="150" />
      <el-table-column label="桌子" align="center" prop="table_name" width="200" />
      <el-table-column label="结算日" align="center" prop="day" width="120" />
      <el-table-column label="靴号" align="center" prop="boot_num" width="80" />
      <el-table-column label="铺号" align="center" prop="number" width="80" />
      <el-table-column label="结果" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.game_id == 1">
            <el-tag type="danger" size="medium" v-if="scope.row.result == 1" style="margin-right: 10px;">庄</el-tag>
            <el-tag type="primary" size="medium" v-if="scope.row.result == 2" style="margin-right: 10px;">闲</el-tag>
            <el-tag type="success" size="medium" v-if="scope.row.result == 3" style="margin-right: 10px;">和</el-tag>
            <el-tag type="danger" size="medium" v-if="scope.row.banker_pair == 1" style="margin-right: 10px;">庄对</el-tag>
            <el-tag type="primary" size="medium" v-if="scope.row.player_pair == 1" style="margin-right: 10px;">闲对</el-tag>
            <el-tag type="danger" size="medium" v-if="scope.row.dragon_seven == 1" style="margin-right: 10px;">龙7</el-tag>
            <el-tag type="primary" size="medium" v-if="scope.row.bear_eight == 1" style="margin-right: 10px;">熊8</el-tag>
            <el-tag type="warning" size="medium" v-if="scope.row.luck_six == 1" style="margin-right: 10px;">幸运6({{ scope.row.luck_six_number }})</el-tag>
          </span>
          <span v-if="scope.row.game_id == 2">
            <el-tag type="danger" size="medium" v-if="scope.row.result == 1" style="margin-right: 10px;">龙</el-tag>
            <el-tag type="primary" size="medium" v-if="scope.row.result == 2" style="margin-right: 10px;">虎</el-tag>
            <el-tag type="success" size="medium" v-if="scope.row.result == 3" style="margin-right: 10px;">和</el-tag>
            <el-tag type="info" size="medium" v-if="scope.row.dt_pair == 1" style="margin-right: 10px;">对子</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" align="center" prop="admin_name" width="120" />
      <el-table-column label="开始时间" align="center" prop="created_at" width="160" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit-outline"
            @click="handleBet(scope.row)"
            v-hasPermi="['report:number:bet']"
          >注单</el-button>
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

    <!-- 注单弹窗 -->
    <el-dialog title="注单" :visible.sync="openBet" width="90%" :close-on-click-modal="false" append-to-body>
      <BetDialog  :key="timerBet" :numberId="numberId" />
    </el-dialog>

  </div>
</template>

<script>

import { gameList } from '@/api/game'
import { tableList } from '@/api/table'
import { numberListPage } from '@/api/number'
import BetDialog from './components/betDialog'

export default {
  name: "ReportNumber",
  components: {
    BetDialog
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
        game_id: undefined,
        table_id: undefined
      },
      // 桌子列表
      tableList: [],
      // 游戏列表
      gameList: [],
      // 时间类型
      dateTime: 1,
      // 注单弹窗
      timerBet: '',
      openBet: false,
      numberId: undefined
    }
  },
  created() {
    this.getTableList()
    this.getGameList()
    this.queryParams = this.addDateTimeRange(this.queryParams, this.dateTime)
    this.getList()
  },
  methods: {
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
      numberListPage(this.queryParams).then(res => {
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
    // 注单
    handleBet(row){
      this.numberId = row.number_id
      this.timerBet = new Date().getTime()
      this.openBet = true
    }
  }
}
</script>
