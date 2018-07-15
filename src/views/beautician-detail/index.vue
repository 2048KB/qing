<template>
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
          <card-youjin :lists="yjLists"></card-youjin>
        </div>
      </el-col>

      <!-- right column -->
      <el-col :span="8">
        <div class="grid-content">
          <!-- 个人信息 -->
          <card-info :employeeDetail="employeeDetail" @updateUserInfoDetail="updateInfoDetail"></card-info>

          <!-- 所属顾问 -->
          <card-ssgw :inviterinfo="counselorOfBeautician"></card-ssgw>
        </div>
      </el-col>
    </el-row>

    <!-- 编辑职业信息弹窗 -->
    <div class="edit-modal edit-modal--zyxx">
      <el-dialog title="编辑职业信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="入职日期" :label-width="formLabelWidth">
            <el-input v-model="form.date" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所属门店" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域" :disabled="true">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.shopid" placeholder="请选择活动区域" :disabled="true">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateInfo">确 定</el-button>
        </div>
      </el-dialog>
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

export default {
  name: 'counselor-detail',
  components: {
    CardYoujin,
    CardZhxx,
    CardYqxx,
    CardInfo,
    CardSsgw,
    CardZyxx
  },
  data() {
    return {
      counselorOfBeautician: {},
      inviters: {
        total: '',
        monthly: '',
        totalcustomers: ''
      },
      infoform: {
        mobile: '',
        birthDate: '',
        address: '',
        qq: '',
        idNumber: '',
        sex: '',
        realityName: ''
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
      userFunds: {},
      yjLists: []
    }
  },

  created() {
    // 获取美容师详情
    this.$API.getbeauticiandetail({
      data: {
        id: 124567, // Long  必须  员工id
      }
    }).then((res) => {
      this.employeeDetail = res.data.employeeDetail
      this.userFunds = res.data.userFunds

      // 账户信息
      this.userFunds.userCurMonDirectAmount = res.data.userCurMonDirectAmount
      this.userFunds.userCurMonInDirectAmount = res.data.userCurMonInDirectAmount
      this.userFunds.userAmountByUserId = res.data.userAmountByUserId

      // 邀请会员信息
      this.inviters.total = res.data.beauticianSpreadMember
      this.inviters.monthly = res.data.beauticianCurMonSpreadMember
      this.inviters.totalcustomers = res.data.beauticianCurMonSpreadCustomer

      // 所属顾问
      this.counselorOfBeautician = res.data.counselorOfBeautician

      // 同步编辑个人信息数据
      this.infoform.mobile = res.data.employeeDetail.mobile
      this.infoform.birthDate = res.data.employeeDetail.birthDate
      this.infoform.email = res.data.employeeDetail.email
      this.infoform.qq = res.data.employeeDetail.qq
      this.infoform.idNumber = res.data.employeeDetail.idNumber
      this.infoform.realityName = res.data.employeeDetail.realityName
      this.infoform.sex = res.data.employeeDetail.sex + ''
      this.infoform.sno = res.data.employeeDetail.sno
      this.infoform.address = res.data.employeeDetail.address

      console.log('====== API RESPONSE ======')
      console.log(res)
      console.log('====== END API RESPONSE ======')
    })

    this.getListcounselorcurmonbonus()
  },

  methods: {
    // 更新个人信息到服务器
    commitInfoDetail() {
      alert('更新个人信息到服务器')
    },
    // 展示 更新个人信息弹窗
    updateInfoDetail() {
      this.infodialogFormVisible = true
    },

    // 更新个人信息到服务器
    commitInfo() {
      alert('更新职业信息到服务器')
      this.$API.updatecounselor({
        data: this.infoform
      }).then(res => {

      })
      console.log(this.infoform)
    },

    // 展示 更新个人信息弹窗
    updateInfo() {
      this.dialogFormVisible = true
    },

    getListcounselorcurmonbonus() {
      // 当月佣金明细
      this.$API.listcounselorcurmonbonus({
        data: {

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
