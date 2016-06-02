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
    let max = 0
    let temp = 0
    const display = (container.getAttribute("ap-display") || "").split(",").map((item) => {
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
    return {
      x: container.getAttribute("ap-x"),
      y: container.getAttribute("ap-y"),
      width: container.getAttribute("ap-width"),
      height: container.getAttribute("ap-height"),
      align: container.getAttribute("ap-align"),
      animateIn: container.getAttribute("ap-animate-in"),
      animateOut: container.getAttribute("ap-animate-out"),
      display: display || 0,
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

  posInject() {
    const pos = this.grid.pos;
    const elmPos = this.pos;

    this.container.style.left = (pos.x * elmPos.x ) + "%";
    this.container.style.top = (pos.y * elmPos.y ) + "%";
    if(elmPos.width != undefined) {
      this.container.style.width = (pos.x * elmPos.width ) + "%";
    }
    if(elmPos.height != undefined) {
      this.container.style.height = (pos.x * elmPos.height ) + "%";
    }
  }

  max() {
    return this.pos.max
  }

  show() {
    let { style } = this.container
    const { animateIn } = this.pos
    const animateStyle = Animate("elm", animateIn)
    for (var key in animateStyle) {
      style[key] = animateStyle[key]
    }
    this.container.style.display = "block";

    if(animateStyle != undefined && animateStyle != "") {
      setTimeout(() => {
        this.posInject()
      }, 0);
    }
  }

  hide() {

    let { style } = this.container
    const { animateIn } = this.pos
    const animateStyle = Animate("elm", animateIn)

    if(animateStyle != undefined && animateStyle != "") {
      for (var key in animateStyle) {
        style[key] = animateStyle[key]
      }
    } else {
      this.container.style.display = "none";
    }
  }

  
}

module.exports = Element;