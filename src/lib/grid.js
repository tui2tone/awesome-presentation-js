var Grid = class {
  constructor(x,y, opts = {}) {
    this.x = x;
    this.y = y;

    this.opts = {
      ...opts
    }
  }
}

module.exports = Grid;