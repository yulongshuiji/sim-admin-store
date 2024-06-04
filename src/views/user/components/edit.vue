<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="洗码卡号" prop="username" class="table-el-form-item">
            <el-input :disabled="addEdit == 2" v-model="form.username" maxlength="18" placeholder="请输入洗码卡号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="nickname" class="table-el-form-item">
            <el-input v-model="form.nickname" maxlength="18" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="addEdit == 1">
        <el-col :span="12">
          <el-form-item  label="密码" prop="password" class="table-el-form-item">
            <el-input type="password" maxlength="12" autocomplete="new-password" v-model="form.password" placeholder="请输入密码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="确认密码" prop="confirm_password" class="table-el-form-item">
            <el-input type="password" maxlength="12" autocomplete="new-password" v-model="form.confirm_password" placeholder="请输入确认密码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" class="table-el-form-item">
            <el-radio-group v-model="form.sex">
              <el-radio v-for="item in sexOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status" class="table-el-form-item">
            <el-radio-group v-model="form.status">
              <el-radio v-for="item in statusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户类型" prop="user_type" class="table-el-form-item">
            <el-select v-model="form.user_type" placeholder="请选择" :disabled="addEdit == 2">
              <el-option v-for="item in userTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="(addEdit == 1 && form.user_type == 2) || (addEdit == 2 && form.user_type == 2 && form.parent_id > 0)">
        <el-col :span="12">
          <el-form-item label="上级代理" prop="user_type" class="table-el-form-item">
            <el-select v-model="form.parent_id" placeholder="请选择" :disabled="addEdit == 2">
              <el-option v-for="item in agentList" :key="item.user_id" :label="item.username" :value="item.user_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.user_type == 1">
        <el-col :span="12">
          <el-form-item label="占股比例" prop="share_rate" class="table-el-form-item">
            <el-input-number :precision='2' v-model="form.share_rate" :min="0" :max="100" label="占股比例"></el-input-number> %
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="占股分担码费" prop="wash_share" class="table-el-form-item">
            <el-radio-group v-model="form.wash_share">
              <el-radio v-for="item in washShareOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" v-if="form.user_type == 1 || (form.user_type == 2 && (form.parent_id == undefined || form.parent_id == 0))">
          <el-form-item label="洗码方式" prop="wash_type" class="table-el-form-item">
            <el-radio-group v-model="form.wash_type">
              <el-radio v-for="item in washTypeOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="洗码率" prop="wash_rate" class="table-el-form-item">
            <el-input-number :precision='2' v-model="form.wash_rate" :min="0" :max="100" label="洗码率"></el-input-number> %
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input maxlength="30" v-model="form.phone" placeholder="请输入联系电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark" class="table-el-form-item">
            <el-input v-model="form.remark" maxlength="30" rows="3" show-word-limit resize="none" type="textarea" placeholder="请输入备注"></el-input>
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
import { userDetail, userAdd, userUpdate, agentList } from '@/api/account'
export default {
  name: "UserEdit",
  props: {
    userId: {
      type: [Number]
    },
    addEdit: {
      type: [Number]
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      // 表单
      form: {},
      // 用户类型字典
      userTypeOptions: [
        {value: 1, label: "代理"},
        {value: 2, label: "会员"}
      ],
      // 状态字典
      statusOptions: [
        {value: 1, label: "正常"},
        {value: 0, label: "停用"}
      ],
      // 性别字典
      sexOptions: [
        {value: 1, label: "男"},
        {value: 2, label: "女"}
      ],
      // 分担码费字典
      washShareOptions: [
        {value: 0, label: "不分担"},
        {value: 1, label: "按占股比例分担"}
      ],
      // 洗码类型选项
      washTypeOptions: [
        {value: 1, label: "单边洗码"},
        {value: 2, label: "双边洗码"}
      ],
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "请选择币种" },
        ],
        nickname: [
          { required: true, message: "请选择码种" },
        ],
        password: [
          { required: true, message: "请输入密码" },
          { min: 6, max: 12, message: "密码长度为6~12位字符"}
        ],
        confirm_password: [
          { required: true, message: "请输入确认密码" },
          { validator: validatePass, trigger: 'blur', required: true }
        ],
      },
      // 代理列表
      agentList: []
    }
  },
  created () {
    this.reset();
    this.getAgentList()
    if(this.userId > 0){
     this.getDetail(this.userId); 
    }
  },
  methods: {
    // 代理列表
    getAgentList() {
      agentList().then(res => {
        this.agentList = res.data
      })
    },
    // 获取详情
    getDetail(userId){
      userDetail({user_id: userId}).then(res => {
        this.form = {
          user_id: res.data.user_id,
          username: res.data.username,
          nickname: res.data.nickname,
          password: undefined,
          sex: res.data.sex,
          status: res.data.status,
          wash_type: res.data.wash_type,
          parent_id: res.data.parent_id,
          user_type: res.data.user_type,
          wash_share: res.data.wash_share,
          wash_rate: res.data.wash_rate,
          share_rate: res.data.share_rate,
          phone: res.data.phone,
          remark: res.data.remark
        }
      })
    },
    // 表单重置
    reset() {
      this.form = {
        user_id: undefined,
        username: undefined,
        nickname: undefined,
        password: undefined,
        sex: 1,
        status: 1,
        wash_type: 1,
        parent_id: undefined,
        user_type: undefined,
        wash_share: 0,
        wash_rate: 0,
        share_rate: 0,
        phone: undefined,
        remark: undefined
      }
      this.resetForm('form')
    },
    // 提交
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.addEdit == 2) {
            userUpdate(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('编辑成功')
                this.$emit("doSuccess");
              }
            })
          } else {
            userAdd(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.$emit("doSuccess");
              }
            })
          }
        }
      })
    },
    // 取消
    cancel(){
      this.$emit("doCancel");
    }
  }
}
</script>
