const main = {
  // 用于开发环境下与后端联调
  devServer: {
    port: '8080',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    }
  }
};

module.exports = main