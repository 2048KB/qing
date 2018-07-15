/* eslint-disable */
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
  label: '扣款日昵称'
}, {
  value: '3',
  label: '扣款人真实姓名'
}, {
  value: '4',
  label: '扣款人手机号'
}]
export const bounsType = [{
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
  label: '交易流水'
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
export const logSearchTypes = [{
  value: '0',
  label: '全部'
}, {
  value: '1',
  label: 'ID'
}, {
  value: '2',
  label: '操作者用户名'
}, {
  value: '3',
  label: '操作者真实姓名'
}, {
  value: '4',
  label: '操作者手机号'
}]