<template>
  <div style="width: 680px" class="cash-container">

    <div class="cash-box" v-for="(item, index) in mergeList" :key="index">
      <img :src="item.icon" alt="" style="width: 74px;height: 74px">
      <div class="inner">{{ item.num }}</div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

import one from '@/assets/code/0.5.svg'
import two from '@/assets/code/1.svg'
import three from '@/assets/code/5.svg'
import four from '@/assets/code/10.svg'
import five from '@/assets/code/20.svg'
import six from '@/assets/code/25.svg'
import seven from '@/assets/code/50.svg'
import eight from '@/assets/code/100.svg'
import nine from '@/assets/code/500.svg'
import ten from '@/assets/code/1k.svg'
import eleven from '@/assets/code/5k.svg'
import twelve from '@/assets/code/10k.svg'
import thirtheen from '@/assets/code/20k.svg'
import fourteen from '@/assets/code/50k.svg'
import fifteen from '@/assets/code/100k.svg'
import sixteen from '@/assets/code/200k.svg'
export default {
  props: {
    lists: {
      type: Array
    }
  },
  data() {
    return {
      one,
      list: [
        {
          icon: one,
          value: '0.5'
        },
        {
          icon: two,
          value: '1'

        },
        {
          icon: three,
          value: '5'

        },
        {
          icon: four,
          value: '10'

        },
        {
          icon: five,
          value: '20'

        },
        {
          icon: six,
          value: '25'

        },
        {
          icon: seven,
          value: '50'

        },
        {
          icon: eight,
          value: '100'

        },
        {
          icon: nine,
          value: '500'

        },
        {
          icon: ten,
          value: '1000'
        },
        {
          icon: eleven,
          value: '5000'
        },
        {
          icon: twelve,
          value: '10000'

        },
        {
          icon: thirtheen,
          value: '20000'

        },
        {
          icon: fourteen,
          value: '50000'

        },
        {
          icon: fifteen,
          value: '100000'

        },
        {
          icon: sixteen,
          value: '200000'

        },

      ]
    }
  },
  computed: {

    mergeList() {
      return this.lists.map(item => {
        const icon = this.list.find(i => +i.value == parseFloat(+item.value)).icon
        return {
          ...item,
          icon
        }
      })

    }
  },
  methods: {
    change(i) {
      for (let index = 0; index < this.list.length; index++) {
        this.$set(this.list[index], 'choose', index === i);
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.cash-container {
  width: 680px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 10px;
}

.cash-box {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  background: $border1;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .inner {
    width: 100px;
    height: 22px;
    background: #232324;
    border: 1px solid #306FFF;
    color: rgba(255, 255, 255, 0.90);
    line-height: 22px;
    text-align: center;
    /* 14/CN-Medium */
    font-family: "PingFang SC";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    border-radius: 16px;
  }




}
</style>
