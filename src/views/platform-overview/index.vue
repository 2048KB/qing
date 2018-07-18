<template>
  <div class="app-container platform-overview-page">
    <div class="top-bar"></div>
    <div class="filter-box">
      <div class="filter-item">
        <DatePicker 
          @change="handleChange" 
          v-model="requestData.time" 
          title="日期"></DatePicker>
      </div>
    </div>
    <TableWrapper title="平台概况">
      <div class="card-container">
        <InfoCard title="资金进出统计" :options="moneyOpt"></InfoCard>
        <InfoCard title="会员统计" :options="memberOpt"></InfoCard>
        <InfoCard title="奖励统计" :options="bonusOpt"></InfoCard>
        <InfoCard title="收取费用统计" :options="feeOpt"></InfoCard>
        <InfoCard title="当日提现统计" :options="withdrawOpt"></InfoCard>
      </div>
    </TableWrapper>
  </div>
</template>

<script>
import {employeeTypes} from '@/views/const'
import DatePicker from '@/components/DatePicker'
import TableWrapper from '@/components/TableWrapper'
import InfoCard from '../../components/InfoCard'
export default {
  components: {
    DatePicker,
    TableWrapper,
    InfoCard
  },
  data() {
    return {
      requestData: {
        time: {
          begin: null,
          end: null
        }
      },
      listLoading: true,
      moneyOpt: {},
      memberOpt: {},
      bonusOpt: {},
      feeOpt: {},
      withdrawOpt: {}
    }
  },

  methods: {
    fetchData () {
      Promise.all([this.$API.getplatformoverview({
        data: {
          timeBegin: this.requestData.time.begin,
          timeEnd: this.requestData.time.end
        }
      }), this.$API.getdayplatformoverview()])
        .then((res) => {
          this.listLoading = false
          let data = {
            ...res[0].data,
            ...res[1].data
          }
          this.moneyOpt = {
            '购买会员': '￥' + (data.purchaseMemberCardAmount === undefined ? '' : data.purchaseMemberCardAmount ),
            '成功提现': '￥' + (data.withdrawalAmount === undefined ? '' : data.withdrawalAmount ),
            '总计': '￥' + (data.fundTotal === undefined ? '' : data.fundTotal )
          }
          this.memberOpt = {
            '会员': (data.memberCount === undefined ? '' : data.memberCount ) + '人',
            '顾客': (data.customerCount === undefined ? '' : data.customerCount )+ '人',
            '总计': (data.userCount === undefined ? '' : data.userCount )+ '人'
          }
          this.bonusOpt = {
            '顾问奖励': '￥' + (data.adviserAward === undefined ? '' : data.adviserAward ),
            '美容师奖励': '￥' + (data.beauticianAward === undefined ? '' : data.beauticianAward ),
            '会员奖励': '￥' + (data.memberAward === undefined ? '' : data.memberAward ),
            '总计': '￥' + (data.awardTotal === undefined ? '' : data.awardTotal )
          }
          this.feeOpt = {
            '佣金管理费': '￥' + (data.commissionFee === undefined ? '' : data.commissionFee ),
            '提现手续费': '￥' + (data.withdrawFee === undefined ? '' : data.withdrawFee ),
            '总计': '￥' + (data.feeTotal === undefined ? '' : data.feeTotal )
          }
          this.withdrawOpt = {
            '提现人数': (data.dayWithdrawalPending.count === undefined ? '' : data.dayWithdrawalPending.count ) + '人',
            '提现金额': '￥' + (data.dayWithdrawalPending.amount === undefined ? '' : data.dayWithdrawalPending.amount ),
            '待处理人数': (data.dayWithdrawalSuccess.count === undefined ? '' : data.dayWithdrawalSuccess.count ) + '人',
            '待处理金额': '￥' + (data.dayWithdrawalSuccess.amount === undefined ? '' : data.dayWithdrawalSuccess.amount )
          }
        })
        .catch((res) => {
          this.listLoading = false
        })
    },
    handleChange () {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  }
}
</script>
<style lang="scss">
  @import  '../../styles/vars.scss';
  $padding: 20px;
  .platform-overview-page {
    padding: 0;
    .add-member {
      display: block;
      color: $c0;
      cursor: pointer;
    }
    .list {
      margin: $padding;
      width: auto;
    }
    .detail {
      color: $c0;
      cursor: pointer;
    }
    .pagination-container {
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
    }
    .filter-box {
      margin: $padding;
      padding: $padding;
      background-color: white;
      .filter-item {
        padding: 15px 0px;
        border-bottom: 1px solid #ddd;
        &:first-child {
          padding-top: 5px;
        }
        &:last-child {
          border-width: 0;
          padding-bottom: 5px;
        }
      }
    }
    .card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px;
      .InfoCard {
        min-width: 240px;
        width: 24%;
        margin-bottom: 20px;
      }
    }
  }
</style>
