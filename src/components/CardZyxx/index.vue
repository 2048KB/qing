<template>
  <!-- 职业信息 -->
  <el-card class="box-card detail-card detail-card--user" shadow="never">
    <div slot="header" class="clearfix">
      <span><slot></slot></span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">
        <div class="icon"></div>
      </el-button>
    </div>

    <div class="detail-card--body detail-card__body--user">
      <el-row>
        <el-col :span="5">
          <div class="th">
            <div class="img"><img src="../../assets/images/qq-18.png" alt=""></div>
            <el-button type="primary">更换头像</el-button>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="meta">
            <p class="name">
              {{ employeeDetail.realityName }}

              <span v-if="isCustom">
                <span class="state">已激活</span>
                <span class="validtime">有效期至2020-05-20 10:00:00</span>
              </span>
            </p>
            <p><i class="qq qq-19"></i>{{ employeeDetail.sno }}</p>
            <p><i class="qq qq-20"></i>{{ employeeDetail.entryDate }}</p>
            <p><i class="qq qq-21"></i>{{ employeeDetail.remark }}</p>
            <div>
              <el-button type="success" plain>{{ employeeDetail.storeId }}</el-button>
              <el-button type="success" plain>{{ employeeDetail.storeName }}</el-button>
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