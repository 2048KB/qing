export const validatename = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入用户名'))
  }
  callback()
}
export const validatePass = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
export const validateRequired = (rule, value, callback) => {
  let message = rule.message || `请输入${rule.name}`
  console.log(value, 'qq')
  if (!value && value !== 0) {
    callback(new Error(message))
  }
  callback()
}

export const validateMobild = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号码'))
  }
  if (/1\d{10}/.test(value) === false) {
    callback(new Error('请输入正确的手机号码'))
  }
  callback()
}

// 
export const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱地址'))
  }
  if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value) === false) {
    callback(new Error('请输入正确的邮箱地址'))
  }
  callback()
}