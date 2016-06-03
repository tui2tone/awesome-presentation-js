var Fragment = require("./fragment");

var Fragments = class {
  constructor(container, grid) {
    this.container = container;
    this.fmDocument = this.getAllFmDocument();
    this.fms = this.initFmComponent(grid);
    this.max = this.countTimeline();
  }

  getAllFmDocument() {
    return this.container.children;
  }

  initFmComponent(grid) {
    let temp = [];
    for (var i = 0; i < this.fmDocument.length; i++) {
      let item = this.fmDocument[i]
      temp.push(new Fragment(item, grid))
    }
    return temp;
  }

  findPage(num) {
    let Item = {}
    for (var i = 0; i < this.fms.length; i++) {
      Item = this.fms[i]
      if(Item.page == num) {
        return Item
        break;
      }
    }
  }

  countTimeline() {
    let max = 0
    this.fms.map((item) => {
      if(item.pos.max > max) {
        max = item.pos.max
      }
    })

    return max
  }

  show(num, mode) {
    this.fms.map((item) => {
      let is_hide = true
      for (var i = 0; i < item.pos.display.length; i++) {
        const dis = item.pos.display[i]
        if(typeof dis == "object") {
          if(dis.indexOf(num) > -1) {
            is_hide = false
            item.show(num, mode)
            break;
          }
        } else {
          if(parseInt(dis) == num) {
            is_hide = false
            item.show(num, mode)
            break;
          }
        }
      }

      if(is_hide) {
        item.hide(num, mode)
      }
    });
  }
}

module.exports = Fragments;