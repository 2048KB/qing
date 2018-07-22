<template>
  <div>
    <div class="dashboard-container">
      <div class="infowrap">
        <div class="infowrap__header">个人信息</div>
        <div class="infowrap__body">
          <p >您好，{{ user.name }}</p>
          <p>所属角色：{{ user.roleType }}</p>
          <p>上次登录时间：{{ user.lastLoginTime }}</p>
          <p>上次登录IP：{{ user.lastLoginIp }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.$API.home({
      type: 'GET',
      data: {}
    }).then((res) => {
      this.user = res.data
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main-container {
  height: 100%;
}

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

.dashboard-container {
  width: 100%;
  margin: 0;
  /*background: url(../../assets/images/qq-46.jpg) no-repeat;*/
  /*background-size: cover;*/
  /*background-position: top left;*/
  /*height: 600px;*/
  height: 100%;
  position: relative;
}

.dashboard-container .infowrap {
  box-shadow: 0 2px 4px rgba(2, 194, 251, .35);
  width: 500px;
  background: #fff;
  font-size: 18px;
  margin: 0 auto;
  /*position: absolute;*/
  /*top: 80%;*/
  /*left: 50%;*/
  /*transform: translate(-50%, -80%);*/
  margin-top: 200px;
}

.dashboard-container .infowrap__header {
  font-weight: bold;
  font-size: 20px;
  padding: 20px;
  color: #02c2d7;
  text-align: center;
  border-bottom: 1px solid #02c2d7;
}

.dashboard-container .infowrap__body {
  padding: 40px 50px;
}
</style>
