/* eslint-disable */
// 初始化分页参数
export const pagingParams = {
  currPage: 1,
  pageSize: 10
}
export const roleOptions = [{
  value: '0',
  label: '全部'
}, {
  value: '2',
  label: '会员'
}, {
  value: '3',
  label: '美容师'
}, {
  value: '4',
  label: '顾问'
}]

export const employeeTypes = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: '员工编号'
}, {
  value: '2',
  label: '姓名'
}, {
  value: '3',
  label: '手机号'
}, {
  value: '4',
  label: '身份证号'
}, {
  value: '5',
  label: 'QQ号'
}]

export const beauticianSearchTypes = [
  ...employeeTypes,
  {
    value: '6',
    label: '所属顾问'
  }
]

export const sexsOptions = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: '男'
}, {
  value: '2',
  label: '女'
}]
export const withdrawStatuOptions = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: '待审核'
}, {
  value: '2',
  label: '处理中'
}, {
  value: '-1',
  label: '提现拒绝'
}, {
  value: '3',
  label: '提现成功'
}]
export const feeTypeOptions = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: '佣金管理费'
}, {
  value: '2',
  label: '提现手续费'
}]
export const feeSearchTypes = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: '交易流水'
}, {
  value: '2',
  label: '扣款人昵称'
}, {
  value: '3',
  label: '扣款人真实姓名'
}, {
  value: '4',
  label: '扣款人手机号'
}]
export const bonusType = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: '直推奖'
}, {
  value: '2',
  label: '合作奖'
}, {
  value: '3',
  label: '一级奖'
}, {
  value: '4',
  label: '二级奖'
}, {
  value: '5',
  label: '人头奖'
}, {
  value: '6',
  label: '双人奖'
}]
export const bounsSearchTypes = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: '交易流水',
  key: 'serviceOrderNo'
}, {
  value: '2',
  label: '昵称',
  key: 'nickName'
}, {
  value: '3',
  label: '真实姓名',
  key: 'realityName'
}, {
  value: '4',
  label: '手机号',
  'key': 'mobile'
}]
export const logSearchTypes = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: 'ID',
  key: 'id'
}, {
  value: '2',
  label: '操作者用户名',
  key: 'name'
}, {
  value: '3',
  label: '操作者真实姓名',
  key: 'realityName'
}, {
  value: '4',
  label: '操作者手机号',
  key: 'mobile'
}]
export const listMemberSearchTypes = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: 'ID'
}, {
  value: '2',
  label: '昵称'
}, {
  value: '3',
  label: '绑定手机号'
}, {
  value: '4',
  label: '直接邀请人姓名'
}, {
  value: '5',
  label: '直接邀请人手机号'
}, {
  value: '6',
  label: '间接邀请人姓名'
}, {
  value: '7',
  label: '间接邀请人手机号'
}]

export const roleType = {
  'beautician': 1,
  'consultant': 2,
  'member': 2,
  'customer': 1
}
export const orderStatusTypes = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: '待付款'
}, {
  value: '2',
  label: '交易成功'
}, {
  value: '-1',
  label: '交易关闭'
}]
export const orderSearchOptions = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: '订单号码'
}, {
  value: '2',
  label: '昵称'
}, {
  value: '3',
  label: '真实姓名'
}, {
  value: '4',
  label: '手机号'
}]

export const orderStatusMap = orderStatusTypes.reduce((result, item) => {
  result[item.value] = item.label
  return result
}, {})