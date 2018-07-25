<template>
  <!-- 当月佣金 -->
  <el-card class="box-card detail-card detail-card--yj">
    <div slot="header" class="clearfix">
      <span>当月佣金明细</span>
    </div>

    <div class="detail-card__body detail-card__body--yj">
      <el-table :data="lists" stripe style="width: 100%">
        <el-table-column prop="time" width="160" label="日期"></el-table-column>
        <el-table-column prop="inviterRealName" width="100" label="邀请人姓名"></el-table-column>
        <el-table-column prop="inviterMobile" width="120" label="邀请人手机号"> </el-table-column>
        <el-table-column prop="inviteeName" width="120" label="邀请会员昵称"> </el-table-column>
        <el-table-column prop="inviteeMobile" width="120" label="邀请会员手机号"> </el-table-column>
        <el-table-column prop="typeStr" width="100" label="佣金类别"> </el-table-column>
        <el-table-column prop="type" width="120" label="奖励金额（元）"> </el-table-column>
      </el-table>

      <div class="block pagination" v-show="showPagination">
        <el-pagination
          @current-change="handleChangeCurrent"
          layout="prev, pager, next"
          :total="totalPages">
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      default: []
    },

    totalPages: {
      type: Number,
      default: 10
    },

    showPagination: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    handleChangeCurrent(currentPage) {
      this.$emit('triggerPagination', { currPage: currentPage, role: this.$route.query.role })
    }
  }
}
</script>