# delegate-electron-events
Delegate electron's boot events until there's a window that can handle them.

## Usage
```js
var delegate = require('delegate-electron-events')
var electron = require('electron')
var path = require('path')

var BrowserWindow = electron.BrowserWindow
var app = electron.app

var emitter = delegate()

app.on('ready', function () {
  var win = new BrowserWindow()
  win.loadURL('file://' + path.join( __dirname, 'index.html'))
  win.webContents.on('did-finish-load', function () {
    win.show()
  })

  emitter.on('open-file', function (file) {
    win.webContents.send('open-file', file)
  })

  emitter.on('open-url', function (url) {
    win.webContents.send('open-url', url)
  })
})
```

## API
### `emitter = delegate()`
Create a new instance.

### `emitter.on('open-file', function(file))`
Listen for a file event.

### `emitter.on('open-url', function(url))`
Listen for a url event.

## License
[MIT](https://tldrlegal.com/license/mit-license)
