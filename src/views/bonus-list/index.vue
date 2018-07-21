<template>
  <div class="app-container bonus-list-page">
    <div class="top-bar"></div>
    <SearchBox 
      class="search-box"
      @change="handleChange"
      :options="bounsSearchTypes"
      v-model="requestData.search"></SearchBox>
    <div class="filter-box">
      <div class="filter-item">
        <RadioGroup 
          title="佣金类别"
          @change="handleChange"
          :options="bounsType"
          v-model="requestData.bounsType"></RadioGroup>
      </div>
      <div class="filter-item">
        <RadioGroup 
          title="角色"
          @change="handleChange"
          :options="roleOptions"
          v-model="requestData.roleType"></RadioGroup>
      </div>
      <div class="filter-item">
        <DatePicker 
          @change="handleChange" 
          v-model="requestData.time" 
          title="生成日期"></DatePicker>
      </div>
    </div>
    <TableWrapper title="佣金列表" :total="totalCount" @current-change="handleChangeCurrent">
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
        <el-table-column min-width="50" align="center" label='昵称' prop="nickName"></el-table-column>
        <el-table-column min-width="50" align="center" label='真实姓名' prop="realityName"></el-table-column>
        <el-table-column min-width="50" align="center" label='手机号' prop="mobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='角色' prop="roleTypeStr"></el-table-column>
        <el-table-column min-width="100" align="center" label='佣金（元）' prop="amount"></el-table-column>
        <el-table-column min-width="50" align="center" label='佣金类别' prop="typeStr"></el-table-column>
        <el-table-column min-width="50" align="center" label='生成日期' prop="time"></el-table-column>
      </el-table>
    </TableWrapper>
  </div>
</template>

<script>
import RadioGroup from '@/components/RadioGroup'
import {bounsSearchTypes, bounsType, pagingParams, roleOptions} from '@/views/const'
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
        roleType: '0',
        bounsType: '0',
        ...pagingParams
      },
      list: null,
      listLoading: true,
      totalCount: 0,
      bounsSearchTypes,
      bounsType,
      roleOptions
    }
  },
  methods: {
    fetchData () {
      this.$API.listbonus({
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
        })
    },
    handleChange () {
      this.fetchData()
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
  .bonus-list-page {
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
