import { typeOf } from './assist'

export default {
  getLocal (key, defaultValue = '') {
    if (typeOf(key) !== 'string' || key === '' || typeOf(localStorage.getItem(key)) === 'null') return defaultValue
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return defaultValue
    }
  },
  getLocalObj (key = '', itemKey = '', defaultValue = '') {
    if (typeOf(key) !== 'string' || key === '') return defaultValue
    if (typeOf(itemKey) === 'string' && itemKey) {
      let storageObj = this.getLocal(key, {})
      if (typeOf(storageObj[itemKey]) === 'undefined') {
        return defaultValue
      }
      return storageObj[itemKey]
    }
    return this.getLocal(key, defaultValue)
  },
  setLocal (key, val) {
    if (typeOf(key) !== 'string' || key === '' || typeOf(val) === 'undefined') return false
    if (['string', 'boolean', 'number', 'array', 'object'].includes(typeOf(val))) {
      localStorage.setItem(key, JSON.stringify(val))
    }
  },
  updateLocalObj (key = '', infoObj = {}) {
    if (typeOf(key) !== 'string' || key === '' || typeOf(infoObj) !== 'object') return false
    let storageObj = this.getLocal(key, {})
    this.setLocal(key, { ...storageObj, ...infoObj })
  },
  removeLocal (key) {
    if (typeOf(key) === 'undefined') return false
    if (typeOf(key) === 'string') {
      localStorage.removeItem(key)
    }
    if (typeOf(key) === 'array') {
      key.forEach((keyItem) => {
        if (typeOf(keyItem) === 'string') {
          localStorage.removeItem(keyItem)
        }
      })
    }
  },
  clearLocal () {
    localStorage.clear()
  },
  getSession (key, defaultValue = '') {
    if (typeOf(key) !== 'string' || key === '' || typeOf(sessionStorage.getItem(key)) === 'null') return defaultValue
    try {
      return JSON.parse(sessionStorage.getItem(key))
    } catch (e) {
      return defaultValue
    }
  },
  getSessionObj (key = '', itemKey = '', defaultValue = '') {
    if (typeOf(key) !== 'string' || key === '') return defaultValue
    if (typeOf(itemKey) === 'string' && itemKey) {
      let storageObj = this.getSession(key, {})
      if (typeOf(storageObj[itemKey]) === 'undefined') {
        return defaultValue
      }
      return storageObj[itemKey]
    }
    return this.getSession(key, defaultValue)
  },
  setSession (key, val) {
    if (typeOf(key) !== 'string' || key === '' || typeOf(val) === 'undefined') return false
    if (['string', 'boolean', 'number', 'array', 'object'].includes(typeOf(val))) {
      sessionStorage.setItem(key, JSON.stringify(val))
    }
  },
  updateSessionObj (key = '', infoObj = {}) {
    if (typeOf(key) !== 'string' || key === '' || typeOf(infoObj) !== 'object') return false
    let storageObj = this.getSession(key, {})
    this.setSession(key, { ...storageObj, ...infoObj })
  },
  removeSession (key) {
    if (typeOf(key) === 'undefined') return false
    if (typeOf(key) === 'string') {
      sessionStorage.removeItem(key)
    }
    if (typeOf(key) === 'array') {
      key.forEach((keyItem) => {
        if (typeOf(keyItem) === 'string') {
          sessionStorage.removeItem(keyItem)
        }
      })
    }
  },
  clearSession () {
    sessionStorage.clear()
  }
}
