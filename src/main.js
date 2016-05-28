var Grid = require('./lib/grid');

var Presentation = class {
  constructor(container, opts = {}) {
    this.container = document.querySelector(container);
    this.opts = {
      className: "awesome-presentation-container",
      width: "100%",
      height: "100%",
      grid: {
        x: 5,
        y: 5
      },
      ...opts
    };
    this.init()
  }

  init() {
    this.cssClassInject()
  }

  cssClassInject() {
    this.container.className += this.opts.className
  }
};

(function(document) {
  this.Presentation = Presentation;
})(document);