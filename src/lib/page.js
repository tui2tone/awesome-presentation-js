var Elements = require("./elements");

var Page = class {
  constructor(container, grid) {
    this.config = {
      className: "ap-page-container"
    };

    this.container = container;
    this.page = this.getPageNumber(container);
    this.elements = new Elements(container, grid);
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

  init() {
    this.cssClassInject()
  }

  cssClassInject() {
    this.container.className += this.config.className
  }

  show() {
    this.container.style.display = "block";
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