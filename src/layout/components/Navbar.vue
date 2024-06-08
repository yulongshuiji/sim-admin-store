<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <div class="logo-area">
      <img src="../../assets/acount-room/LOGO.svg" alt="">
      <span>{{ $t('appName') }}</span>
    </div>
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->



        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      </template>
      <div class="common" @click="logout">
        <img src="../../assets/acount-room/logout.svg">
      </div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="common">
          <img src="../../assets/acount-room/switchL.svg">
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout" v-for="(item,i) in langOptions" :key="i">
            <span style="display:block;">{{ item.label }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="common2" @click.native="logout">
        <img src="../../assets/acount-room/avatar.svg">
        <span>rcho</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

export default {
  data() {
    return {
      langOptions: [
        { label: "中文", value: 2 },
        { label: "English", value: 3 },
      ]
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  position: relative;
  background: #070000;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;

  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    // line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    height: 100%;
    display: flex;
    gap: 12px;
    margin-right: 24px;
    align-items: center;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.common {
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 36px;
  background: #2A2631;

  img {
    width: 16px;
    height: 16px;
  }
}

.common2 {
  min-width: 93px;
  height: 40px;
  flex-shrink: 0;
  background: #2A2631;
  border-radius: 36px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  span {
    color: #FFF;
    text-overflow: ellipsis;
    font-family: "PingFang SC";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    margin-right: 12px;
    width: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.logo-area {
  color: #FFF;
  font-family: "PingFang SC";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding-left: 24px;
  gap: 10px;
}
</style>
