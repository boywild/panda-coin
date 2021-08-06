export default {
  isIdCard(value) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
  },
  isEmail (value) {
    return /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/.test(value)
  },
  isCH(value) {
    return /[^\u4e00-\u9fa5]/.test(value)
  },
  isPhone(value) {
    return /^1[0-9]{10}$/.test(value)
  },
  isUrl (value) {
    return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(value)
  },
  isNumber (value) {
    return /^\d+(\.\d+)?$/.test(value)
  },
  isAndroid () {
    let u = navigator.userAgent.toLowerCase()
    return /android/.test(u) || /linux/.test(u)
  },
  isIOS () {
    return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
  }
}
