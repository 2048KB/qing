/* eslint-disable */
module.exports = {
  login: '/back/login', // 登录
  home: '/back/home', // 首页
  listcounselors: '/back/employee/listcounselors',   // 顾问列表
  listbeauticians: '/back/employee/listbeauticians', // 美容师列表
  liststoreareas: '/back/employee/liststoreareas', // 门店区域列表
  liststores: '/back/employee/liststores', // 根据区域id查询门店列表
  savecounselor: '/back/employee/savecounselor', // 添加顾问
  savebeautician: '/back/employee/savebeautician', // 添加美容师
  getcounselorsofstore: '/back/employee/getcounselorsofstore', // 根据门店id获取该门店顾问列表
  updatecounselor: '/back/employee/updatecounselor', // 编辑顾问信息
  updatebeautician: '/back/employee/updatebeautician', // 编辑美容师信息
  getcounselordetail: '/back/employee/getcounselordetail', // 获取顾问详情
  listcounselorcurmonbonus: '/back/employee/listcounselorcurmonbonus', // 获取顾问当月佣金明细
  getbeauticiandetail: '/back/employee/getbeauticiandetail', // 获取美容师详情
  listbeauticiancurmonbonus: '/back/employee/listbeauticiancurmonbonus', // 获取美容师当月佣金明细
  listmember: '/back/user/listmember', // 获取用户列表
  getcustomerdetail: '/back/user/getcustomerdetail', // 获取顾客详情
  getmemberdetail: '/back/user/getmemberdetail', // 获取会员详情
  listusercurmonbonus: '/back/user/listusercurmonbonus', // 获取用户当月佣金列表信息
  listcarduse: '/back/user/listcarduse', // 获取会员卡服务记录
  updateinviter: '/back/user/updateinviter', // 修改邀请人信息
  getinviterinfo: '/back/user/getinviterinfo', // 根据userId获取直接邀请人信息
  listcustomer: '/back/user/listcustomer', // 顾客列表
  getplatformoverview: '/overview/getplatformoverview', // 获取平台概况
  getdayplatformoverview: '/overview/getdayplatformoverview', // 获取平台当日概况
  listplatformfee: '/fee/listplatformfee', // 获取平台管理费列表
  listbonus: '/bonus/listbonus', // 后台佣金列表
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
  listuserbystoreid: '/back/user/listuserbystoreid', // 根据门店id获取门店用户
  showsaleruledetail: '/back/setting/showsaleruledetail', // 运营设置-查询分销规则接口
  editsalerule: '/back/setting/editsalerule', // 运营设置-编辑分销规则接口
// 32. 根据搜索条件查询平台订单列表
  listplatformorder: '/back/order/listplatformorder',
// 33.  根据订单id获取订单详情信息
  getorderdetailbyorderid: '/back/order/getorderdetailbyorderid',
// 34. 取消订单(接口疑似有问题，已经请对方确认，还没回信，mock数据还没有)
  cancelorder: '/back/order/cancelorder',
// 2.  退出
  dropout: '/back/dropout',
// 8.  获取员工最大编号
  getemployeemaxsno: '/back/employee/getemployeemaxsno',
// 9.  上传图片文件（尚无mock数据）
  upload: '/image/upload'
}
