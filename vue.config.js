module.exports = {
  publicPath: './',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        win: {
          icon: 'public/icon.ico',
        },
        mac: {
          icon: 'public/icon.ico',
        },
        linux: {
          icon: 'public/icon.ico',
        },
      },
    },
  },
  // 用于开发环境下与后端联调
  devServer: {
    port: '8080',
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', //通过pathRewrite重写地址，将前缀/api转为/
        },
      },
    },
  },
}
