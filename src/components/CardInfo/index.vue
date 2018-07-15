<template>
  <!-- 个人信息 -->
  <el-card class="box-card detail-card detail-card--userinfo">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="triggerUpdateInfo">
        <div class="icon"></div>
      </el-button>
    </div>
    <div class="detail-card__body detail-card__body--userinfo">
      <p><i class="qq qq-23"></i>{{ employeeDetail.mobile }}</p>
      <p><i class="qq qq-24"></i>{{ employeeDetail.birthDate }}</p>
      <p><i class="qq qq-25"></i>{{ employeeDetail.address }}</p>
      <p><i class="qq qq-26"></i>{{ employeeDetail.email }}</p>
      <p><i class="qq qq-27"></i>{{ employeeDetail.qq }}</p>
      <p><i class="qq qq-28"></i>{{ employeeDetail.idNumber }}</p>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      employeeDetail: Object
    },

    methods: {
      triggerUpdateInfo() {
        this.$emit('updateUserInfoDetail', {})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-card--userinfo {
    padding-bottom: 0;
  }
</style>