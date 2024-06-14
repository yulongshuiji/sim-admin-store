<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item required label="入库时间">
        <el-input style="width: 680px;" v-model="selectTime" placeholder="">
        </el-input>
      </el-form-item>
      <el-form-item required label="币种" class="radio">
        <el-radio-group v-model="codeCurrencyList[0].currency_id">
          <el-radio v-for="item in codeCurrencyList" :key="item.currency_id" :label="item.currency_id">
            {{ item.currency_name }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="筹码类型" class="radio">
        <el-radio-group v-model="counterList[0].counter_id">
          <el-radio v-for="item in counterList" :key="item.counter_id" :label="item.counter_id">
            {{ item.counter_name }}
          </el-radio>
        </el-radio-group>
        <cashList2></cashList2>
      </el-form-item>
      <div class="btn-area">
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import cashList2 from './cashList2.vue';

import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'codeCurrencyList',
      'counterList',
      'selectTime'
    ])
  },
  components: {
    cashList2
  },
  data() {
    return {
      form: {

      },
      radio: ''
    }
  },
  methods: {
    errorTips() {
      this.$message.error('错了哦，这是一条错误消息');
    },
    next() {
      this.$emit('next')
    }
  }
}
</script>

<style></style>
