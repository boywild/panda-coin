// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    // to edit target browsers: use "browserslist" field in package.json
    'postcss-import': {},
    'postcss-px-to-viewport': {
      viewportWidth: 1242, // 适应vant的尺寸，设计稿则手动/2编写样式文件
      selectorBlackList: ['.swiper-', '.van-'],
      mediaQuery: true
    }
  }
}
