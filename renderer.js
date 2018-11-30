const Vue = require('vue/dist/vue.js');
const fs = require('fs')
const opn = require('opn')
const { remote, globalShortcut } = require('electron')
const currentWindow = remote.getCurrentWindow()
const path = require('path')
const BrowserWindow = remote.BrowserWindow

const App = new Vue({
    el: '#app',
    data: {
      title: 'WinY',
      itemList: [],
    },
  
    mounted() {
      let allItems = this.getItems();
      allItems.forEach(element => {
        this.itemList.push(element)
      })
    },
  
    computed: {
      allItems() {
        return this.itemList.slice();
      }
    },
  
    methods: {
      getItems() {
        const items = fs.readdirSync("C:\\Temp\\WinY")
        let i= 0
        items.forEach(element => {
          let newElement = element.replace(".lnk","")
          items[i] = newElement
          i++
        });
        return items
      },
      itemClicked(item) {
        const itemPath = "C:\\Temp\\WinY\\" + item + ".lnk"
        item === "Settings" ? this.openSettings() : opn(itemPath);
        currentWindow.hide();
      },
      openSettings() {
        // open new Settings Window
        console.log("Settings was clicked")

        const modalPath = path.join('file://', __dirname, 'settings.html')
        let win = new BrowserWindow({ width: 400, height: 200, frame: false, alwaysOnTop: true, resizable: false })
        win.on('close', function () { win = null })
        win.loadURL(modalPath)
        win.show()
      }
    }
  
  });