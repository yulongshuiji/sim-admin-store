<template>
  <el-row :gutter="10" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          <span>筹码库存</span>
        </div>
        <div class="card-panel-description">
          <div class="count">
            <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
            <span class="fix">单位：USD</span>
          </div>
          <div class="card-panel-text2">
            <span class="text-common">较昨日</span>
            <img :src="up" alt="">
            <span class="up">24.8%</span>
          </div>
          <div class="card-panel-text">
            <span class="text-common">筹码个数</span>
            <span class="text-num">10000000</span>
          </div>

        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          <span>今日入库</span>
        </div>
        <div class="card-panel-description">
          <div class="count">
            <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
            <span class="fix">单位：USD</span>
          </div>
          <div class="card-panel-text2">
            <span class="text-common">较昨日</span>
            <img :src="up" alt="">
            <span class="up">24.8%</span>
          </div>
          <div class="card-panel-text">
            <span class="text-common">筹码个数</span>
            <span class="text-num">10000000</span>
          </div>

        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          <span>今日发行</span>
        </div>
        <div class="card-panel-description">
          <div class="count">
            <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
            <span class="fix">单位：USD</span>
          </div>
          <div class="card-panel-text2">
            <span class="text-common">较昨日</span>
            <img :src="up" alt="">
            <span class="up">24.8%</span>
          </div>
          <div class="card-panel-text">
            <span class="text-common">筹码个数</span>
            <span class="text-num">10000000</span>
          </div>

        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          <span>今日补码</span>
        </div>
        <div class="card-panel-description">
          <div class="count">
            <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
            <span class="fix">单位：USD</span>
          </div>
          <div class="card-panel-text2">
            <span class="text-common">较昨日</span>
            <img :src="up" alt="">
            <span class="up">24.8%</span>
          </div>
          <div class="card-panel-text">
            <span class="text-common">筹码个数</span>
            <span class="text-num">10000000</span>
          </div>

        </div>
      </div>
    </el-col>


  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import up from '@/assets/acount-room/up.svg'
import down from '@/assets/acount-room/down.svg'
export default {
  components: {
    CountTo,

  },
  data() {
    return {
      up, down,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../common.scss';

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;

    .card-panel-icon-wrapper {
      float: left;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
