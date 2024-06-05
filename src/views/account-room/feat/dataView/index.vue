<template>
  <div class="dataView-c">
    <div class="header">
      <div class="common" >
        <img src="@/assets/acount-room/back.svg">
      </div>
      <div class="common" >
        <img src="@/assets/acount-room/index.svg">
      </div>
      <el-page-header class="el-h" :content="$t('accountRoom.index.shuju')">
      </el-page-header>
      <div class="common"  style="margin-left: auto">
        <i class="el-icon-refresh-right" style="color:#fff"></i>
      </div>

    </div>

    <card-list></card-list>
  </div>
</template>

<script>
import cardList from '../../component/cardList.vue'
export default {
  components:{
    cardList
  }
}
</script>

<style lang="scss">
.dataView-c {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 10px 24px;

  .header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;

    .common {
      display: flex;
      width: 40px;
      height: 40px;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: 36px;
      background: #2A2631;
      cursor: pointer;

      img {
        width: 16px;
        height: 16px;
      }
    }

    .el-page-header__content {
      color: $color1;
      /* 24/CN-Medium */
      font-family: "PingFang SC";
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: 32px;

    }
  }
}
</style>
