<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="40">
        <el-col :span="7">
          <el-form-item label="筛选方式">
            <el-select v-model="form.region" placeholder="请选择筛选方式">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="筹码类型" prop="counter_id">
            <el-select v-model="form.counter_id" placeholder="请选择筹码类型">
              <el-option v-for="item in codeList" :key="item.counter_id" :label="item.counter_name" :value="item.counter_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="选择日期">
            <el-date-picker v-model="value1" type="daterange" range-separator="一" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="form.region" placeholder="请选择状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="币种" prop="currency_id">
            <el-select v-model="form.currency_id" placeholder="请选择币种">
              <el-option v-for="item in currencyList" :key="item.currency_id" :label="item.currency_name" :value="item.currency_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="清单编号">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div class="tab-box">
            <el-divider direction="vertical"></el-divider>
            <div class="box2">
              <el-button type="primary" icon="el-icon-search">查询</el-button>
              <el-button type="primary" icon="el-icon-refresh-left" class="reset">重置</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { counterList } from '@/api/counter'
import { currencyList } from '@/api/currency'
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        counter_id: '',
        currency_id: ''
      },
      value1: '',
      codeList: [],
      currencyList: []
    }
  },
  methods: {
    async initData() {
      const res = await counterList()
      this.codeList = res.data
      const res2 = await currencyList()
      this.currencyList = res2.data
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style>
.el-input--suffix .el-input__inner {
  border: none;
}

.el-select {
  width: 100%
}

.el-input__inner {
  border: none;
}

.el-input {
  border: none;
  width: 90%;
}

.el-divider--vertical {
  height: 80px;
  background-color: #4C4D4F;
  margin-top: 15px;
}

.tab-box {
  display: flex;
  width: 100%;
  height: 100%;
}

.box2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  gap: 10px;
}
.el-button--primary {
  border-radius: 2px;
  background: #165DFF;
  display:inline-flex;
  padding: 5px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 82px;
  align-self: stretch;
  height: 32px;
}

.reset {
  background-color: rgba(255, 255, 255, 0.16);
}

.el-button + .el-button {
  margin-left: 0;
}
</style>
