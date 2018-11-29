const Vue = require('vue/dist/vue.js');
const fs = require('fs')
const opn = require('opn')
const { remote } = require('electron')
const currentWindow = remote.getCurrentWindow()

const App = new Vue({
    el: '#app',
    data: {
      title: 'WinY',
      itemList: [],
    },
  
    mounted() {
      let allItems = this.getItems();
      allItems.forEach(element => {
        console.log(element)
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
        opn(itemPath);
        currentWindow.hide();
      }
    }
  
  });