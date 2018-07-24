<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <div class="nav-header-container">
        <el-submenu index="000">
            <template slot="title">{{role}}</template>
            <el-menu-item index="000-1" @click="handleLogout">退出</el-menu-item>
        </el-submenu>
      </div>
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
      <!-- <sidebar-item :routes="routes"></sidebar-item> -->
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data () {
    return {
      role: null
    }
  },
  methods: {
    handleLogout () {
      this.$API.dropout()
        .then(() => {
          console.log(this.$router)
          this.$router.push({
            path: '/login'
          })
        })
    }
  },
  mounted () {
    this.$API.home()
      .then((res) => {
        this.role = res.data.roleType
      })
  }
}
</script>
<style lang="scss">
  .nav-header-container {
    color: white;
    font-size: 14px;
    padding-top: 115px;
    background-size: 81px 81px;
    background-repeat: no-repeat;
    background-position: center 30px;
    background-image: url('./images/qq-29.png');
    background-color: #293745;
    .el-submenu {
      text-align: center;
    }
    .el-submenu__title {
      display: inline-block;
      background: transparent !important;
      padding-right: 20px !important;
      .el-icon-arrow-down {
        color: white;
        right: 0;
      }
    }
  }
</style>