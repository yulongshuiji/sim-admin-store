<template>
  <div class="app-container">
    <div class="f-box">
      <div class="f-img" style="text-align: center; margin-bottom: 30px;" >
        <img :src="fgp" alt="">
      </div>
      <div class="f-text" style="text-align: center; margin-bottom: 30px;" >
        <span v-if="number > 0" style=" font-size: 18px;">您需要按 <span style="color: #ffba00; font-size: 24px;">{{ number }}</span> 次指纹</span>
        <span v-else style="color: #13ce66; font-size: 18px;">注册指纹成功，正在提交，请稍等...</span>
      </div>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { adminFingerprint } from '@/api/admin'
export default {
  name: "PermisssionFingerprint",
  props: {
    userData: {
      type: [Object],
    },
  },
  data () {
    return {
      fgp : require('@/assets/f-warning.png'),
      number: 3,
      serviceId: undefined
    }
  },
  created () {
    this.serviceId = localStorage.getItem('serviceId')
    let that = this
    // 启动指纹注册
    that.$socket.emit("fingerprint-register-start", {service_id:that.serviceId})
    // 监听指纹注册情况
    that.$socket.on('fingerprint-register-back', (data) => {
      that.number = data.enroll_idx;
      if(data.reg_done == 1){
        that.fgp = require('@/assets/f-success.png')
        adminFingerprint({id: that.userData.id, fingerprint_temp: data.fingerprint_temp}).then(res => {
          if(res.code == 200){
            that.$emit("doSuccess")
          } else {
            that.msgError(res.msg)
          }
        })
      }
    })
  },
  methods: {
    // 取消
    cancel(){
      this.$emit("doCancel")
    }
  }
}
</script>
