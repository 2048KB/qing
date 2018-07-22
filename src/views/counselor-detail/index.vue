<template>
  <div class="counselor-detail-page">
    <div class="top-bar"></div>
    <div class="counselor-detail-container">
      <el-row>
        <el-col :span="16">
          <div class="grid-content padding-left-none">
            <!-- 职业信息 -->
            <card-zyxx :employeeDetail="employeeDetail" @updateUserInfo="updateInfo"></card-zyxx>

            <!-- 账户信息 -->
            <card-zhxx :userFunds="userFunds"></card-zhxx>

            <!-- 邀请信息 -->
            <card-yqxx :obj="inviters"></card-yqxx>

            <!-- 当月佣金 -->
            <card-youjin :lists="yjLists" :totalPages="pageCount" @triggerPagination="updateYoujin"></card-youjin>
          </div>
        </el-col>

        <!-- right column -->
        <el-col :span="8">
          <div class="grid-content">
            <!-- 个人信息 -->
            <card-info :employeeDetail="employeeDetail" @updateUserInfoDetail="updateInfoDetail"></card-info>

            <!-- 所属顾问 -->
            <card-ssgw :inviterinfo="counselorOfBeautician" v-show="!isEmptyObject(counselorOfBeautician)"></card-ssgw>
          </div>
        </el-col>
      </el-row>

      <!-- 编辑职业信息弹窗 -->
      <div class="edit-modal edit-modal--zyxx">
        <el-dialog title="编辑职业信息" :visible.sync="dialogFormVisible">
          <!-- <div v-loading="true" element-loading-text="Loading..."></div> -->
          <el-form class="zh-form" :rules="rules" :model="infoform" ref="form1">
            <el-form-item label="入职日期">
              <el-input v-model="form.date" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="所属门店">
              <el-select v-model="areaName" placeholder="请选择活动区域" :disabled="true"></el-select>
              <el-select v-model="storeName" placeholder="请选择活动区域" :disabled="true"></el-select>
            </el-form-item>
            <el-form-item label="所属顾问" v-if="queryRoleType == 1" prop="parentId">
              <el-select v-model="infoform.parentId" placeholder="所属顾问">
                <el-option
                  v-for="item in consultantList"
                  :key="item.id"
                  :label="item.realityName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="infoform.remark"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="commitInfo" :loading="btnLoading">{{ commitBtnText }}</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- 编辑个人信息弹窗 -->
      <div class="edit-modal edit-modal--zyxx form2-dialog">
        <el-dialog title="编辑个人信息" :visible.sync="infodialogFormVisible">
          <el-form class="zh-form form2" :model="infoform" ref="form2" :rules="rules">
            <el-form-item label="姓名" prop="realityName">
              <el-input v-model="infoform.realityName"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="infoform.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthDateStr">
              <el-date-picker :default-time="infoform.birthDateStr" v-model="infoform.birthDateStr" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="infoform.mobile" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="infoform.email" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input v-model="infoform.qq" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
              <el-input v-model="infoform.idNumber" auto-complete="on" placeholder="18位"></el-input>
            </el-form-item>
            <el-form-item label="员工编号" prop="sno">
              <el-input v-model="infoform.sno" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址">
              <el-input type="textarea" :rows="4" placeholder="限制30字" v-model="infoform.address"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="infodialogFormVisible = false">取 消</el-button>
            <!-- <el-button type="primary" @click="commitInfoDetail">确 定</el-button> -->
            <el-button type="primary" @click="commitInfo" :loading="btnLoading">{{ commitBtnText }}</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import TableWrapper from '@/components/TableWrapper'
import CardYoujin from '@/components/CardYoujin'
import CardZhxx from '@/components/CardZhxx'
import CardYqxx from '@/components/CardYqxx'
import CardInfo from '@/components/CardInfo'
import CardSsgw from '@/components/CardSsgw'
import CardZyxx from '@/components/CardZyxx'
import CardAddress from '@/components/CardAddress'
import { validateRequired, validateMobild, validateRealityName, validateEmail, validateQQ } from '../validate'

export default {
  name: 'counselor-detail',
  components: {
    CardYoujin,
    CardZhxx,
    CardYqxx,
    CardInfo,
    CardSsgw,
    CardZyxx,
    CardAddress
  },
  watch: {
    $route () {
      this.handleCreated()
    }
  },
  data() {
    return {
      pageSize: 10,
      pageCount: 40,
      btnLoading: false,
      commitBtnText: '确 定',
      inviters: {
        total: '',
        monthly: '',
        totalcustomers: ''
      },
      storeName: '',
      areaName: '',
      infoform: {
        photo: '',
        realityName: '',
        sex: '',
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
      dialogTableVisible: false,
      dialogFormVisible: false,
      infodialogFormVisible: false,
      form: {
        date: '2018-02-23',
        name: '',
        region: '北京',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        remark: ''
      },
      employeeDetail: {},
      counselorOfBeautician: {},
      userFunds: {},
      yjLists: [],
      queryRoleType: '',
      queryId: '',
      consultantList: {},
      rules: {
        parentId: {message: '请选择所属顾问', required: true, validator: validateRequired},
        realityName: {name: '姓名', required: true, validator: validateRequired},
        sex: {message: '请选择性别', required: true, validator: validateRequired},
        mobile: {required: true, validator: validateMobild},
        birthDateStr: {message: '请选择出生日期', required: true, validator: validateRequired},
        sno: {name: '员工编号', required: true, validator: validateRequired}
      }
    }
  },

  created() {
    this.handleCreated()
  },

  methods: {
    handleCreated () {
      // 从路由拿角色，根据角色来调不同的接口 2 - 顾问，1 - 美容师
      this.queryRoleType = this.$route.query.role
      this.queryId = this.$route.query.id

      // 顾问详情
      if (this.$route.name === 'ConsultantDetail') {
        this.$API.getcounselordetail({
          data: {
            admin: 1,
            pwd: 2
          }
        }).then((res) => {
          this.employeeDetail = res.data.employeeDetail
          this.userFunds = res.data.userFunds

          // 账户信息
          this.userFunds.userCurMonDirectAmount = res.data.userCurMonDirectAmount // 本月用户直接赚取
          this.userFunds.userCurMonInDirectAmount = res.data.userCurMonInDirectAmount // 本月用户间接赚取
          this.userFunds.userAmountByUserId = res.data.userAmountByUserId // 用户累计赚取

          // 邀请会员信息
          this.inviters.total = res.data.counselorCurMonSpreadCustomer // 顾问本月邀请顾客
          this.inviters.monthly = res.data.counselorCurMonSpreadMember // 顾问本月邀请会员
          this.inviters.totalcustomers = res.data.counselorSpreadMember // 顾问累计邀请会员

          // 门店区域
          this.areaName = res.data.employeeDetail.areaName
          this.storeName = res.data.employeeDetail.storeName

          // 同步编辑个人信息数据（也是更新顾问接口入参）
          this.infoform.photo = res.data.employeeDetail.photo
          this.infoform.realityName = res.data.employeeDetail.realityName
          this.infoform.sex = res.data.employeeDetail.sex + ''
          this.infoform.birthDateStr = res.data.employeeDetail.birthDate
          this.infoform.mobile = res.data.employeeDetail.mobile
          this.infoform.email = res.data.employeeDetail.email
          this.infoform.qq = res.data.employeeDetail.qq
          this.infoform.idNumber = res.data.employeeDetail.idNumber
          this.infoform.sno = res.data.employeeDetail.sno
          this.infoform.address = res.data.employeeDetail.address
          this.infoform.entryDateStr = res.data.employeeDetail.entryDate
          this.infoform.storeId = res.data.employeeDetail.storeId
          this.infoform.remark = res.data.employeeDetail.remark

          // 依赖员工ID，所以要在取得员工ID之后再发请求
          this.getListcounselorcurmonbonus({
            id: res.data.employeeDetail.sno, // Long  必须  员工id
            currPage: 1, //  Int   当前页数
            pageSize: this.pageSize, //  Int   每页显示数量
          })
        })
      }


      // 获取美容师详情
      if (this.$route.name === 'BeauticianDetail') {
        this.$API.getbeauticiandetail({
          data: {
            id: this.$route.query.id
          }
        }).then((res) => {
          this.employeeDetail = res.data.employeeDetail
          this.userFunds = res.data.userFunds

          // 美容师所属顾问
          this.counselorOfBeautician = res.data.counselorOfBeautician

          // 账户信息
          this.userFunds.userCurMonDirectAmount = res.data.userCurMonDirectAmount // 本月用户直接赚取
          this.userFunds.userCurMonInDirectAmount = res.data.userCurMonInDirectAmount // 本月用户间接赚取
          this.userFunds.userAmountByUserId = res.data.userAmountByUserId // 用户累计赚取

          // 邀请会员信息
          this.inviters.total = res.data.beauticianSpreadMember // 美容师累计邀请会员
          this.inviters.monthly = res.data.beauticianCurMonSpreadMember // 美容师本月邀请会员
          this.inviters.totalcustomers = res.data.beauticianSpreadMember // 美容师本月邀请顾客

          // 门店区域
          this.areaName = res.data.employeeDetail.areaName
          this.storeName = res.data.employeeDetail.storeName

          // 同步编辑个人信息数据（也是更新顾问接口入参）
          this.infoform.photo = res.data.employeeDetail.photo
          this.infoform.realityName = res.data.employeeDetail.realityName
          this.infoform.sex = res.data.employeeDetail.sex + ''
          this.infoform.birthDateStr = res.data.employeeDetail.birthDate
          this.infoform.mobile = res.data.employeeDetail.mobile
          this.infoform.email = res.data.employeeDetail.email
          this.infoform.qq = res.data.employeeDetail.qq
          this.infoform.idNumber = res.data.employeeDetail.idNumber
          this.infoform.sno = res.data.employeeDetail.sno
          this.infoform.address = res.data.employeeDetail.address
          this.infoform.entryDateStr = res.data.employeeDetail.entryDate
          this.infoform.storeId = res.data.employeeDetail.storeId
          this.infoform.remark = res.data.employeeDetail.remark

          // 依赖员工ID，所以要在取得员工ID之后再发请求
          this.getListbeauticiancurmonbonus({
            id: res.data.employeeDetail.sno, // Long  必须  员工id
            currPage: 1, //  Int   当前页数
            pageSize: this.pageSize, //  Int   每页显示数量
          })
        })

        this.$API.listcounselors()
          .then((res) => {
            this.consultantList = res.data.page
          })
      }
    },
    updateYoujin(opts) {
      let data = {
        id: this.employeeDetail.sno, // Long  必须  员工id
        currPage: opts.currPage || 1, //  Int   当前页数
        pageSize: this.pageSize, //  Int   每页显示数量
      }

      // 更新顾问佣金列表
      if (opts.role == 2) {
        this.getListcounselorcurmonbonus({
          id: this.employeeDetail.sno, // Long  必须  员工id
          currPage: opts.currPage || 1, //  Int   当前页数
          pageSize: this.pageSize, //  Int   每页显示数量
        })
      }

      // 更新美容师佣金列表
      if (opts.role == 1) {
        this.getListbeauticiancurmonbonus(data)
      }
    },

    isEmptyObject(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    },

    setBtnLoading() {
      this.btnLoading = true
      this.commitBtnText = '加载中...'
    },

    resetBtnLoading(code = 0, msg, text = '确 定') {
      this.btnLoading = false
      this.commitBtnText = text || '确 定'

      if (+code < 0) {
        this.$message({
          message: msg || '服务异常，请稍后再试！',
          type: 'error'
        })
      } else {
        this.$message({
          message: msg || '成功',
          type: 'success'
        });
      }
    },

    // 更新个人信息到服务器
    commitInfoDetail() {
      alert('更新个人信息到服务器')
    },

    // 展示 更新个人信息弹窗
    updateInfoDetail() {
      this.infodialogFormVisible = true
    },

    // 更新个人信息、更新职业信息都为同一个接口（入参也一样）
    commitInfo() {
      // 更新美容师|顾问详情
      
      let api = null
      if (this.$route.query.role == 2) {
        api = 'updatecounselor'
      }
      if (this.$route.query.role == 1) {
        api = 'updatebeautician'
      }
      if (api) {
        let updatePromise = () => {
          this.setBtnLoading()
          this.$API[api]({
            data: this.infoform
          }).then(res => {
            setTimeout(() => {
              this.dialogFormVisible = false
              this.infodialogFormVisible = false
              this.resetBtnLoading(res.code, res.msg)
            }, 1000)
          })
        }
        if (this.dialogFormVisible === true) {
          this.$refs.form1.validate((valid) => {
            if (valid) {
              updatePromise()
            }
          })
        } else if (this.infodialogFormVisible = true) {
          this.$refs.form2.validate((valid) => {
            if (valid) {
              updatePromise()
            }
          })
        }
      }
    },

    // 展示 更新个人信息弹窗
    updateInfo() {
      this.dialogFormVisible = true
    },

    // 顾问当月佣金明细
    getListcounselorcurmonbonus(obj) {
      this.$API.listcounselorcurmonbonus({
        data: {
          id: obj.id || this.employeeDetail.sno, // Long  必须  员工id
          currPage: obj.currPage || 1, //  Int   当前页数
          pageSize: this.pageSize, //  Int   每页显示数量
        }
      }).then((res) => {
        this.yjLists = res.data.page
      })
    },

    // 美容师当月佣金
    getListbeauticiancurmonbonus(obj) {
      this.$API.listbeauticiancurmonbonus({
        data: {
          id: obj.id || this.employeeDetail.sno, // Long  必须  员工id
          currPage: obj.currPage || 1, //  Int   当前页数
          pageSize: this.pageSize, //  Int   每页显示数量
        }
      }).then((res) => {
        this.yjLists = res.data.page
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.counselor-detail-page {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  .detail-card {
    margin-bottom: 30px;
  }

  .zh-form {

    .el-form-item {
      display: flex;
      .el-form-item__label {
        display: inline-block;
        min-width: 6em;
      }
      .el-form-item__content {
        flex: 1;
        display: flex;
        .el-select {
          flex: 1;
          &:first-child {
            margin-right: 10px;
          }
        }
      }
      .el-date-editor {
        width: 100%;
      }
    }
  }
  .form2-dialog {
    min-width: 840px;
    .form2 {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
        padding: 0 10px;
        &:last-child {
          width: auto;
          flex: 1;
        }
      }
    }
    .el-radio-group {
      line-height: inherit;
      font-size: inherit;
    }
  }
}

</style>
