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
      all: this.elements.countTimeline()
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
  }

  hide() {
    this.container.style.display = "none";
  }

  next() {
    let { current, all } = this.timeline
    if(current < all) {
      this.timeline = {
        ...this.timelime,
        current: ++current
      }
      this.elements.show(this.timeline.current)
    }
  }

  prev() {
    let { current, all } = this.timeline
    if(all > 1) {
      this.timeline = {
        ...this.timelime,
        current: --current
      }
      this.elements.show(this.timeline.current)
    }
  }


}

module.exports = Page;