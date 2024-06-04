<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <div style="margin-bottom: 20px;">
        <el-button :disabled="disabledRead" type="success" @click="readTags" style="margin-right: 20px;">读取标签</el-button>
        <span v-if="listData.length > 0" style="margin-right: 20px;">标签总数：{{ listData.length }} 个</span>
        <span v-if="listData.length > 0">总面额：{{ numberWithCommas(totalDenomination) }}</span>
      </div>
      <el-table v-if="listData.length > 0" :data="listData" border max-height="300">
        <el-table-column label="UID" align="center" prop="uid" width="160" />
        <el-table-column label="币种" align="center" prop="currency_name" width="120" />
        <el-table-column label="码种" align="center" prop="counter_name" width="160" />
        <el-table-column label="面额" align="center">
          <template slot-scope="scope">
            <span>{{ numberWithCommas(scope.row.denomination) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拥有者" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.user_id > 0">{{ scope.row.username }}</el-tag>
            <el-tag type="warning" v-if="scope.row.table_id > 0">{{ scope.row.has_one_table.table_name }}</el-tag>
            <el-tag type="info" v-if="scope.row.table_id == 0 && scope.row.user_id == 0">码房</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发行时间" align="center" prop="created_at" />
      </el-table>
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-form-item label="操作" prop="type">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.type == 3">
        <el-col :span="12">
          <el-form-item label="桌子" prop="table_id">
            <el-select v-model="form.table_id" placeholder="请选择">
              <el-option v-for="item in tableList" :key="item.table_id" :label="item.table_name" :value="item.table_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.type == 4">
        <el-col :span="12">
          <el-form-item label="洗码卡" prop="username">
            <el-input v-model="form.username" placeholder="请输入洗码卡" />
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
import { tagParse } from '@/api/tag'
import { tableList } from '@/api/table'

export default {
  name: "TagParse",
  data() {
    return {
      // 是否禁用读取
      disabledRead: false,
      // 表单
      form: {},
      // 桌子列表
      tableList: [],
      // 表单验证规则
      rules: {
        type: [
          { required: true, message: "请选择操作" },
        ],
        talbe_id: [
          { required: true, message: "请选择码种" },
        ],
        username: [
          { required: true, message: "洗码卡不能为空" },
        ]
      },
      // 信息
      listData: [],
      // 类型选项
      typeOptions : [
        {value: 1, label: "销毁"},
        {value: 2, label: "分配到码房"},
        {value: 3, label: "分配到桌子"},
        {value: 4, label: "分配到用户"}
      ],
      // 总面额
      totalDenomination: 0,
      // 限制提交
      isPost: false,
      // 服务点ID
      serviceId: undefined
    }
  },
  created() {
    this.serviceId = localStorage.getItem('serviceId')
    this.reset()
    this.getTableList()
    let that = this
    that.$socket.on('read-tags-back', (data) => {
      console.log(data)
      that.listData = data.info.list
      that.totalDenomination = data.info.total_denomination
      that.form.tags = data.tags
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
      this.$socket.emit("read-tags-start", {service_id : this.serviceId, action: "parse"});
    },
    // 表单重置
    reset() {
      this.form = {
        type: undefined,
        tags: [],
        username: undefined,
        table_id: undefined,
      }
      this.resetForm('form')
    },
    // 提交
    submitForm() {
      let that = this;
      that.$refs['form'].validate(valid => {
        if (valid) {
          that.$confirm('是否确认销毁?操作后不能恢复！', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            closeOnPressEscape: false,
            type: "warning"
          }).then(function() {
            if(that.isPost){
              return false;
            }
            that.isPost = true;
            tagParse(that.form).then(response => {
              if (response.code === 200) {
                that.$socket.emit("read-tags-stop", {service_id : that.serviceId})
                that.msgSuccess('操作成功')
                that.$emit("doSuccessParse");
              } else {
                that.msgError(response.msg);
              }
              that.isPost = false;
            }).catch(function() {
              that.isPost = false;
            })
          }).catch(function() {
            that.isPost = false;
          });
        }
      })
    },
    // 取消
    cancel(){
      this.$emit("doCancelParse")
    }
  }
}
</script>