<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="listData" border max-height="650">
      <el-table-column label="ID" align="center" prop="game_id" />
      <el-table-column label="游戏名称" align="center" prop="game_name" />
      <el-table-column label="游戏编码" align="center" prop="game_gateway" />
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['game:game:prize']"
          >倍率设置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加修改用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" v-if="open" width="600px" :close-on-click-modal="false" append-to-body>
      <div v-if="form.game_id == 1">
        <el-form ref="priceBaccarat" :model="priceBaccarat" label-width="250px">
          <el-form-item label="抽佣台庄赔率" prop="banker_1" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.banker_1" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="免佣台庄赔率" prop="banker_2" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.banker_2" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="免佣台庄6点赔率" prop="win_6" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.win_6" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="闲赔率" prop="player" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.player" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="和赔率" prop="tie" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.tie" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="庄对赔率" prop="banker_pair" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.banker_pair" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="闲对赔率" prop="player_pair" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.player_pair" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="幸运6两张牌赔率" prop="luck_six_2" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.luck_six_2" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="幸运6三张牌赔率" prop="luck_six_3" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.luck_six_3" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="龙7赔率" prop="dragon_seven" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.dragon_seven" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="熊8赔率" prop="bear_eight" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceBaccarat.bear_eight" :min="0" :max="1000"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="form.game_id == 2">
        <el-form ref="priceDt" :model="priceDt" label-width="250px">
          <el-form-item label="龙赔率" prop="banker" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceDt.banker" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="虎赔率" prop="player" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceDt.player" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="和赔率" prop="tie" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceDt.tie" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          
          <el-form-item label="开和杀一半" prop="player" class="table-el-form-item">
            <el-radio-group v-model="priceDt.dt_half">
              <el-radio v-for="item in dtHalfOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="对子赔率" prop="dt_pair" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceDt.dt_pair" :min="0" :max="1000"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="form.game_id == 3">
        <el-form ref="priceNn" :model="priceNn" label-width="250px">
          <el-form-item label="平倍赔率" prop="banker" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceNn.equal" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="翻倍赔率" prop="player" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceNn.double" :min="0" :max="1000"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="form.game_id == 4">
        <el-form ref="priceNn" :model="priceNn" label-width="250px">
          <el-form-item label="平倍赔率" prop="banker" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceNn.equal" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="翻倍赔率" prop="player" class="table-el-form-item">
            <el-input-number :precision='2' v-model="priceNn.double" :min="0" :max="1000"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { gameList, gamePrice, gameDetail } from '@/api/game'

export default {
  name: "GameList",
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
      // 赔率设定
      priceBaccarat: {},
      priceDt: {},
      priceNn: {},
      priceSg: {},
      // 龙虎开和是否杀一半
      dtHalfOptions: [
        {value: 0, label: "不杀"},
        {value: 1, label: "杀一半"}
      ],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.loading = true
      gameList().then(res => {
        this.listData = res.data
        this.loading = false
      })
    },
    // 表单重置
    reset() {
      this.form = {
        game_id: undefined
      }
      this.priceBaccarat = {
        'banker_1' : 0.95,
        'banker_2' : 1.00,
        'win_6' : 0.50,
        'player' : 1.00,
        'tie' : 8.00,
        'banker_pair' : 11.00,
        'player_pair' : 11.00,
        'luck_six_2' : 12.00,
        'luck_six_3' : 20.00,
        'dragon_seven' : 40.00,
        'bear_eight' : 25.00,
      }
      this.priceDt = {
        'banker' : 0.97,
        'player' : 0.97,
        'tie' : 8,
        'dt_half' : 0,
        'dt_pair' : 11,
      }
      this.priceNn = {
        'equal' : 1.00,
        'double' : 0.95,
      }
      this.priceSg = {
        'equal' : 1.00,
        'double' : 0.95,
      }
      this.resetForm('priceBaccarat')
      this.resetForm('priceDt')
      this.resetForm('priceNn')
      this.resetForm('priceSg')
    },
    // 打开编辑窗口
    handleUpdate(row) {
      this.reset()
      this.title="倍率设置"
      gameDetail({game_id: row.game_id}).then(response => {
        this.form = {
          game_id: response.data.game_id
        }
        if(row.game_id == 1 && response.data.price != null){
          this.priceBaccarat = response.data.price
        }
        if(row.game_id == 2 && response.data.price != null){
          this.priceDt = response.data.price
        }
        if(row.game_id == 3 && response.data.price != null){
          this.priceNn = response.data.price
        }
        if(row.game_id == 4 && response.data.price != null){
          this.priceSg = response.data.price
        }
        this.open = true
      });
    },
    // 新增管理员
    submitForm() {
      if(this.form.game_id == 1){
        this.form.price = this.priceBaccarat
      } else if(this.form.game_id == 2){
        this.form.price = this.priceDt
      } else if(this.form.game_id == 3){
        this.form.price = this.priceNn
      } else if(this.form.game_id == 4){
        this.form.price = this.priceSg
      } else {
        this.msgError("参数错误")
        return false
      }
      gamePrice(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess('编辑成功')
          this.open = false
          this.getList()
        }
      })
    },
    // 取消
    cancel() {
      this.open = false
    }
  }
}
</script>
