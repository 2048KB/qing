/* eslint-disable */
import $ from 'jquery'
// import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import router from '../router'
// var loadingInstance
console.log(router)

const fetch = function fetch(url = '', options = {}) {
  return new Promise((resolve, reject) => {
    const request = options || {}

    // is current spinning
    // const spinning = !!document.getElementById('js-spinner')
    const spinning = false

    // is show spinning when make ajax request
    request.loading = (options.loading === false) !== true

    request.url = url

    const ajaxSettings = {
      type: 'POST',
      timeout: 25000,
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'json',
      xhrFields: { withCredentials: true },
      crossDomain: true,
      beforeSend: function beforeSend() {
        // console.log('start loading...')
        // loadingInstance = Loading.service()
        // if (request.loading && !spinning) {
        //   console.log('加载 Loading')
        //   spinner.start()
        // }
      },
      complete: function complete() {
        // setTimeout(() => {
        //   console.log('关闭 Loading')
        //   loadingInstance.close()
        // }, 2000)
      }
    }

    if (!url) {
      throw new Error(`

        请提供请求地址...
      `)
    }

    request.error = (xhr) => {
      reject(xhr)
    }

    request.success = (data) => {
      if (data.code < 0) {

        // 没有登录
        if (data.code == -9999) {
          router.push({
            path: '/login'
          })

          reject(data)
          return
        }

        // 没有权限
        if (data.code == -9998) {
          router.push({
            path: '/warning'
          })

          reject(data)
          return
        }

        // 404
        if (data.code == -9996) {
          router.push({
            path: '/404'
          })

          reject(data)
          return
        }

        // 服务器 500
        if (data.code == -9995) {
          router.push({
            path: '/500'
          })

          reject(data)
          return
        }

        // 请勿重复提交
        if (data.code == -9997) {
          Message({
            showClose: true,
            message: data.msg || '请勿重复提交！',
            type: 'error'
          })

          reject(data)
          return
        }

        Message({
          showClose: true,
          message: data.msg || '服务异常，请稍后再试！',
          type: 'error'
        })
        reject(data)
        return
      }


      resolve(data)
    }

    $.ajax(Object.assign(ajaxSettings, request))
  })
}

window.$ = $

export default fetch
