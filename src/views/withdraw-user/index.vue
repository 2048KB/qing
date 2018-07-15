<template>
  <div class="app-container consultant-page">
    <div class="top-bar"></div>
    <SearchBox 
      class="search-box"
      @change="handleChange"
      :options="bounsSearchTypes"
      v-model="search"></SearchBox>
    <div class="filter-box">
      <div class="filter-item">
        <RadioGroup 
          title="提现状态"
          @change="handleChange"
          :options="withdrawStatuOptions"
          v-model="requestData.status"></RadioGroup>
      </div>
      <div class="filter-item">
        <DatePicker 
          @change="handleChange" 
          v-model="requestData.time" 
          title="提现日期"></DatePicker>
      </div>
    </div>
    <TableWrapper title="顾问列表" :total="totalCount" @current-change="handleChangeCurrent">
      <span slot="right">共{{totalCount}}人</span>
      <el-table 
        class="list"
        :data="list" 
        v-loading.body="listLoading" 
        element-loading-text="Loading" 
        :fit="true"
        border highlight-current-row>
        <el-table-column min-width="50" align="center" label='交易流水' prop="serviceOrderNo"></el-table-column>
        <el-table-column min-width="50" align="center" label='昵称' prop="nickName"></el-table-column>
        <el-table-column min-width="50" align="center" label='真实姓名' prop="realityName"></el-table-column>
        <el-table-column min-width="50" align="center" label='手机号' prop="mobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='提现时账户可提现金额（元）' prop="availableBalance"></el-table-column>
        <el-table-column min-width="100" align="center" label='提现金额（元）' prop="amount"></el-table-column>
        <el-table-column min-width="50" align="center" label='提现日期' prop="time"></el-table-column>
        <el-table-column min-width="50" align="center" label='提现方式' prop="type">
          <template slot-scope="scope">{{typeMap[list[scope.$index].type]}}</template>
        </el-table-column>
        <el-table-column min-width="100" align="center" label='状态' prop="status">
          <template slot-scope="scope">{{statusMap[list[scope.$index].status]}}</template>
        </el-table-column>
        <el-table-column min-width="50" align="center" label='操作'>
          <template slot-scope="scope"><span class="detail" @click="handleShowModal">{{list[scope.$index].status == 1 ? '审核' : '查看'}}</span></template>
        </el-table-column>
      </el-table>
    </TableWrapper>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import RadioGroup from '@/components/RadioGroup'
import {withdrawStatuOptions, bounsSearchTypes} from '@/views/const'
import DatePicker from '@/components/DatePicker'
import SearchBox from '@/components/SearchBox'
import TableWrapper from '@/components/TableWrapper'
import listMixins from '../listMixins'

export default {
  mixins: [listMixins],
  components: {
    RadioGroup,
    DatePicker,
    SearchBox,
    TableWrapper
  },
  data() {
    let statusMap = {
      '1': '待审核',
      '2': '处理中',
      '3': '成功',
      '-1': '拒绝',
    }
    let typeMap = {
      '1': '零钱',
      '2': '银行卡'
    }
    return {
      requestData: {
        status: '0',
        time: {
          begin: null,
          end: null
        },
        currPage: 0,
        currPage: 10
      },
      search: {
        type: '0',
        text: ''
      },
      searchResult: {},
      list: null,
      listLoading: true,
      withdrawStatuOptions,
      bounsSearchTypes,
      totalCount: 0,
      statusMap,
      typeMap
    }
  },
  watch: {
    search: {
      handler: function (val) {
        let select = bounsSearchTypes[val.type]
        let temp = {}
        if (select && select.key) {
          temp[select.key] = val.text
        }
        this.searchResult = temp
      },
      deep: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$API.showwithdrawuser({
        data: {
          ...this.requestData,
          ...this.searchResult,
          timeStart: this.requestData.time.begin,
          timeEnd: this.requestData.time.end
        }
      })
        .then((res) => {
          this.listLoading = false
          console.log(res)
          let data = res.data || {}
          this.list = data.page
          this.totalCount = data.totalCount
        })
        .catch((res) => {
          console.log(res)
        })
    },
    handleChange () {
      this.fetchData()
    },
    handleShowModal () {

    }
  }
}
</script>
<style lang="scss">
  @import  '../../styles/vars.scss';
  $padding: 20px;
  .consultant-page {
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
  }
</style>
