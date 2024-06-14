<template>
  <div class="dataView-c">
    <div class="header">
      <BackHead @back="back" @goHome="goHome"></BackHead>
      <el-page-header class="el-h" :content="$t('accountRoom.index.shuju')">
      </el-page-header>
      <div class="common" style="margin-left: auto">
        <i class="el-icon-refresh-right" style="color:#fff"></i>
      </div>
    </div>
    <card-list></card-list>

    <el-row :gutter="24" style="display: flex">
      <el-col :span="24">
        <div class="card-list">
          <div class="cus-card">
            <!-- 柜台统计 -->

            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-for="(item, index) in tabsArr" :key="index" :label="item.name" :name="item.key">
                <formChoose></formChoose>
                <el-divider></el-divider>
                <div class="box21">
                  <el-button type="primary" icon="el-icon-search">批量导入</el-button>
                  <el-button type="primary" icon="el-icon-refresh-left" class="reset">批量导出</el-button>
                </div>
                <tableList :columns="columns1" :tableData="currentTableData" :operateObj="operateObj"></tableList>
              </el-tab-pane>

            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cardList from '../../component/cardList5.vue'
import grow2 from '@/assets/acount-room/grow2.svg'
import claim from '@/assets/acount-room/claim.svg'
import formChoose from '../../component/form-choose/index.vue'
import tableList from './table.vue'
import EchartsCom from '../../component/charts2.vue'

export default {
  components: {
    cardList,
    EchartsCom,
    formChoose,
    tableList
  },
  data() {
    return {
      radio1: '今日',
      grow2,
      claim,
      activeName: 'first',
      currentColumns: [],
      operateObj: [
        { label: '筹码明细', method: row => this.handleEdit(row) },
        { label: '删除', method: row => this.handleDelete(row) }
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
      tabsArr: [
        {
          name: '桌台账目',
          key: 'one',
          columns: [
            {
              key: 't1',
              name: '流水号',
            },
            {
              key: 't2',
              name: '游戏类型',
            },
            {
              key: 't3',
              name: '桌台名称',
            },
            {
              key: 't4',
              name: '币种类型',
            },
            {
              key: 't5',
              name: '客户总押',
            },
            {
              key: 't6',
              name: '客户总赢',
            },
            {
              key: 't7',
              name: '洗码量',
            },
            {
              key: 't8',
              name: '码费',
            },
            {
              key: 't9',
              name: '产生积分',
            },
            {
              key: 't10',
              name: '对子和总赢',
            },
            {
              key: 't11',
              name: '保险总赢',
            },
            {
              key: 't12',
              name: '幸运6总赢',
            },
            {
              key: 't13',
              name: '代理收益',
            },
            {
              key: 't14',
              name: '公司收益',
            },
          ]
        },
        {
          name: '客人注单',
          key: 'two',
          columns: [
            {
              key: 't1',
              name: '流水号',
            },
            {
              key: 't2',
              name: '日结时间',
            },
            {
              key: 't3',
              name: '下注时间',
            },
            {
              key: 't4',
              name: '游戏',
            },
            {
              key: 't5',
              name: '桌台',
            },
            {
              key: 't6',
              name: '靴-局',
            },
            {
              key: 't7',
              name: '开奖结果',
            },
            {
              key: 't8',
              name: '洗码号',
            },
            {
              key: 't9',
              name: '姓名',
            },

            {
              key: 't10',
              name: '币种',
            },
            {
              key: 't11',
              name: '码种',
            },
            {
              key: 't12',
              name: '总押',
            },
            {
              key: 't13',
              name: '庄总押',
            },
            {
              key: 't14',
              name: '庄总赢',
            },
            {
              key: 't15',
              name: '闲总押',
            },
            {
              key: 't16',
              name: '闲总赢',
            },
            {
              key: 't17',
              name: '和总押',
            },
            {
              key: 't18',
              name: '和总赢',
            },
            {
              key: 't19',
              name: '庄对总押',
            },
            {
              key: 't20',
              name: '庄对总赢',
            },
            {
              key: 't21',
              name: '保险总赢',
            },
            {
              key: 't22',
              name: '幸运6总押',
            },
            {
              key: 't23',
              name: '幸运6总赢',
            },
            {
              key: 't24',
              name: '龙7总押',
            },
            {
              key: 't25',
              name: '龙7总赢',
            },
            {
              key: 't26',
              name: '熊8总押',
            },
            {
              key: 't27',
              name: '熊8总赢',
            },
            {
              key: 't28',
              name: '龙总押',
            },
            {
              key: 't29',
              name: '龙总赢',
            },
            {
              key: 't30',
              name: '虎总押',
            },
            {
              key: 't31',
              name: '虎总赢',
            },
            {
              key: 't32',
              name: '和（龙）总押',
            },
            {
              key: 't33',
              name: '和（龙）总赢',
            },
            {
              key: 't34',
              name: '对子总押',
            },
            {
              key: 't35',
              name: '对子总赢',
            },
            {
              key: 't36',
              name: '大总押',
            },
            {
              key: 't37',
              name: '大总赢',
            },
            {
              key: 't38',
              name: '小总押',
            },
            {
              key: 't39',
              name: '小总赢',
            },
            {
              key: 't40',
              name: '全围总押',
            },
            {
              key: 't41',
              name: '全围总赢',
            },
            {
              key: 't42',
              name: '电子输',
            },
            {
              key: 't43',
              name: '电子赢',
            },
          ]
        },
        {
          name: '靴账目',
          key: 'three',
          columns: [
            {
              key: 't1',
              name: '流水号',
            },
            {
              key: 't2',
              name: '状态',
            },
            {
              key: 't3',
              name: '柜台名称',
            },
            {
              key: 't4',
              name: '桌台名称',
            },
            {
              key: 't5',
              name: '币种',
            },
            {
              key: 't6',
              name: '码种',
            },
            {
              key: 't7',
              name: '金额',
            },
            {
              key: 't8',
              name: '备注',
            },
            {
              key: 't9',
              name: '操作人',
            },
            {
              key: 't10',
              name: '验收人（现场）',
            },{
              key: 't11',
              name: '创建时间',
            },{
              key: 't12',
              name: '验收时间（现场）',
            },{
              key: 't13',
              name: '最近修改时间',
            },{
              key: 't14',
              name: '修改记录',
            },
            {
              key: 't15',
              name: '修改操作人',
            },
          ]
        },
        {
          name: '露珠结果',
          key: 'four'
        },
        {
          name: '出码明细',
          key: 'five'
        },
        {
          name: '加彩明细',
          key: 'six'
        },
        {
          name: '收码明细',
          key: 'seven'
        },
        {
          name: '提彩明细',
          key: 'eight'
        },
        {
          name: '发行明细',
          key: 'nine'
        },
        {
          name: '入柜明细',
          key: 'ten'
        },
        {
          name: '小费兑换明细',
          key: 'eleven'
        },
      ],
      columns1: [
        {
          key: 't1',
          name: '清单编号',
        },
        {
          key: 't2',
          name: '入库时间',
        },
        {
          key: 't3',
          name: '币种',
        }, {
          key: 't4',
          name: '筹码类型',
        }, {
          key: 't5',
          name: '筹码面额',
        }
        , {
          key: 't6',
          name: '筹码数量',
        }
        , {
          key: 't7',
          name: '操作人',
        }
        , {
          key: 't8',
          name: '状态',
        }
      ],
      columns2: [
        {
          key: 't1',
          name: '清单编号',
        },
        {
          key: 't2',
          name: '入库时间',
        },
        {
          key: 't3',
          name: '出库类型',
        }, {
          key: 't4',
          name: '币种',
        }, {
          key: 't5',
          name: '筹码类型',
        }
        , {
          key: 't6',
          name: '筹码面额',
        }
        , {
          key: 't7',
          name: '筹码数量',
        }
        , {
          key: 't8',
          name: '操作人',
        },
        {
          key: 't9',
          name: '状态',
        }
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
.el-button--primary {
  border-radius: 2px;
  background: #165DFF;
  display:inline-flex;

  padding: 5px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  height: 32px;
  width: fit-content;
}

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

.box21 {
  display: flex;
  gap: 10px;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10px;
}
</style>
