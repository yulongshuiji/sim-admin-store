<template>
  <div style="width: 680px" class="cash-container">
    <div class="cash-box" v-for="(item, index) in list" :key="index" @click="change(index)">
      <img :src="item.icon" alt="" style="width: 74px;height: 74px">
      <span class="inner" :class="{ 'checked': item.choose }"></span>
    </div>
  </div>

</template>

<script>
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
  data() {
    return {
      list: [
        {
          icon: one,
        },
        {
          icon: two,
        },
        {
          icon: three,
        },
        {
          icon: four,
        },
        {
          icon: five,
        },
        {
          icon: six,
        },
        {
          icon: seven,
        },
        {
          icon: eight,
        },
        {
          icon: nine,
        },
        {
          icon: ten,
        },
        {
          icon: eleven,
        },
        {
          icon: twelve,
        },
        {
          icon: thirtheen,
        },
        {
          icon: fourteen,
        },
        {
          icon: fifteen,
        },
        {
          icon: sixteen,
        },

      ]
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

<style lang="scss">
.cash-container {
  width: 680px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
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
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;

    &::after {
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #fff;
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform .15s ease-in;
    }
  }

  .checked {
    border-color: #409eff;
    background: #409eff;

    &::after {
      transform: translate(-50%, -50%) scale(1);
    }
  }


}
</style>
