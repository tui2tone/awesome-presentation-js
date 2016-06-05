var Animate = require("./animate");
var Elements = require("./Elements");
var JsonUtil = require("../utils/json")

var Fragment = class {
  constructor(container, grid) {
    this.config = {
      className: " ap-fragment-container"
    };
    this.container = container;
    this.pos = this.getPosNumber(container);
    this.elements = new Elements(container);
    this.grid = grid;
    this.timeline = {
      current: 1,
      all: this.elements.max
    }

    // Initial
    this.init()
    this.elements.show(1)
  }

  getPosNumber(container) {
    const isJson = JsonUtil.isJson(container.getAttribute("ap-display"))

    let max = 0,
        temp = 0,
        display = null,
        customDisplay = {}

    if(isJson && container.getAttribute("ap-display").length > 2) {
      customDisplay = JSON.parse(container.getAttribute("ap-display"))
      display = []
      for(let key in customDisplay) {
        temp = parseInt(key)
        if(temp > max) {
          max = temp
        }

        display.push(key.split(",").map((item) => {
            if(item.indexOf("-") > -1) {
              return item.split("-").map((sub_item) => {
                temp = parseInt(sub_item)
                if(temp > max) {
                  max = temp
                }
                return temp
              })
            }
            temp = parseInt(item)
            if(temp > max) {
              max = temp
            }
            return temp
          })
        )
      }
    } else {
      display = (container.getAttribute("ap-display") || "").split(",").map((item) => {
          if(item.indexOf("-") > -1) {
            return item.split("-").map((sub_item) => {
              temp = parseInt(sub_item)
              if(temp > max) {
                max = temp
              }
              return temp
            })
          }
          temp = parseInt(item)
          if(temp > max) {
            max = temp
          }
          return temp
        })
    }
    return {
      x: container.getAttribute("ap-x"),
      y: container.getAttribute("ap-y"),
      width: container.getAttribute("ap-width"),
      height: container.getAttribute("ap-height"),
      align: container.getAttribute("ap-align"),
      animateIn: container.getAttribute("ap-animate-in"),
      animateOut: container.getAttribute("ap-animate-out"),
      display: display || 0,
      customDisplay: customDisplay || {},
      max: max || 1
    }
  }

  init() {
    this.cssClassInject()
    this.posInject()
  }

  cssClassInject() {

    const fmPos = this.pos;
    this.container.className += this.config.className

    switch(fmPos.align) {
      case "center":
        this.container.className += " --center"
        break;
    }
  }

  posInject(num) {
    const pos = this.grid.pos;
    const fmPos = this.pos;

    if(fmPos.customDisplay[num] != undefined) {
      if(fmPos.customDisplay[num].width != undefined) {
        this.container.style.width = (pos.x * fmPos.customDisplay[num].width ) + "%";
      }
      if(fmPos.customDisplay[num].height != undefined) {
        this.container.style.height = (pos.x * fmPos.customDisplay[num].height ) + "%";
      }
      if(fmPos.customDisplay[num].x != undefined) {
        this.container.style.left = (pos.x * fmPos.customDisplay[num].x ) + "%";
      } else {
        this.container.style.left = (pos.x * fmPos.x ) + "%";
      }
      if(fmPos.customDisplay[num].y != undefined) {
        this.container.style.top = (pos.y * fmPos.customDisplay[num].y ) + "%";
      } else {
        this.container.style.top = (pos.y * fmPos.y ) + "%";
      }
    } else {
      if(fmPos.width != undefined) {
        this.container.style.width = (pos.x * fmPos.width ) + "%";
      }
      if(fmPos.height != undefined) {
        this.container.style.height = (pos.x * fmPos.height ) + "%";
      }
      this.container.style.left = (pos.x * fmPos.x ) + "%";
      this.container.style.top = (pos.y * fmPos.y ) + "%";
    }
  }

  max() {
    return this.pos.max
  }

  show(num, mode) {
    let { style } = this.container
    const { animateIn, animateOut } = this.pos
    let animateStyle = Animate("fm", mode, animateIn)
    if(mode == "prev") {
      animateStyle = Animate("fm", mode, animateOut)

    }
    this.posInject(num)
    for (var key in animateStyle) {
      style[key] = parseInt(style[key].replace("%","")) + animateStyle[key] + "%"
    }
    this.container.style.display = "block";

    if(animateStyle != undefined && animateStyle != "") {
      setTimeout(() => {
        this.posInject(num)
      }, 0);
    }
  }

  hide(num, mode) {
    let { style } = this.container
    const { animateIn, animateOut } = this.pos
    let animateStyle = Animate("fm", mode, animateIn)
    if(mode == "next") {
      animateStyle = Animate("fm", mode, animateOut)
    }

    if(animateStyle != undefined && animateStyle != "") {
      this.posInject(num)
      for (var key in animateStyle) {
        style[key] = parseInt(style[key].replace("%","")) + animateStyle[key] + "%"
      }
    }

    if(style.display != "none"){
      setTimeout(() => {
        this.container.style.display = "none";
      }, 200);
    }
  }


  next() {
    let { current, all } = this.timeline
    if(current < all) {
      this.timeline = {
        ...this.timelime,
        current: ++current,
        all: all
      }
      this.elements.show(this.timeline.current,"next")
      return true
    }
    return false
  }

  prev() {
    let { current, all } = this.timeline
    if(current > 1) {
      this.timeline = {
        ...this.timelime,
        current: --current,
        all: all
      }
      console.log(this.timeline)
      this.elements.show(this.timeline.current,"prev")
      return true
    }
    return false
  }
}

module.exports = Fragment;