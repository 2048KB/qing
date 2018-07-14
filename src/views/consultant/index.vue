<template>
  <div class="app-container">
    <RadioGroup 
      title="直接邀请人角色"
      @change="handleChange"
      :options="roleOptions"
      v-model="requestData.dirInviteRole"></RadioGroup>
    <DatePicker 
      @change="handleChange" 
      v-model="requestData.time" 
      title="注册日期"></DatePicker>

<!--     <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import { getList } from '@/api/table'
import RadioGroup from '@/components/RadioGroup'
import {roleOptions} from '@/views/const'
import DatePicker from '@/components/DatePicker'
export default {
  components: {
    RadioGroup,
    DatePicker
  },
  data() {
    return {
      requestData: {
        dirInviteRole: '0',
        time: {
          start: null,
          end: null
        }
      },
      list: null,
      listLoading: true,
      roleOptions
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
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleChange () {
      console.log(this.requestData)
    }
  }
}
</script>
