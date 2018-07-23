<template>
  <div class="app-container admin-page">
    <div class="top-bar">
      <el-button class="add-member-buttom" icon="el-icon-plus" @click="handleShowEditDialog(undefined)">添加</el-button>
    </div>
    <TableWrapper title="管理员列表" :total="totalCount" @current-change="handleChangeCurrent">
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
        <el-table-column min-width="50" align="center" label='用户名' prop="name"></el-table-column>
        <el-table-column min-width="50" align="center" label='真实姓名' prop="realityName"></el-table-column>
        <el-table-column min-width="50" align="center" label='手机号' prop="mobile"></el-table-column>
        <el-table-column min-width="50" align="center" label='角色' prop="roleName"></el-table-column>
        <el-table-column min-width="100" align="center" label='状态' prop="lockStatus">
          <template slot-scope="scope">
            {{list[scope.$index].lockStatus == 0 ? '启用' : '停用'}}
          </template>
        </el-table-column>
        <el-table-column min-width="50" align="center" label='创建日期' prop="time"></el-table-column>
        <el-table-column min-width="50" align="center" label='操作'>
          <template slot-scope="scope">
            <span class="edit" @click="handleShowEditDialog(scope.$index)">编辑</span>
            <span class="remove" v-if="list[scope.$index].roleId != 1" @click="handleShowRemoveDialog(scope.$index)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </TableWrapper>
    <el-dialog :title="editDialogTitle" :visible.sync="isShowEditDialog">
      <el-form :model="editForm" :rules="rules" ref="editform" class="edit-form">
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入4-16位字母或字母数字组合的用户名" maxlength="16" v-model="editForm.name" :disabled="editDialogTitle.indexOf('编辑') > -1"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realityName">
          <el-input placeholder="请输入真实姓名" maxlength="16" v-model="editForm.realityName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input placeholder="请输入手机号" v-model="editForm.mobile" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop="roleId">
          <el-select v-model="editForm.roleId" placeholder="请选择">
            <el-option v-for="role in listRole" :key="role.roleId" :label="role.name" :value="role.roleId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入6-15位数字字母组合密码" maxlength="15" v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="lockStatus">
          <el-radio-group v-model="editForm.lockStatus">
            <el-radio :label="0">停用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="remove-dialog" title="删除管理员" :visible.sync="isShowRemoveDialog">
      <span>您确定要删除该管理员吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelRemove">取 消</el-button>
        <el-button type="primary" @click="handleRemove">确 定</el-button>
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
  realityName: '',
  mobile: '',
  roleId: '',
  password: '',
  lockStatus: 1
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
      editDialogTitle: '添加管理员',
      editForm: DEFAULT_EDIT_FORM,
      listRole: {},
      submitApi: 'addsupervisor',
      rules: {
        name: {name: '用户名', minlength: 4, trigger: 'change', validator: validateRequired},
        realityName: {name: '真实姓名', required: true, trigger: 'change', validator: validateRequired},
        mobile: {name: '手机号', required: true, trigger: 'change', validator: validateMobild},
        roleId: {message: '请选择所属角色', required: true, trigger: 'change', validator: validateRequired},
        password: {name: '密码', minlength: 6, required: true, trigger: 'change', validator: validateRequired},
        lockStatus: {message: '请选择锁定状态', required: true, trigger: 'change', validator: validateRequired},
      },
      isShowRemoveDialog: false,
      removeIndex: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$API.showsupervisor({
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
        this.editDialogTitle = '编辑管理员'
        this.submitApi = 'editsupervisor'
        id = this.list[index].id
      } else {
        this.submitApi = 'addsupervisor'
        this.editDialogTitle = '添加管理员'
      }
      this.$API.showsupervisordetail({
        data: {id}
      })
        .then((res) => {
          this.listRole = res.data.listRole

          this.editForm = {
            roleId: res.data.roleId,
            ...(res.data.supervisor || DEFAULT_EDIT_FORM)
          }
        })
        .then(() => {
          console.log(this.listRole)
          this.isShowEditDialog = true
        })
    },
    handleShowRemoveDialog (index) {
      this.isShowRemoveDialog = true
      this.removeIndex = index
    },
    handleCancelRemove () {
      this.isShowRemoveDialog = false
      this.removeIndex = null
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
    handleRemove () {
      this.$API.delsupervisor({
        data: {
          id: this.list[this.removeIndex].id
        }
      })
      .then(() => {
        this.removeIndex = null
        this.fetchData()
        this.isShowRemoveDialog = false
      })
    },
    handleChange () {
      this.fetchData()
    }
  }
}
</script>
<style lang="scss">
  @import  '../../styles/vars.scss';
  $padding: 20px;
  .admin-page {
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
    .edit-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
        display: flex;
        padding: 0 10px;
        .el-form-item__content, .el-date-editor {
          flex: 1;
          width: 100%;
        }
        .el-form-item__label {
          min-width: 6em;
        }
      }
    }
    .remove-dialog {
      .el-dialog__body {
        text-align: center;
        padding-top: 60px;
        padding-bottom: 60px;
      }
    }
  }
</style>
