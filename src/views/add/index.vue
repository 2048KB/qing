<template>
  <div class="add-page">
    <div class="top-bar">
      <el-button class="add-member-buttom" icon="el-icon-edit" @click="handleSubmit">保存</el-button>
    </div>
    <div class="form-container unify-wrapper">
      <TableWrapper title="个人信息" class="personal-info-form">
        <el-form :model="formData" :rules="rules" ref="form1">
          <UploadBox v-model="formData.photo"></UploadBox>
          <el-form-item label="姓名"  prop="realityName">
            <el-input placeholder="请输入真实姓名" maxlength="16" v-model="formData.realityName"></el-input>
          </el-form-item>
          <el-form-item label="性别"  prop="sex">
            <el-radio-group v-model="formData.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthDateStr">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="formData.birthDateStr"></el-date-picker>
          </el-form-item>
          <el-form-item label="手机号"  prop="mobile">
            <el-input placeholder="请输入手机号" v-model="formData.mobile" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input maxlength="32" placeholder="请输入常用邮箱" v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="QQ号" prop="qq">
            <el-input placeholder="请输入5-11位QQ号" minlength="5" maxlength="11" v-model="formData.qq"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input maxlength="18" placeholder="请输入身份证号" v-model="formData.idNumber"></el-input>
          </el-form-item>
          <el-form-item label="员工编码">
            <el-input placeholder="BJCYMZYD-000001" disabled v-model="formData.sno"></el-input>
          </el-form-item>
          <el-form-item label="通讯地址">
            <el-input placeholder="请输入常用地址" v-model="formData.address" maxlength="60"></el-input>
          </el-form-item>
        </el-form>
      </TableWrapper>
      <TableWrapper title="职业信息" class="career-info-form">
        <el-form :model="formData" :rules="rules" ref="form2">
          <el-form-item label="入职日期"  prop="entryDateStr">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="formData.entryDateStr"></el-date-picker>
          </el-form-item>
          <el-form-item label="所属门店"  prop="storeId" class="store-select-box" ref="selectStore">
            <el-select placeholder="请选择" v-model="areaStore">
              <el-option v-for="area in storeAreaOptions" :key="area.id" :label="area.name" :value="area.id"></el-option>
            </el-select>
            <el-select placeholder="请选择" v-model="formData.storeId">
              <el-option v-for="store in storeOptions" :key="store.id" :label="store.name" :value="store.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="pageData.roleType === 1" label="顾问列表"  prop="parentId">
            <el-select placeholder="请选择" v-model="formData.parentId">
              <el-option v-for="consultant in consultantListOptions" :key="consultant.id" :label="consultant.realityName" :value="consultant.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input maxlength="200" type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>
        </el-form>
      </TableWrapper>
    </div>
  </div>
</template>

<script>
import TableWrapper from '../../components/TableWrapper'
import UploadBox from '../../components/UploadBox'
import { validateRequired, validateMobild, validateRealityName, validateEmail, validateQQ } from '../validate'
import {roleType} from '@/views/const'
const DEFAULT_OPTIONS = [{
  id: '',
  name: '请选择',
  realityName: '请选择'
}]

const ROLE_MAP = {
  ConsultantAdd: {
    submitApi: 'savecounselor',
    roleType: roleType.consultant,
    listUrl: '/employee/consultant/list',
  },
  BeauticianAdd: {
    submitApi: 'savebeautician',
    roleType: roleType.beautician,
    listUrl: '/employee/beautician/list',
  }
}
export default {
  components: {
    TableWrapper,
    UploadBox
  },
  data () {
    return {
      formData: {
        photo: '',
        realityName: '',
        sex: '1',
        birthDateStr: '',
        mobile: '',
        email: '',
        qq: '',
        idNumber: '',
        sno: '',
        address: '',
        entryDateStr: '',
        storeId: '',
        remark: '',
        parentId: ''
      },
      rules: {
        realityName: {name: '姓名', required: true, trigger: 'blur', validator: validateRealityName},
        sex: {name: '性别', required: true, trigger: 'blur', validator: validateRequired},
        birthDateStr: {message: '请选择出生日期', required: true, trigger: 'blur', validator: validateRequired},
        mobile: {name: '手机号', required: true, trigger: 'blur', validator: validateMobild},
        entryDateStr: {message: '请选择入职日期', required: true, trigger: 'blur', validator: validateRequired},
        storeId: {message: '请选择所属门店', required: true, trigger: '', validator: validateRequired},
        email: {trigger: 'blur', validator: validateEmail},
        qq: {trigger: 'blur', validator: validateQQ},
        parentId: {message: '请选择所属顾问', required: true, validator: validateRequired}
      },
      storeAreaOptions: DEFAULT_OPTIONS,
      storeOptions: DEFAULT_OPTIONS,
      consultantListOptions: DEFAULT_OPTIONS,
      areaStore: '',
      pageData: ROLE_MAP[this.$route.name] || {}
    }
  },
  watch: {
    areaStore (areaId) {
      if (areaId > 0) {
        this.$API.liststores({
          data: {
            areaId
          }
        })
        .then((res) => {
          if (res.data && res.data.length > 0) {
            this.storeOptions = res.data
            this.formData.storeId = ''
            // this.$nextTick(() => {
            //   this.$refs.selectStore.validate()
            // })
          }
        })
      }
    },
    storeId (val) {
      this.$API.getemployeemaxsno({
        data: {storeId: val}
      }).then((res) => {
        this.formData.sno = res.data
      })

      if (this.pageData.roleType === 1) {
        this.$API.listcounselors()
          .then((res) => {
            this.consultantListOptions = DEFAULT_OPTIONS.concat(res.data.page)
          })
      }
    },
    $route () {
      this.pageData = ROLE_MAP[this.$route.name]
      this.fetchData()
    }
  },
  computed: {
    storeId () {
      return this.formData.storeId
    }
  },
  methods: {
    fetchData () {
      // 获取所属门店信息
      this.$API.liststoreareas()
        .then((res) => {
          this.storeAreaOptions = DEFAULT_OPTIONS.concat(res.data)
        })
    },
    handleValidate () {
      let form1 = new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.$refs.form1.validate((valid) => {
            if (valid) {
              resolve(valid)
            } else {
              reject(valid)
            }
          })
        })
      })
      let form2 = new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.$refs.form2.validate((valid) => {
            if (valid) {
              resolve(valid)
            } else {
              reject(valid)
            }
          })
        })
      })
      return Promise.all([form1, form2])
    },
    handleSubmit () {
      this.handleValidate()
        .then((res) => {
          this.$API[this.pageData.submitApi]({
            data: this.formData
          })
          .then(() => {
            this.$router.push({
              path: this.pageData.listUrl
            })
          })
        })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss">
@import '../../styles/vars.scss';
.add-page {
  .TableWrapper  {
    margin-left: 10px;
    margin-right: 10px;
  }
  .el-form {
    padding: 20px;
  }
  .el-form-item {
    display: flex;
    .el-form-item__content, .el-date-editor {
      flex: 1;
      width: 100%;
    }
    .el-form-item__label {
      min-width: 6em;
    }
  }
  .personal-info-form {
    width: 62.5%;
    .el-form {
      display: flex;
      flex-wrap: wrap;
    }
    .el-form-item {
      width: 50%;
      padding-right: 20px;
      &:last-child {
        flex: 1;
      }
    }
  }
  .UploadBox {
    width: 100%;
    padding-bottom: 40px;
  }
  .form-container {
    display: flex;
    padding: 0 10px;
    .TableWrapper {
      min-width: auto;
    }
  }
  .career-info-form {
    width: 37.2%;
  }
  .store-select-box {
    .el-form-item__content {
      display: flex;
      .el-select {
        width: 50%;
      }
      .el-select:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>