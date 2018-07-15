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
    <TableWrapper :title="dialogOpt.title" :total="totalCount" @current-change="handleChangeCurrent">
      <span slot="right">共{{totalCount}}人</span>
      <el-table 
        empty-text="没有数据"
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
          <template slot-scope="scope"><span class="detail" @click="handleShowModal(scope.$index)">{{list[scope.$index].status == 1 ? '审核' : '查看'}}</span></template>
        </el-table-column>
      </el-table>
    </TableWrapper>
    <el-dialog :title="dialogOpt.title" :visible.sync="isShowDialog">
      <div v-loading="isShowDialogLoading" element-loading-text="Loading">
        <div class="card-container">
          <InfoCard :options="dialogOpt.personInfo || {}" title="个人信息"></InfoCard>
          <InfoCard :options="dialogOpt.withdrawInfo || {}" title="提现信息"></InfoCard>
        </div>
        <template v-if="dialogOpt.status != 1">
          <div class="checkInfo">
            <div class="info-item" v-for="key in Object.keys(dialogOpt.checkInfo || {})" :key="key">
              <span class="key">{{key}}</span>
              <span class="value">{{dialogOpt.checkInfo && dialogOpt.checkInfo[key]}}</span>
            </div>
          </div>
        </template>
      </div>
      <template v-if="dialogOpt.status == 1">
        <el-form :model="dialogForm" label-width="80px">
          <el-form-item label="审核意见" style="margin-bottom: 0;">
            <el-radio-group v-model="dialogForm.auditOpinion">
              <el-radio label="同意提现"></el-radio>
              <el-radio label="拒绝提现"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" >
          <el-button @click="isShowDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleDialogFormSubmit">确 定</el-button>
        </div>
      </template>
    </el-dialog>
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
import InfoCard from '../../components/InfoCard'

export default {
  mixins: [listMixins],
  components: {
    RadioGroup,
    DatePicker,
    SearchBox,
    TableWrapper,
    InfoCard
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
      typeMap,
      dialogOpt: {},
      isShowDialog: false,
      dialogForm: {},
      isShowDialogLoading: false
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
          this.listLoading = false
        })
    },
    handleChange () {
      this.fetchData()
    },
    handleShowModal (index) {
      let selectData = this.list[index]
      let id = selectData.id
      let status = selectData.status
      let title = status == '1' ? '审核' : '查看'
      this.isShowDialogLoading = true

      this.$API.showwithdrawuserdetail({
        id
      }).then((res) => {
        this.isShowDialog = true
        let data = res.data || {}
        this.dialogForm = {
          auditOpinion: '同意提现',
          remark: ''
        }
        this.dialogOpt = {
          title,
          status: status,
          personInfo: {
            '手机号：': data.mobile,
            '昵称：': data.nickName,
            '真实姓名：': data.realityName,
            '提现时可用金额：': data.availableBalance
          },
          withdrawInfo: {
            '提现金额': data.amount,
            '提现方式': this.typeMap[data.type],
            '提现日期': data.time
          },
          checkInfo: {
            '审核意见': data.auditOpinion,
            '备注': data.remark,
            '处理人': data.name,
            '处理日期': data.auditTime
          }
        }

        this.isShowDialogLoading = false
      }).catch((err) => {
        this.isShowDialogLoading = false
        err && err.msg && this.$message({
          message: err.msg,
          type: 'error'
        })
      })
    },
    handleDialogFormSubmit () {
      this.$API.auditwithdrawuser({
        data: this.dialogForm
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.handleChange()
        this.isShowDialog = false
      }).catch((err) => {
        err && err.msg &&this.$message({
          message: err.msg,
          type: 'error'
        })
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
    .card-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .InfoCard {
        width: 50%;
        margin: 10px;
      }
    }
    .el-dialog__body {
      padding-bottom: 0;
      padding-top: 0;
    }
    .checkInfo {
      line-height: 28px;
      padding-left: 30px;
      padding-right: 20px;
      padding-bottom: 20px;
      .key {
        display: inline-block;
        min-width: 8em;
        color: $c4;
      }
    }
  }
</style>
