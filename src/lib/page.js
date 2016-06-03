var Fragments = require("./fragments");
var Animate = require("./animate");

var Page = class {
  constructor(container, grid) {
    this.config = {
      className: " ap-page-container"
    };

    this.container = container;
    this.page = this.getPageNumber(container);
    this.fragments = new Fragments(container, grid);
    this.pos = this.getPos(container);
    this.timeline = {
      current: 1,
      all: this.fragments.max
    }

    // Initial
    this.init()
    this.fragments.show(this.timeline.current)
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

  show(mode) {
    let { style } = this.container
    const { animateIn, animateOut } = this.pos
    let animateStyle = Animate("fm", mode, animateIn)
    if(mode == "prev") {
      animateStyle = Animate("fm", mode, animateOut)

    }
    this.posInject()
    for (var key in animateStyle) {
      style[key] = parseInt(style[key].replace("%","")) + animateStyle[key] + "%"
    }
    this.container.style.display = "block";

    if(animateStyle != undefined && animateStyle != "") {
      setTimeout(() => {
        this.posInject()
      }, 0);
    }
  }

  hide(mode) {
    let { style } = this.container
    const { animateIn, animateOut } = this.pos
    let animateStyle = Animate("fm", mode, animateIn)
    if(mode == "next") {
      animateStyle = Animate("fm", mode, animateOut)
    }

    if(animateStyle != undefined && animateStyle != "") {
      this.posInject()
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
    const isNextElm = this.fragments.fms[current-1].next()
    if(!isNextElm) {
      if(current < all) {
        this.timeline = {
          ...this.timelime,
          current: ++current,
          all: all
        }
        this.fragments.show(this.timeline.current,"next")
        return true
      }
      return false
    }
    return true
  }

  prev() {
    let { current, all } = this.timeline
    const isNextElm = this.fragments.fms[current-1].prev()
    if(!isNextElm) {
      if(current > 1) {
        this.timeline = {
          ...this.timelime,
          current: --current,
          all: all
        }
        this.fragments.show(this.timeline.current,"prev")
        return true
      }
      return false
    }
    return true
  }


}

module.exports = Page;