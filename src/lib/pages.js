var Page = require("./page");

var Pages = class {
  constructor(container,grid) {
    this.container = container;
    this.pagesDocument = this.getAllPagesDocument();
    this.pages = this.initPagesComponent(grid);
  }

  getAllPagesDocument() {
    return this.container.children;
  }

  initPagesComponent(grid) {
    let temp = [];
    for (var i = 0; i < this.pagesDocument.length; i++) {
      let item = this.pagesDocument[i]
      temp.push(new Page(item,grid))
    }
    return temp;
  }

  findPage(num) {
    let Item = {}
    for (var i = 0; i < this.pages.length; i++) {
      Item = this.pages[i]
      if(Item.page == num) {
        return Item
        break;
      }
    }
  }

  count() {
    return this.pages.length;
  }

  show(num, mode) {
    this.pages.map((item) => {
      if(item.page == num) {
        item.show(mode)
      } else {
        item.hide(mode)
      }
    });
  }
}

module.exports = Pages;