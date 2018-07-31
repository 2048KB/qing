/* eslint-disable */
import fetch from '@/utils/http'
import * as apis from './api'

const parsedURLs = {}

function getQS(str) {
  const regExp = new RegExp('\\b' + str + '=([^&=]+)')
  const matched = window.location.search.match(regExp)

  return matched ? matched[1] : ''
}

let domain = 'http://127.0.0.1:3000'
if (getQS('api') == 'prd') {
  domain = 'https://www.qingqingmeirong.com'
}

// http://192.168.0.7:8080
// domain = 'http://192.168.0.7:8080'
// domain = 'http://qqmr.web.data.jingdacaifu.com'

// 打包测试、生产改接口域名
// let domain = 'https://www.qingqingmeirong.com'

export function getFullPath (item) {
  return domain + apis[item]
}
/*
  Parse URLS
  input: { nonFreeRegister: 'rsbDomain:/bron/bbc/cust/plugin/portal/tpa/nonFreeRegister' }
  output: { nonFreeRegister: `${window.PAB.domain[which-domian]}/bron/bbc/cust/plugin/portal/tpa/nonFreeRegister` }
 */
Object.keys(apis).forEach((item) => {
  // 发布时候需要改动
  parsedURLs[item] = getFullPath(item)
  /*
  const arr = apis[item].split(':')

  // development env using mock data
  if (env === 'dev') {

    // in development env fetch staging env api
    if (getQS('api') === 'stg') {
      parsedURLs[item] = window.PAB.domain[arr[0]] + arr[1]
    } else {
      parsedURLs[item] = `http://127.0.0.1:3000${arr[1]}`
    }

  // otherwise detect domain by PAB.js
  } else {
    parsedURLs[item] = window.PAB.domain[arr[0]] + arr[1]
  }
  */
});


const f = url => options => fetch(url, options)
const mixinAPIs = (obj) => {
  const APIs = {}

  Object.keys(obj).forEach((key) => {
    APIs[key] = f(obj[key])
  })

  return APIs
}

export default mixinAPIs(parsedURLs)
