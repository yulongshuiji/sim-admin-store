<template>
  <div class="inside-reponsity">
    <BackHead @back="back" @goHome="goHome"></BackHead>
    <div class="cus-card content">
      <el-page-header class="el-h" :content="'创建入库清单'">
      </el-page-header>
      <div class="f-content-card card">
        <el-form ref="form" :model="form" label-width="80px" v-if="step == 0">
          <el-form-item label="入库时间">
            <el-input style="width: 680px;" v-model="form.region" placeholder="">
            </el-input>
          </el-form-item>
          <el-form-item required label="币种" class="radio">
            <el-radio-group v-model="form.currency_id">
              <el-radio v-for="item in currencyList" :key="item.currency_id" :label="item.currency_id">
                {{ item.currency_name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item required label="筹码类型" class="radio">
            <el-radio-group v-model="radio">
              <el-radio :label="3">现金码</el-radio>
              <el-radio :label="6">签单码</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item required label="面额选择">
            <CashList></CashList>
          </el-form-item>
          <div class="btn-area">
            <el-button type="info">取消</el-button>
            <el-button type="primary" @click="next">下一步</el-button>
          </div>
        </el-form>
        <CodeBase v-else-if="step == 1" @next="next" @pre="pre"></CodeBase>
        <recognition v-else-if="step == 2" @next="next"></recognition>
        <cusTip v-else :show="show" @closeModal="closeModal" @btnEvent="btnEvent"></cusTip>
      </div>
    </div>
    <error-tip v-if="errorCode"></error-tip>
  </div>
</template>

<script>
import CashList from './component/cashList.vue'
import CodeBase from './component/base.vue'
import recognition from './component/recognition.vue';
import cusTip from './component/modal.vue'
import ErrorTip from '@/components/error/index.vue'
import { currencyList } from '@/api/currency'

export default {
  components: {
    CashList,
    CodeBase,
    recognition,
    cusTip,
    ErrorTip
  },
  data() {
    return {
      form: {

      },
      step: 0,
      radio: '',
      show: false,
      errorCode: false,
      // 币种列表
      currencyList: [],
      // 码种列表
      counterList: [],
      // 码种面额设置列表
      counterChipList: [],
    }
  },
  methods: {
    // 读取标签
    readTags() {
      this.disabledRead = true;
      this.$socket.emit("read-tags-start", { service_id: this.serviceId, action: "tagAdd" });
    },
    back() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
    },
    closeModal() {
      this.show = false
    },
    next() {
      this.step += 1
      if (this.step == 3) {
        this.show = true
      }


    },
    pre() {
      this.step -= 1
    },
    btnEvent(e) {
      console.log(e);
      if (e == 0) {
        // 新建入库清单
        this.step = 0
      }
      if (e == 1) {
        // 继续入库
        this.step = 1
      }

      if (e == 2) {
        // 退出
        this.back()
      }
    },
      // 获取币种列表
      getCurrencyList() {
      currencyList().then(res => {
        this.currencyList = res.data
      })
    },
    // 获取游戏列表
    getCounterList(value) {
      this.form.counter_id = undefined
      counterList({currency_id: value}).then(res => {
        this.counterList = res.data
      })
    },
    // 获取码种详情
    getCounterDetail(value) {
      this.form.denomination = undefined
      counterDetail({counter_id: value}).then(res => {
        this.counterChipList = res.data.counter_chip
      })
    },
  },
  created() {
    this.serviceId = localStorage.getItem('serviceId')
    let that = this
    // 监听读取标签返回事件
    that.$socket.on('read-tags-back', (data) => {
      console.log("读取标签返回", data);
      // that.form.tags = data.tags
    })
    this.getCurrencyList()

    // this.readTags()
  }
}
</script>

<style lang="scss">
@import '../../common.scss';

.inside-reponsity {
  width: 100%;
  min-height: calc(100vh - 50px);
  padding: 10px 24px;
  display: flex;
  flex-direction: column;

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

  .content {
    margin-top: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .card {
      width: 1240px;
      height: 644px;
      flex-shrink: 0;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .btn-area {
        display: flex;
        justify-content: center;
      }
    }

    .radio {
      .el-form-item__label {
        line-height: 1;
      }
    }
  }

  .el-input__inner {
    border: none;
  }

}
</style>
