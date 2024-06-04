<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="币种" prop="currency_id">
            <el-select v-model="form.currency_id" placeholder="请选择币种" @change="getCounterList">
              <el-option v-for="item in currencyList" :key="item.currency_id" :label="item.currency_name" :value="item.currency_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" v-if="form.currency_id > 0">
          <el-form-item label="码种" prop="counter_id">
            <el-select v-model="form.counter_id" placeholder="请选择码种" @change="getCounterDetail">
              <el-option v-for="item in counterList" :key="item.counter_id" :label="item.counter_name" :value="item.counter_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" v-if="form.counter_id > 0">
          <el-form-item label="面额" prop="denomination">
            <el-select v-model="form.denomination" placeholder="请选择面额">
              <el-option v-for="item in counterChipList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.denomination != undefined">
        <el-col :span="24">
          <el-form-item>
            <el-button :disabled="disabledRead" type="success" @click="readTags" style="margin-right: 20px;">读取标签</el-button><span v-if="form.tags.length > 0">标签总数：{{ form.tags.length }} 个</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-tag type="info" size="mini" v-for="item in form.tags" :key="item" style="margin-right: 15px;">{{ item }}</el-tag>
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
import { tagAdd } from '@/api/tag'
import { currencyList } from '@/api/currency'
import { counterList, counterDetail } from '@/api/counter'

export default {
  name: "TagList",
  data() {
    return {
      // 是否禁用读取
      disabledRead: false,
      // 币种列表
      currencyList: [],
      // 码种列表
      counterList: [],
      // 码种面额设置列表
      counterChipList: [],
      // 表单
      form: {},
      // 表单验证规则
      rules: {
        currency_id: [
          { required: true, message: "请选择币种" },
        ],
        counter_id: [
          { required: true, message: "请选择码种" },
        ],
        denomination: [
          { required: true, message: "请选择面额" },
        ]
      },
      // 服务点ID
      serviceId: undefined
    }
  },
  created() {
    this.serviceId = localStorage.getItem('serviceId')
    this.getCurrencyList()
    this.reset()
    let that = this
    // 监听读取标签返回事件
    that.$socket.on('read-tags-back', (data) => {
      that.form.tags = data.tags
    })
  },
  methods: {
    // 获取币种列表
    getCurrencyList() {
      currencyList().then(res => {
        this.currencyList = res.data
      })
    },
    // 获取游戏列表
    getCounterList(value) {
      this.form.counter_id = undefined
      counterList({currency_id: value}).then(res => {
        this.counterList = res.data
      })
    },
    // 获取码种详情
    getCounterDetail(value) {
      this.form.denomination = undefined
      counterDetail({counter_id: value}).then(res => {
        this.counterChipList = res.data.counter_chip
      })
    },
    // 读取标签
    readTags(){
      this.disabledRead= true;
      this.$socket.emit("read-tags-start", {service_id : this.serviceId, action: "tagAdd"});
    },
    // 表单重置
    reset() {
      this.form = {
        currency_id: undefined,
        counter_id: undefined,
        denomination: undefined,
        tags: []
      }
      this.resetForm('form')
    },
    // 发行
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          tagAdd(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess('发行成功')
              this.$emit("doSuccess");
            } else {
              this.msgError(err.msg)
            }
          }).catch(err => {
            this.msgError(err)
          })
        }
      })
    },
    // 取消
    cancel(){
      this.$emit("doCancel")
    },
  }
}
</script>