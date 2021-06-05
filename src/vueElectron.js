import isElectron from 'is-electron'

let obj = {}
if (isElectron()) {
  const electron = require('electron')
  obj = {
    install: function(Vue) {
      Object.defineProperties(Vue.prototype, {
        $electron: {
          get() {
            return electron
          },
        },
      })
    },
  }
}
export default obj
