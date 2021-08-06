import filter from './filter'
import fixedInput from 'mixins/fixed-input'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireHttp = require.context('../apis', false, /\.js$/)

function install (Vue) {
  Object.entries(filter).forEach(([key, value]) => {
    Vue.filter(key, value)
  })

  Vue.directive('input', fixedInput)

  requireHttp.keys().forEach(fileName => {
    const name = upperFirst(
      camelCase(
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
    Vue.prototype[`$${name}`] = requireHttp(fileName).default || requireHttp(fileName)
  })
}

export default { install }
