<template>
  <div class="app-container order-list-page">
    <div class="top-bar"></div>
    <SearchBox 
      class="search-box"
      @change="handleChange"
      :options="orderSearchOptions"
      v-model="requestData.search"></SearchBox>
    <div class="filter-box">
      <div class="filter-item">
        <RadioGroup 
          title="状态"
          @change="handleChange"
          :options="orderStatusTypes"
          v-model="requestData.orderStatus"></RadioGroup>
      </div>
      <div class="filter-item">
        <DatePicker 
          @change="handleChange" 
          v-model="requestData.time" 
          title="下单日期"></DatePicker>
      </div>
    </div>
    <TableWrapper title="订单列表" :total="totalCount" @current-change="handleChangeCurrent">
      <span slot="right">共{{totalCount}}条</span>
      <el-table 
        empty-text="没有数据"
        class="list"
        :data="list" 
        v-loading.body="listLoading" 
        element-loading-text="Loading" 
        :fit="true"
        border highlight-current-row>
        <el-table-column min-width="50" align="center" label='订单号码' prop="orderNo"></el-table-column>
        <el-table-column min-width="50" align="center" label='昵称' prop="nickName"></el-table-column>
        <el-table-column min-width="50" align="center" label='真实姓名' prop="realityName"></el-table-column>
        <el-table-column min-width="80" align="center" label='手机号' prop="mobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='商品名称' prop="goodsName"></el-table-column>
        <el-table-column min-width="100" align="center" label='金额（元）' prop="amount"></el-table-column>
        <el-table-column min-width="50" align="center" label='下单日期' prop="time"></el-table-column>
        <el-table-column min-width="50" align="center" label='支付方式' prop="payTypeStr"></el-table-column>
        <el-table-column min-width="100" align="center" label='付款日期' prop="payTime"></el-table-column>
        <el-table-column min-width="100" align="center" label='是否代付' prop="isPayFor">
          <template slot-scope="scope">{{list[scope.$index].isPayFor == 0 ? '否' : '是'}}</template>
        </el-table-column>
        <el-table-column min-width="100" align="center" label='状态' prop="status">
          <template slot-scope="scope">{{orderStatusMap[list[scope.$index].status] || list[scope.$index].status}}</template>
        </el-table-column>
        <el-table-column min-width="50" align="center" label='操作'>
          <template slot-scope="scope"><span class="detail" @click="handleToDetail(scope.$index)">详情</span></template>
        </el-table-column>
      </el-table>
    </TableWrapper>
  </div>
</template>

<script>
import RadioGroup from '@/components/RadioGroup'
import {orderSearchOptions, orderStatusTypes, pagingParams, orderStatusMap} from '@/views/const'
import DatePicker from '@/components/DatePicker'
import SearchBox from '@/components/SearchBox'
import TableWrapper from '@/components/TableWrapper'
import listMixins from '../listMixins'
console.log(orderSearchOptions, 777)
export default {
  mixins: [listMixins],
  components: {
    RadioGroup,
    DatePicker,
    SearchBox,
    TableWrapper
  },
  data() {
    return {
      requestData: {
        time: {
          begin: null,
          end: null
        },
        search: {
          type: '0',
          text: ''
        },
        orderStatus: '0',
        ...pagingParams
      },
      list: null,
      listLoading: true,
      totalCount: 0,
      orderSearchOptions,
      orderStatusTypes,
      orderStatusMap
    }
  },
  methods: {
    fetchData () {
      this.$API.listplatformorder({
        data: {
          ...this.requestData,
          type: this.requestData.search.type,
          typeStr: this.requestData.search.text,
          timeBegin: this.requestData.time.begin,
          timeEnd: this.requestData.time.end
        }
      })
        .then((res) => {
          this.listLoading = false
          let data = res.data || {}
          this.list = data.page
          this.totalCount = data.totalCount
        })
        .catch((res) => {
          this.listLoading = false
          console.log(res)
        })
    },
    handleChange () {
      this.fetchData()
    },
    handleToDetail (index) {
      this.$router.push({
        path: '/order/detail',
        query: {
          id: this.list[index].id
        }
      })
    }
  },
  mounted() {
    this.fetchData()
    console.log(this.$route)
    console.log(this.$router)
  }
}
</script>
<style lang="scss">
  @import  '../../styles/vars.scss';
  $padding: 20px;
  .order-list-page {
    padding: 0;
    .search-box {
      margin-right: $padding;
      margin-bottom: $padding;
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
  }
</style>
