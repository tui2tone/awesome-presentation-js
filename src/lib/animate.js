module.exports = function(component, mode, style) {

  switch(mode) {
    case "next":
      switch(style) {
        case "slideInUp":
          return { top: 200 }
        case "slideInDown":
          return { top: 100 }
        case "slideInLeft":
          return { left: 100 }
        case "slideInRight":
          return { left: 200 }
        case "slideOutUp":
          return { top: 100 }
        case "slideOutDown":
          return { top: 200 }
        case "slideOutLeft":
          return { left: 100 }
        case "slideOutRight":
          return { left: 200 }
        default:
          return {}
      }
    case "prev":
      switch(style) {
        case "slideInUp":
          return { top: 200 }
        case "slideInDown":
          return { top: 100 }
        case "slideInLeft":
          return { left: 100 }
        case "slideInRight":
          return { left: 200 }
        case "slideOutUp":
          return { top: 100 }
        case "slideOutDown":
          return { top: 200 }
        case "slideOutLeft":
          return { left: 100 }
        case "slideOutRight":
          return { left: 200 }
        default:
          return {}
      }
    default:
      return {}
  }
  // switch(component) {
  //   case "page":
  //     switch(mode) {
  //       case "prev":
  //         switch(style) {
  //           case "slideInUp":
  //             return { top: "-50%" }
  //           case "slideInDown":
  //             return { top: "150%" }
  //           case "slideInLeft":
  //             return { left: "150%" }
  //           case "slideInRight":
  //             return { left: "-50%" }
  //           case "slideOutUp":
  //             return { top: "150%" }
  //           case "slideOutDown":
  //             return { top: "-50%" }
  //           case "slideOutLeft":
  //             return { left: "150%" }
  //           case "slideOutRight":
  //             return { left: "-50%" }
  //           default:
  //             return {}
  //         }
  //       case "next":
  //         switch(style) {
  //           case "slideInUp":
  //             return { top: "150%" }
  //           case "slideInDown":
  //             return { top: "-50%" }
  //           case "slideInLeft":
  //             return { left: "-50%" }
  //           case "slideInRight":
  //             return { left: "150%" }
  //           case "slideOutUp":
  //             return { top: "-50%" }
  //           case "slideOutDown":
  //             return { top: "150%" }
  //           case "slideOutLeft":
  //             return { left: "-50%" }
  //           case "slideOutRight":
  //             return { left: "150%" }
  //           default:
  //             return {}
  //         }
  //       default:
  //         return {}
  //     }
  //   case "fm":
  //     switch(style) {
  //       case "slideInUp":
  //         return { top: "150%" }
  //       case "slideInDown":
  //         return { top: "-50%" }
  //       case "slideInLeft":
  //         return { left: "-50%" }
  //       case "slideInRight":
  //         return { left: "150%" }
  //       case "slideOutUp":
  //         return { top: "-50%" }
  //       case "slideOutDown":
  //         return { top: "150%" }
  //       case "slideOutLeft":
  //         return { left: "-50%" }
  //       case "slideOutRight":
  //         return { left: "150%" }
  //       default:
  //         return {}
  //     }
  //   default:
  //     return {}
  // }
}