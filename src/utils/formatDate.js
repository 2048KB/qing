export default function(date, format) {
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth(),
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let i in o) {
    if (new RegExp(`(${i})`).test(format)) {
      format = format.replace(RegExp.$1, preZero(o[i]))
    }
  }
  return format
}

function preZero(str) {
  str = str + ''
  let len = str.length
  str = '00' + str
  return str.substr(len)
}