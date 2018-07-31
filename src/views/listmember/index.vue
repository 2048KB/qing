<template>
  <div class="app-container consultant-page">
    <div class="top-bar"></div>
    <SearchBox
      class="search-box"
      @change="handleChange"
      :options="listMemberSearchTypes"
      v-model="requestData.search"></SearchBox>
    <div class="filter-box">
      <div class="filter-item">
        <RadioGroup
          title="直接邀请人角色"
          @change="handleChange"
          :options="roleOptions"
          v-model="requestData.dirInviteRole"></RadioGroup>
      </div>
      <div class="filter-item">
        <RadioGroup
          title="间接邀请人角色"
          @change="handleChange"
          :options="roleOptions"
          v-model="requestData.inDirInviteRole"></RadioGroup>
      </div>
      <div class="filter-item">
        <DatePicker
          @change="handleChange"
          v-model="requestData.time"
          title="注册日期"></DatePicker>
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
        <el-table-column min-width="50" align="center" label='ID' prop="id"></el-table-column>
        <el-table-column min-width="50" align="center" label='昵称' prop="nickName"></el-table-column>
        <el-table-column min-width="50" align="center" label='绑定手机号' prop="mobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='注册日期' prop="time"></el-table-column>
        <el-table-column min-width="50" align="center" label='直接邀请人姓名' prop="dirInviteName"></el-table-column>
        <el-table-column min-width="50" align="center" label='直接邀请人手机号' prop="dirInviteMobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='直接邀请人角色' prop="dirInviteRole"></el-table-column>
       <el-table-column min-width="50" align="center" label='间接邀请人姓名' prop="inDirInviteName"></el-table-column>
        <el-table-column min-width="50" align="center" label='间接邀请人手机号' prop="inDirInviteMobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='间接邀请人角色' prop="inDirInviteRole"></el-table-column>
        <el-table-column v-if="pageData.roleType == 2" min-width="50" align="center" label='会员卡状态' prop="isActive">
          <template slot-scope="scope">
            {{list[scope.$index].isActive ? '激活' : '未激活'}}
          </template>
        </el-table-column>
        <el-table-column min-width="80" align="center" label='操作'>
          <template slot-scope="scope">
            <span class="detail" @click="handleToDetail(scope.$index)">详情</span>
            <span v-if="pageData.isShowUpdateSignBtn" class="update-sign" @click="handleUpdateSign(scope.$index)">更新签名</span>
          </template>
        </el-table-column>
      </el-table>
    </TableWrapper>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import RadioGroup from '@/components/RadioGroup'
import {listMemberSearchTypes, roleOptions, pagingParams, roleType} from '@/views/const'
import DatePicker from '@/components/DatePicker'
import SearchBox from '@/components/SearchBox'
import TableWrapper from '@/components/TableWrapper'
import listMixins from '../listMixins'
const ROLE_MAP = {
  MemberList: {
    listApi: 'listmember',
    title: '注册会员列表',
    roleType: roleType.member,
    detailUrl: '/client/member/detail',
    isShowUpdateSignBtn: true
  },
  CustomerList: {
    listApi: 'listcustomer',
    title: '顾客列表',
    roleType: roleType.customer,
    detailUrl: '/client/customer/detail',
    isShowUpdateSignBtn: false
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
        dirInviteRole: '0',
        inDirInviteRole: '0',
        time: {
          begin: null,
          end: null
        },
        search: {
          type: '0',
          text: ''
        },
        ...pagingParams
      },
      list: null,
      listLoading: true,
      listMemberSearchTypes,
      totalCount: 0,
      roleOptions,
      pageData: ROLE_MAP[this.$route.name]
    }
  },
  methods: {
    fetchData () {
      this.$API[this.pageData.listApi]({
        data: {
          ...this.requestData,
          type: this.requestData.search.type,
          typeStr: this.requestData.search.text,
          timeBegin: this.requestData.time.begin,
          timeEnd: this.requestData.time.end,
          roleType: this.pageData.roleType
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
          console.log(res)
        })
    },
    handleChange () {
      this.fetchData()
    },
    handleToDetail (index) {
      this.$router.push({
        path: this.pageData.detailUrl,
        query: {
          id: this.list[index].id,
          role: this.pageData.roleType,
          // dirInviteId: this.list[index].dirInviteId,
          // dirInviteRole: this.list[index].dirInviteRole,
          // inDirInviteId: this.list[index].inDirInviteId,
          // inDirInviteRole: this.list[index].inDirInviteRole,
          cardId: this.list[index].cardId
        }
      })
    },
    handleUpdateSign (index) {
      this.$API.editsign({
        data: {
          id: this.list[index].id
        }
      })
        .then((res) => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        })
    }
  },
  created() {
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
    .update-sign {
      margin-left: 10px;
      color: $c1;
      cursor: pointer;
    }
  }
</style>
