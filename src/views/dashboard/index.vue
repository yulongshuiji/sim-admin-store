<template>
  <div class="app-container">
    <div>首页
      {{ $t('route') }}
      <button @click="goAccountRoom">去大账房首页</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  methods: {
    goAccountRoom() {
        this.$router.push('/account-room')
    }
  }
}
</script>

<style scoped>

</style>
