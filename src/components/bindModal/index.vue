<template>
  <!-- 添加修改用户对话框 -->
  <el-dialog :show-close="false" title="绑定服务点" :visible.sync="showService" width="50%" :close-on-click-modal="false"
    append-to-body>
    <el-radio-group v-model="serviceId">
      <el-radio v-for="item in serveiceList" :key="item.service_id" :label="item.service_id"
        @change="handleRadioChanges(item)">{{ item.service_name }}</el-radio>
    </el-radio-group>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitBind">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { serviceBind } from '@/api/user'
export default {
  data() {
    return {
      serviceId: 0
    }
  },
  computed: {
    ...mapGetters([
      'showService',
      'serveiceList'
    ])
  },
  methods: {
    handleRadioChanges(value) {
      this.serviceId = value.service_id
    },
    async submitBind() {
      if (this.serviceId == undefined) {
        this.msgError('请选择要绑定的服务点')
        return false
      }
      localStorage.setItem('serviceId', this.serviceId)
      const res = await serviceBind({
        service_id: this.serviceId
      })
      console.log("绑定成功", res);
      if (res.code !== 200) return
      this.$InitSocket()
      this.$store.dispatch('settings/changeService', false)
    }
  }
}
</script>

<style></style>
