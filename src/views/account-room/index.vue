<template>
  <div class="app-container" :style="{ 'margin-top': !showBack ? '30px' : 0 }">
    <div class="header" v-if="showBack">
      <div class="common" @click="backPre">
        <img src="../../assets/acount-room/back.svg">
      </div>
      <div class="common" @click="goHome">
        <img src="../../assets/acount-room/index.svg">
      </div>
    </div>
    <el-card class="out-card">
      <el-page-header class="el-h" :content="title1">
      </el-page-header>
      <el-row :gutter="20" class="el-row">
        <el-col :span="6" v-for="(item, i) in currentMenu" :key="i">
          <el-card class="box-card" shadow="hover" @click.native="changeBox(item)">
            <div class="card-content" style="width: 100%;height: 100%">
              <div class="card-img">
                <i class="el-icon-platform-eleme"></i>
              </div>
              <span>{{ item.text }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20" style="margin-top:20px" class="out-card2">
      <el-col :span="12">
        <el-card class="bottom-card">
          <div class="h-area">
            <el-page-header class="el-h" :content="title2">
            </el-page-header>
            <div class="row2-area">
              <img :src="grow2" alt="">
            </div>
          </div>
          <div class="bottom-content">
            <div class="card1">
              <div class="left-content">
                <div class="image">
                  <i class="el-icon-platform-eleme"></i>
                </div>
                <span>桌台盈利</span>
              </div>
              <div class="right-content">
                <span>1000K</span>
                <div class="des">
                  <img :src="up" alt="">
                  <span class="right">24.8%</span>
                </div>
              </div>
              <img class="grow" :src="grow" alt="">
            </div>
            <div class="card1">
              <div class="left-content">
                <div class="image">
                  <i class="el-icon-platform-eleme"></i>
                </div>
                <span>桌台盈利</span>
              </div>
              <div class="right-content">
                <span>1000K</span>
                <div class="des">
                  <img :src="down" alt="">
                  <span class="error">24.8%</span>
                </div>
              </div>
              <img class="grow" :src="grow" alt="">
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="bottom-card">
          <div class="h-area">
            <el-page-header class="el-h" :content="title3">
            </el-page-header>
            <div class="row2-area">
              <el-button type="primary">{{ $t('accountRoom.index.button') }}</el-button>
            </div>
          </div>


          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="(i, index) in count" class="infinite-list-item" :key="index">
              <div class="co">
                <el-tag type="danger" effect="dark">未读</el-tag>
                <span>你有一个加彩表单未处理,请及时查看</span>
                <span style="margin-left: auto">2024-06-03 13:43:56</span>
              </div>
              <el-divider v-if="index !== count - 1"></el-divider>

            </li>
          </ul>

        </el-card>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import up from '@/assets/acount-room/up.svg'
import down from '@/assets/acount-room/down.svg'
import grow2 from '@/assets/acount-room/grow2.svg'
import grow from '@/assets/acount-room/grow.svg'
import { findMenuListById } from '@/utils/tool'
export default {
  name: "AccountRoom",
  data() {
    return {

      up, down, grow2, grow,
      jumpList: ['4'],
      title1: this.$t('accountRoom.index.title'),
      title2: this.$t('accountRoom.index.title2'),
      title3: this.$t('accountRoom.index.title3'),
      menuList: [
        {
          // 仓库
          key: '0',
          text: this.$t('accountRoom.index.response'),
          children: [
            {
              // 入库
              key: '0-1',
              p: '0',
              text: this.$t('accountRoom.index.inRes'),
              route: '/account-room/reponsity',
            }
          ]
        },
        {
          // 码房
          key: '1',
          text: this.$t('accountRoom.index.mafang'),
          children: [
            {
              // 发行
              key: '1-1',
              p: '1',
              text: this.$t('accountRoom.index.faxing'),
              children: [
                {
                  // 筹码发行
                  key: '1-1-1',
                  p: '1-1',
                  text: this.$t('accountRoom.index.cmfx'),
                },
                {
                  // 数据中心
                  key: '1-1-2',
                  p: '1-1',
                  text: this.$t('accountRoom.index.shuju'),
                }
              ]
            },
            {
              // 入柜
              key: '1-2',
              p: '1',
              text: this.$t('accountRoom.index.rugui'),
              children: [
                {
                  // 筹码入柜
                  key: '1-2-1',
                  p: '1-2',
                  text: this.$t('accountRoom.index.cmrg'),
                },
                {
                  // 数据中心
                  key: '1-2-2',
                  p: '1-2',
                  text: this.$t('accountRoom.index.shuju'),
                }
              ]
            },
            {
              // 桌台
              key: '1-3',
              p: '1',
              text: this.$t('accountRoom.index.zhuotai'),
              children: [
                {
                  // 出码
                  key: '1-3-1',
                  p: '1-3',
                  text: this.$t('accountRoom.index.ztcm'),
                  children: [
                    {
                      // 桌台出码
                      key: '1-3-1-1',
                      p: '1-3-1',
                      text: this.$t('accountRoom.index.cm'),
                    },
                    {
                      // 出码数据
                      key: '1-3-1-2',
                      p: '1-3-1',
                      text: this.$t('accountRoom.index.cmsj'),
                    }
                  ]
                },
                {
                  // 收码
                  key: '1-3-2',
                  p: '1-3',
                  text: this.$t('accountRoom.index.sm'),
                  children: [
                    {
                      // 桌台收码
                      key: '1-3-2-1',
                      p: '1-3-2',
                      text: this.$t('accountRoom.index.ztsm'),
                    },
                    {
                      // 收码数据
                      key: '1-3-2-1',
                      p: '1-3-2',
                      text: this.$t('accountRoom.index.smsj'),
                    }
                  ]
                },
                {
                  // 桌台实时情况
                  key: '1-3-3',
                  p: '1-3',
                  text: this.$t('accountRoom.index.ss'),
                },
                {
                  // 加彩
                  key: '1-3-4',
                  p: '1-3',
                  text: this.$t('accountRoom.index.jc'),
                  children: [
                    {
                      // 桌台加彩
                      key: '1-3-4-1',
                      p: '1-3-4',
                      text: this.$t('accountRoom.index.ztjc'),
                    },
                    {
                      // 加彩数据
                      key: '1-3-4-2',
                      p: '1-3-4',
                      text: this.$t('accountRoom.index.jcsj'),
                    }
                  ]
                },
                {
                  // 提彩
                  key: '1-3-5',
                  p: '1-3',
                  text: this.$t('accountRoom.index.tc'),
                  children: [
                    {
                      // 桌台提彩
                      key: '1-3-5-1',
                      p: '1-3-5',
                      text: this.$t('accountRoom.index.zttc'),
                    },
                    {
                      // 提彩数据
                      key: '1-3-5-2',
                      p: '1-3-5',
                      text: this.$t('accountRoom.index.tcsj'),
                    }
                  ]
                },
                {
                  key: '1-3-6',
                  p: '1-3',
                  text: this.$t('accountRoom.index.shuju'),
                },

              ]
            },
            {
              // 小费
              key: '1-4',
              p: '1',
              text: this.$t('accountRoom.index.xiaofei'),
              children: [
                {
                  // 小费兑换
                  key: '1-4-1',
                  p: '1-4',
                  text: this.$t('accountRoom.index.xiaofei'),
                },
                {
                  // 兑换记录
                  key: '1-4-2',
                  p: '1-4',
                  text: this.$t('accountRoom.index.dhjl'),
                }
              ]
            },
            {
              // 筹码管理
              key: '1-5',
              p: '1',
              text: this.$t('accountRoom.index.chouma'),
              children: [
                {
                  // 筹码检测
                  key: '1-5-1',
                  p: '1-5',
                  text: this.$t('accountRoom.index.cmjc'),
                },
                {
                  // 异常筹码记录
                  key: '1-5-2',
                  p: '1-5',
                  text: this.$t('accountRoom.index.ycjl'),
                }
              ]
            },
            {
              // 数据中心
              key: '1-6',
              p: '1',
              text: this.$t('accountRoom.index.shuju'),
              route: '/account-room/code-room/dataCenter'

            },

          ]
        },
        {
          // 柜台
          key: '2',
          text: this.$t('accountRoom.index.guitai'),
          children: [
            {
              // 开户
              key: '2-1',
              text: this.$t('accountRoom.index.kh'),
            },
            {
              // 卖码
              key: '2-2',
              text: this.$t('accountRoom.index.maima'),
            },
            {
              // 签单
              key: '2-3',
              text: this.$t('accountRoom.index.qiandan'),
            },
            {
              // 存码
              key: '2-4',
              text: this.$t('accountRoom.index.cunma'),
            },
            {
              // 取码
              key: '2-5',
              text: this.$t('accountRoom.index.quma'),
            },
            {
              // 洗码
              key: '2-6',
              text: this.$t('accountRoom.index.xima'),
            },
            {
              // 经纪人结算
              key: '2-7',
              text: this.$t('accountRoom.index.jjrjs'),
            },
            {
              // 打散
              key: '2-8',
              text: this.$t('accountRoom.index.ds'),
            },
            {
              // 退码
              key: '2-9',
              text: this.$t('accountRoom.index.tuima'),
            },
            {
              // 数据中心
              key: '2-10',
              text: this.$t('accountRoom.index.shuju'),
              route:  '/account-room/counter/dataCenter'
            }
          ]
        },
        {
          // 账房
          key: '3',
          text: this.$t('accountRoom.index.zhangfang'),
          children: [
            {
              // 财务支出
              key: '3-1',
              p: '3',
              text: this.$t('accountRoom.index.cwzc'),
            },
            {
              // 入账待处理
              key: '3-2',
              p: '3',
              text: this.$t('accountRoom.index.rzdcl'),
            },
            {
              // 数据中心
              key: '3-3',
              p: '3',
              text: this.$t('accountRoom.index.shuju'),
              route:  '/account-room/counting-room/dataCenter'
            }

          ]
        },
        {
          // 数据总览
          key: '4',
          text: this.$t('accountRoom.index.datacenter'),
          route: '/dataView/index'
        },
        {
          // 台账
          key: '5',
          text: this.$t('accountRoom.index.taizhang'),
          children: [
            {
              // 库存台账
              key: '5-1',
              p: '5',
              text: this.$t('accountRoom.index.kctz'),
              route: '/account-room/ledger/inventory'
            },
            {
              // 桌台台账
              key: '5-2',
              p: '5',
              text: this.$t('accountRoom.index.zttz'),
              route: '/account-room/ledger/tableTop'
            },
            {
              //客人台账
              key: '5-3',
              p: '5',
              text: this.$t('accountRoom.index.krtz'),
              route: '/account-room/ledger/guest'
            },
            {
              // 账房台账
              key: '5-4',
              p: '5',
              text: this.$t('accountRoom.index.zftz'),
              route: '/account-room/ledger/accounting'
            },
          ]
        },
        {
          // 交接班
          key: '6',
          text: this.$t('accountRoom.index.jiaojie'),
          children: [
            {
              // 交班
              key: '6-1',
              p: '6',
              text: this.$t('accountRoom.index.jiaoban'),
            },
            {
              // 交班记录
              key: '6-2',
              p: '6',
              text: this.$t('accountRoom.index.jbjl'),
            }
          ]
        },
        {
          // 权限
          key: '7',
          text: this.$t('accountRoom.index.account'),
        }
      ],

      currentMenu: [],
      count: 20,
      loading: false,
      step: null,
      stackRoute: []
    }
  },
  computed: {
    noMore() {
      return this.count >= 20
    },
    disabled() {
      return this.loading || this.noMore
    },
    showBack() {
      console.log(this.currentMenu);
      return (this.currentMenu.length > 0 && this.currentMenu[0]?.key.includes("-")) || this.stackRoute.length > 0
    }
  },

  methods: {
    load() {
      // this.loading = true
      // setTimeout(() => {
      //   this.count += 2
      //   this.loading = false
      // }, 2000)
    },
    initShowMenu(index) {
      const data = this.menuList
      this.currentMenu = data
    },
    changeBox(row) {
      console.log(row);

      if (row.route) {
        this.$router.push(row.route)
        return
      }

      console.log(row);
      this.currentMenu = row.children || []
      this.step = row.key
      this.stackRoute.push(row.key)
    },
    backPre() {
      const arr = this.stackRoute
      const item = arr.pop()
      const list2 = findMenuListById(this.menuList, item)
      this.stackRoute = arr
      this.currentMenu = list2
    },
    goHome() {
      this.currentMenu = this.menuList
      this.stackRoute = []
    }

  },

  mounted() {
    this.initShowMenu(0)
  }

}
</script>

<style lang="scss">
.main-container {
  background: $pageBg;
  display: flex;
  flex-direction: column;
}

.app-main {
  display: flex;
  flex: 1;
}

.app-container {
  background-color: $pageBg;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;

  .header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
  }

  .el-card__body {
    cursor: pointer;
    height: 100% !important;
    box-sizing: border-box;
    // height: 190px;
    background: $pageBg2;
    width: 100%;

  }
}

.box-card {
  width: 25%;
  height: 180px;
  flex-shrink: 0;
}


.el-card {
  width: 100%;
  overflow: hidden;
  border: 1px solid $border1 !important;
  background: transparent;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .card-img {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    background: $pageBg2;
    border-radius: 8px;
    border: 1px solid $border1;
  }

  >span {
    color: $color1;
    text-align: center;

    /* 24/CN-Medium */
    font-family: "PingFang SC";
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
  }
}

.out-card {
  background-color: $pageBg2;
  border-radius: 8px;
  border: 1px solid $border1;
  // flex: 1;
  min-height: 468px;
}

.el-page-header__left {
  display: none;
}

.app-container .el-page-header__content {
  color: $color1;
  /* 24/CN-Medium */
  font-family: "PingFang SC";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  /* 133.333% */
  margin-bottom: 20px;

}

.el-row {
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
}

.out-card2 {
  min-height: 252px;

  .el-card__body {
    display: flex;
    flex-direction: column;
  }
}

.bottom-card {
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .h-area {
    display: flex;
    justify-content: space-between;
    height: 50px;
  }

  .row2-area {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    background: rgba(255, 255, 255, .1);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-card__body {
    // height: 252px !important;
  }
}

.bottom-content {
  display: flex;
  gap: 24px;
  width: 100%;

  // height: 100%;
  .card1 {
    border-radius: 8px;
    border: 1px solid $border1;
    display: flex;
    padding: 16px;
    gap: 16px;
    justify-content: space-evenly;
    position: relative;
    flex: 1;

    .grow {
      width: 16px;
      height: 16px;
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .left-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;

      >span {
        color: $color2;
        text-align: center;

        /* 16/CN-Medium */
        font-family: "PingFang SC";
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        /* 150% */
      }
    }

    .right-content {
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1;
      gap: 20px;

      .des {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
      }

      img {
        width: 16px;
        height: 16px;
      }

      .right {
        color: $color3;
        text-align: center;
        font-family: "PingFang SC";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
      }

      .error {
        color: $color4;
        text-align: center;
        font-family: "PingFang SC";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
      }

      >span {
        color: $color1;
        font-family: "Nunito Sans";
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
      }
    }

    .image {
      width: 70%;
      aspect-ratio: 1;
      /* 保持宽高比为 1:1 */
      flex-shrink: 0;
      border: 1px solid $border1;
      border-radius: 8px;

    }
  }
}

.infinite-list {
  // height: 100px;
  flex: 1;
  max-height: 180px;
  list-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .infinite-list-item {
    color: #fff;
    display: flex;
    flex-direction: column;

    .co {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .el-divider--horizontal {
      margin: 5px 0;
    }
  }
}

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
</style>
