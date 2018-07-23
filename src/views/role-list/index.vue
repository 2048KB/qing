<template>
  <div class="app-container role-page">
    <div class="top-bar">
      <el-button class="add-member-buttom" icon="el-icon-plus" @click="handleShowEditDialog(undefined)">添加</el-button>
    </div>
    <TableWrapper title="角色列表" :total="totalCount" @current-change="handleChangeCurrent">
      <span slot="right">共{{totalCount}}人</span>
      <el-table 
        empty-text="没有数据"
        class="list"
        :data="list" 
        v-loading.body="listLoading" 
        element-loading-text="Loading" 
        :fit="true"
        border highlight-current-row>
        <el-table-column min-width="50" align="center" label='序号' prop="id">
          <template slot-scope="scope">
            {{scope.$index + 1 + (requestData.currPage - 1) * requestData.pageSize}}
          </template>
        </el-table-column>
        <el-table-column min-width="50" align="center" label='角色名称' prop="name"></el-table-column>
        <el-table-column min-width="50" align="center" label='角色描述' prop="description"></el-table-column>
        <el-table-column min-width="50" align="center" label='人数' prop="number"></el-table-column>
        <el-table-column min-width="50" align="center" label='创建日期' prop="time"></el-table-column>
        <el-table-column min-width="50" align="center" label='操作'>
          <template slot-scope="scope">
            <span class="edit" @click="handlePushPage(scope.$index)">权限分配</span>
            <span class="edit" @click="handleShowEditDialog(scope.$index)">编辑</span>
          </template>
        </el-table-column>
      </el-table>
    </TableWrapper>
    <el-dialog :title="editDialogTitle" :visible.sync="isShowEditDialog">
      <el-form :model="editForm" :rules="rules" ref="editform" class="edit-form">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import RadioGroup from '@/components/RadioGroup'
import {pagingParams} from '@/views/const'
import DatePicker from '@/components/DatePicker'
import SearchBox from '@/components/SearchBox'
import TableWrapper from '@/components/TableWrapper'
import listMixins from '../listMixins'
import InfoCard from '../../components/InfoCard'
import { validateRequired, validateMobild } from '../validate'
const DEFAULT_EDIT_FORM = {
  name: '',
  description: ''
}
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
    return {
      requestData: {
        ...pagingParams
      },
      list: null,
      listLoading: true,
      totalCount: 0,
      isShowEditDialog: false,
      editDialogTitle: '添加角色',
      editForm: DEFAULT_EDIT_FORM,
      submitApi: 'addrightrole',
      rules: {
        name: {name: '角色名称', required: true, trigger: 'change', validator: validateRequired}
      }
    }
  },
  methods: {
    fetchData () {
      this.$API.showrightrole({
        data: {
          ...this.requestData
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
    handleShowEditDialog (index) {
      let id = null
      if (index !== undefined) {
        this.editDialogTitle = '编辑角色'
        this.submitApi = 'editrightrole'

        let role = this.list[index]
        id = role.id
      } else {
        this.submitApi = 'addrightrole'
        this.editDialogTitle = '添加角色'
      }
      this.$API.showrightroledetail({
        data: {id}
      })
        .then((res) => {
          if (res.data && Object.keys(res.data).length > 0) {
            this.editForm = res.data
          } else {
            this.editform = DEFAULT_EDIT_FORM
          }
        })
        .then(() => {
          this.isShowEditDialog = true
        })
    },
    handleSubmitEdit () {
      this.$refs.editform.validate((valid) => {
        if (valid) {
          this.$API[this.submitApi]({
            data: this.editform
          })
          .then(() => {
            this.fetchData()
            this.isShowEditDialog = false
          })
        }
      })
    },
    handleChange () {
      this.fetchData()
    },
    handlePushPage () {
      this.$message('功能尚在开发中...')
    }
  },
  mounted() {
    this.fetchData()
  },
}
</script>
<style lang="scss">
  @import  '../../styles/vars.scss';
  $padding: 20px;
  .role-page {
    padding: 0;
    .list {
      margin: $padding;
      width: auto;
    }
    .edit, .remove {
      display: inline-block;
      padding: 0 5px;
      color: $c0;
      cursor: pointer;
    }
    .remove {
      color: $c1;
    }
    .pagination-container {
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
    }
    .el-form-item {
      display: flex;
    }
    .el-form-item__content, .el-date-editor {
      flex: 1;
      width: 100%;
    }
    .el-form-item__label {
      min-width: 6em;
    }
    .edit-form {
      padding-top: 10px;
    }
  }
</style>
