<template>
  <div class="cu-container">
    <el-dialog custom-class="dialog-class" :visible.sync="show" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="时间">
          <el-input v-model="detail.row.created_at" disabled placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item label="币种" class="radio">
          <el-radio-group v-model="detail.row.currency_name">
            <el-radio :key="detail.row.currency_name" :label="detail.row.currency_name">

            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="清单编码" class="radio">
          <el-input v-model="detail.row.tag_repository_id" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="筹码类型" class="radio">
          <el-tag>{{ detail.row.counter_name }}</el-tag>
          <CashListDetai :lists="detail.codeListDetail"></CashListDetai>
        </el-form-item>
        <el-form-item label="总计" class="radio">
          <el-link type="danger">{{ detail.row.total_denomination
            }}</el-link>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>
</template>

<script>
import CashListDetai from './commonCash.vue'
export default {
  components: {
    CashListDetai
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object
    }

  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeModal')
    },
    btnClick(i) {
      this.$emit('btnEvent', i)
    }
  }
}
</script>

<style lang="scss">
// .cu-container {
//   .el-dialog__wrapper {
//     position: absolute;
//   }

//   .dialog-class {
//     border-radius: 8px;
//     box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.72);
//     display: flex;
//     width: 608px !important;
//     height: 360px;
//     background: #000;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;

//     .el-dialog__header,
//     .el-dialog__body,
//     .el-dialog__footer {
//       background: #000;
//     }

//     .el-dialog__body {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 5px;
//       color: $color1;
//     }

//     .img {
//       width: 128px;
//       height: 128px;
//       background: #D9D9D9;
//     }
//   }
// }</style>
