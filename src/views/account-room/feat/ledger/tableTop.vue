<template>
  <div class="dataView-c tableTop">
    <div class="header">
      <BackHead @back="back" @goHome="goHome"></BackHead>
      <el-page-header class="el-h" :content="$t('accountRoom.index.shuju')">
      </el-page-header>
      <div class="common" style="margin-left: auto">
        <i class="el-icon-refresh-right" style="color:#fff"></i>
      </div>
    </div>

    <el-row :gutter="24" style="display: flex">
      <el-col :lg="8">
        <div class="card-list">
          <!-- 柜台统计 -->
          <div class="cus-card">
            <div class="h-area">
              <el-page-header class="el-h" :content="'桌台台账'">
              </el-page-header>
              <Select></Select>
              <span class="recent">最近统计:2024-06-01 12:35:41</span>
              <div class="row2-area">
                <img :src="grow2" alt="">
              </div>
            </div>
            <!-- 仓库分析 -->
            <div class="cus-card-content">
              <div class="box-bg just-center">
                <div class="chip-box">
                  <img :src="claim" alt="">
                  <span class="counter">全场桌台上下水</span>
                </div>
                <span style="color:#27C346">1,122</span>
              </div>
            </div>
            <el-divider></el-divider>
            <div>
              <el-page-header class="el-h" :content="'百家乐桌台数据统计'">
              </el-page-header>
              <div class="data-area">
                <div class="data-box"
                  :class="{ 'code': item.key == 'code', 'cash': item.key == 'cash', 'water': item.key == 'water' }"
                  v-for="(item, index) in tableTopData" :key="index">
                  <span class="text">{{ item.name }}</span>
                  <span class="num">{{ item.num }}</span>
                </div>
              </div>
            </div>

            <div>
              <el-page-header class="el-h" :content="'百家乐现金筹码盘点明细表'">
              </el-page-header>
            </div>
            <div class="box21 margin-p">
              <el-button type="primary" icon="el-icon-refresh-left">批量导出</el-button>
            </div>
            <TableList :columns="columns1" :tableData="currentTableData"></TableList>
          </div>
        </div>
      </el-col>
      <el-col :lg="16">
        <div class="card-list">
          <cardList></cardList>
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

          <div class="cus-card" style="flex: 1">
            <div class="h-area">
              <el-page-header class="el-h" :content="'桌台游戏占比统计'">
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
              <!-- <div class="data-view">
                <div class="data-view-box"></div>
              </div> -->
              <echarts-com-2></echarts-com-2>

            </div>
          </div>
        </div>

      </el-col>

    </el-row>
  </div>
</template>

<script>
import cardList from '../../component/cardList7.vue'
import grow2 from '@/assets/acount-room/grow2.svg'
import claim from '@/assets/acount-room/claim.svg'
import EchartsCom from '../../component/charts3.vue'
import EchartsCom2 from '../../component/charts4.vue'

import Select from '../../component/select.vue'
import TableList from './table.vue'
import formChoose from '../../component/form-choose/index.vue'

export default {
  components: {
    cardList,
    EchartsCom,
    Select,
    formChoose,
    TableList,
    EchartsCom2
  },
  data() {
    return {
      radio1: '今日',
      grow2,
      claim,
      tableTopData: [
        {
          name: '桌台出码',
          num: '100,100,100'
        },
        {
          name: '备用现金',
          num: '100,100,100'
        },
        {
          name: '桌台收码',
          num: '100,100,100'
        },
        {
          name: '桌台卖码',
          num: '100,100,100'
        },
        {
          name: '桌台加彩',
          num: '100,100,100'
        },
        {
          name: '现金支出',
          num: '100,100,100'
        },
        {
          name: '桌台提彩',
          num: '100,100,100'
        },
        {
          key: 'water',
          name: '桌台上下水',
          num: '100,100,100'
        },
        {
          key: 'code',
          name: '桌台总码数',
          num: '100,100,100'
        },
        {
          key: 'cash',
          name: '桌台总现金',
          num: '100,100,100'
        }
      ],
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
      activeName: 'one',
      gameRate: [
        {
          name: 'Figma',
          rate: 20
        },
        {
          name: 'Figma',
          rate: 20
        },
        {
          name: 'Figma',
          rate: 10
        },
        {
          name: 'Figma',
          rate: 15
        },
        {
          name: 'Figma',
          rate: 35
        },

      ]
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

.tableTop {
  .card-list .cus-card {
    height: 100%;
  }

  .cus-card-content {
    margin-top: 0 !important;
  }
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
  display: flex;
  justify-content: flex-end;

  .el-button--primary {
    width: auto;

  }
}
</style>
