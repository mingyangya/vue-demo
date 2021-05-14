const path = require('path')

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@components', resolve("src/components"))
      .set('gkSrc', resolve('node_modules/@geekbang/geek.ui/src'))
      .set('gkui', resolve('node_modules/@geekbang/geek.ui/src/components'))
      .set('gkuiV2', resolve('node_modules/@geekbang/geek.ui/src/v2'))

    // 去掉 preload prefetch
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

  }
}