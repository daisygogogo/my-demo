'use strict'
const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/(.*)router\/index|(.*)\/router/, function(resource) {       
        const rawArgv = process.argv.slice(-1) // 获取build 后参数
        const params = rawArgv.join()
        console.log('paramsparams',params)
        if (params === '--mis') {
          resource.request = resource.request.replace(/(.*)router\/index|(.*)\/router/, '@/router/indexA')
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
