<template>
  <div class="app-container beautician-page">
    <div class="top-bar">
      <span class="add-member" @click="handleAddMember">添加</span>
    </div>
    <SearchBox 
      class="search-box"
      @change="handleChange"
      :options="employeeTypes"
      v-model="requestData.search"></SearchBox>
    <div class="filter-box">
      <div class="filter-item">
        <RadioGroup 
          title="直接邀请人角色"
          @change="handleChange"
          :options="sexsOptions"
          v-model="requestData.dirInviteRole"></RadioGroup>
      </div>
      <div class="filter-item">
        <DatePicker 
          @change="handleChange" 
          v-model="requestData.birthDate" 
          title="出生日期"></DatePicker>
      </div>
      <div class="filter-item">
        <DatePicker 
          @change="handleChange" 
          v-model="requestData.entryDate" 
          title="入职日期"></DatePicker>
      </div>
      <div class="filter-item">
        <DatePicker 
          @change="handleChange" 
          v-model="requestData.creatTime" 
          title="创建日期"></DatePicker>
      </div>
    </div>
    <TableWrapper title="顾问列表">
      <span slot="right">共{{totalCount}}人</span>
      <el-table 
        class="list"
        :data="list" 
        v-loading.body="listLoading" 
        element-loading-text="Loading" 
        :fit="true"
        border highlight-current-row>
        <el-table-column min-width="50" align="center" label='员工编号' prop="sno"></el-table-column>
        <el-table-column min-width="50" align="center" label='姓名' prop="realityName"></el-table-column>
        <el-table-column min-width="50" align="center" label='性别' prop="sexStr"></el-table-column>
        <el-table-column min-width="50" align="center" label='手机号' prop="mobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='出生日期' prop="birthDate"></el-table-column>
        <el-table-column min-width="100" align="center" label='身份证号' prop="idNumber"></el-table-column>
        <el-table-column min-width="50" align="center" label='QQ号' prop="qq"></el-table-column>
        <el-table-column min-width="50" align="center" label='所属顾问姓名' prop="belongCounselor"></el-table-column>
        
        <el-table-column min-width="50" align="center" label='入职日期' prop="entryDate"></el-table-column>
        <el-table-column min-width="100" align="center" label='创建日期' prop=""></el-table-column>
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
import {sexsOptions, employeeTypes} from '@/views/const'
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
        dirInviteRole: '0',
        creatTime: {
          begin: null,
          end: null
        },
        birthDate: {
          begin: null,
          end: null
        },
        entryDate: {
          begin: null,
          end: null
        },
        search: {
          type: '0',
          text: ''
        },
        currPage: 0,
        currPage: 10
      },
      list: null,
      listLoading: true,
      sexsOptions,
      employeeTypes,
      totalCount: 0
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
      this.$API.listbeauticians({
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
  .beautician-page {
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
