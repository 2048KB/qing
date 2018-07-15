<template>
  <div class="app-container platform-overview-page">
    <div class="top-bar"></div>
    <div class="filter-box">
      <div class="filter-item">
        <DatePicker 
          @change="handleChange" 
          v-model="requestData.time" 
          title="日期"></DatePicker>
      </div>
    </div>
    <TableWrapper title="平台概况">
      ...
    </TableWrapper>
  </div>
</template>

<script>
import {employeeTypes} from '@/views/const'
import DatePicker from '@/components/DatePicker'
import TableWrapper from '@/components/TableWrapper'
export default {
  components: {
    DatePicker,
    TableWrapper
  },
  data() {
    return {
      requestData: {
        time: {
          begin: null,
          end: null
        }
      },
      listLoading: true
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
      this.$API.getplatformoverview({
        data: this.requestData
      })
        .then((res) => {
          this.listLoading = false
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
  .platform-overview-page {
    padding: 0;
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
  }
</style>
