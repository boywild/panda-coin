import validate from './validate'
export function trim (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
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
    '[object Set]': 'set',
    '[object Symbol]': 'symbol'
  }
  return map[toString.call(obj)]
}

export function isEmpty () {
  for (let obj of arguments) {
    if (obj === null || obj === undefined) {
      return true
    } else if (typeOf(obj) === 'string' && obj.trim() === '') {
      return true
    }
  }
  return false
}

export function deepCopy(data) {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }
  if (t === 'array') {
    data.forEach((item) => {
      o.push(deepCopy(item))
    })
  } else if (t === 'object') {
    for (let [key, value] of Object.entries(data)) {
      o[key] = deepCopy(value)
    }
  }
  return o
}

export function getPageQueryObject (fullPath = window.decodeURIComponent(window.location.href)) {
  if (typeOf(fullPath) !== 'string') return {}
  let result = {}
  fullPath.split('?')
    .filter(item => item.includes('='))
    .map(item => item.substring(0, item.includes('#') ? item.indexOf('#') : item.length))
    .join('&')
    .split('&')
    .forEach((item) => {
      if (item.includes('=')) {
        let arr = /(.*?)=(.*)/.exec(item)
        if (arr[1]) {
          result[`${arr[1]}`] = arr[2]
        }
      }
    })
  return result
}

export function listenOrientation (vFn, hFn) {
  if (window.orientation === 90 || window.orientation === -90) {
    typeOf(hFn) === 'function' && hFn()
  }
  window.addEventListener('orientationchange', () => {
    if (window.orientation === 90 || window.orientation === -90) {
      typeOf(hFn) === 'function' && hFn()
    }
    if (window.orientation === 0 || window.orientation === 180) {
      typeOf(vFn) === 'function' && vFn()
    }
  })
}
export function solveAndroidInputCover () {
  validate.isAndroid() && window.addEventListener('resize', () => {
    if (document.activeElement.tagName === 'INPUT') {
      document.activeElement.scrollIntoView({ behavior: 'smooth' })
    }
  })
}