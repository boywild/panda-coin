/**
 * Created by duy on 2018/7/3 15:49.
 */

export default class Utils {

  static isDevelopmentEnv () {
    return process.env.NODE_ENV === 'development';
  }

  static enableAdapterMode (isRequestSever) {
    return this.isDevelopmentEnv() && !isRequestSever;
  }
}

export function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Map]': 'map',
    '[object Set]': 'set'
  }
  return map[toString.call(obj)]
}