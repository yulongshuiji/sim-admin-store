<template>
  <el-select v-model="value" clearable placeholder="请选择" class="select-name">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>
<style lang="scss">
.select-name {
  color: #409EFF;

  .el-select {
    width: 86px !important;
    height: 24px;
    border-radius: 2px;
    background: var(--dark-primary---el-color-primary, #409EFF);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .el-input {
    width: 100% !important;
    font-size: 12px;
  }

  .el-input__inner {
    background: transparent !important;
  }

  .el-select>.el-input {
    background: transparent !important;

  }

  .el-input--suffix .el-input__inner {
    background: transparent !important;
    font-size: 12px;
    padding: 0 0 0 10px;
    border-color: transparent;
  }
}
</style>

<style lang="scss" scoped>
.el-select {
  width: 86px !important;
  height: 24px;
  border-radius: 2px;
  background: var(--dark-primary---el-color-primary, #409EFF);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.el-input {
  width: 100% !important;
  font-size: 12px;
}

.el-input__inner {
  background: transparent !important;
}

.el-select>.el-input {
  background: transparent !important;

}

.el-input--suffix .el-input__inner {
  background: transparent !important;
  font-size: 12px;

}

.select-name {
  color: #409EFF;
}
</style>
