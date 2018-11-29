// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow, globalShortcut} = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let settingsWindow

function createWindow () {
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 307,
    useContentSize: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false
  })

  mainWindow.webContents.openDevTools();
  const height = electron.screen.getPrimaryDisplay().workAreaSize.height
  
  mainWindow.webContents.executeJavaScript(`document.querySelector('body').scrollHeight`, (result) => {
    mainWindow.setSize(307,result+8)
  })

  mainWindow.on('show', () => {
    let y = height - mainWindow.getSize()[1];
    let x = 1;
    if (process.platform !== 'darwin') {
      const size = mainWindow.getSize();
      const windowWidth = size[0];
      const windowHeight = size[1];
    }

    mainWindow.setPosition(x, y);

  });

  mainWindow.hide();
  
  globalShortcut.register('Super+Y', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  })

  //mainWindow.isVisible ? mainWindow.hide() : mainWindow.show();

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createSettingsWindow () {
  console.log("Settings Menu was opened.")
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow)

app.on('ready', createWindow)

// app.on('mouseDown', () => {
//   app.hide()
// })

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    //createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
