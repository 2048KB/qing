<template>
  <div class="app-container consultant-page">
    <div class="top-bar">
      <el-button class="add-member-buttom" icon="el-icon-plus" @click="handleAddMember">添加</el-button>
    </div>
    <SearchBox 
      class="search-box"
      @change="handleChange"
      :options="pageData.searchOptions"
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
    <TableWrapper :title="pageData.title" :total="totalCount" @current-change="handleChangeCurrent">
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
        <el-table-column v-if="pageData.roleType == 1" min-width="50" align="center" label='所属顾问姓名' prop="belongCounselor"></el-table-column>
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
import RadioGroup from '@/components/RadioGroup'
import {sexsOptions, employeeTypes, beauticianSearchTypes, roleType, pagingParams} from '@/views/const'
import DatePicker from '@/components/DatePicker'
import SearchBox from '@/components/SearchBox'
import TableWrapper from '@/components/TableWrapper'
import listMixins from '../listMixins'
const ROLE_MAP = {
  ConsultantList: {
    listApi: 'listcounselors',
    title: '顾问列表',
    roleType: roleType.consultant,
    searchOptions: employeeTypes,
    detailUrl: '/employee/consultant/detail',
    addUrl: '/employee/consultant/add'
  },
  BeauticianList: {
    listApi: 'listbeauticians',
    title: '美容师列表',
    roleType: roleType.beautician,
    searchOptions: beauticianSearchTypes,
    detailUrl: '/employee/beautician/detail',
    addUrl: '/employee/beautician/add'
  }
}
export default {
  mixins: [listMixins],
  components: {
    RadioGroup,
    DatePicker,
    SearchBox,
    TableWrapper
  },
  watch: {
    $route (to, from) {
      this.pageData = ROLE_MAP[this.$route.name]
      this.fetchData()
    }
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
        ...pagingParams
      },
      pageData: ROLE_MAP[this.$route.name],
      list: null,
      listLoading: true,
      sexsOptions,
      totalCount: 0
    }
  },
  methods: {
    fetchData () {
      this.$API[this.pageData.listApi]({
        data: {
          ...this.requestData,
          roleType: this.pageData.roleType,
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
      this.$router.push({
        path: this.pageData.addUrl
      })
    },
    handleToDetail (index) {
      this.$router.push({
        path: `/employee/consultant/detail`,
        query: {
          id: this.list[index].id,
          role: this.pageData.roleType
        }
      })
    }
  },
  mounted() {
    this.fetchData()
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
