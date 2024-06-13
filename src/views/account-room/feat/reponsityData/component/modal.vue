<template>
  <div class="cu-container">
    <el-dialog custom-class="dialog-class" :visible.sync="show" width="30%" :before-close="handleClose">
      <img src="" alt="" class="img">
      <span>筹码入库成功</span>
      <span>是否继续入库相同面额筹码？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="btnClick(0)" >新建入库清单</el-button>
        <el-button @click="btnClick(1)" type="primary" plain>继续入库</el-button>
        <el-button type="primary" @click="btnClick(2)">退出</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
.cu-container {
  .el-dialog__wrapper {
    position: absolute;
  }

  .dialog-class {
    border-radius: 8px;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.72);
    display: flex;
    width: 608px !important;
    height: 360px;
    background: #000;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .el-dialog__header,
    .el-dialog__body,
    .el-dialog__footer {
      background: #000;
    }
    .el-dialog__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      color: $color1;
    }
    .img {
      width: 128px;
      height: 128px;
      background: #D9D9D9;
    }
  }
}
</style>
