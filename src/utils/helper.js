import storage from './storage'
import { typeOf } from './assist'
import { Toast } from 'vant'
import sysConfig from 'utils/constant'
// import validate from 'utils/validate'

export default {
  title(title) {
    title = title || '熊猫币'
    window.document.title = title
  },
  logout(routerName = 'index') {
    this.clearUserInfo()
    // if (validate.isUrl(routerName)) {
    //   window.location.replace(routerName)
    // } else {
    //   window.router.replace({ name: routerName, query: {} })
    // }
    window.location.replace(process.env.PRO_BASE_URL)
  },
  getUserInfo(infoKey = '', defaultValue = '') {
    return storage.getLocalObj('nzqkUserInfo', infoKey, defaultValue)
  },
  saveUserInfo(infoObj) {
    storage.setLocal('nzqkUserInfo', infoObj)
  },
  updateUserInfo(infoObj) {
    storage.updateLocalObj('nzqkUserInfo', infoObj)
  },
  clearUserInfo() {
    storage.removeLocal('nzqkUserInfo')
  },
  hasAuth(authKey) {
    if (typeOf(authKey) !== 'string') return false
    let authList = this.getUserInfo('permissions', [])
    return authList.includes(authKey)
  },
  getCommonHeader() {
    let { jsessionId } = this.getUserInfo('', {})
    return {
      'jsession-id': process.env.NODE_ENV === 'development' ? sysConfig.devJsessionId : jsessionId,
      'route-name': window.router.app._route.name,
      'plat-id': sysConfig.platId
    }
  },
  commonParams(config) {
    if (config.method === 'post') {
      if (config.data) {
        config.data.channel = 'NIU'
      } else {
        config.data = {
          channel: 'NIU'
        }
      }
    }
    if (config.method === 'get') {
      if (config.params) {
        config.params.channel = 'NIU'
      } else {
        config.params = {
          channel: 'NIU'
        }
      }
    }
  },
  toast(message, duration = 5000) {
    Toast({
      duration,
      message
    })
  }
}
