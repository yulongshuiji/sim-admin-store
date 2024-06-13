<template>
  <div class="base-bg" v-loading="reading" element-loading-background="rgba(0, 0, 0, 0.7)"
    element-loading-spinner="el-icon-loading" element-loading-text="正在读取中">
    <div class="code-num" v-if="reading">
      当前筹码数量：200
    </div>
    <img class="code-img" v-if="reading" src="../../../../../assets/acount-room/responsity/code-bg.svg" alt="">
    <div class="code-num2" v-if="!reading">
      请将筹码放入感应版
    </div>

    <img class="code-img2" v-if="!reading" src="../../../../../assets/acount-room/responsity/base-bg2.svg" alt="">
    <div>
      <el-button type="primary" plain class="btn" v-if="!reading" style="width:fit-content" @click="pre">上一步</el-button>
      <el-button type="primary" class="btn" style="width:fit-content" @click="next">下一步</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      reading: false
    }
  },
  methods: {
    next() {
      this.$emit('next')
    },
    pre() {
      this.$emit('pre')

    }
  }
}
</script>

<style lang="scss">
.base-bg {
  width: 924px;
  height: 504px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: #000;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;


}

.code-num {
  display: flex;
  width: 380px;
  height: 48px;
  padding: 0px 20px 0px 28px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  background: #3C7EFF;
  box-sizing: border-box;
  color: #FFF;
  font-family: "PingFang SC";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
}

.code-num2 {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  box-sizing: border-box;
  color: #FFF;
  font-family: "PingFang SC";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
}

.code-img {
  width: 100%;
  height: 373px;
}

.code-img2 {
  width: 90%;
  height: 157px;

}

.btn {
  margin: 0 auto;
}
</style>
