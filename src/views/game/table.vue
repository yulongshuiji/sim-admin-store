<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="桌子名称" prop="table_name">
        <el-input
          v-model="queryParams.table_name"
          placeholder="请输入桌子名称"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="游戏" prop="game_id">
        <el-select
          v-model="queryParams.game_id"
          placeholder="请选择游戏"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="item in queryGame"
            :key="item.game_id"
            :label="item.game_name"
            :value="item.game_id"
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
        <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['game:table:add']">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="ID" align="center" prop="table_id" width="50" />
      <el-table-column label="桌子名称" align="center" prop="table_name" width="180" />
      <el-table-column label="桌子模式" align="center" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.mode==1 && scope.row.game_id == 1">抽佣台</span>
          <span v-else-if="scope.row.mode==2 && scope.row.game_id == 1">免佣台</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="游戏" align="center" prop="game_name" width="100" />
      <el-table-column label="状态" align="center" width="80">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
          <el-tag type="warning" v-else>停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="记账模式" align="center" width="100">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.is_ic==1">芯片记账</el-tag>
          <el-tag type="info" v-else>手工记账</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="积分" align="center" width="100">
        <template slot-scope="scope">
          <span style="color:#67c23a" v-if="scope.row.point_type==1">按客户流水</span>
          <span style="color:#67c23a" v-else-if="scope.row.point_type==2">按客户输额</span>
          <span style="color:#e6a23c" v-else>不启用</span>
        </template>
      </el-table-column>
      <el-table-column label="积分率" align="center" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.point_type > 0">{{ scope.row.point_rate }} %</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="幸运6" align="center" width="80">
        <template slot-scope="scope">
          <span style="color:#67c23a" v-if="scope.row.luck_six==1">开启</span>
          <span style="color:#e6a23c" v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="龙7" align="center" width="80">
        <template slot-scope="scope">
          <span style="color:#67c23a" v-if="scope.row.dragon_seven==1">开启</span>
          <span style="color:#e6a23c" v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="熊8" align="center" width="80">
        <template slot-scope="scope">
          <span style="color:#67c23a" v-if="scope.row.bear_eight==1">开启</span>
          <span style="color:#e6a23c" v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="保险" align="center" width="80">
        <template slot-scope="scope">
          <span style="color:#67c23a" v-if="scope.row.insurance==1">开启</span>
          <span style="color:#e6a23c" v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="占股码种" align="center" width="200">
        <template slot-scope="scope">
          <el-tag size="mini" v-for="item in scope.row.counter_share_name" :key="item" type="info" style="margin-right: 8px;">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="洗码码种" align="center" width="200">
        <template slot-scope="scope">
          <el-tag size="mini" v-for="item in scope.row.counter_wash_name" :key="item" type="info" style="margin-right: 8px;">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['game:table:update']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-tools"
            @click="handleLimit(scope.row)"
            v-hasPermi="['game:table:limit']"
          >限红设定</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['game:table:delete']"
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
    <el-dialog :title="title" :visible.sync="open" v-if="open" width="60%" :close-on-click-modal="false" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="游戏" prop="game_id" class="table-el-form-item">
              <el-select v-model="form.game_id" placeholder="请选择游戏" :disabled="form.table_id != undefined">
                <el-option v-for="item in formGame" :key="item.game_id" :label="item.game_name" :value="item.game_id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="桌台名称" prop="table_name" class="table-el-form-item">
              <el-input v-model="form.table_name" maxlength="18" placeholder="请输入桌台名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="积分" prop="point_type" class="table-el-form-item">
              <el-select v-model="form.point_type" placeholder="请选择" >
                <el-option v-for="item in pointTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.point_type > 0">
            <el-form-item label="积分率" prop="point_rate" class="table-el-form-item">
              <el-input-number v-model="form.point_rate" :min="1" :max="100" label="积分率"></el-input-number> %
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="status" class="table-el-form-item">
              <el-radio-group v-model="form.status">
                <el-radio v-for="item in statusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="币种占股" prop="counter_share" class="table-el-form-item">
              <el-checkbox-group v-model="form.counter_share">
                <el-checkbox v-for="item in counterList" :key="item.counter_id" :label="item.counter_id">{{ item.counter_name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="币种洗码" prop="counter_wash" class="table-el-form-item">
              <el-checkbox-group v-model="form.counter_wash">
                <el-checkbox v-for="item in counterList" :key="item.counter_id" :label="item.counter_id">{{ item.counter_name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.game_id == 1">
          <el-col :span="12">
            <el-form-item  label="桌台类型" prop="mode" class="table-el-form-item">
              <el-radio-group v-model="form.mode">
                <el-radio v-for="item in modeOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="记账方式" prop="is_ic" class="table-el-form-item">
              <el-radio-group v-model="form.is_ic" disabled>
                <el-radio v-for="item in isIcOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.game_id == 1">
          <el-col :span="12">
            <el-form-item  label="对子和占股" prop="pair_tie_share" class="table-el-form-item">
              <el-radio-group v-model="form.pair_tie_share">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="对子和洗码" prop="pair_tie_wash" class="table-el-form-item">
              <el-radio-group v-model="form.pair_tie_wash">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.game_id == 1">
          <el-col :span="8">
            <el-form-item  label="幸运6" prop="luck_six" class="table-el-form-item">
              <el-radio-group v-model="form.luck_six">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.luck_six == 1">
            <el-form-item  label="幸运6占股" prop="luck_six_share" class="table-el-form-item">
              <el-radio-group v-model="form.luck_six_share">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.luck_six == 1">
            <el-form-item  label="幸运6洗码" prop="luck_six_wash" class="table-el-form-item">
              <el-radio-group v-model="form.luck_six_wash">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.game_id == 1">
          <el-col :span="8">
            <el-form-item  label="龙7" prop="dragon_seven" class="table-el-form-item">
              <el-radio-group v-model="form.dragon_seven">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.dragon_seven == 1">
            <el-form-item  label="龙7占股" prop="dragon_seven_share" class="table-el-form-item">
              <el-radio-group v-model="form.dragon_seven_share">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.dragon_seven == 1">
            <el-form-item  label="龙7洗码" prop="dragon_seven_wash" class="table-el-form-item">
              <el-radio-group v-model="form.dragon_seven_wash">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.game_id == 1">
          <el-col :span="8">
            <el-form-item  label="熊8" prop="bear_eight" class="table-el-form-item">
              <el-radio-group v-model="form.bear_eight">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.bear_eight == 1">
            <el-form-item  label="熊8占股" prop="bear_eight_share" class="table-el-form-item">
              <el-radio-group v-model="form.bear_eight_share">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.bear_eight == 1">
            <el-form-item  label="熊8洗码" prop="bear_eight_wash" class="table-el-form-item">
              <el-radio-group v-model="form.bear_eight_wash">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.game_id == 1">
          <el-col :span="8">
            <el-form-item  label="保险" prop="insurance" class="table-el-form-item">
              <el-radio-group v-model="form.insurance">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.insurance == 1">
            <el-form-item  label="保险占股" prop="insurance_share" class="table-el-form-item">
              <el-radio-group v-model="form.insurance_share">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.insurance == 1">
            <el-form-item  label="保险洗码" prop="insurance_wash" class="table-el-form-item">
              <el-radio-group v-model="form.insurance_wash">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.game_id == 2">
          <el-col :span="8">
            <el-form-item  label="龙虎对子" prop="dt_pair" class="table-el-form-item">
              <el-radio-group v-model="form.dt_pair">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.dt_pair == 1">
            <el-form-item  label="龙虎对子占股" prop="dt_pair_share" class="table-el-form-item">
              <el-radio-group v-model="form.dt_pair_share">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.dt_pair == 1">
            <el-form-item  label="龙虎对子洗码" prop="dt_pair_wash" class="table-el-form-item">
              <el-radio-group v-model="form.dt_pair_wash">
                <el-radio v-for="item in publicOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark" class="table-el-form-item">
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

    <!-- 限红设置弹窗 -->
    <el-dialog title="限红设置" :visible.sync="openLimit" width="50%" :close-on-click-modal="false" append-to-body>
      <TableLimitDialog :key="timer" :tableId="limitTableId" @doCancel="doCancel" />
    </el-dialog>

  </div>
</template>

<script>
import { tableListPage, tableAdd, tableDetail, tableUpdate, tableDelete } from '@/api/table'
import { gameList } from '@/api/game'
import { counterList } from '@/api/counter'
import TableLimitDialog from './components/tableLimitDialog'

export default {
  name: "GameTable",
  components: {
    TableLimitDialog
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 列表
      listData: [],
      // 游戏列表
      queryGame: [],
      // 游戏列表
      formGame: [],
      // 码种列表
      counterList: [],
      // 查询参数
      queryParams: {
        page_num: 1,
        page_size: 20,
        table_name: undefined,
        game_id: undefined
      },
      // 弹窗
      open: false,
      openLimit: false,
      // 弹出层标题
      title: "",
      // 表单
      form: {},
      // 表单验证规则
      rules: {
        game_id: [
          { required: true, message: "请选择游戏" },
        ],
        table_name: [
          { required: true, message: "游戏名称不能为空" },
        ],
        status: [
          { required: true, message: "请选择状态" },
        ]
      },
      // 状态选项
      statusOptions: [
        {value: 1, label: "正常"},
        {value: 0, label: "停用"}
      ],
      // 桌台类型选项
      modeOptions: [
        {value: 1, label: "抽佣"},
        {value: 2, label: "免佣"}
      ],
      // 记账方式选项
      isIcOptions: [
        {value: 1, label: "芯片记账"},
        {value: 0, label: "手工记账"}
      ],
      // 通用开启关闭选项
      publicOptions: [
        {value: 1, label: "开启"},
        {value: 0, label: "关闭"}
      ],
      // 积分方式选项
      pointTypeOptions: [
        {value: 0, label: "不启用"},
        {value: 1, label: "按客户流水"},
        {value: 2, label: "按客户输额	"}
      ],
      // 弹窗时间戳
      timer: '',
      // 限红桌子ID
      limitTableId: undefined,
    }
  },
  created() {
    this.getList()
    this.getGameList()
  },
  methods: {
    // 列表
    getList() {
      this.loading = true
      tableListPage(this.queryParams).then(res => {
        this.total = res.data.total
        this.listData = res.data.list
        this.loading = false
      })
    },
    // 获取游戏列表
    getGameList() {
      gameList().then(res => {
        this.queryGame = res.data
      })
    },
    // 获取码种列表
    getCounterList() {
      counterList().then(res => {
        this.counterList = res.data
      })
    },
    // 表单重置
    reset() {
      this.form = {
        table_id: undefined,
        game_id: undefined,
        table_name: undefined,
        point_type: 0,
        point_rate: 0,
        status: 1,
        counter_share: [],
        counter_wash: [],
        mode: 1,
        is_ic: 1,
        pair_tie_share: 0,
        pair_tie_wash: 0,
        luck_six: 0,
        luck_six_share: 0,
        luck_six_wash: 0,
        dragon_seven: 0,
        dragon_seven_share: 0,
        dragon_seven_wash: 0,
        bear_eight: 0,
        bear_eight_share: 0,
        bear_eight_wash: 0,
        insurance: 0,
        insurance_share: 0,
        insurance_wash: 0,
        dt_pair: 0,
        dt_pair_wash: 0,
        dt_pair_share: 0,
        remark: undefined
      }
      this.resetForm('form')
      this.getCounterList()
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
      gameList().then(res => {
        this.formGame = res.data
      })
    },
    // 打开编辑窗口
    handleUpdate(row) {
      this.reset()
      this.title="编辑"
      tableDetail({table_id: row.table_id}).then(response => {
        this.form = {
          table_id: response.data.table_id,
          game_id: response.data.game_id,
          table_name: response.data.table_name,
          point_type: response.data.point_type,
          point_rate: response.data.point_rate,
          status: response.data.status,
          counter_share: response.data.counter_share,
          counter_wash: response.data.counter_wash,
          mode: response.data.mode,
          is_ic: response.data.is_ic,
          pair_tie_share: response.data.pair_tie_share,
          pair_tie_wash: response.data.pair_tie_wash,
          luck_six: response.data.luck_six,
          luck_six_share: response.data.luck_six_share,
          luck_six_wash: response.data.luck_six_wash,
          dragon_seven: response.data.dragon_seven,
          dragon_seven_share: response.data.dragon_seven_share,
          dragon_seven_wash: response.data.dragon_seven_wash,
          bear_eight: response.data.bear_eight,
          bear_eight_share: response.data.bear_eight_share,
          bear_eight_wash: response.data.bear_eight_wash,
          insurance: response.data.insurance,
          insurance_share: response.data.insurance_share,
          insurance_wash: response.data.insurance_wash,
          dt_pair: response.data.dt_pair,
          dt_pair_wash: response.data.dt_pair_wash,
          dt_pair_share: response.data.dt_pair_share,
          remark: response.data.remark,
        }
        gameList().then(res => {
          this.formGame = res.data
        })
        this.open = true
        this.title = "编辑桌子"
      });
    },
    // 新增管理员
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.table_id != undefined) {
            tableUpdate(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('编辑成功')
                this.open = false
                this.getList()
              }
            })
          } else {
            tableAdd(this.form).then(response => {
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
        return tableDelete({table_id : row.table_id})
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功")
      }).catch(function() {})
    },
    // 限红
    handleLimit(row){
      this.limitTableId = row.table_id
      this.timer = new Date().getTime()
      this.openLimit = true
    },
    // 取消
    doCancel(){
      this.openLimit = false;
    }
  }
}
</script>
<style scoped>
.table-el-form-item{
  margin-bottom: 5px !important;
}
</style>
