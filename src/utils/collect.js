import { typeOf, deepCopy } from './assist'

/**
 * 处理对象集合,item为collect中对象
 * collect = [
 *  {'name': 'userName', 'label': '用户名', 'type': 'number'},
 *  {'name': 'email', 'label': '邮箱', 'type': 'text'}
 * ]
 */
export default {
  /**
   * 创建key=item[keyName]，value=item[valName]组成的对象
   * @param {array} collect 传入的对象集合collect(必填)
   * @param {string} keyName item中的key（必填）
   * @param {string} valName item中的key（非必填，不填时返回对象的value由item组成）
   * @returns 对象
   */
  createObj (collect = [], keyName = '', valName) {
    if (typeOf(collect) !== 'array' || typeOf(keyName) !== 'string') return
    if (valName && typeOf(valName) !== 'string') return
    collect = collect.filter(item => typeOf(item) === 'object')

    let obj = {}
    collect.forEach((item) => {
      if (typeOf(item[keyName]) === 'string' || typeOf(item[keyName]) === 'number') {
        if (typeOf(valName) === 'undefined') {
          obj[item[keyName]] = Object.assign({}, item)
        } else {
          let val = typeOf(item[valName]) === 'undefined' ? '' : deepCopy(item[valName])
          obj[item[keyName]] = val
        }
      }
    })
    return obj
  },
  include (collect = [], keyName = '', val) {
    if (typeOf(collect) !== 'array' || typeOf(keyName) !== 'string') return false
    for (let item of collect) {
      if (item[keyName] === val) {
        return true
      }
    }
    return false
  },
  indexOf (collect = [], keyName = '', val) {
    if (typeOf(collect) !== 'array' || typeOf(keyName) !== 'string') return -1
    for (let [index, item] of collect.entries()) {
      if (item[keyName] === val) {
        return index
      }
    }
    return -1
  },
  remove (collect = [], keyName = '', val) {
    if (typeOf(collect) !== 'array' || typeOf(keyName) !== 'string') return false
    for (let [index, item] of collect.entries()) { 
      if (item[keyName] === val) {
        collect.splice(index, 1)
        break
      }
    }
  },
  getItem (collect = [], keyName = '', val) {
    if (typeOf(collect) !== 'array' || typeOf(keyName) !== 'string') return false
    for (let item of collect) {
      if (item[keyName] === val) {
        return item
      }
    }
    return false
  },
  getValueList (collect = [], keyName = '') {
    if (typeOf(collect) !== 'array' || typeOf(keyName) !== 'string') return []
    let result = []
    collect.forEach((item) => {
      typeOf(item[keyName]) !== 'undefined' && result.push(item[keyName])
    })
    return result
  },
  /**
   * 传入collect,已知值的key，已知值的value(数组),返回特定Key的值列表
   * @param {array} collect 传入的对象集合collect(必填)
   * @param {string} keyName valueList对应的key值(必填)
   * @param {array} valueList 已知值列表(必填)
   * @param {string} returnKeyName 需要返回的key(必填)
   * @returns 数组
   */
  getSpecialValueList (collect = [], keyName = '', valueList = '', returnKeyName = '') {
    if (typeOf(collect) !== 'array' || typeOf(keyName) !== 'string' || typeOf(valueList) !== 'array' || typeOf(returnKeyName) !== 'string') return []
    let filterCollect = collect.filter(item => valueList.includes(item[keyName]))
    return this.getValueList(filterCollect, returnKeyName)
  }
}
