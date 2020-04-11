function getCirclePosition(element) {
  var svg = element.ownerSVGElement

  console.log(element)

  // Get the cx and cy coordinates
  var pt = svg.createSVGPoint()
  pt.x = element.cx.baseVal.value
  pt.y = element.cy.baseVal.value

  while (true) {
    // Get this elements transform
    var transform = element.transform.baseVal.consolidate()
    // If it has a transform, then apply it to our point
    if (transform) {
      var matrix = element.transform.baseVal.consolidate().matrix
      pt = pt.matrixTransform(matrix)
    }
    // If this element's parent is the root SVG element, then stop
    if (element.parentNode == svg) break
    // Otherwise step up to the parent element and repeat the process
    element = element.parentNode
  }
  return pt
}

function diagonalYX(s, d) {
  path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

  return path
}

function diagonalXY(s, d) {
  path = `M ${s.x} ${s.y}
            C ${(s.x + d.x) / 2} ${s.y},
              ${(s.x + d.x) / 2} ${d.y},
              ${d.x} ${d.y}`

  return path
}

SVGElement.prototype.getTransformToElement =
  SVGElement.prototype.getTransformToElement ||
  function(toElement) {
    return toElement
      .getScreenCTM()
      .inverse()
      .multiply(this.getScreenCTM())
  }

function getPathStartPoint(parentSVG, element) {
  var d = element.getAttribute('d')
  console.log(d)

  var point = parentSVG.createSVGPoint()
  point.x = 0 // replace this with the x co-ordinate of the path segment
  point.y = 0 // replace this with the y co-ordinate of the path segment

  var matrix = element.getTransformToElement(parentSVG)
  console.log(matrix)
  //   var matrix = parentSVG.getTransformToElement(element)
  var position = point.matrixTransform(matrix)
  return position

  /* 
  var root = document.getElementById("root");
  var path = document.getElementById("path");
  var point = root.createSVGPoint();
  point.x = 0;  // replace this with the x co-ordinate of the path segment
  point.y = 0;  // replace this with the y co-ordinate of the path segment
  var matrix = path.getTransformToElement(root);
  var position = point.matrixTransform(matrix);
 */
}
