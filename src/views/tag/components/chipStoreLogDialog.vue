<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="桌子" prop="table_id">
            <el-select v-model="form.table_id" placeholder="请选择桌子">
              <el-option v-for="item in tableList" :key="item.table_id" :label="item.table_name" :value="item.table_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item style="margin-bottom: 10px;">
            <el-button :disabled="disabledRead" type="success" @click="readTags" style="margin-right: 20px;">读取标签</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <div v-if="readStatus != undefined && readStatus == true">
              <div>
                <span style="margin-right: 20px;">{{ form.info.counter_name }}</span>
                <span>
                  <span>总面额：<span  style="color: #67c23a; margin-right: 20px;">{{ form.info.total_denomination }}</span></span> 
                  <span>总个数：<span  style="color: #67c23a;">{{ form.info.total_count }}</span></span>
                </span>
              </div>
              <el-tag type="info" v-for="(value,key) in form.info.detail" :key="key" style="margin-right: 10px;">{{ key }} <span style="color: #67c23a;">({{ value }})</span></el-tag>
            </div>
            <div v-if="readStatus != undefined && readStatus == false">
              <span style="color: #F56C6C;">{{ readMsg }}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right;">
      <el-button type="primary" @click="submitForm" :disabled="isPost">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { chipStoreLogAdd } from '@/api/chipStoreLog'
import { tableList } from '@/api/table'

export default {
  name: "TagList",
  props: {
    type: {
      type: [Number]
    }
  },
  data() {
    return {
      // 是否禁用读取
      disabledRead: false,
      // 桌子列表
      tableList: [],
      // 表单
      form: {},
      // 表单验证规则
      rules: {
        table_id: [
          { required: true, message: "请选择桌子" },
        ]
      },
      // 限制重复提交
      isPost: false,
      // 读取标签状态
      readStatus: undefined,
      // 读取标签提示
      readMsg: "",
      // 服务点ID
      serviceId: undefined
    }
  },
  created() {
    this.serviceId = localStorage.getItem('serviceId')
    this.getTableList()
    this.reset()
    let that = this;
    // 监听读取标签返回事件
    that.$socket.on('read-tags-back', (data) => {
      that.form.tags = data.tags
      that.form.info = data.info
      that.readStatus = data.status
      that.readMsg = data.msg
    })
  },
  methods: {
    // 获取桌子列表
    getTableList() {
      tableList().then(res => {
        this.tableList = res.data
      })
    },
    // 读取标签
    readTags(){
      this.disabledRead= true;
      this.$socket.emit("read-tags-start", {service_id : this.serviceId, action: "common"});
    },
    // 表单重置
    reset() {
      this.form = {
        table_id: undefined,
        type: this.type,
        tags: [],
        info: []
      }
      this.resetForm('form')
    },
    // 发行
    submitForm() {
      let that = this;
      if(that.isPost){
        return false;
      }
      that.isPost == true;
      that.$refs['form'].validate(valid => {
        if (valid) {
          chipStoreLogAdd(that.form).then(response => {
            if (response.code === 200) {
              that.isPost = false
              that.msgSuccess('操作成功')
              that.$emit("doSuccess")
            }
          }).catch(err => {
            that.isPost = false
          })
        }
      })
    },
    // 取消
    cancel(){
      this.$emit("doCancel")
    }
  }
}
</script>
