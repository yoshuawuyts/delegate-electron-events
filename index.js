var EventEmitter = require('events').EventEmitter
var ipcMain = require('electron').ipcMain
var app = require('electron').app

module.exports = delegateElectronEvents

// delegate electron events while booting
// until a window is ready that can handle them
function delegateElectronEvents () {
  var file = null
  var link = null
  var win = null

  app.on('will-finish-launching', function () {
    app.on('open-file', function (ev, path) {
      ev.preventDefault()
      if (win) ee.emit('open-file', path)
      else file = path
    })

    app.on('open-url', function (ev, url) {
      ev.preventDefault()
      if (win) ee.emit('open-url', url)
      else link = url
    })
  })

  var ee = new EventEmitter()

  ipcMain.on('ready', function () {
    if (file) {
      let path = file
      file = null
      ee.emit('open-file', path)
    }

    if (link) {
      let url = link
      link = null
      ee.emit('open-url', url)
    }
  })

  return ee
}
