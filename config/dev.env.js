'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HTTP_BASE_URL: '"http://www.baidu.com"',
  PRO_BASE_URL: '"http://www.baidu.com"'
})
