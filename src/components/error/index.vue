<template>
  <div class="error-con">
    <div class="error">
      <img src="@/assets/acount-room/responsity/error.svg" alt="">
      <span>异常筹码</span>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss">
.error-con {
  position: fixed;
  inset: 0;

  .error {
    display: inline-flex;
    padding: 8px 16px;
    align-items: center;
    width: 369px;
    height: 212px;
    border-radius: 4px;
    background: #F54E4E;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.72);
    color: #FFF;
    font-family: "PingFang SC";
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    flex-direction: column;
    gap: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
