<template>
  <div class="dataView-c">
    <div class="header">
      <div class="common">
        <img src="@/assets/acount-room/back.svg">
      </div>
      <div class="common">
        <img src="@/assets/acount-room/index.svg">
      </div>
      <el-page-header class="el-h" :content="$t('accountRoom.index.shuju')">
      </el-page-header>
      <div class="common" style="margin-left: auto">
        <i class="el-icon-refresh-right" style="color:#fff"></i>
      </div>
    </div>

    <card-list></card-list>

    <el-row :gutter="24">
      <el-col :lg="12">
        <div class="card-list">
          <!-- 柜台统计 -->
          <div class="cus-card">
            <div class="h-area">
              <el-page-header class="el-h" :content="'柜台统计'">
              </el-page-header>
              <el-radio-group v-model="radio1">
                <el-radio-button label="今日"></el-radio-button>
                <el-radio-button label="昨日"></el-radio-button>
                <el-radio-button label="一周"></el-radio-button>
              </el-radio-group>
              <span class="recent">最近统计:2024-06-01 12:35:41</span>
              <div class="row2-area">
                <img :src="grow2" alt="">
              </div>

            </div>
            <div class="cus-card-content">
              <div class="card-pri">
                <div class="left-box">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                  <span class="counter">一号柜台</span>
                </div>
                <div class="right-box">
                  <div class="box1">
                    <span class="top-box">筹码</span>
                    <span class="bottom-box">100,1200,100</span>
                  </div>
                  <div class="box1">
                    <span class="top-box">现金</span>
                    <span class="bottom-box">100,1200,100</span>
                  </div>
                </div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="card-pri">
                <div class="left-box">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                  <span class="counter">一号柜台</span>
                </div>
                <div class="right-box">
                  <div class="box1">
                    <span class="top-box">筹码</span>
                    <span class="bottom-box">100,1200,100</span>
                  </div>
                  <div class="box1">
                    <span class="top-box">现金</span>
                    <span class="bottom-box">100,1200,100</span>
                  </div>
                </div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="card-pri">
                <div class="left-box">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                  <span class="counter">一号柜台</span>
                </div>
                <div class="right-box">
                  <div class="box1">
                    <span class="top-box">筹码</span>
                    <span class="bottom-box">100,1200,100</span>
                  </div>
                  <div class="box1">
                    <span class="top-box">现金</span>
                    <span class="bottom-box">100,1200,100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cus-card">
            <div class="h-area">
              <el-page-header class="el-h" :content="'码房统计'">
              </el-page-header>
              <el-radio-group v-model="radio1">
                <el-radio-button label="今日"></el-radio-button>
                <el-radio-button label="昨日"></el-radio-button>
                <el-radio-button label="一周"></el-radio-button>
              </el-radio-group>
              <span class="recent">最近统计:2024-06-01 12:35:41</span>
              <div class="row2-area">
                <img :src="grow2" alt="">
              </div>
            </div>
            <!-- 码房统计 -->
            <div class="cus-card-content">
              <div class="box-bg">
                <div class="chip-box">
                  <span class="counter">桌台出码</span>
                  <img :src="claim" alt="">
                </div>
                <span>1,122</span>
              </div>
              <div class="box-bg">
                <div class="chip-box">
                  <span class="counter">桌台出码</span>
                  <img :src="claim" alt="">
                </div>
                <span>1,122</span>
              </div>
              <div class="box-bg">
                <div class="chip-box">
                  <span class="counter">桌台出码</span>
                  <img :src="claim" alt="">
                </div>
                <span>1,122</span>
              </div>
              <div class="box-bg">
                <div class="chip-box">
                  <span class="counter">桌台出码</span>
                  <img :src="claim" alt="">
                </div>
                <span>1,122</span>
              </div>
            </div>

          </div>
          <div class="cus-card">
            <div class="h-area">
              <el-page-header class="el-h" :content="'码房统计'">
              </el-page-header>
              <el-radio-group v-model="radio1">
                <el-radio-button label="今日"></el-radio-button>
                <el-radio-button label="昨日"></el-radio-button>
                <el-radio-button label="一周"></el-radio-button>
              </el-radio-group>
              <span class="recent">最近统计:2024-06-01 12:35:41</span>
              <div class="row2-area">
                <img :src="grow2" alt="">
              </div>
            </div>
            <!-- 仓库分析 -->
            <div class="cus-card-content">
              <div class="box-bg">
                <div class="chip-box">
                  <span class="counter">桌台出码</span>
                  <img :src="claim" alt="">
                </div>
                <span>1,122</span>
                <span class="box3">筹码个数 223333</span>
              </div>
              <div class="box-bg">
                <div class="chip-box">
                  <span class="counter">桌台出码</span>
                  <img :src="claim" alt="">
                </div>
                <span>1,122</span>
              </div>
              <div class="box-bg">
                <div class="chip-box">
                  <span class="counter">桌台出码</span>
                  <img :src="claim" alt="">
                </div>
                <span>1,122</span>
              </div>
              <div class="box-bg">
                <div class="chip-box">
                  <span class="counter">桌台出码</span>
                  <img :src="claim" alt="">
                </div>
                <span>1,122</span>
              </div>
            </div>

          </div>
        </div>
      </el-col>
      <el-col :lg="12">
        <div class="card-list">
          <div class="cus-card">
            <div class="h-area">
              <el-page-header class="el-h" :content="'桌台分析'">
              </el-page-header>
              <el-radio-group v-model="radio1">
                <el-radio-button label="今日"></el-radio-button>
                <el-radio-button label="昨日"></el-radio-button>
                <el-radio-button label="一周"></el-radio-button>
              </el-radio-group>
              <span class="recent">最近统计:2024-06-01 12:35:41</span>
              <div class="row2-area">
                <img :src="grow2" alt="">
              </div>
            </div>
            <div class="cus-card-content">
              <div class="box-bg">
                <div class="chip-box">
                  <span class="counter">客户总压</span>
                  <img :src="claim" alt="">
                </div>
                <span>1,122</span>
              </div>
              <div class="box-bg">
                <div class="chip-box">
                  <span class="counter">桌台盈利</span>
                  <img :src="claim" alt="">
                </div>
                <span>1,122</span>
              </div>
            </div>
          </div>
          <div class="cus-card">
            <div class="h-area">
              <el-page-header class="el-h" :content="'统计表'">
              </el-page-header>
              <el-radio-group v-model="radio1">
                <el-radio-button label="今日"></el-radio-button>
                <el-radio-button label="昨日"></el-radio-button>
                <el-radio-button label="一周"></el-radio-button>
              </el-radio-group>
              <span class="recent">最近统计:2024-06-01 12:35:41</span>
              <div class="row2-area">
                <img :src="grow2" alt="">
              </div>
            </div>
            <div class="cus-card-content">
                <echarts-com></echarts-com>

            </div>
          </div>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import cardList from '../../component/cardList.vue'
import grow2 from '@/assets/acount-room/grow2.svg'
import claim from '@/assets/acount-room/claim.svg'
import EchartsCom from '../../component/charts.vue'
export default {
  components: {
    cardList,
    EchartsCom
  },
  data() {
    return {
      radio1: '今日',
      grow2,
      claim
    }
  }
}
</script>

<style lang="scss">
@import '../../common.scss';

.el-page-header__left {
  display: none;
}

.dataView-c {
  width: 100%;
  min-height: calc(100vh - 50px);
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
