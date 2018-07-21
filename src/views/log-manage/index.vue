<template>
  <div class="app-container bonus-list-page">
    <div class="top-bar"></div>
    <SearchBox 
      class="search-box"
      @change="handleChange"
      :options="logSearchTypes"
      v-model="search"></SearchBox>
    <div class="filter-box">
      <div class="filter-item">
        <DatePicker 
          @change="handleChange" 
          v-model="requestData.time" 
          title="操作时间"></DatePicker>
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
        <el-table-column min-width="50" align="center" label='ID' prop="id"></el-table-column>
        <el-table-column min-width="50" align="center" label='操作者用户名' prop="name"></el-table-column>
        <el-table-column min-width="50" align="center" label='操作者真实姓名' prop="realityName"></el-table-column>
        <el-table-column min-width="50" align="center" label='操作者手机号' prop="mobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='操作时间' prop="time"></el-table-column>
        <el-table-column min-width="100" align="center" label='操作者IP' prop="ip"></el-table-column>
        <el-table-column min-width="50" align="center" label='备注' prop="remark"></el-table-column>
      </el-table>
    </TableWrapper>
  </div>
</template>

<script>
import {pagingParams, logSearchTypes} from '@/views/const'
import DatePicker from '@/components/DatePicker'
import SearchBox from '@/components/SearchBox'
import TableWrapper from '@/components/TableWrapper'
import listMixins from '../listMixins'
export default {
  mixins: [listMixins],
  components: {
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
        ...pagingParams
      },
      search: {
        type: '0',
        text: ''
      },
      logSearchTypes,
      list: null,
      listLoading: true,
      totalCount: 0,
      searchResult: {}
    }
  },
  watch: {
    search: {
      handler: function (val) {
        let select = logSearchTypes[val.type]
        let temp = {}
        if (select && select.key) {
          temp[select.key] = val.text
        }
        this.searchResult = temp
      },
      deep: true
    }
  },
  methods: {
    fetchData () {
      this.$API.showsupervisoreventlog({
        data: {
          ...this.requestData,
          ...this.searchResult,
          timeStart: this.requestData.time.begin,
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
