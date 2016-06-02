var Animate = require("./animate");

var Element = class {
  constructor(container, grid) {
    this.config = {
      className: " ap-elm-container"
    };
    this.container = container;
    this.pos = this.getPosNumber(container);
    this.grid = grid

    // Initial
    this.init()
  }

  getPosNumber(container) {
    const isJson = IsJsonString(container.getAttribute("ap-display"))
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
        display.push(key)
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

    const elmPos = this.pos;
    this.container.className += this.config.className

    switch(elmPos.align) {
      case "center":
        this.container.className += " --center"
        break;
    }
  }

  posInject(num) {
    const pos = this.grid.pos;
    const elmPos = this.pos;

    if(elmPos.customDisplay[num] != undefined) {
      if(elmPos.customDisplay[num].width != undefined) {
        this.container.style.width = (pos.x * elmPos.customDisplay[num].width ) + "%";
      }
      if(elmPos.customDisplay[num].height != undefined) {
        this.container.style.height = (pos.x * elmPos.customDisplay[num].height ) + "%";
      }
      if(elmPos.customDisplay[num].x != undefined) {
        this.container.style.left = (pos.x * elmPos.customDisplay[num].x ) + "%";
      } else {
        this.container.style.left = (pos.x * elmPos.x ) + "%";
      }
      if(elmPos.customDisplay[num].y != undefined) {
        this.container.style.top = (pos.y * elmPos.customDisplay[num].y ) + "%";
      } else {
        this.container.style.top = (pos.y * elmPos.y ) + "%";
      }
    } else {
      if(elmPos.width != undefined) {
        this.container.style.width = (pos.x * elmPos.width ) + "%";
      }
      if(elmPos.height != undefined) {
        this.container.style.height = (pos.x * elmPos.height ) + "%";
      }
      this.container.style.left = (pos.x * elmPos.x ) + "%";
      this.container.style.top = (pos.y * elmPos.y ) + "%";
    }
  }

  max() {
    return this.pos.max
  }

  show(num) {
    let { style } = this.container
    const { animateIn } = this.pos
    const animateStyle = Animate("elm", animateIn)
    for (var key in animateStyle) {
      style[key] = animateStyle[key]
    }
    this.container.style.display = "block";

    if(animateStyle != undefined && animateStyle != "") {
      setTimeout(() => {
        this.posInject(num)
      }, 0);
    }
  }

  hide(num) {

    let { style } = this.container
    const { animateOut } = this.pos
    const animateStyle = Animate("elm", animateOut)

    if(animateStyle != undefined && animateStyle != "") {
      for (var key in animateStyle) {
        style[key] = animateStyle[key]
      }
    } else {
      this.container.style.display = "none";
    }
  }

  
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = Element;