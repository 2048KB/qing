<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div> -->
    <!-- <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <p >您好，{{ username }}</p>
    <p>所属角色：{{ role }}</p>
    <p>上次登录时间：{{ lastLogin }}</p>
    <p>上次登录IP：{{ lastIP }}</p>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data() {
    return {
      username: 'admin',
      role: '123',
      lastLogin: '2018-04-11 15:50:00',
      lastIP: '119.163.107.106',
      tableData3: [{
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'
      }, {
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'      },
        {
          date: '2018-05-30 10:00:00',
          name: '王小虎',
          yqphone: '18676545234',
          yqname: '贵州茅台',
          vipphone: '12876534567',
          cashtype: '一级奖',
          cashsum: '660.32'
      }, {
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'
      }, {
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'
      }, {
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'
      }, {
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    console.log(this.$API)

    this.$API.addstore({
      data: {
        admin: 1,
        pwd: 2
      }
    }).then((res) => {
      console.log('====== API RESPONSE ======')
      console.log(res)
      console.log('====== END API RESPONSE ======')
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.grid-content {
  padding: 10px;
}

.detail-card {
  margin-bottom: 30px;
}

.el-card__header {
  background: red !important;
}
</style>
