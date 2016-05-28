var Element = require("./element");

var Elements = class {
  constructor(container, grid) {
    this.container = container;
    this.elmDocument = this.getAllElmDocument();
    this.elms = this.initElmComponent(grid);
  }

  getAllElmDocument() {
    return this.container.children;
  }

  initElmComponent(grid) {
    let temp = [];
    for (var i = 0; i < this.elmDocument.length; i++) {
      let item = this.elmDocument[i]
      temp.push(new Element(item, grid))
    }
    return temp;
  }

  findPage(num) {
    let Item = {}
    for (var i = 0; i < this.elms.length; i++) {
      Item = this.elms[i]
      if(Item.page == num) {
        return Item
        break;
      }
    }
  }
}

module.exports = Elements;