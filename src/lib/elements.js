var Element = require("./element");

var Elements = class {
  constructor(container, grid) {
    this.container = container;
    this.elmDocument = this.getAllElmDocument();
    this.elms = this.initElmComponent(grid);
    this.max = this.countTimeline();
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

  countTimeline() {
    let max = 0
    this.elms.map((item) => {
      if(item.pos.max > max) {
        max = item.pos.max
      }
    })

    return max
  }

  show(num) {
    this.elms.map((item) => {
      item.pos.display.map((dis) => {
        if(typeof dis == "object") {
          if(dis.indexOf(num) > -1) {
            item.show()
          } else {
            item.hide()
          }
        } else {
          if(dis == num) {
            item.show()
          } else {
            item.hide()
          }
        }
      })
    });
  }
}

module.exports = Elements;