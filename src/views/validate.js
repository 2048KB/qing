export const validateRequired = (rule, value, callback) => {
  // console.log(rule)
  if (rule.required === true) {
    let message = rule.message || `请输入${rule.name}`
    if (!value && value !== 0) {
      callback(new Error(message))
      return
    }
  }
  if (value.length > 0 && rule.minlength !== undefined) {
    if (value.length < rule.minlength) {
      callback(new Error(`不少于${rule.minlength}位`))
      return
    }
  }
  callback()
}

export const validateMobild = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号码'))
    return
  }
  if (/1\d{10}/.test(value) === false) {
    callback(new Error('请输入正确的手机号码'))
    return
  }
  callback()
}
export const validateRealityName = (rule, value, callback) => {
  if (!value) {
    callback(new Error(`请输入${rule.name || '姓名'}`))
    return
  }
  if (/[\u4e00-\u9fa5]{2,16}/.test(value) === false) {
    callback(new Error(`请输入正确的${rule.name || '姓名'}`))
    return
  }
  callback()
}

export const validateEmail = (rule, value, callback) => {
  if (!!value) {
    if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value) === false) {
      callback(new Error('请输入正确的邮箱地址'))
      return
    }
  }
  callback()
}
export const validateQQ = (rule, value, callback) => {
  if (!!value) {
    if (value.length < 5) {
      callback(new Error('请输入5-11位QQ号'))
      return
    }
  }
  callback()
}
// 18位身份证号码:^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$
// 常用正则，仅供参考
// https://github.com/dunizb/JS-Regular-expression-awesome