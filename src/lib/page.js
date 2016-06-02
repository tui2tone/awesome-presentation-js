var Elements = require("./elements");
var Animate = require("./animate");

var Page = class {
  constructor(container, grid) {
    this.config = {
      className: "ap-page-container"
    };

    this.container = container;
    this.page = this.getPageNumber(container);
    this.elements = new Elements(container, grid);
    this.pos = this.getPos(container);
    this.timeline = {
      current: 1,
      all: this.elements.max
    }

    // Initial
    this.init()
    this.elements.show(this.timeline.current)
  }

  getPageNumber(container) {
    return container.getAttribute("ap-page");
  }

  getPos(container) {
    return {
      animateIn: container.getAttribute("ap-animate-in"),
      animateOut: container.getAttribute("ap-animate-out")
    }
  }

  posInject() {
    let { style } = this.container
    style.left = 0
    style.top = 0
  }

  init() {
    this.cssClassInject()
  }

  cssClassInject() {
    this.container.className += this.config.className
  }

  show() {
    let { style } = this.container

    const { animateIn } = this.pos
    const animateStyle = Animate("page", animateIn)
    for (var key in animateStyle) {
      style[key] = animateStyle[key]
    }

    style.display = "block";

    if(animateStyle != undefined && animateStyle != "") {
      setTimeout(() => {
        this.posInject()
      }, 0);
    }
    this.elements.show(this.timeline.current)
  }

  hide() {
    this.container.style.display = "none";
  }

  next() {
    let { current, all } = this.timeline
    if(current < all) {
      this.timeline = {
        ...this.timelime,
        current: ++current,
        all: all
      }
      this.elements.show(this.timeline.current)
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
      this.elements.show(this.timeline.current)
      return true
    }
    return false
  }


}

module.exports = Page;