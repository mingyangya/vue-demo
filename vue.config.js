const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

const isProduct = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProduct ? '/vue-demo/' : '/',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@components', resolve("src/components"))

    // 去掉 preload prefetch
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

  },

  configureWebpack: {
    externals: {
      './cptable': 'var cptable'
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/css/common.scss')
      ]
    }
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 9999,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: true
  }
}
