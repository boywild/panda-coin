import Http from './base'

const moduleName = 'weixin'

class Wechat {
  /**
   * 获取微信分享需要的config数据
   */
  getJsapiSignature () {
    let url = window.encodeURIComponent(window.location.href.split('#')[0])
    let id = process.env.NODE_ENV === 'production' ? 'ZXGZT' : 'FXGJ'
    let http = new Http()
    http.baseURL = process.env.FX_PAYROLL_URL
    http.path = `/${moduleName}/getJsapiSignatureById`
    http.query = { url, id }
    http.loading = false
    return http.get()
  }
}
export default new Wechat()
