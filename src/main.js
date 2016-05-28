var Grid = require('./lib/grid');
var Pages = require('./lib/pages');
var Player = require('./lib/play')

var Presentation = class {
  constructor(container, opts = {}) {
    this.container = document.querySelector(container);
    this.opts = {
      className: "ap-container",
      width: "100%",
      height: "100%",
      grid: {
        x: 6,
        y: 6
      },
      ...opts
    };
    this.grid = new Grid(this.opts.grid.x, this.opts.grid.y);
    this.pages = new Pages(this.container, this.grid)
    this.player = new Player(this)

    // Initial
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