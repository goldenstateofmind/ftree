function getCirclePosition(element) {
  var svg = element.ownerSVGElement

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

diagonalJK = (d) => {
  var c0 = [d.y, d.x].join(',')
  var c1 = [(d.y + d.parent.y) / 2, d.x].join(',')
  var c2 = [(d.y + d.parent.y) / 2, d.parent.x].join(',')
  var c3 = [d.parent.y, d.parent.x].join(',')
  return ['M', c0, 'C', c1, c2, c3].join(' ')
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
  function (toElement) {
    return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM())
  }

function getPathStartPoint(parentSVG, element) {
  // var d = element.getAttribute('d')

  var point = parentSVG.createSVGPoint()
  point.x = 0 // replace this with the x co-ordinate of the path segment
  point.y = 0 // replace this with the y co-ordinate of the path segment

  var matrix = element.getTransformToElement(parentSVG)
  //   var matrix = parentSVG.getTransformToElement(element)
  var position = point.matrixTransform(matrix)
  return position
}

function joinCrossoverBranches() {
  // get all the tree heads and their ids
  var treeHeads = document.querySelectorAll('g.tree-head')
  console.log('treeHeads', treeHeads)
  var allTreeIds = [...treeHeads].map((x) => x.getAttribute('id'))
  console.log('allTreeIds', allTreeIds)

  allTreeIds.forEach((treeId) => {
    var origin = document
      .querySelector('#' + treeId)
      .querySelector(`[data--join-id^="JOINID"]`)
    //   .select('#' + treeId)

    if (origin) {
      var joinId = origin.getAttribute('data--join-id')

      var originPoint = getCirclePosition(origin)

      targetCircle = document.querySelector(`circle[jid="${joinId}"`)
      targetPosition = getCirclePosition(targetCircle)

      var groupOffset = getPathStartPoint(
        document.querySelector('svg'),
        document.querySelector('g#' + treeId)
      )
      var childX = groupOffset.x
      var childY = groupOffset.y

      d3.select('#' + treeId)
        .selectAll('.join-link')
        .data([{ id: joinId }])
        .enter()
        .append('path')
        .attr('class', `link join-link`)
        .attr('d', (d) => {
          return diagonalXY(originPoint, targetPosition)
        })
        .attr('transform', `translate(${-childX}, ${-childY})`)
        .lower()
    }

    //
  })
}
