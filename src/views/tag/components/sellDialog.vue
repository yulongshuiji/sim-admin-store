<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择类型">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.type == 1">
        <el-col :span="12">
          <el-form-item label="洗码卡" prop="username">
            <el-input v-model="form.username" placeholder="请输入洗码卡" />
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
                <span>
                  <span v-if="form.type == 2 && form.info.user_id > 0" style="margin-right: 20px;">用户：{{ form.info.username }}</span>
                  <span style="margin-right: 20px;">码种：{{ form.info.counter_name }}</span>
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
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { tagSell } from '@/api/tag'

export default {
  name: "TagList",
  data() {
    return {
      // 是否禁用读取
      disabledRead: false,
      // 表单
      form: {},
      // 表单验证规则
      rules: {
        type: [
          { required: true, message: "请选择类型" },
        ],
        username: [
          { required: true, message: "洗码卡不能为空" },
        ]
      },
      // 状态选项
      typeOptions: [
        {value: 1, label: "买码"},
        {value: 2, label: "退码"}
      ],
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
    this.reset()
    let that = this;
    that.$socket.on('read-tags-back', (data) => {
      that.form.tags = data.tags
      that.form.info = data.info
      that.readStatus = data.status
      that.readMsg = data.msg
    })
  },
  methods: {
    // 读取标签
    readTags(){
      if(this.form.type == undefined){
        this.msgError("清选择类型")
        return false
      }
      this.disabledRead= true;
      this.$socket.emit("read-tags-start", {service_id : this.serviceId, action: "common"});
    },
    // 表单重置
    reset() {
      this.form = {
        type: undefined,
        username: undefined,
        channel: 'admin',
        info: {},
        tags: []
      }
      this.resetForm('form')
    },
    // 发行
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          tagSell(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess('操作成功')
              this.$emit("doSuccess");
            }
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