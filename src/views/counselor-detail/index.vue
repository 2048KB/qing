<template>
  <div class="counselor-detail-container">
    <el-row>
      <el-col :span="16">
        <div class="grid-content">
          <!-- 职业信息 -->
          <el-card class="box-card detail-card detail-card--user" shadow="never">
            <div slot="header" class="clearfix">
              <span>职业信息</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">
                <div class="icon"></div>
              </el-button>
            </div>

            <div class="detail-card--body detail-card__body--user">
              <el-row>
                <el-col :span="6">
                  <div class="th">
                    <div class="img"><img src="../../assets/images/qq-18.png" alt=""></div>
                    <el-button type="primary">更换头像</el-button>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="meta">
                    <p class="name">{{ employeeDetail.realityName }}</p>
                    <p><i class="qq qq-19"></i>{{ employeeDetail.sno }}</p>
                    <p><i class="qq qq-20"></i>{{ employeeDetail.entryDate }}</p>
                    <p><i class="qq qq-21"></i>{{ employeeDetail.remark }}</p>
                    <div>
                      <el-button type="success" plain>{{ employeeDetail.storeId }}</el-button>
                      <el-button type="success" plain>{{ employeeDetail.storeName }}</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <!-- 账户信息 -->
          <el-card class="box-card detail-card detail-card--zhxx" shadow="never">
            <div slot="header" class="clearfix">
              <span>账户信息</span>
            </div>

            <div class="detail-card__body">
              <!-- row1 -->
              <div class="clearfix row row1">
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">{{ userFunds.balance }}</div>
                    <div class="title">总资产</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">{{ userFunds.availableBalance }}</div>
                    <div class="title">账户余额</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">{{ userFunds.freeze }}</div>
                    <div class="title">冻结金额</div>
                  </el-col>
                </div>
              </div>
              <hr class="style-one">
              <!-- row2 -->
              <div class="clearfix row row2">
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">{{ userAmountByUserId }}</div>
                    <div class="title">累计赚取奖励</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">{{ userCurMonDirectAmount }}</div>
                    <div class="title">本月直接赚取奖励</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">{{ userCurMonInDirectAmount }}</div>
                    <div class="title">本月间接赚取奖励</div>
                  </el-col>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 邀请信息 -->
          <el-card class="box-card detail-card detail-card--yqxx" shadow="never"">
            <div slot="header" class="clearfix">
              <span>邀请信息</span>
            </div>

            <div class="detail-card__body">
              <div class="clearfix row">
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">{{ counselorSpreadMember }}</div>
                    <div class="title">累计邀请会员</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">{{ counselorCurMonSpreadMember }}</div>
                    <div class="title">本月邀请会员</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">{{ counselorCurMonSpreadCustomer }}</div>
                    <div class="title">本月邀请顾客</div>
                  </el-col>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 当月佣金 -->
          <el-card class="box-card detail-card detail-card--yj" shadow="never">
            <div slot="header" class="clearfix">
              <span>当月佣金明细</span>
            </div>

            <div class="detail-card__body detail-card__body--yj">
              <el-table :data="yjLists" stripe style="width: 100%">
                <el-table-column prop="time" width="160" label="日期"></el-table-column>
                <el-table-column prop="inviterRealName" width="100" label="邀请人姓名"></el-table-column>
                <el-table-column prop="inviterMobile" width="120" label="邀请人手机号"> </el-table-column>
                <el-table-column prop="inviteeName" width="120" label="邀请会员昵称"> </el-table-column>
                <el-table-column prop="inviteeMobile" width="120" label="邀请会员手机号"> </el-table-column>
                <el-table-column prop="typeStr" width="100" label="佣金类别"> </el-table-column>
                <el-table-column prop="type" width="120" label="奖励金额（元）"> </el-table-column>
              </el-table>

              <div class="block pagination">
                <el-pagination
                  layout="prev, pager, next"
                  :total="1000">
                </el-pagination>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>

      <!-- right column -->
      <el-col :span="8">
        <div class="grid-content">
          <!-- 个人信息 -->
          <el-card class="box-card detail-card detail-card--userinfo" shadow="never">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="infodialogFormVisible = true">
                <div class="icon"></div>
              </el-button>
            </div>
            <div class="detail-card__body detail-card__body--userinfo">
              <p><i class="qq qq-23"></i>{{ employeeDetail.mobile }}</p>
              <p><i class="qq qq-24"></i>{{ employeeDetail.birthDate }}</p>
              <p><i class="qq qq-25"></i>{{ employeeDetail.address }}</p>
              <p><i class="qq qq-26"></i>{{ employeeDetail.email }}</p>
              <p><i class="qq qq-27"></i>{{ employeeDetail.qq }}</p>
              <p><i class="qq qq-28"></i>{{ employeeDetail.idNumber }}</p>
            </div>
          </el-card>
        </div>

        <!-- 所属顾问 -->
        <div class="grid-content">
          <el-card class="box-card detail-card detail-card--counselor" shadow="never">
            <div slot="header" class="clearfix">
              <span>所属顾问</span>
            </div>
            <div class="detail-card__body detail-card__body--counselor">
              <el-row>
                <el-col :span="5">
                  <div class="th">
                    <div class="img"><img src="../../assets/images/qq-18.png" alt=""></div>
                  </div>
                </el-col>
                <el-col :span="19">
                  <div class="meta">
                    <p class="name">{{ employeeDetail.realityName }}</p>
                    <p><i class="qq qq-23"></i>{{ employeeDetail.idNumber }}</p>
                    <div>
                      <el-button type="success" plain>顾问</el-button>
                    </div>
                  </div>
                  <div class="exlink"><i class="qq qq-31"></i>详情</div>
                </el-col>
              </el-row>
            </div>
          </el-card>
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
export default {
  name: 'counselor-detail',
  data() {
    /*
    <p><i class="qq qq-23"></i>{{ employeeDetail.mobile }}</p>
    <p><i class="qq qq-24"></i>{{ employeeDetail.birthDate }}</p>
    <p><i class="qq qq-25"></i>{{ employeeDetail.address }}</p>
    <p><i class="qq qq-26"></i>{{ employeeDetail.email }}</p>
    <p><i class="qq qq-27"></i>{{ employeeDetail.qq }}</p>
    <p><i class="qq qq-28"></i>{{ employeeDetail.idNumber }}</p>
     */
    return {
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
      userAmountByUserId: '',
      userCurMonDirectAmount: '',
      userCurMonInDirectAmount: '',
      counselorSpreadMember: '',
      counselorCurMonSpreadMember: '',
      counselorCurMonSpreadCustomer: '',
      counselorCurMonSpreadCustomer: '',
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
      employeeDetail: {
        mobile: '1234567890'
      },
      userFunds: {},
      yjLists: [],
      tableData3: [{
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32',
        "inviterMobile": "13111111119",
        "inviterRealName": "赵燕",
        "typeStr": "双人奖",
        "amount": 1200.00,
        "inviteeName": "dsadasqw",
        "inviteeMobile": "12345678999",
        "time": "2018-07-07 17:10:29"
      }]
    }
  },
  created() {
    console.log(this.$API)
    // console.log(this.$loading())

    // setTimeout(() => {
    //   this.$loading().close()
    // }, 2000)
    // 顾问详情
    this.$API.getcounselordetail({
      data: {
        admin: 1,
        pwd: 2
      }
    }).then((res) => {
      this.employeeDetail = res.data.employeeDetail
      this.userFunds = res.data.userFunds
      this.userCurMonDirectAmount = res.data.userCurMonDirectAmount
      this.userCurMonInDirectAmount = res.data.userCurMonInDirectAmount
      this.userAmountByUserId = res.data.userAmountByUserId
      this.counselorCurMonSpreadCustomer = res.data.counselorCurMonSpreadCustomer
      this.counselorCurMonSpreadMember = res.data.counselorCurMonSpreadMember
      this.counselorSpreadMember = res.data.counselorSpreadMember

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
    updateInfo() {
      this.$API.updatecounselor({
        data: this.infoform
      }).then(res => {

      })
      console.log(this.infoform)
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

.grid-content {
  padding: 10px;
}

.detail-card {
  margin-bottom: 30px;
}

.el-card__header {
  background: red !important;
}
</style>
