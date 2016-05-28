var Element = class {
  constructor(container, grid) {
    this.config = {
      className: " ap-elm-container"
    }
    this.container = container;
    this.pos = this.getPosNumber(container)
    this.grid = grid

    // Initial
    this.init()
  }

  getPosNumber(container) {
    return {
      x: container.getAttribute("ap-x"),
      y: container.getAttribute("ap-y"),
      align: container.getAttribute("ap-align")
    }
  }

  init() {
    this.cssClassInject()
    this.posInject()
  }

  cssClassInject() {

    const elmPos = this.pos;
    this.container.className += this.config.className

    switch(elmPos.align) {
      case "center":
        this.container.className += " --center"
        break;
    }
  }

  posInject() {
    const pos = this.grid.pos;
    const elmPos = this.pos;

    this.container.style.left = (pos.x * elmPos.x ) + "%";
    this.container.style.top = (pos.y * elmPos.y ) + "%";
  }
}

module.exports = Element;