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
    window.addEventListener("resize", this.resizeEvent.bind(this));
  }

  cssClassInject() {
    const { container, opts } = this
    container.className += opts.className

    this.ratioControl()
  }

  resizeEvent() {
    this.ratioControl()
  }

  ratioControl() {
    const { container, opts } = this
    const pos = container.getBoundingClientRect();
    let ratio = (opts.ratio || "").split(":")
    if(ratio.length > 0) {
      ratio = {
        x: parseInt(ratio[0]),
        y: parseInt(ratio[1])
      }

      const width = (window.innerHeight / ratio.y) * ratio.x
      if(width > window.innerWidth) {
        this.container.style.width = "100%"
        this.container.style.height = (window.innerWidth / ratio.x) * ratio.y + "px"
      } else {
        this.container.style.width = (window.innerHeight / ratio.y) * ratio.x + "px"
        this.container.style.height = "100%"

      }
    }
  }
};

(function(document) {
  this.Presentation = Presentation;
})(document);