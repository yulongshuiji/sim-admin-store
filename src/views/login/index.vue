<template>
  <div class="login-container">
    <div class="title-container">
      <span class="title">{{ $t('login.title') }}</span>
      <span class="title-en">{{ $t('login.titleEn') }}</span>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
      label-position="left">
      <img src="../../assets/logo.svg" alt="">

      <el-form-item prop="username">
        <span class="svg-container">
          <img class="icon-a" src="../../assets/login/user.svg" alt="">
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
          tabindex="1" autocomplete="on" />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <img class="icon-a" src="../../assets/login/password.svg" alt="">

          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
            placeholder="Password" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock"
            @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
<!--
      <el-form-item>
        <div class="identity-box">
          <div class="i-b-top">
            <img src="../../assets/login/card.svg" alt="">
            <span>请选择当前身份</span>
          </div>
          <div>
            <el-radio-group v-model="radio">
              <el-radio v-for="item in identityList" :key="item.key" :label="item.key">{{ item.text }}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-form-item> -->
      <div class="btn-area">
        <el-button :loading="loading" type="primary" class="login-btn" style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin">Login</el-button>
      </div>

    </el-form>



  </div>
</template>

<script>
import { serviceList } from '@/api/service'
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin-store2',
        password: '123456'
      },

      loginRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      // 服务点绑定
      serviceList: [],
      serviceId: undefined,
      notBind: true,
      radio: 1,
      identityList: [
        {
          text: '配置中心',
          key: 1,
        },
        {
          text: '大账房',
          key: 2,
        },
        {
          text: '现场',
          key: 3,
        },
        {
          text: '财务',
          key: 4,
        },
        {
          text: '监控',
          key: 5,
        },
        {
          text: '外联',
          key: 6,
        },
        {
          text: '总经办',
          key: 7,
        }
      ]
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  created() {
    // this.serviceId = localStorage.getItem('serviceId');
    // if (this.serviceId && this.serviceId > 0) {
    //   this.notBind = false
    // } else {
    //   this.notBind = true
    // }
    // this.getServiceList()
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
  },
  methods: {
    getServiceList() {
      serviceList().then(res => {
        this.serviceList = res.data
      })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handleRadioChanges(value) {
      this.serviceId = value.service_id
    },
    submitBind() {
      if (this.serviceId == undefined) {
        this.msgError('请选择要绑定的服务点')
        return false
      }
      this.$socket.emit('join-room', { service_id: this.serviceId, source: "admin" })
      localStorage.setItem('serviceId', this.serviceId)
      this.notBind = false
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;

    .el-form-item__content {
      display: flex;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $pageBg;
  overflow: hidden;
  background-image: url('../../assets/login.svg');
  display: flex;
  align-items: center;
  flex-direction: column;

  .login-form {
    position: relative;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    border: 1px solid $border1;
    background: $pageBg2 !important;
    width: 608px;
    flex-shrink: 0;
    padding: 12px 88px 24px 88px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    width: 30px;
    display: flex;
    align-items: center;
    padding-left: 12px;
  }

  .title-container {
    position: relative;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    .title {
      color: $light_gray;
      margin: 0px auto 16px auto;
      text-align: center;
      font-weight: bold;
      font-family: YouSheBiaoTiHei;
      font-size: 56px;
      line-height: 64px;
      /* 114.286% */
    }

    .title-en {
      color: rgba(255, 255, 255, 0.70);
      font-family: "PingFang SC";
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      margin-bottom: 24px;
      /* 140% */
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

.btn-area {
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.login-btn {

  display: inline-flex;
  padding: 9px 106px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #409EFF;
  width: fit-content !important;
  margin: 0 auto;
}

.identity-box {
  display: flex;
  width: 432px;
  flex-shrink: 0;
  border-radius: 8px;
  flex-direction: column;
  padding: 0 12px 12px 12px;

  .el-radio-group {
    flex-wrap: wrap;
    gap: 10px;
  }

  .el-radio {
    width: 17%;
    margin-right: 0;
  }

  .i-b-top {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}

.icon-a {
  width: 24px;
  height: 24px;
}
</style>
