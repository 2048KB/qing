<template>
  <div class="app-container consultant-page">
    <div class="top-bar">
      <span class="add-member" @click="handleAddMember">添加</span>
    </div>
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
    <TableWrapper title="收取费用列表">
      <span slot="right">共{{totalCount}}人</span>
      <el-table 
        class="list"
        :data="list" 
        v-loading.body="listLoading" 
        element-loading-text="Loading" 
        :fit="true"
        border highlight-current-row>
        <el-table-column min-width="50" align="center" label='ID' prop="sno"></el-table-column>
        <el-table-column min-width="50" align="center" label='昵称' prop="realityName"></el-table-column>
        <el-table-column min-width="50" align="center" label='绑定手机号' prop="sexStr"></el-table-column>
        <el-table-column min-width="50" align="center" label='注册日期' prop="mobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='直接邀请人角色' prop="birthDate"></el-table-column>
        <el-table-column min-width="100" align="center" label='间接邀请人角色' prop="idNumber"></el-table-column>
        <el-table-column min-width="50" align="center" label='会员卡状态' prop="qq"></el-table-column>
        <el-table-column min-width="50" align="center" label='操作'>
          <template slot-scope="scope"><span class="detail" @click="handleToDetail">详情</span></template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          @current-change="handleChangeCurrent"
          layout="prev, pager, next"
          :total="totalCount">
        </el-pagination> 
      </div>
    </TableWrapper>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import RadioGroup from '@/components/RadioGroup'
import {feeSearchTypes, roleOptions, sexsOptions, feeTypeOptions} from '@/views/const'
import DatePicker from '@/components/DatePicker'
import SearchBox from '@/components/SearchBox'
import TableWrapper from '@/components/TableWrapper'
export default {
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
        currPage: 0,
        currPage: 10,
        feeType: '0',
        roleType: '0'
      },
      list: null,
      totalCount: 0,
      listLoading: true,
      feeSearchTypes,
      roleOptions,
      sexsOptions,
      feeTypeOptions
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$API.listcustomer({
        data: this.requestData
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
      console.log()
      console.log('requst api')
    },
    handleAddMember() {
      console.log('add-member')
    },
    handleToDetail () {

    },
    handleChangeCurrent (currentPage) {
      this.requestData.currPage = currentPage
      this.handleChange()
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
