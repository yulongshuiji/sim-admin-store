<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import store from './store'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  created() {
    this.initSocket()
  },
  methods: {
    initSocket() {
      let serviceId = localStorage.getItem("serviceId")
      if(serviceId){
        this.$socket.emit('join-room', {service_id: serviceId, source:"admin"})
      }
      
      // 监听房间加入
      this.$socket.on('join-room-back', (data) => {
        if(data.code == 200){
          // 关闭注册
          this.$socket.emit("fingerprint-register-stop", {service_id:serviceId})
          // 关闭标签读取
          this.$socket.emit("read-tags-stop", {service_id : serviceId})
        }
      })
      // 监听重复登录
      this.$socket.on('leave-room', (data) => {
        localStorage.removeItem("serviceId")
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
  }
}
</script>
