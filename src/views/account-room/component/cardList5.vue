<template>
  <el-row :gutter="10" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="24" class="card-panel-col">

      <div class="card-panel flex-d" @click="handleSetLineChartData('newVisitis')">
        <div class="h-area">
          <el-page-header class="el-h" :content="'码房统计'">
          </el-page-header>

          <Select></Select>
          <span class="recent">最近统计:2024-06-01 12:35:41</span>
        </div>
        <div>
          <el-col :span="3">
            <div class="card-panel-description w100">
              <div class="card5-box1">
                <div class="card-panel-text flex-c">
                  <span class="text-common">筹码个数</span>
                  <span class="text-num">10000000</span>
                </div>
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="count">
                <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
              </div>
              <div class="card-panel-text2">
                <span class="text-common">较昨日</span>
                <img :src="up" alt="">
                <span class="up">24.8%</span>
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="card-panel-description w100">
              <div class="card5-box1">
                <div class="card-panel-text flex-c">
                  <span class="text-common">筹码个数</span>
                  <span class="text-num">10000000</span>
                </div>
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="count">
                <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
              </div>
              <div class="card-panel-text2">
                <span class="text-common">较昨日</span>
                <img :src="up" alt="">
                <span class="up">24.8%</span>
              </div>
            </div>
          </el-col> <el-col :span="3">
            <div class="card-panel-description w100">
              <div class="card5-box1">
                <div class="card-panel-text flex-c">
                  <span class="text-common">筹码个数</span>
                  <span class="text-num">10000000</span>
                </div>
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="count">
                <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
              </div>
              <div class="card-panel-text2">
                <span class="text-common">较昨日</span>
                <img :src="up" alt="">
                <span class="up">24.8%</span>
              </div>
            </div>
          </el-col> <el-col :span="3">
            <div class="card-panel-description w100">
              <div class="card5-box1">
                <div class="card-panel-text flex-c">
                  <span class="text-common">筹码个数</span>
                  <span class="text-num">10000000</span>
                </div>
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="count">
                <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
              </div>
              <div class="card-panel-text2">
                <span class="text-common">较昨日</span>
                <img :src="up" alt="">
                <span class="up">24.8%</span>
              </div>
            </div>
          </el-col> <el-col :span="3">
            <div class="card-panel-description w100">
              <div class="card5-box1">
                <div class="card-panel-text flex-c">
                  <span class="text-common">筹码个数</span>
                  <span class="text-num">10000000</span>
                </div>
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="count">
                <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
              </div>
              <div class="card-panel-text2">
                <span class="text-common">较昨日</span>
                <img :src="up" alt="">
                <span class="up">24.8%</span>
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="card-panel-description w100">
              <div class="card5-box1">
                <div class="card-panel-text flex-c">
                  <span class="text-common">筹码个数</span>
                  <span class="text-num">10000000</span>
                </div>
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="count">
                <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
              </div>
              <div class="card-panel-text2">
                <span class="text-common">较昨日</span>
                <img :src="up" alt="">
                <span class="up">24.8%</span>
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="card-panel-description w100">
              <div class="card5-box1">
                <div class="card-panel-text flex-c">
                  <span class="text-common">筹码个数</span>
                  <span class="text-num">10000000</span>
                </div>
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="count">
                <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
              </div>
              <div class="card-panel-text2">
                <span class="text-common">较昨日</span>
                <img :src="up" alt="">
                <span class="up">24.8%</span>
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="card-panel-description w100">
              <div class="card5-box1">
                <div class="card-panel-text flex-c">
                  <span class="text-common">筹码个数</span>
                  <span class="text-num">10000000</span>
                </div>
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="count">
                <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
              </div>
              <div class="card-panel-text2">
                <span class="text-common">较昨日</span>
                <img :src="up" alt="">
                <span class="up">24.8%</span>
              </div>
            </div>
          </el-col>
        </div>

      </div>
    </el-col>



  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import up from '@/assets/acount-room/up.svg'
import down from '@/assets/acount-room/down.svg'
import Select from './select.vue'
export default {
  components: {
    CountTo,
    Select
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
    min-height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    justify-content: center;
    align-items: normal;

    .card-panel-icon-wrapper {
      // float: left;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      display: flex;
      align-items: center;
      flex-direction: row;
    }

    .card-panel-icon {
      float: left;
      font-size: 24px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      display: flex;
      flex-direction: column;
      align-items: center;

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
