var Elements = require("./elements");

var Page = class {
  constructor(container, grid) {
    this.config = {
      className: "ap-page-container"
    };

    this.container = container;
    this.page = this.getPageNumber(container);
    this.elements = new Elements(container, grid);

    // Initial
    this.init()
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
}

module.exports = Page;