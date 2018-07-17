<template>
  <div class="app-container platform-fee-page">
    <div class="top-bar"></div>
    <SearchBox 
      class="search-box"
      @change="handleChange"
      :options="feeSearchTypes"
      v-model="requestData.search"></SearchBox>
    <div class="filter-box">
      <div class="filter-item">
        <RadioGroup 
          title="性别"
          @change="handleChange"
          :options="sexsOptions"
          v-model="requestData.sex"></RadioGroup>
      </div>
      <div class="filter-item">
        <RadioGroup 
          title="角色"
          @change="handleChange"
          :options="roleOptions"
          v-model="requestData.roleType"></RadioGroup>
      </div>
      <div class="filter-item">
        <RadioGroup 
          title="费用类型"
          @change="handleChange"
          :options="feeTypeOptions"
          v-model="requestData.feeType"></RadioGroup>
      </div>
      <div class="filter-item">
        <DatePicker 
          @change="handleChange" 
          v-model="requestData.time" 
          title="交易日期"></DatePicker>
      </div>
    </div>
    <TableWrapper title="收取费用列表" :total="totalCount" @current-change="handleChangeCurrent">
      <span slot="right">共{{totalCount}}人</span>
      <el-table 
        empty-text="没有数据"
        class="list"
        :data="list" 
        v-loading.body="listLoading" 
        element-loading-text="Loading" 
        :fit="true"
        border highlight-current-row>
        <el-table-column min-width="50" align="center" label='交易流水' prop="orderNo"></el-table-column>
        <el-table-column min-width="50" align="center" label='划入账户' prop="acount"></el-table-column>
        <el-table-column min-width="50" align="center" label='扣款人昵称' prop="nickName"></el-table-column>
        <el-table-column min-width="50" align="center" label='扣款人真实姓名' prop="realityName"></el-table-column>
        <el-table-column min-width="50" align="center" label='性别' prop="sexStr"></el-table-column>
        <el-table-column min-width="100" align="center" label='扣款人手机号' prop="mobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='扣款人角色' prop="roleTypeStr"></el-table-column>
        <el-table-column min-width="50" align="center" label='扣款金额（元）' prop="amount"></el-table-column>
        <el-table-column min-width="100" align="center" label='费用类型' prop="typeStr"></el-table-column>
        <el-table-column min-width="100" align="center" label='交易日期' prop="time"></el-table-column>
      </el-table>
    </TableWrapper>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import RadioGroup from '@/components/RadioGroup'
import {feeSearchTypes, roleOptions, sexsOptions, feeTypeOptions, pagingParams} from '@/views/const'
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
        sex: '0',
        feeType: '0',
        roleType: '0',
        ...pagingParams
      },
      list: null,
      listLoading: true,
      totalCount: 0,
      feeSearchTypes,
      roleOptions,
      sexsOptions,
      feeTypeOptions
    }
  },
  methods: {
    fetchData () {
      this.$API.listplatformfee({
        data: {
          ...this.requestData,
          type: this.requestData.search.type,
          typeStr: this.requestData.search.text,
          dealDateBegin: this.requestData.time.begin,
          dealDateEnd: this.requestData.time.end
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
  .platform-fee-page {
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
