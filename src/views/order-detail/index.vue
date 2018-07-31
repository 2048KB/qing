<template>
  <div class="order-detail-page">
    <div class="top-bar"></div>
    <TableWrapper title="订单信息">
      <div class="info-wrapper">
        <div class="info-container">
          <ul class="order-info">
            <li><span class="key">订单号码：</span><span class="value">{{detail.id}}</span></li>
            <li><span class="key">订单日期：</span><span class="value">{{detail.time}}</span></li>
            <li v-if="detail.status == -1"><span class="key">取消日期：</span><span class="value">{{detail.cancelTime}}</span></li>
          </ul>
          <div class="status-info">
            <span class="status" :style="statusColorStyle">{{orderStatusMap[detail.status]}}</span>
            <el-button v-if="detail.status == 1" class="cancel-btn" type="primary" @click="handleCancel">取消</el-button>
          </div>
        </div>
        <div class="countdown" v-if="detail.status == 1">
          <i class="el-icon-time"></i>
          <br>
          <span class="time">{{time}}</span>
        </div>
      </div>
    </TableWrapper>
    <TableWrapper title="支付方式">
      <el-table
        :data="payType"
        style="width: 100%">
        <el-table-column
          prop="payTypeStr"
          label="支付方式"
          width="180">
        </el-table-column>
        <el-table-column
          prop="payTime"
          label="付款日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="realAmount"
          label="付款金额">
        </el-table-column>
      </el-table>
    </TableWrapper>
    <TableWrapper title="付款人信息">
      <el-table
        :data="payer"
        style="width: 100%">
        <el-table-column
          prop="nickName"
          label="昵称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="realityName"
          label="真实姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号">
        </el-table-column>
      </el-table>
    </TableWrapper>
    <TableWrapper title="代付人信息" v-if="detail.isPayFor == true">
      <el-table
        :data="payFor"
        style="width: 100%">
        <el-table-column
          prop="payForNickName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="payForMobile"
          label="手机号"
          width="180">
        </el-table-column>
      </el-table>
    </TableWrapper>
    <TableWrapper title="商品信息">
      <el-table
        :data="good"
        style="width: 100%">
        <el-table-column
          prop="image"
          label="商品"
          width="180">
          <template slot-scope="scope">
            <img v-if="good[scope.$index].image" :src="good[scope.$index].image" height="22" width="30">
            <img v-else src="./images/qq-42.png" height="22" width="30">
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="number"
          label="数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="价格">
        </el-table-column>
      </el-table>
    </TableWrapper>
  </div>
</template>

<script>
import TableWrapper from '@/components/TableWrapper'
import {orderStatusMap} from '@/views/const'
export default {
  components: {
    TableWrapper
  },
  data () {
    return {
      time: null,
      // 支付类型
      payType: [],
      // 付款人信息
      payer: [],
      // 代付人信息
      payFor: [],
      // 商品信息
      good: [],
      id: this.$route.query.id,
      detail: {},
      orderStatusMap,
      statusColorStyle: null,
      pollUpdateStatus: false
    }
  },
  methods: {
    fetchData () {
      this.$API.getorderdetailbyorderid({
        data: {
          id: this.id
        }
      })
        .then((res) => {
          let data = res.data || {}
          this.detail = data
          this.payType = [{
            payTypeStr: data.payTypeStr,
            payTime: data.payTime,
            realAmount: data.realAmount
          }]
          this.payer = [{
            nickName: data.nickName,
            mobile: data.mobile,
            realityName: data.realityName
          }]
          this.payFor = [{
            payForNickName: data.payForNickName,
            payForMobile: data.payForMobile
          }]
          this.good = [{
            image: data.image,
            goodsName: data.goodsName,
            number: data.number,
            goodsPrice: data.goodsPrice
          }]
          // 重置状态字体颜色
          let color = null
          if (data.status == 1) {
            color = '#ff4800'
          } else if (data.status == 2) {
            color = '#34c4d4'
          } else if (data.status == -1) {
            color = '#909399'
          }
          if (color) {
            this.statusColorStyle = { color }
          }
          if (data.status == 1) {
            // 轮询更新
            if (this.pollUpdateStatus) {
              this.timer = setTimeout(() => {
                this.fetchData()
              }, 1000)
            } else {
              // 倒数计时
              let date = new Date(data.time)
              this.countdown(date.getTime())
            }
          } else {
            this.pollUpdateStatus = false
            clearTimeout(this.timer)
          }
        })
    },
    countdown (time) {
      let min30 = 1000 * 60 * 30
      let timestamp = (time + min30) - Date.now()
      console.log(timestamp)
      if (timestamp > 0) {
        this.time = this.formatTimestamp(timestamp)
        setTimeout(() => {
          this.countdown(time)
        }, 1000)
      } else {
        this.fetchData()
        this.pollUpdateStatus = true
      }
    },
    formatTimestamp (timestamp) {
      let h = Math.floor(timestamp / (1000 * 60 * 60))
      let m = Math.floor((timestamp / (1000 * 60))) % 60
      let s = Math.floor(timestamp / 1000) % 60
      return `${this.preZero(h)}:${this.preZero(m)}:${this.preZero(s)}`
    },
    preZero(str) {
      str = str + ''
      let len = str.length
      str = '00' + str
      return str.substr(len)
    },
    handleCancel () {
      this.$API.cancelorder({
        data: {
          id: this.detail.id
        }
      }).then((res) => {
        this.fetchData()
      })
      // this.$message('取消功能尚未实现...')
    }
  },
  mounted () {
    this.fetchData()
    // this.countdown()
    // this.formatTimestamp()
  }
}
</script>

<style lang="scss">
@import '../../styles/vars.scss';
.order-detail-page {
  line-height: 1.5;
  .info-wrapper {
    padding: 20px;
    display: flex;
    align-items: center;
  }
  .info-container {
    flex: 1;
  }
  .order-info {
    display: flex;
    padding-bottom: 20px;
    li {
      width: 50%;
      line-height: 3;
      .key {
        display: inline-block;
        font-weight: bold;
      }
    }
  }
  .status-info {
    .status {
      font-size: 24px;
      font-weight: bold;
    }
    .cancel-btn {
      margin-left: 2em;
      color: white;
    }
  }
  .countdown {
    width: 50%;
    text-align: center;
  }
  .el-icon-time {
    font-size: 80px;
    color: #ff4800;
  }
  .time {
    font-weight: bold;
    color: #ff4800;
    line-height: 2;
  }
}
</style>