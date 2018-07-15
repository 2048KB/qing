<template>
  <!-- 账户信息 -->
  <el-card class="box-card detail-card detail-card--zhxx">
    <div slot="header" class="clearfix">
      <span>账户信息</span>
    </div>

    <div class="detail-card__body">
      <!-- row1 -->
      <div class="clearfix row row1">
        <div class="item">
          <el-col :span="8">
            <div class="sum">{{ userFunds.balance }}</div>
            <div class="title">总资产</div>
          </el-col>
        </div>
        <div class="item">
          <el-col :span="8">
            <div class="sum">{{ userFunds.availableBalance }}</div>
            <div class="title">账户余额</div>
          </el-col>
        </div>
        <div class="item">
          <el-col :span="8">
            <div class="sum">{{ userFunds.freeze }}</div>
            <div class="title">冻结金额</div>
          </el-col>
        </div>
      </div>
      <hr class="style-one">
      <!-- row2 -->
      <div class="clearfix row row2">
        <div class="item">
          <el-col :span="8">
            <div class="sum">{{ userFunds.userAmountByUserId }}</div>
            <div class="title">累计赚取奖励</div>
          </el-col>
        </div>
        <div class="item">
          <el-col :span="8">
            <div class="sum">{{ userFunds.userCurMonDirectAmount }}</div>
            <div class="title">本月直接赚取奖励</div>
          </el-col>
        </div>
        <div class="item">
          <el-col :span="8">
            <div class="sum">{{ userFunds.userCurMonInDirectAmount }}</div>
            <div class="title">本月间接赚取奖励</div>
          </el-col>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    userFunds: Object
  }
}
</script>