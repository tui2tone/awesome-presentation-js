var Element = class {
  constructor(container, grid) {
    this.config = {
      className: " ap-elm-container"
    };
    this.container = container;
    this.pos = this.getPosNumber(container);
    this.grid = grid

    // Initial
    this.init()
  }

  getPosNumber(container) {
    let max = 0
    let temp = 0
    const display = (container.getAttribute("ap-display") || "").split(",").map((item) => {
        if(item.indexOf("-") > -1) {
          return item.split("-").map((sub_item) => {
            temp = parseInt(sub_item)
            if(temp > max) {
              max = temp
            }
            return temp
          })
        }
        temp = parseInt(item)
        if(temp > max) {
          max = temp
        }
        return temp
      })
    return {
      x: container.getAttribute("ap-x"),
      y: container.getAttribute("ap-y"),
      align: container.getAttribute("ap-align"),
      display: display || 0,
      max: max || 1
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

  max() {
    return this.pos.max
  }

  show() {
    this.container.style.display = "block";
  }

  hide() {
    this.container.style.display = "none";
  }

  
}

module.exports = Element;