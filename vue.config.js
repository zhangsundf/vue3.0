const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true, // 是否开启eslint保存检测
  runtimeCompiler: true, // 运行时版本是否需要编译
  transplieDependencies: [], // 默认babel-loader忽略node_modules，这里可增加例外的依赖包名
  productionSourceMap: true, // 是否在构成生产包时生成sourcemap文件，false将提高构建速度

  // 修改插件选项的参数，你需要熟悉webpack-chaind的API
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        return [/* new args to pass to html-webpack-plugin's constructor*/]
      })
  },

  // webpack对象，键为对象时会合并配置，为方法时会改写配置
  configureWebpack: {
    plugins: [
      // 调整webpack配置最简单的方式就是在vue.config.js中的configureWebpack选项提供一个对象，
      // 该对象会被webpack-merge 合并到最终的webpack配置
    ]
  },
  configureWebpack: config => {
    if(debug) { // 开发环境配置
      config.devtool = 'cheap-moudle-eval-source-map'
    } else {
      // 生产环境配置
    }

    Object.assign(config, { //开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          'vue$': 'vue/dist/vue.esm.js'
        }
      }
    })
  },
  css: { // 配置高于chainWebpack中关于css loader的配置
    modules: true, // 是否开启支持‘foo.module.css’样式
    // 是否使用css分离插件ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    extract: true, 
    SourceMap: true,
    loaderOptions: {
      css: {
        localIdentName: '[name]-hash',
        camelCase: 'only'
      },
      stylus: {}
    }
  },
  vueLoader: {}, // vue-loader配置
  pluginOptions: {}, // 第三方插件配置
  pwa: {}, // 单页面插件相关配置
  // 当我们更改一个webpack配置的时候，可以通过vue-inspect > output.js 输出完整的配置清单，输出的
  // 并不是一个有效的webpack配置文件，而是一个用于审查的，被序列化的格式
  devServer: {
    port: 9000,
    open: true,
    hotOnly: false,
    https: false
  }
}