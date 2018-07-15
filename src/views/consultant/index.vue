<template>
  <div class="app-container consultant-page">
    <div class="top-bar">
      <el-button class="add-member" icon="el-icon-plus" @click="handleAddMember">添加</el-button>
    </div>
    <SearchBox 
      class="search-box"
      @change="handleChange"
      :options="employeeTypes"
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
    <TableWrapper title="顾问列表" :total="totalCount" @current-change="handleChangeCurrent">
      <span slot="right">共{{totalCount}}人</span>
      <el-table 
        empty-text="没有数据"
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
        <el-table-column min-width="50" align="center" label='入职日期' prop="entryDate"></el-table-column>
        <el-table-column min-width="100" align="center" label='创建日期' prop="time"></el-table-column>
        <el-table-column min-width="50" align="center" label='操作'>
          <template slot-scope="scope"><span class="detail" @click="handleToDetail(scope.$index)">详情</span></template>
        </el-table-column>
      </el-table>
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
        sex: '0',
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
        // 角色类型：1表示美容师，2表示顾问
        roleType: 2,
        currPage: 0,
        pageSize: 10
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
      this.$API.listcounselors({
        data: {
          ...this.requestData,
          type: this.requestData.search.type,
          typeStr: this.requestData.search.text,
          birthDateBegin: this.requestData.birthDate.begin,
          birthDateEnd: this.requestData.birthDate.end,
          entryDateBegin: this.requestData.entryDate.begin,
          entryDateEnd: this.requestData.entryDate.end,
          creatTimeBegin: this.requestData.creatTime.begin,
          creatTimeEnd: this.requestData.creatTime.end,
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
    handleAddMember() {
      console.log('to add page...')
    },
    handleToDetail (index) {
      this.$router.push({
        path: `/employee/counselor-detail/${this.list[index].id}`
      })
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
