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
                <tableList :columns="currentColumns" :tableData="currentTableData" :operateObj="operateObj"
                  :tableParams="tableParams"></tableList>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
    <CodeDetail :show="codeDetail.show" :detail="codeDetail" @closeModal="closeModal"></CodeDetail>
  </div>
</template>

<script>
import cardList from '../../component/cardList2.vue'
import grow2 from '@/assets/acount-room/grow2.svg'
import claim from '@/assets/acount-room/claim.svg'
import EchartsCom from '../../component/charts.vue'
import formChoose from '../../component/form-choose/index.vue'
import tableList from './table.vue'
import CodeDetail from './component/modal2.vue'
import { codeInResposityList } from '@/api/code'
import { counterList } from '@/api/counter'
import { currencyList } from '@/api/currency'
export default {
  components: {
    cardList,
    EchartsCom,
    formChoose,
    tableList,
    CodeDetail
  },
  data() {
    return {
      radio1: '今日',
      grow2,
      claim,
      activeName: 'one',
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
          name: '入库清单',
          key: 'one',
          columns: [
            {
              key: 'tag_repository_id',
              name: '清单编号',
            },
            {
              key: 'created_at',
              name: '入库时间',
            },
            {
              key: 'currency_name',
              name: '币种',
            }, {
              key: 'counter_name',
              name: '筹码类型',
            }, {
              key: 'denomination',
              name: '筹码面额',
            }
            , {
              key: 'total_count',
              name: '筹码数量',
            }
            , {
              key: 'admin_name',
              name: '操作人',
            }
            , {
              key: 't8',
              name: '状态',
            }
          ]
        },
        {
          name: '出库清单',
          key: 'two',
          columns: [
            {
              key: 'tag_repository_id',
              name: '清单编号',
            },
            {
              key: 'created_at',
              name: '出库时间',
            },
            {
              key: 't3',
              name: '出库类型'
            },
            {
              key: 'currency_name',
              name: '币种',
            }, {
              key: 'counter_name',
              name: '筹码类型',
            }, {
              key: 'denomination',
              name: '筹码面额',
            }
            , {
              key: 'total_count',
              name: '筹码数量',
            }
            , {
              key: 'admin_name',
              name: '操作人',
            }
            , {
              key: 't9',
              name: '状态',
            }
          ]
        }

      ],
      getDataParams: {
        type: 1
      },
      codeList: [],
      currencyList: [],
      tableParams: {
        loading: false,
        total: 0,
        page_num: 1,
        page_size: 10
      },
      codeDetail: {
        show: false,
        row: {}
      }
    }
  },
  methods: {
    closeModal() {
      this.codeDetail.show = false
    },
    back() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
    },
    handleClick({ label }, event) {
      console.log(this.tabsArr.findIndex(item => item.name == label));
      const index = this.tabsArr.findIndex(item => item.name == label)
      this.currentColumns = this.tabsArr[index].columns
      this.getDataParams.type = index + 1
      console.log(this.getDataParams);
      this.getTableData()
    },
    async initData() {
      this.getDataParams = {
        ...this.getDataParams,
        page_num: this.tableParams.page_num,
        page_size: this.tableParams.page_size
      }
      const res = await codeInResposityList(this.getDataParams)
      this.currentColumns = this.tabsArr[0].columns
      this.tableParams.total = res.data.total
      this.currentTableData = res.data.list
    },
    async getTableData() {
      this.getDataParams = {
        ...this.getDataParams,
        page_num: this.tableParams.page_num,
        page_size: this.tableParams.page_size
      }
      const res = await codeInResposityList(this.getDataParams)
      this.tableParams.total = res.data.total
      console.log("获取表格数据", res);
      this.currentTableData = res.data.list
    },
    handleEdit(row) {
      this.codeDetail.show = true
      this.codeDetail.row = row
      this.codeDetail.codeListDetail = [
        {
          value: row.denomination,
          num: row.tags.length
        }
      ]


    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="scss">
.el-button--primary {
  border-radius: 2px;
  background: #165DFF;
  display: inline-flex;

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
