/* eslint-disable */
module.exports = {
  getUser: '/back/user',
  showsupervisor: '/back/supervisor/showsupervisor',
  // 登陆
  login: '/back/login',
  // 首页
  home: '/home',
  // 顾问列表
  listcounselors: '/employee/listcounselors',
  // 美容师列表
  listbeauticians: '/employee/listbeauticians',
  // 门店区域列表
  liststoreareas: '/employee/liststoreareas',
  // 根据区域id查询门店列表
  liststores: '/employee/liststores',
  // 获取员工最大编号（7、8重复）
  liststores: '/employee/liststores',
  // 添加顾问
  savecounselor: '/employee/savecounselor',
  // 添加美容师
  savebeautician: '/employee/savebeautician',
  // 根据门店id获取该门店顾问列表
  getcounselorsofstore: '/employee/getcounselorsofstore',
  // 编辑顾问信息
  updatecounselor: '/employee/updatecounselor',
  // 编辑美容师信息
  updatebeautician: '/employee/updatebeautician',
  // 获取顾问详情
  getcounselordetail: '/employee/getcounselordetail',
  // 获取顾问当月佣金明细
  listcounselorcurmonbonus: '/employee/listcounselorcurmonbonus',
  // 16、获取美容师详情
  getbeauticiandetail: '/employee/getbeauticiandetail',
  //  获取美容师当月佣金明细
  listbeauticiancurmonbonus: '/employee/listbeauticiancurmonbonus',
  // 获取用户列表
  listmember: '/user/listmember',
  // 获取会员|顾客详情(请求与响应有区别)
  getcustomerdetail: '/user/getcustomerdetail',
  // 获取用户当月佣金列表信息
  listusercurmonbonus: '/user/listusercurmonbonus',
  // 获取会员卡服务记录
  listcarduse: '/user/listcarduse',
  // 22、23 获取会员卡服务记录(文档中的请求响应不一样，待修正？)
  listcarduse: '/user/listcarduse',
  // 修改邀请人信息
  updateinviter: '/user/updateinviter',
  // 根据userId获取直接邀请人信息
  getinviterinfo: '/user/getinviterinfo',
  // 顾客列表
  listcustomer: '/user/listcustomer',
  // 获取平台概况
  getplatformoverview: '/overview/getplatformoverview',
  // 获取平台当日概况
  getdayplatformoverview: '/overview/getdayplatformoverview',
  // 获取平台管理费列表
  listplatformfee: '/fee/listplatformfee',
  // 后台佣金列表
  listbonus: '/bonus/listbonus',
  login: '/back/login', // 登录
  showsupervisor: '/back/supervisor/showsupervisor', // 系统管理-管理员列表接口
  showsupervisordetail: '/back/supervisor/showsupervisordetail', // 系统管理-管理员添加和更新的回显信息
  editsupervisor: '/back/supervisor/editsupervisor', // 系统管理-更新管理员接口
  addsupervisor: '/back/supervisor/addsupervisor', // 系统管理-添加管理员接口
  delsupervisor: '/back/supervisor/delsupervisor', // 系统管理-删除管理员接口
  showsupervisoreventlog: '/back/supervisor/showsupervisoreventlog', // 系统日志管理-操作日志列表接口
  showrightrole: '/back/role/showrightrole', // 系统管理-角色列表接口
  showrightroledetail: '/back/role/showrightroledetail', // 系统管理-角色更新的回显信息
  editrightrole: '/back/role/editrightrole', // 系统管理-更新角色接口
  addrightrole: '/back/role/addrightrole', // 系统管理-添加角色接口
  showright: '/back/role/showright', // 系统管理-查询该角色的权限信息接口
  editright: '/back/role/editright', // 系统管理-编辑该角色的权限信息接口
  showrunruledetail: '/back/setting/showrunruledetail', // 运营设置-查询运营规则接口
  editrunrule: '/back/setting/editrunrule', // 运营设置-编辑运营规则接口
  showrunruledetail: '/back/setting/showrunruledetail', // 运营设置-查询分销规则接口
  editrunrule: '/back/setting/editrunrule', // 运营设置-编辑分销规则接口
  showwithdrawuser: '/back/account/showwithdrawuser', // 提现管理-提现列表接口
  showwithdrawuserdetail: '/back/account/showwithdrawuserdetail', // 提现管理-提现详情接口
  auditwithdrawuser: '/back/account/auditwithdrawuser', // 提现管理-提现审核接口
  liststoreandareas: '/back/employee/liststoreandareas', // 架构管理-架构列表接口
  addstorearea: '/back/employee/addstorearea', // 架构管理-添加大区接口
  showstoreareadetail: '/back/employee/showstoreareadetail', // 架构管理-查询要编辑的大区接口
  editstorearea: '/back/employee/editstorearea', // 架构管理-编辑大区接口
  addstore: '/back/employee/addstore', // 架构管理-添加门店接口
  showstoredetail: '/back/employee/showstoredetail', // 架构管理-查询要编辑的门店接口
  editstore: '/back/employee/editstore', // 架构管理-编辑门店接口
}
