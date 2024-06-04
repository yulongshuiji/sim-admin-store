<template>
  <div>
    <div style="margin-bottom: 10px;">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd" style="margin-right: 20px;">新增</el-button>
      <span style="margin-right: 20px;">游戏：{{ tableDetail.game_name }}</span>
      <span style="margin-right: 20px;">桌子：{{ tableDetail.table_name }}</span>
    </div>
    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="币种名称" align="center" prop="currency_name" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-setting"
            @click="handleUpdate(scope.row)"
          >限红设置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或编辑弹窗 -->
    <el-dialog title="限红设定" :visible.sync="open" v-if="open" width="50%" :close-on-click-modal="false" append-to-body>
      <div v-if="form.game_id == 1">
        <el-form ref="limitBaccarat" :model="limitBaccarat" label-width="150px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="币种" prop="currency_id">
                <el-select :disabled="isEdit" v-model="form.currency_id" placeholder="请选择币种">
                  <el-option v-for="item in currencyList" :key="item.currency_id" :label="item.currency_name" :value="item.currency_id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="庄闲最低限红" prop="limit_low" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_low" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="庄闲最高限红" prop="limit_high" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_high" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="和最低限红" prop="limit_low_tie" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_low_tie" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="和最高限红" prop="limit_high_tie" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_high_tie" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="对子最低限红" prop="limit_low_pair" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_low_pair" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对子最高限红" prop="limit_high_pair" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_high_pair" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="幸运6最低限红" prop="limit_low_luck_six" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_low_luck_six" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="幸运6最高限红" prop="limit_high_luck_six" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_high_luck_six" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="龙7最低限红" prop="limit_low_dragon_seven" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_low_dragon_seven" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="龙7最高限红" prop="limit_high_dragon_seven" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_high_dragon_seven" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="熊8最低限红" prop="limit_low_bear_eight" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_low_bear_eight" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="熊8最高限红" prop="limit_high_bear_eight" class="table-el-form-item">
                <el-input-number v-model="limitBaccarat.limit_high_bear_eight" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="form.game_id == 2">
        <el-form ref="limitDt" :model="limitDt" label-width="150px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="币种" prop="currency_id">
                <el-select :disabled="isEdit" v-model="form.currency_id" placeholder="请选择币种">
                  <el-option v-for="item in currencyList" :key="item.currency_id" :label="item.currency_name" :value="item.currency_id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="龙虎最低限红" prop="limit_low" class="table-el-form-item">
                <el-input-number v-model="limitDt.limit_low" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="龙虎最高限红" prop="limit_high" class="table-el-form-item">
                <el-input-number v-model="limitDt.limit_high" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="和最低限红" prop="limit_low_tie" class="table-el-form-item">
                <el-input-number v-model="limitDt.limit_low_tie" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="和最高限红" prop="limit_high_tie" class="table-el-form-item">
                <el-input-number v-model="limitDt.limit_high_tie" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="对子最低限红" prop="limit_low_pair" class="table-el-form-item">
                <el-input-number v-model="limitDt.limit_low_pair" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对子最高限红" prop="limit_high_pair" class="table-el-form-item">
                <el-input-number v-model="limitDt.limit_high_pair" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="form.game_id == 3">
        <el-form ref="limitNn" :model="limitNn" label-width="150px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="币种" prop="currency_id">
                <el-select :disabled="isEdit" v-model="form.currency_id" placeholder="请选择币种">
                  <el-option v-for="item in currencyList" :key="item.currency_id" :label="item.currency_name" :value="item.currency_id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="平倍最低限红" prop="limit_low" class="table-el-form-item">
                <el-input-number v-model="limitNn.limit_low" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="平倍最高限红" prop="limit_high" class="table-el-form-item">
                <el-input-number v-model="limitNn.limit_high" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="翻倍最低限红" prop="limit_low_double" class="table-el-form-item">
                <el-input-number v-model="limitNn.limit_low_double" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="翻倍最高限红" prop="limit_high_double" class="table-el-form-item">
                <el-input-number v-model="limitNn.limit_high_double" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="超倍最低限红" prop="limit_low_super" class="table-el-form-item">
                <el-input-number v-model="limitNn.limit_low_super" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="超倍最高限红" prop="limit_high_super" class="table-el-form-item">
                <el-input-number v-model="limitNn.limit_high_super" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="form.game_id == 4">
        <el-form ref="limitSg" :model="limitSg" label-width="150px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="币种" prop="currency_id">
                <el-select :disabled="isEdit" v-model="form.currency_id" placeholder="请选择币种">
                  <el-option v-for="item in currencyList" :key="item.currency_id" :label="item.currency_name" :value="item.currency_id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="平倍最低限红" prop="limit_low" class="table-el-form-item">
                <el-input-number v-model="limitSg.limit_low" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="平倍最高限红" prop="limit_high" class="table-el-form-item">
                <el-input-number v-model="limitSg.limit_high" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="翻倍最低限红" prop="limit_low_double" class="table-el-form-item">
                <el-input-number v-model="limitSg.limit_low_double" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="翻倍最高限红" prop="limit_high_double" class="table-el-form-item">
                <el-input-number v-model="limitSg.limit_high_double" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="超倍最低限红" prop="limit_low_super" class="table-el-form-item">
                <el-input-number v-model="limitSg.limit_low_super" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="超倍最高限红" prop="limit_high_super" class="table-el-form-item">
                <el-input-number v-model="limitSg.limit_high_super" :min="0" :max="10000000000"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="margin-top: 10px; text-align: right;">
        <el-button @click="doCancel">关 闭</el-button>
      </div>
  </div>
</template>

<script>
import { tableDetail, tableLimitSetting } from '@/api/table'
import { currencyList } from '@/api/currency'

export default {
  name: "GameList",
  props: {
    tableId: {
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
      // 弹窗
      open: false,
      // 弹出层标题
      title: "",
      // 表单
      form: {},
      // 桌子信息
      tableDetail: {},
      // 限红设定
      limitBaccarat: {},
      limitDt: {},
      limitNn: {},
      limitSg: {},
      // 币种列表
      currencyList: [],
      // 是否编辑
      isEdit: false,
    }
  },
  created() {
    this.getList()
    this.getCurrencyList()
  },
  methods: {
    // 获取币种列表
    getCurrencyList() {
      currencyList().then(res => {
        this.currencyList = res.data
      })
    },
    // 列表
    getList() {
      this.loading = true
      tableDetail({"table_id": this.tableId}).then(res => {
        this.tableDetail = res.data
        this.listData = res.data.limit
        this.loading = false
      })
    },
    // 新增
    handleAdd(){
      this.isEdit = false
      this.reset()
      this.open = true
    },
    // 表单重置
    reset() {
      this.form = {
        game_id : this.tableDetail.game_id,
        table_id : this.tableDetail.table_id,
        currency_id: undefined
      }
      this.limitBaccarat = {
        'limit_low' : 0,
        'limit_high' : 0,
        'limit_low_tie' : 0,
        'limit_high_tie' : 0,
        'limit_low_pair' : 0,
        'limit_high_pair' : 0,
        'limit_low_luck_six' : 0,
        'limit_high_luck_six' : 0,
        'limit_low_dragon_seven' : 0,
        'limit_high_dragon_seven' : 0,
        'limit_low_bear_eight' : 0,
        'limit_high_bear_eight' : 0
      }
      this.limitDt = {
        'limit_low' : 0,
        'limit_high' : 0,
        'limit_low_tie' : 0,
        'limit_high_tie' : 0,
        'limit_low_pair' : 0,
        'limit_high_pair' : 0
      }
      this.limitNn = {
        'limit_low' : 0,
        'limit_high' : 0,
        'limit_low_double' : 0,
        'limit_high_double' : 0,
        'limit_low_super' : 0,
        'limit_high_super' : 0,
      }
      this.limitSg = {
        'limit_low' : 0,
        'limit_high' : 0,
        'limit_low_double' : 0,
        'limit_high_double' : 0,
        'limit_low_super' : 0,
        'limit_high_super' : 0,
      }
      this.resetForm('limitBaccarat')
      this.resetForm('limitDt')
      this.resetForm('limitNn')
      this.resetForm('limitSg')
    },
    // 打开编辑窗口
    handleUpdate(row) {
      this.isEdit = true
      this.reset()
      this.form.currency_id = row.currency_id
      if(this.form.game_id == 1){
        this.limitBaccarat = row.limit_contents
      } else if (this.form.game_id == 2){
        this.limitDt = row.limit_contents
      } else if (this.form.game_id == 3){
        this.limitNn = row.limit_contents
      } else if (this.form.game_id == 4){
        this.limitSg = row.limit_contents
      } else {
        this.msgError('参数错误')
        return false
      }
      this.open = true
    },
    // 新增管理员
    submitForm() {
      if(this.form.game_id == 1){
        this.form.limit_contents = this.limitBaccarat
      } else if(this.form.game_id == 2){
        this.form.limit_contents = this.limitDt
      } else if(this.form.game_id == 3){
        this.form.limit_contents = this.limitNn
      } else if(this.form.game_id == 4){
        this.form.limit_contents = this.limitSg
      } else {
        this.msgError("参数错误")
        return false
      }
      tableLimitSetting(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess('设置成功')
          this.open = false
          this.getList()
        }
      })
    },
    // 取消
    cancel() {
      this.open = false
    },
    // 取消
    doCancel(){
      this.$emit("doCancel")
    }
  }
}
</script>
