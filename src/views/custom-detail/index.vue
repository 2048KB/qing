<template>
  <div class="counselor-detail-container">
    <el-row>
      <el-col :span="16">
        <div class="grid-content padding-left-none">
          <!-- 职业信息 -->
          <card-zyxx :employeeDetail="employeeDetail" :isCustom="true" :hideEdit="true">
            <span>个人信息</span>
          </card-zyxx>

          <!-- 账户信息 -->
          <!-- <card-zhxx :userFunds="userFunds"></card-zhxx> -->

          <!-- 邀请信息 -->
          <!-- <card-yqxx :obj="inviters"></card-yqxx> -->

          <!-- 当月佣金 -->
          <!-- <card-youjin :lists="yjLists"></card-youjin> -->
        </div>
      </el-col>

      <!-- right column -->
      <el-col :span="8">
        <div class="grid-content">
          <!-- 收货地址 -->
          <card-address :address="listUserAddress"></card-address>

          <!-- 直接邀请人 -->
          <card-ssgw :inviterinfo="memberVO" :type="1" @activeReBind="rebindRe">
            <span>直接邀请人</span>
          </card-ssgw>

          <!-- 间接邀请人 -->
<!--           <card-ssgw :inviterinfo="inMemberVO" :type="2">
            <span>间接邀请人</span>
          </card-ssgw> -->

          <!-- 修改间接邀请人 -->
<!--           <card-ssgw :inviterinfo="inMemberVO" :type="3" @activeReBind="rebindRe">
            <span>间接邀请人</span>
          </card-ssgw> -->

          <!-- 会员服务信息 -->
          <!-- <card-vipcard :cardlist="vipcardRecordArray"></card-vipcard> -->
        </div>
      </el-col>
    </el-row>

    <!-- 选择绑定邀请关系 -->
    <div class="edit-modal edit-modal--choose">
      <el-dialog title="更改邀请关系" :visible.sync="dialogFormVisible">
        <div class="wrap">
          <el-button type="primary" @click="selectGW">指定顾问</el-button>
          <el-button type="primary" @click="selectMYS">指定美容师</el-button>
          <el-button type="primary" @click="selectVIP">指定会员</el-button>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 处理绑定邀请关系 -->
    <!-- 处理绑定邀请关系 -->
    <div class="edit-modal edit-modal--rechoose">
      <el-dialog :title="modalTitle" :visible.sync="infodialogFormVisible">
        <el-form :inline="true" :model="infoform" class="demo-form-inline">
          <el-row class="row-filter">
            <el-col :span="7">
              <el-form-item label="">
                <el-select v-model="storeAreaName" placeholder="地区" :disabled="true">
                  <el-option label="上海" value="shanghai"></el-option>
                  <el-option label="北京" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="">
                <el-select v-model="storeName" placeholder="所属门店" :disabled="true">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="col-phone">
              <el-form-item label="">
                <el-input v-model="searchKey" placeholder="输入姓名/手机号"></el-input>
              </el-form-item>
            </el-col>
            <div @click="searchStoreUserLists">
              <el-col :span="2"><el-button type="primary" icon="el-icon-search">搜索</el-button></el-col>
            </div>
          </el-row>

          <div class="lists-wrap">
            <el-row v-for="item in storeUserLists" :key="item.id">
              <el-radio v-model="radio7" :label="item.id" border>
                <div class="item clearfix">
                  <div class="th">
                    <img src="../../assets/images/qq-36.png" alt="">
                  </div>
                  <div class="meta">
                    <div>{{ item.name }}</div>
                    <div><i class="qq qq-23 qq23-small"></i>{{ item.mobile }}</div>
                  </div>
                </div>
              </el-radio>
            </el-row>
          </div>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="infodialogFormVisible = false">取 消</el-button>
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
import CardAddress from '@/components/CardAddress'
import CardVipcard from '@/components/CardVipcard'

export default {
  name: 'counselor-detail',
  components: {
    CardYoujin,
    CardZhxx,
    CardYqxx,
    CardInfo,
    CardSsgw,
    CardZyxx,
    CardAddress,
    CardVipcard
  },
  data() {
    return {
      storeAreaName: '',
      storeUserType: '',
      storeName: '',
      searchKey: '',
      modalTitle: '',
      storeUserLists: [],

      vipcardRecordArray: [],
      radio7: '1',
      inviters: {
        counselorCurMonSpreadCustomer: '',
      },
      infoform: {
        mobile: '',
        birthDate: '',
        address: '',
        qq: '',
        idNumber: '',
        sex: '',
        realityName: '',
        storeName: "",
        storeAreaName: "",
        storeId: ""
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
      yjLists: [],
      listUserAddress: [],
      inviterinfo: {},
      memberVO: {},
      inMemberVO: {}
    }
  },

  created() {
    // `顾客详情` 和 `会员详情` 同一个接口 `getcustomerdetail`
    this.$API.getcustomerdetail({
      data: {
        type: 1, // 搜索类型 1:顾客  2:会员
        userId: '', // 用户id
        dirInviteId: '', // 直接邀请人id
        dirInviteRole: '', // 直接邀请人角色
        inDirInviteId: '', // 间接邀请人id
        inDirInviteRole: '', // 间接邀请人角色
      }
    }).then((res) => {
      // 收货地址
      this.listUserAddress = res.data.listUserAddress

      // 直接邀请人
      this.memberVO = res.data.memberVO

      // 间接邀请人
      this.inMemberVO = res.data.inMemberVO

      // 修改绑定关系弹窗信息
      this.storeName = res.data.storeName
      this.storeAreaName = res.data.storeAreaName
      this.storeId = res.data.storeId

      this.employeeDetail = res.data.user
      this.userFunds = res.data.userFunds
      this.userFunds.userCurMonDirectAmount = res.data.userCurMonDirectAmount
      this.userFunds.userCurMonInDirectAmount = res.data.userCurMonInDirectAmount
      this.userFunds.userAmountByUserId = res.data.userAmountByUserId

      this.inviters.counselorCurMonSpreadCustomer = res.data.counselorCurMonSpreadCustomer
      this.inviters.counselorCurMonSpreadMember = res.data.counselorCurMonSpreadMember
      this.inviters.counselorSpreadMember = res.data.counselorSpreadMember

      // 同步编辑个人信息数据
      // this.infoform.mobile = res.data.employeeDetail.mobile
      // this.infoform.birthDate = res.data.employeeDetail.birthDate
      // this.infoform.email = res.data.employeeDetail.email
      // this.infoform.qq = res.data.employeeDetail.qq
      // this.infoform.idNumber = res.data.employeeDetail.idNumber
      // this.infoform.realityName = res.data.employeeDetail.realityName
      // this.infoform.sex = res.data.employeeDetail.sex + ''
      // this.infoform.sno = res.data.employeeDetail.sno
      // this.infoform.address = res.data.employeeDetail.address
      // this.infoform.storeName = res.data.storeName
      // this.infoform.storeAreaName = res.data.storeAreaName
      // this.infoform.storeId = res.data.storeId
    })

    this.getListcounselorcurmonbonus()

    // 会员卡服务记录
    this.getListcarduse()

    // 获取邀请人
    // this.getInviterinfo()

    // 获取门店会员列表
    this.geLlistuserbystoreid()
  },

  methods: {
    rebindRe() {
      this.dialogFormVisible = true
    },

    changeBind() {
      this.modalTitle = '更改邀请'
    },

    rebindChoose() {
      this.modalTitle = '绑定邀请关系'
    },

    selectGW() {
      this.storeUserType = 4
      this.dialogFormVisible = false
      this.infodialogFormVisible = true
    },

    selectMYS() {
      this.storeUserType = 3
      this.dialogFormVisible = false
      this.infodialogFormVisible = true
    },

    selectVIP() {
      this.storeUserType = 2
      this.dialogFormVisible = false
      this.infodialogFormVisible = true
    },

    rebindRe() {
      this.dialogFormVisible = true
    },

    // 根据userId获取直接邀请人信息
    getInviterinfo() {
      this.$API.getinviterinfo({
        data: {
          userId: '' // 必须  用户id
        }
      }).then(res => {
        this.inviterinfo = res.data
      })
    },

    // 获取门店会员列表
    geLlistuserbystoreid(data) {
      this.$API.listuserbystoreid({
        // data: {
        //   storeId: 34213, //  Long  必须  门店id
        //   type: 2, //  Int 必须  指定用户角色 2:会员  3:美容师  4:顾问
        //   key: '23431143' //  String    搜索姓名或手机号
        // }
        data: data
      }).then(res => {
        this.storeUserLists = res.data
      })
    },

    // 会员卡服务记录
    getListcarduse() {
      this.$API.listcarduse({
        data: {
          cardId: '', // 会员卡id
          currPage: '', // 当前页数
          pageSize: '' //每页显示数量
        }
      }).then((res) => {
        this.vipcardRecordArray = res.data.page
      })
    },

    // 换成更新顾客信息接口
    updateInfo() {
      alert(this.radio7)
      this.$API.updatecounselor({
        data: this.infoform
      }).then(res => {

      })
      console.log(this.infoform)
    },

    // 当月佣金明细
    getListcounselorcurmonbonus() {
      this.$API.listcounselorcurmonbonus({
        data: {

        }
      }).then((res) => {
        this.yjLists = res.data.page
      })
    },

    // 点击搜索
    searchStoreUserLists() {
      alert('search')
      this.geLlistuserbystoreid({
        storeId: this.storeId,
        type: this.storeUserType,
        key: this.searchKey
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
