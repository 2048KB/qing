<template>
  <!-- 邀请信息 -->
  <el-card class="box-card detail-card detail-card--yqxx" shadow="never"">
    <div slot="header" class="clearfix">
      <span>邀请信息</span>
    </div>

    <div class="detail-card__body">
      <div class="clearfix row">
        <div class="item">
          <el-col :span="8">
            <div class="sum">{{ obj.counselorSpreadMember }}</div>
            <div class="title">累计邀请会员</div>
          </el-col>
        </div>
        <div class="item">
          <el-col :span="8">
            <div class="sum">{{ obj.counselorCurMonSpreadMember }}</div>
            <div class="title">本月邀请会员</div>
          </el-col>
        </div>
        <div class="item">
          <el-col :span="8">
            <div class="sum">{{ obj.counselorCurMonSpreadCustomer }}</div>
            <div class="title">本月邀请顾客</div>
          </el-col>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    obj: Object
  }
}
</script>