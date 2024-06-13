<template>
  <div class="inside-reponsity">
    <BackHead @back="back" @goHome="goHome"></BackHead>
    <div class="cus-card content">
      <el-page-header class="el-h" :content="'创建入库清单'">
      </el-page-header>
      <div class="f-content-card card">
        <el-form ref="form" :model="form" label-width="80px" v-if="step == 0">
          <el-form-item label="入库时间" prop="currentTime">
            <el-input style="width: 680px;" disabled v-model="form.currentTime" placeholder="">
            </el-input>
          </el-form-item>
          <el-form-item required label="币种" class="radio" prop="currency_id"
            v-if="currencyList && currencyList.length !== 0">
            <el-radio-group v-model="form.currency_id" @change="radioChange">
              <el-radio v-for="item in currencyList" :key="item.currency_id" :label="item.currency_id">
                {{ item.currency_name }}
              </el-radio>
            </el-radio-group>

          </el-form-item>

          <el-form-item required label="筹码类型" class="radio" prop="counter_id"
            v-if="counterList && counterList.length !== 0">
            <el-radio-group v-model="form.counter_id">
              <el-radio v-for="item in counterList" :key="item.counter_id" :label="item.counter_id">
                {{ item.counter_name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item required label="面额选择" prop="denomination">
            <CashList @numEvent="numEvent"></CashList>
          </el-form-item>
          <div class="btn-area">
            <el-button type="info">取消</el-button>
            <el-button type="primary" @click="canNext">下一步</el-button>
          </div>
        </el-form>
        <CodeBase v-else-if="step == 1" :reading="isReading" :codeNum="codeNum" @next="next" @pre="pre"></CodeBase>
        <recognition v-else-if="step == 2" @next="recognitionNext"></recognition>
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
import { counterList, counterDetail } from '@/api/counter'
import { getCurrentFormattedTime } from '@/utils/tool'
import { codeInResposity } from '@/api/code'
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
        currentTime: '',
        currency_id: '',
        counter_id: '',
        denomination: '',
        tags: []
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
      currentTime: '',
      isReading: false,
      codeNum: 0,

    }
  },
  computed: {
    selectCurencyList() {
      const res = this.currencyList.filter(item => item.currency_id == this.form.currency_id)
      this.$store.dispatch('code/setCurrntList', res)
      return this.currencyList.filter(item => item.currency_id == this.form.currency_id)
    },
    selectCounterList() {
      const res = this.counterList.filter(item => item.counter_id == this.form.counter_id)
      this.$store.dispatch('code/setCounterList', res)
      return this.counterList.filter(item => item.counter_id == this.form.counter_id)
    },
    selectTime() {
      const res = this.form.currentTime.slice(0, 10)
      this.$store.dispatch('code/setCurrentTime', res)
      return this.form.currentTime.slice(0, 10)
    },
  },
  watch: {
  selectCurencyList(newVal) {
    this.$store.dispatch('code/setCurrntList', newVal);
  },
  selectCounterList(newVal) {
    this.$store.dispatch('code/setCounterList', newVal);
  },
  selectTime(newVal) {
    this.$store.dispatch('code/setCurrentTime', newVal);
  },
  codeNum(newVal) {
    this.$store.dispatch('code/setCodeNum', newVal);

  }
},
  methods: {
    // 读取标签
    readTags() {
      this.$socket.emit("read-tags-start", { service_id: this.serviceId, action: "tagAdd" });
    },
    closeTags() {
      this.$socket.emit("read-tags-stop", { service_id: this.serviceId });
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
    canNext() {
      this.$refs.form.validate(res => {
        if (res) {
          this.next()
          this.readTags()
          this.$store.dispatch('code/setCodeDes', this.form.denomination)

        }
      })
    },
    next() {
      this.step += 1
      if (this.step == 3) {
        this.show = true
      }

      if(this.step !== 1) {
        this.closeTags()
      }
    },
    radioChange(e) {
      this.getCounterList(e)
    },
    pre() {
      this.step -= 1
    },
    btnEvent(e) {
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
        this.form = {
          ...this.form,
          currency_id: this.currencyList[0].currency_id
        }
        this.getCounterList(this.form.currency_id)

      })
    },
    // 获取游戏列表
    getCounterList(value) {
      this.form.counter_id = undefined
      counterList({ currency_id: value }).then(res => {
        this.counterList = res.data ? res.data : []
        const defaults = this.counterList.length > 0 ? this.counterList[0].counter_id : ''
        this.form = {
          ...this.form,
          counter_id: defaults
        }
        // this.getCounterDetail(this.form.counter_id)
        // console.log(this.form);
      })
    },
    // 获取码种详情
    getCounterDetail(value) {
      this.form.denomination = undefined
      counterDetail({ counter_id: value }).then(res => {
        this.counterChipList = res.data.counter_chip
      })
    },
    numEvent(e) {
      this.form.denomination = e
    },
    arraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }

      // Compare each element
      const sortedArr1 = [...arr1].sort();
      const sortedArr2 = [...arr2].sort();

      for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
          return false;
        }
      }

      return true;
    },
    async recognitionNext() {
      const params = {
        currency_id: this.form.currency_id,
        counter_id: this.form.counter_id,
        denomination: Number(this.form.denomination),
        tags: this.form.tags
      }

      const res = await codeInResposity(params)
      if(res.code == 200) {
        this.next()
      }else {
        this.step = 1
      }
    }
  },
  created() {
    this.$InitSocket()
    this.serviceId = localStorage.getItem('serviceId')
    let that = this
    // 监听读取标签返回事件
    that.$socket.on('read-tags-back', (data) => {
      const isEqual = this.arraysEqual(that.form.tags, data.tags)
      that.codeNum = data.tags.length
      if (!isEqual) {
        that.isReading = true
      } else {
        that.isReading = false

      }
      that.form.tags = data.tags

    })

    // this.readTags()
  },
  mounted() {
    this.getCurrencyList()
    this.form.currentTime = getCurrentFormattedTime()
  },
  destroyed() {
    this.closeTags()
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
