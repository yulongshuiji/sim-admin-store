<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item required label="入库时间">
        <el-input style="width: 680px;" v-model="form.region" placeholder="">
        </el-input>
      </el-form-item>
      <el-form-item required label="币种" class="radio">
        <el-radio-group v-model="radio">
          <el-radio :label="3">USD</el-radio>
          <el-radio :label="6">RMB</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="筹码类型" class="radio">
        <el-radio-group v-model="radio">
          <el-radio :label="3">现金码</el-radio>
          <el-radio :label="6">签单码</el-radio>
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
export default {
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
