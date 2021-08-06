import { typeOf } from 'utils/assist'
import helper from 'utils/helper'
import loading from 'utils/loading'

let HttpEngine = require(`core/plugins/http/HttpEngine.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`).default

export default class Http extends HttpEngine {
  baseURL = process.env.HTTP_BASE_URL
  mockTimeout = 3
  timeout = 30
  requestedSever = false

  beforeSendRequestHandler(config) {
    let commonHeader = helper.getCommonHeader()
    config.headers = { ...config.headers, ...commonHeader }
    // 加密签名处理

    if (config.loading) {
      let loadingConfig = {}
      if (typeOf(config.loading) === 'object') {
        loadingConfig = config.loading
      } else {
        loadingConfig = { type: typeOf(config.loading) === 'boolean' ? 'loader' : config.loading }
      }
      this.loadingHash = loading.show(loadingConfig)
    }
  }

  afterResolveResponseHandler(response) {
    this.loadingHash && loading.hide(this.loadingHash)
  }

  afterRejectResponseHandler(error) {
    this.loadingHash && loading.hide(this.loadingHash)
    let errorMsg = error.message
    let response = error.response
    if (errorMsg === 'Network Error') {
      errorMsg = '网络异常'
    }
    if (errorMsg.indexOf('timeout') >= 0) {
      errorMsg = '请求超时'
    }
    if (typeOf(response) === 'object') {
      if (typeOf(response.data) === 'object') {
        errorMsg = response.data['error_msg']
      }
      if (response.status === 401) {
        helper.logout()
        return
      }
    }
    helper.toast(errorMsg)
  }
}
