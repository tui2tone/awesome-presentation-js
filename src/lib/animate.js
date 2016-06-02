module.exports = function(component, style) {
  switch(component) {
    case "page":
      switch(style) {
        case "slideInUp":
          return { top: "150%" }
        case "slideInDown":
          return { top: "-50%" }
        case "slideInLeft":
          return { left: "-50%" }
        case "slideInRight":
          return { left: "150%" }
        case "slideOutUp":
          return { top: "-50%" }
        case "slideOutDown":
          return { top: "150%" }
        case "slideOutLeft":
          return { left: "-50%" }
        case "slideOutRight":
          return { left: "150%" }
        default:
          return {}
      }
    case "elm":
      switch(style) {
        case "slideInUp":
          return { top: "150%" }
        case "slideInDown":
          return { top: "-50%" }
        case "slideInLeft":
          return { left: "-50%" }
        case "slideInRight":
          return { left: "150%" }
        case "slideOutUp":
          return { top: "-50%" }
        case "slideOutDown":
          return { top: "150%" }
        case "slideOutLeft":
          return { left: "-50%" }
        case "slideOutRight":
          return { left: "150%" }
        default:
          return {}
      }
    default:
      return {}
  }
}