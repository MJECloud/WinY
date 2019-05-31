'use strict'

const { BrowserWindow } = require('electron');

const defaultProps = {
  width: 307,
  useContentSize: true,
  show: false,
  frame: false,
  transparent: true,
  resizable: false,
  alwaysOnTop: true,
  // darkTheme: true,
  // backgroundColor: '#00F0F8FF',
  // opacity: 0.5
}

class Window extends BrowserWindow {
  constructor ({ file, ...windowSettings}) {
    super({ ...defaultProps, ...windowSettings});

    this.loadFile(file);
    // this.webContents.openDevTools();

    this.once('ready-to-show', () => {
      this.show();
    })
  }
}

module.exports = Window;