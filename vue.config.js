module.exports = {
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
