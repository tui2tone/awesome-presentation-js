var Grid = class {
  constructor(x,y, opts = {}) {
    this.x = x;
    this.y = y;

    this.opts = {
      ...opts
    }

    this.pos = {
      x: 100/x,
      y: 100/y
    }
  }
}

module.exports = Grid;