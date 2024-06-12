<template>
  <div class="dataView-c couting-container">
    <div class="header">
      <BackHead @back="back" @goHome="goHome"></BackHead>
      <el-page-header class="el-h" :content="$t('accountRoom.index.shuju')">
      </el-page-header>
      <div class="common" style="margin-left: auto">
        <i class="el-icon-refresh-right" style="color:#fff"></i>
      </div>
    </div>

    <el-row :gutter="24" style="display: flex">
      <el-col :lg="12">
        <div class="card-list">
          <!-- 柜台统计 -->
          <div class="cus-card">
            <div class="h-area">
              <el-page-header class="el-h" :content="'账房台账'">
              </el-page-header>
              <Select></Select>
              <span class="recent">最近统计:2024-06-01 12:35:41</span>
              <div class="row2-area">
                <img :src="grow2" alt="">
              </div>
            </div>
            <!-- 仓库分析 -->
            <div class="cus-card-content">
              <div class="box-bg just-center counting-box">
                <div class="chip-box">
                  <span class="counter">{{ code.title }}</span>
                </div>
                <div class="box" v-for="(item, index) in code.tab" :key="index">
                  <span>{{ item.name }}</span>
                  <span>{{ item.num }}</span>
                </div>

              </div>
              <div class="box-bg just-center counting-box">
                <div class="chip-box">
                  <span class="counter">{{ code.title }}</span>
                </div>
                <div class="box" v-for="(item, index) in cash.tab" :key="index">
                  <span>{{ item.name }}</span>
                  <span>{{ item.num }}</span>
                </div>

              </div>
              <div class="box-bg just-center counting-box">
                <div class="chip-box">
                  <span class="counter">{{ profit.title }}</span>
                </div>
                <div class="box" v-for="(item, index) in profit.tab" :key="index">
                  <span>{{ item.name }}</span>
                  <span>{{ item.num }}</span>
                </div>

              </div>
            </div>
            <div class="btn-area">
              <div class="total-btn">
                <span>当日筹码总额</span>
                <span>100,100,100</span>
              </div>
              <div class="total-btn">
                <span>当日筹码总额</span>
                <span>100,100,100</span>
              </div>
              <div class="total-btn">
                <span>当日筹码总额</span>
                <span>100,100,100</span>
              </div>
            </div>
            <EchartsCom2></EchartsCom2>

          </div>
        </div>
      </el-col>
      <el-col :lg="12">
        <div class="card-list">
          <cardList></cardList>
          <div class="cus-card" style="flex: 1">
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
import cardList from '../../component/cardList9.vue'
import grow2 from '@/assets/acount-room/grow2.svg'
import claim from '@/assets/acount-room/claim.svg'
import EchartsCom from '../../component/charts3.vue'
import EchartsCom2 from '../../component/charts6.vue'

import Select from '../../component/select.vue'
import TableList from './table.vue'
import formChoose from '../../component/form-choose/index.vue'

export default {
  components: {
    cardList,
    EchartsCom,
    EchartsCom2,
    Select,
    formChoose,
    TableList
  },
  data() {
    return {
      radio1: '今日',
      grow2,
      claim,
      code: {
        title: '筹码统计',
        tab: [
          {
            name: '上期筹码余额',
            num: '100,100,100'
          },
          {
            name: '客户买码',
            num: '100,100,100'
          },
          {
            name: '客户签单',
            num: '100,100,100'
          },
          {
            name: '客户退码',
            num: '100,100,100'
          }
        ]
      },
      cash: {
        title: '现金统计',
        tab: [
          {
            name: '上期现金余额',
            num: '100,100,100'
          },
          {
            name: '收银总额',
            num: '100,100,100'
          },
          {
            name: '退码总额',
            num: '100,100,100'
          },
          {
            name: '洗码结算总额',
            num: '100,100,100'
          },
          {
            name: '财务入账',
            num: '100,100,100'
          },
          {
            name: '财务支出',
            num: '100,100,100'
          }
        ]
      },
      profit: {
        title: '盈利统计',
        tab: [
          {
            name: '桌台上下水',
            num: '100,100,100'
          },
          {
            name: '码费',
            num: '100,100,100'
          },
          {
            name: '经纪人收益',
            num: '100,100,100'
          },
          {
            name: '公司收益s',
            num: '100,100,100'
          },
        ]
      },
      columns1: [
        {
          key: 't1',
          name: '面值',
        },
        {
          key: 't2',
          name: '个数',
        },
        {
          key: 't3',
          name: '全额',
        },
      ],
      tabsArr: [
        {
          name: '入库明细',
          key: 'one',
          columns: [
            {
              key: 't1',
              name: '清单编号',
            },
            {
              key: 't2',
              name: '状态',
            },
            {
              key: 't3',
              name: '发行时间',
            },
            {
              key: 't4',
              name: '币种',
            },
            {
              key: 't5',
              name: '筹码类型',
            },
            {
              key: 't6',
              name: '筹码面额',
            },
            {
              key: 't7',
              name: '筹码数量',
            },
            {
              key: 't8',
              name: '操作人',
            },
          ]
        },
        {
          name: '发行明细',
          key: 'two',
          columns: [
            {
              key: 't1',
              name: '清单编号',
            },
            {
              key: 't2',
              name: '柜台名称',
            },
            {
              key: 't3',
              name: '入柜时间',
            },
            {
              key: 't4',
              name: '币种',
            },
            {
              key: 't5',
              name: '筹码类型',
            },
            {
              key: 't6',
              name: '筹码面额',
            },
            {
              key: 't7',
              name: '筹码数量',
            },
            {
              key: 't8',
              name: '操作人',
            },
            {
              key: 't9',
              name: '状态',
            },
          ]
        },
      ],
      currentTableData: [
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 0
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 1
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 0
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 1
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 0
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 1
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 0
        },
        {
          t1: '20240603010908',
          t2: '2024-06-03',
          t3: 'USD',
          t4: '普通码',
          t5: '1000',
          t6: '100',
          t7: 'Mike Chen',
          t8: 1
        }

      ],
      activeName: 'one'
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
    },
    handleClick() {

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

.chip-box {
  justify-content: center !important;
}

.just-center {
  align-items: center;
}

.margin-p {
  margin-bottom: 20px;

  .el-button--primary {
    width: auto;
  }
}

.couting-container {
  .box-bg {
    height: fit-content !important;
    padding: 0 !important;
    background: transparent !important;
  }

  .cus-card-content {
    align-items: flex-start !important;


  }

  .total-btn {
    width: 260px;
    height: 56px;
    border-radius: 4px;
    background: #F54E4E;
    flex-shrink: 0;
    color: $color1;
    font-family: "PingFang SC";
    font-size: 16px;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 500;
    margin-top: auto;
  }

  .btn-area {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    gap: 20px;
    margin-top: 20px;
  }
}
</style>
