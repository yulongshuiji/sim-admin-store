<template>
  <div class="header">
    <div class="common" @click="back">
      <img src="@/assets/acount-room/back.svg">
    </div>
    <div class="common" @click="goHome">
      <img src="@/assets/acount-room/index.svg">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$emit("back")
    },
    goHome() {
      this.$emit("goHome")
    }
  }
}
</script>

<style lang="scss">
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
}
</style>
