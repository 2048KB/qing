<template>
  <div>
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
          <el-form :model="infoform">
            <el-form-item label="入职日期" :label-width="formLabelWidth">
              <el-input v-model="form.date" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="所属门店" :label-width="formLabelWidth">
              <el-select v-model="areaName" placeholder="请选择活动区域" :disabled="true"></el-select>
              <el-select v-model="storeName" placeholder="请选择活动区域" :disabled="true"></el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
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
      <div class="edit-modal edit-modal--zyxx">
        <el-dialog title="编辑个人信息" :visible.sync="infodialogFormVisible">
          <el-form :model="infoform">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名*" :label-width="formLabelWidth">
                  <el-input v-model="infoform.realityName" auto-complete="on"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别*" :label-width="formLabelWidth">
                  <el-radio v-model="infoform.sex" label="1">男</el-radio>
                  <el-radio v-model="infoform.sex" label="2">女</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="出生日期*" :label-width="formLabelWidth">
                  <el-date-picker v-model="infoform.birthDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号*" :label-width="formLabelWidth">
                  <el-input v-model="infoform.mobile" auto-complete="on"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="infoform.email" auto-complete="on"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="QQ" :label-width="formLabelWidth">
                  <el-input v-model="infoform.qq" auto-complete="on"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证" :label-width="formLabelWidth">
                  <el-input v-model="infoform.idNumber" auto-complete="on" placeholder="18位"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="员工编号*" :label-width="formLabelWidth">
                  <el-input v-model="infoform.sno" auto-complete="on"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="通讯地址" :label-width="formLabelWidth">
                  <el-input type="textarea" :rows="4" placeholder="限制30字" v-model="infoform.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
        remark: ''
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
      formLabelWidth: '120px',
      employeeDetail: {},
      counselorOfBeautician: {},
      userFunds: {},
      yjLists: [],
      queryRoleType: '',
      queryId: ''
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
      this.setBtnLoading()

      // 更新顾问信息
      if (this.$route.query.role == 2) {
        this.$API.updatecounselor({
          data: this.infoform
        }).then(res => {
          setTimeout(() => {
            this.dialogFormVisible = false
            this.infodialogFormVisible = false
            this.resetBtnLoading(res.code, res.msg)
          }, 1000)
        })
      }

      // 更新美容师信息
      if (this.$route.query.role ==1) {
        this.$API.updatebeautician({
          data: this.infoform
        }).then(res => {
          setTimeout(() => {
            this.dialogFormVisible = false
            this.infodialogFormVisible = false
            this.resetBtnLoading(res.code, res.msg)
          }, 1000)
        })
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

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.detail-card {
  margin-bottom: 30px;
}

.el-card__header {
  background: red !important;
}
</style>
