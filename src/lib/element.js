var Animate = require("./animate");
var JsonUtil = require("../utils/json")

var Element = class {
  constructor(container) {
    this.config = {
      className: " ap-elm-container"
    };
    this.container = container;
    this.pos = this.getPosNumber(container);
  }

  getPosNumber(container) {
    const isJson = JsonUtil.isJson(container.getAttribute("ap-display"))
    let max = 0,
        temp = 0,
        display = null,
        customDisplay = {}

    if(isJson && container.getAttribute("ap-display").length > 2) {
      customDisplay = JSON.parse(container.getAttribute("ap-display"))
      display = []
      for(let key in customDisplay) {
        temp = parseInt(key)
        if(temp > max) {
          max = temp
        }
        display.push(key)
      }
    } else {
      display = (container.getAttribute("ap-display") || "").split(",").map((item) => {
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
    }
    return {
      animateIn: container.getAttribute("ap-animate-in"),
      animateOut: container.getAttribute("ap-animate-out"),
      display: display || 0,
      customDisplay: customDisplay || {},
      max: max || 1
    }
  }


  max() {
    return this.pos.max
  }

  show(num) {
    let { style } = this.container
    this.container.style.display = "block";
  }

  hide(num) {
    this.container.style.display = "none";
  }

  
}

module.exports = Element;