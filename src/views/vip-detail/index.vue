<template>
  <div>
    <div class="top-bar"></div>
    <div class="counselor-detail-container">
      <el-row>
        <el-col :span="16">
          <div class="grid-content padding-left-none">
            <!-- 职业信息 -->
            <card-zyxx :employeeDetail="employeeDetail" :isCustom="true" :hideEdit="true" :disableUploadImg="disableUploadImg">
              <span>个人信息</span>
            </card-zyxx>

            <!-- 账户信息 -->
            <card-zhxx :userFunds="userFunds" v-if="!isEmptyObject(userFunds)"></card-zhxx>

            <!-- 邀请信息 -->
            <card-yqxx :obj="inviters" v-if="!isEmptyObject(inviters)"></card-yqxx>

            <!-- 当月佣金 -->
            <card-youjin
              :lists="yjLists"
              :totalPages="pageCount"
              v-if="!isEmptyObject(inviters)"
              @triggerPagination="getListcounselorcurmonbonus"
              ></card-youjin>
          </div>
        </el-col>

        <!-- right column -->
        <el-col :span="8">
          <div class="grid-content">
            <!-- 收货地址 -->
            <card-address :address="listUserAddress" v-if="listUserAddress.length > 0"></card-address>

            <!-- 直接邀请人 -->
            <card-ssgw :inviterinfo="memberVO" :type="1" @activeReBind="rebindRe" v-if="!isEmptyObject(memberVO)">
              <span>直接邀请人</span>
            </card-ssgw>

            <!-- 间接邀请人 -->
            <card-ssgw :inviterinfo="inMemberVO" :type="2" v-if="!isEmptyObject(inMemberVO)" @activeReBind="rebindRe">
              <span>间接邀请人</span>
            </card-ssgw>

            <!-- 修改间接邀请人 -->
            <!-- <card-ssgw :inviterinfo="inMemberVO" :type="3" @activeReBind="rebindRe" v-if="!isEmptyObject(inMemberVO)"> -->
            <div v-show="addInvite">
              <!-- v-if="!isEmptyObject(inMemberVO)" -->
              <card-ssgw
                :inviterinfo="inMemberVO" :type="3" @activeReBind="rebindRe">
                <span>间接邀请人</span>
              </card-ssgw>
            </div>

            <!-- 会员服务信息 -->
            <card-vipcard
              :cardlist="vipcardRecordArray"
              v-if="vipcardRecordArray.length > 0"
              :totalPages="vipcardPageCount"
              @triggerVipcardPagination="getListcarduse"
              ></card-vipcard>
          </div>
        </el-col>
      </el-row>

      <!-- 选择绑定邀请关系 -->
      <div class="edit-modal edit-modal--choose">
        <el-dialog :title="modalTitle" :visible.sync="dialogFormVisible">
          <div class="wrap">
            <el-button type="primary" @click="selectGW">指定顾问</el-button>
            <el-button type="primary" @click="selectMYS">指定美容师</el-button>
            <el-button type="primary" @click="selectVIP">指定会员</el-button>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
          </div>
        </el-dialog>
      </div>

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
                <el-radio v-model="radio7" :label="item.id" border @change="selectSP(item)">
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
            <!-- <el-button type="primary" @click="updateinviter">确 定</el-button> -->
            <!-- <el-button type="primary" @click="updateinviter" :loading="btnLoading">{{ commitBtnText }}</el-button> -->
            <el-button type="primary" @click="activeConfimChange">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- 邀请关系确认 -->
      <div class="edit-modal edit-modal--conf">
        <el-dialog title="更改邀请" :visible.sync="dialogConfFormVisible">
          <div class="wrap">
            <div class="ttt">
              已指定{{ storeUserTypeStr }}
            </div>
            <div class="item clearfix">
              <div class="th">
                <img src="../../assets/images/qq-36.png" alt="">
              </div>
              <div class="meta">
                <div>{{ selectSPName }}</div>
                <div><i class="qq qq-23 qq23-small"></i>{{ selectSPMobile }}</div>
              </div>
            </div>
          </div>

          <div slot="footer" class="dialog-footer">
            <span class="float-left">
              <span><i class="qq qq-99"></i>通知{{ storeUserTypeStr }}</span>
            </span>

            <el-button @click="dialogConfFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateinviter" :loading="btnLoading">{{ commitBtnText }}</el-button>
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
import CardVipcard from '@/components/CardVipcard'
import DialogRebind from '@/components/DialogRebind'

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
    CardVipcard,
    DialogRebind
  },
  data() {
    return {
      dialogConfFormVisible: false,
      pageCount: 1,
      pageSize: 10,
      vipcardPageCount: 0,
      btnLoading: false,
      commitBtnText: '确 定',
      modalTitle: '',
      storeUserType: '',

      storeUserTypeStr: '',
      selectSPName: '',
      selectSPMobile: '',

      storeId: '',
      storeName: '',
      storeAreaName: '',
      vipcardRecordArray: [],
      searchKey: '',
      radio7: '',
      inviters: {},
      infoform: {
        mobile: '',
        birthDate: '',
        address: '',
        qq: '',
        idNumber: '',
        sex: '',
        realityName: '',
        storeAreaName: '',
        id: null
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
      inMemberVO: {},
      storeUserLists: [],
      disableUploadImg: true,
      vipcard: {},
      addInvite: false
    }
  },

  created() {
    this.init()
  },

  methods: {
    activeConfimChange() {
      this.dialogConfFormVisible = true
      this.infodialogFormVisible = false
    },

    selectSP(item) {
      this.selectSPName = item.name
      this.selectSPMobile = item.mobile
      this.selectSPId = item.id
      console.log(item)
    },

    init() {
      // 从路由拿角色，根据角色来调不同的接口 1- 顾客，2 - 会员
      this.queryRoleType = this.$route.query.role
      this.queryId = this.$route.query.id

      // 顾客详情
      if (this.$route.query.role == 1) {
        this.$API.getcustomerdetail({
          data: {
            type: this.$route.query.role, //  Int 必须  搜索类型1:顾客  2:会员
            userId: this.$route.query.id, //  Long  必须  用户id
            dirInviteId: this.$route.query.dirInviteId || '', //  Long    直接邀请人id
            dirInviteRole: this.$route.query.dirInviteRole || '', //  String    直接邀请人角色
            inDirInviteId: this.$route.query.inDirInviteId || '', //  Long    间接邀请人id
            inDirInviteRole: this.$route.query.inDirInviteRole || '', //  String    间接邀请人角色
            // cardId: this.$route.query.cardId || '', //   Long    会员卡id
          }
        }).then((res) => {
          // 用户基本信息
          this.employeeDetail = res.data.user
          this.employeeDetail.storeName = res.data.storeName

          // 隐藏更改绑定关系模块
          this.addInvite = res.data.addInvite

          // 更新个人信息需要新增id入参
          this.infoform.id = res.data.user.id

          // 用户账户信息
          // this.userFunds = res.data.userFunds

          // 账户信息
          // this.userFunds.userCurMonDirectAmount = res.data.userCurMonDirectAmount // 本月用户直接赚取
          // this.userFunds.userCurMonInDirectAmount = res.data.userCurMonInDirectAmount // 本月用户间接赚取
          // this.userFunds.userAmountByUserId = res.data.userAmountByUserId // 用户累计赚取

          // 邀请会员信息
          // this.inviters.total = res.data.userCurMonSpreadCustomer // 本月邀请顾客
          // this.inviters.monthly = res.data.userCurMonSpreadMember // 本月邀请会员
          // this.inviters.totalcustomers = res.data.userSpreadMember // 累计邀请会员

          // 门店区域
          this.storeAreaName = res.data.storeAreaName
          this.storeName = res.data.storeName

          // 用户收货地址
          this.listUserAddress = res.data.listUserAddress

          // 直接邀请人
          this.memberVO = res.data.memberVO

          // 间接邀请人
          this.inMemberVO = res.data.inMemberVO

          // 修改绑定关系弹窗信息
          this.storeName = res.data.storeName
          this.storeAreaName = res.data.storeAreaName
          this.storeId = res.data.storeId
        })
      }

      // 会员详情
      if (this.$route.query.role == 2) {
        this.$API.getmemberdetail({
          data: {
            type: this.$route.query.role, //  Int 必须  搜索类型1:顾客  2:会员
            userId: this.$route.query.id, //  Long  必须  用户id
            dirInviteId: this.$route.query.dirInviteId || '', //  Long    直接邀请人id
            dirInviteRole: this.$route.query.dirInviteRole || '', //  String    直接邀请人角色
            inDirInviteId: this.$route.query.inDirInviteId || '', //  Long    间接邀请人id
            inDirInviteRole: this.$route.query.inDirInviteRole || '', //  String    间接邀请人角色
            cardId: this.$route.query.cardId || '', //   Long    会员卡id
          }
        }).then((res) => {
          // 用户基本信息
          this.employeeDetail = res.data.user
          this.employeeDetail.storeName = res.data.storeName

          // 隐藏更改绑定关系模块
          this.addInvite = res.data.addInvite

          // 更新个人信息需要新增id入参
          this.infoform.id = res.data.user.id

          // 用户账户信息
          this.userFunds = res.data.userFunds

          // 账户信息
          this.userFunds.userCurMonDirectAmount = res.data.userCurMonDirectAmount // 本月用户直接赚取
          this.userFunds.userCurMonInDirectAmount = res.data.userCurMonInDirectAmount // 本月用户间接赚取
          this.userFunds.userAmountByUserId = res.data.userAmountByUserId // 用户累计赚取

          // 邀请会员信息
          this.inviters.total = res.data.userSpreadMember // 累计邀请会员
          this.inviters.monthly = res.data.userCurMonSpreadMember // 本月邀请会员
          this.inviters.totalcustomers = res.data.userCurMonSpreadCustomer // 本月邀请顾客

          // 门店区域
          this.storeAreaName = res.data.storeAreaName
          this.storeName = res.data.storeName

          // 用户收货地址
          this.listUserAddress = res.data.listUserAddress

          // 直接邀请人
          this.memberVO = res.data.memberVO

          // 间接邀请人
          this.inMemberVO = res.data.inMemberVO

          // 修改绑定关系弹窗信息
          this.storeName = res.data.storeName
          this.storeAreaName = res.data.storeAreaName
          this.storeId = res.data.storeId

          // 会员卡信息
          this.vipcard = res.data.card

          // 会员卡服务记录（需要会员卡号做入参）
          this.getListcarduse()

          // 获取会员佣金列表
          this.getListcounselorcurmonbonus()
        })
      }

      // 获取门店会员列表
      // this.geLlistuserbystoreid({
      //   storeId: this.storeId,
      //   type: this.storeUserType,
      //   key: this.searchKey
      // })
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

    isEmptyObject(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    },

    changeBind() {
      this.modalTitle = '更改邀请'
    },

    rebindChoose() {
      this.modalTitle = '绑定邀请关系'
    },

    selectGW() {
      this.storeUserType = 4
      this.storeUserTypeStr = '顾问'
      this.dialogFormVisible = false
      this.infodialogFormVisible = true

      this.geLlistuserbystoreid({
        storeId: this.storeId,
        type: this.storeUserType,
        // key: this.searchKey
      })
    },

    selectMYS() {
      this.storeUserType = 3
      this.storeUserTypeStr = '美容师'
      this.dialogFormVisible = false
      this.infodialogFormVisible = true

      this.geLlistuserbystoreid({
        storeId: this.storeId,
        type: this.storeUserType,
        // key: this.searchKey
      })
    },

    selectVIP() {
      this.storeUserType = 2
      this.storeUserTypeStr = '会员'
      this.dialogFormVisible = false
      this.infodialogFormVisible = true

      this.geLlistuserbystoreid({
        storeId: this.storeId,
        type: this.storeUserType,
        // key: this.searchKey
      })
    },

    rebindRe(opts) {
      this.modalTitle = opts.title
      this.dialogFormVisible = true
      this.changeRebindType = opts.type

      // this.geLlistuserbystoreid({
      //   storeId: this.storeId,
      //   type: this.storeUserType,
      //   key: this.searchKey
      // })
    },

    // 根据userId获取直接邀请人信息（方法未使用）
    getInviterinfo() {
      this.$API.getinviterinfo({
        data: {
          userId: '' // 必须  用户id
        }
      }).then(res => {
        this.inviterinfo = res.data
      })
    },

    // 会员卡服务记录
    getListcarduse(opts = {}) {
      this.$API.listcarduse({
        data: {
          cardId: this.$route.query.cardId, // 会员卡id
          currPage: opts.currPage || 1, // 当前页数
          pageSize: this.pageSize //每页显示数量
        }
      }).then((res) => {
        this.vipcardRecordArray = res.data.page
        this.vipcardPageCount = res.data.totalPageCount
      })
    },

    // 更改邀请人关系
    updateinviter() {
      this.setBtnLoading()

      let inviteeUserId = ''
      // 更改直接邀请人
      if (this.changeRebindType == 1) {
        inviteeUserId = this.memberVO.userId
      }

      // 更改间接邀请人
      if (this.changeRebindType == 2 || this.changeRebindType == 3 ) {
        inviteeUserId = this.inMemberVO.userId
      }

      this.$API.updateinviter({
        data: {
          inviteeUserId: this.employeeDetail.id, // inviteeUserId, Long  必须  被邀请人id
          inviterUserId: this.selectSPId, // this.employeeDetail.id, // Long  必须  邀请人id
          type: this.storeUserType //  int   邀请人类型
        }
      }).then(res => {
        setTimeout(() => {
          this.resetBtnLoading()
          this.infodialogFormVisible = false
          this.dialogConfFormVisible = false
        }, 1000)
      })
    },

    // 获取会员佣金列表（顾客是没有佣金列表的）
    getListcounselorcurmonbonus(obj = {}) {
      this.$API.listusercurmonbonus({
        data: {
          userId: this.employeeDetail.id, //  Long  必须  用户id
          currPage: obj.currPage || 1, //  Int   当前页数
          pageSize: this.pageSize //  Int   每页显示数量
        }
      }).then((res) => {
        this.yjLists = res.data.page
        this.pageCount = res.data.totalPageCount
        this.pageSize = res.data.pageSize

        if (this.yjLists.length == 0) {
          this.showPagination = false
        }
      })
    },

    // 获取门店会员列表
    geLlistuserbystoreid(data) {
      this.$API.listuserbystoreid({
        data: data
      }).then(res => {
        this.storeUserLists = res.data
      })
    },

    // 修改邀请人信息
    updateInviter() {
      this.$API.updateinviter({
        data: {
          inviteeUserId: inviteeUserId, // Long  必须  被邀请人id
          inviterUserId: this.employeeDetail.employeeId, // Long  必须  邀请人id
          type: this.storeUserType //  int   邀请人类型
        }
      }).then(res => {
        this.resetBtnLoading()
        this.infodialogFormVisible = false
      })
    },

    // 点击搜索
    searchStoreUserLists() {
      this.geLlistuserbystoreid({
        storeId: this.storeId,
        type: this.storeUserType,
        key: this.searchKey
      })
    }
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'init'
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

.detail-card--user .el-card__body {
  padding-bottom: 15px;
}

.edit-modal--conf div.ttt,
.edit-modal--conf .item > div {
  display: inline-block;
  float: left;
}

.edit-modal--conf div.ttt {
  margin-top: 15px;
  margin-right: 25px;
  font-weight: bold;
}

.edit-modal--conf .wrap {
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 30px;
}

.edit-modal--conf .item .th {
  margin-top: 8px;
}

.edit-modal--conf .item .th img {
  padding-right: 10px;
}

.float-left {
  float: left;
  line-height: 40px;
}
</style>
