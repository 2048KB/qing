<template>
  <!-- 职业信息 -->
  <el-card class="box-card detail-card detail-card--user">
    <div slot="header" class="clearfix">
      <span><slot>职业信息</slot></span>
      <el-button style="float: right; padding: 3px 0" type="text" v-show="!hideEdit">
        <div class="icon" @click="triggerUpdateInfoForm"></div>
      </el-button>
    </div>

    <div class="detail-card--body detail-card__body--user">
      <el-row>
        <el-col :span="5">
          <div class="th">
            <div class="img"><img src="../../assets/images/qq-18.png" alt=""></div>
            <el-button type="primary" v-show="!isVip">更换头像</el-button>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="meta">
            <p class="name">
              {{ employeeDetail.realityName || employeeDetail.nickName }}

              <span v-if="employeeDetail.isActive">
                <span class="state">已激活</span>
                <span class="validtime">有效期至{{ employeeDetail.expireTime }}</span>
              </span>
            </p>
            <p><i class="qq qq-19"></i>{{ employeeDetail.sno || employeeDetail.mobile }}</p>
            <p><i class="qq qq-20"></i>{{ employeeDetail.entryDate || employeeDetail.time }}</p>
            <p><i class="qq qq-21" v-show="employeeDetail.remark"></i>{{ employeeDetail.remark }}</p>
            <div>
              <el-button type="success" plain v-show="employeeDetail.storeId">{{ employeeDetail.storeId }}</el-button>
              <el-button type="success" plain v-show="employeeDetail.storeName">{{ employeeDetail.storeName }}</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      employeeDetail: Object,
      isCustom: {
        Type: Boolean,
        default: false
      },
      isVip: {
        Type: Boolean,
        default: false
      },
      hideEdit: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      triggerUpdateInfoForm() {
        this.$emit('updateUserInfo', {})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-card__body--user {

    .meta .name .state {
      margin-left: 20px;
      font-size: 12px;
      color: #fff;
      background: #34c4d4;
      padding: 3px 8px;
      border-radius: 4px;
    }

    .meta .name .validtime {
      color: #676a6c;
      font-size: 12px;
      font-weight: normal;
    }
  }
</style>