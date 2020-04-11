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
/* 
var rootNode
function update(sourceHierarchy) {
  rootNode = d3tree(rootIsD3hierarchy)

  var nodes = rootNode.descendants()
  var links = rootNode.descendants().slice(1)
  // Normalize for fixed-depth.
  nodes.forEach((d) => (d.y = d.depth * 180))

  // ****************** Nodes section ***************************

  // Update the nodes...
  // var node = g.selectAll('g.node').data(rootNode.descendants(), function(d) {
  node = svgG.selectAll('g.node').data(nodes, function (d) {
    return d.id || (d.id = ++i)
  })

  // Enter any new modes at the parent's previous position.
  nodeEnter = node
    .enter()
    .append('g')
    .attr('id', (d, di) => 'g-' + di)
    .attr('class', 'node')
    .attr('class', (d) => {
      var classes = ['node']
      if (d.data.class) {
        classes.push(d.data.class)
      }
      if (d.data.name) {
        classes.push(d.data.name)
      }
      return classes.join(' ')
    })
    .attr('transform', function (d) {
      return 'translate(' + sourceHierarchy.y0 + ',' + sourceHierarchy.x0 + ')'
    })
    .on('click', click)

  // Add Circle for the nodes
  nodeEnter
    .append('circle')
    .attr('class', 'node')
    .attr('class', (d) => {
      var classes = ['node']
      if (d._children) {
        classes.push('has-children')
      } else {
        classes.push('hasnt')
      }
      if (d.data.class) {
        classes.push(d.data.class)
      } else {
        classes.push('unmatched')
      }
      return classes.join(' ')
    })
    .attr('r', 1e-6)

  nodeEnter
    .append('foreignObject')
    .attr('class', (d) => {
      var classes = ['svg-fo-label']
      if (d.data.class) {
        classes.push(d.data.class)
      }
      return classes.join(' ')
    })
    .attr('x', (d) => {
      if (d.children) {
        // return -50
        return 10
      }
      return 10
    })
    // .attr('y', d => (d.children ? -22 : -10))
    .attr('y', (d) => (d.children ? -22 : -26))
    .attr('width', 120)
    .attr('height', 20)
    .append('xhtml:div')
    .attr('class', 'node-text')
    .html((d) => {
      if (d.data.name != '|') {
        var ingredAmts = getIngredAmts(d.data.name)
        // console.log(d.data)
        if (ingredAmts) {
          return ingredAmts
        }
        if (PROD) {
          return A.lut[d.data.name] || d.data.name || ''
        }
        return d.data.name || ''
      }
      return ''
    })
  // .raise()

  d3.selectAll('g.node.leaf').raise()

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node)

  // Transition to the proper position for the node
  nodeUpdate
    .transition()
    .duration(duration)
    .attr('transform', (d) => 'translate(' + d.y + ',' + d.x + ')')

  // Update the node attributes and style
  nodeUpdate
    .select('circle.node')
    .attr('r', 5)
    .attr('cursor', 'pointer')
    .attr('class', (d) => {
      var classes = ['node']
      if (d._children) {
        classes.push('has-children')
      } else {
        classes.push('hasnt')
      }
      if (d.data.class) {
        classes.push(d.data.class)
      } else {
        classes.push('unmatched')
      }
      if (d.data.name === '') {
        classes.push('no-name')
      }
      return classes.join(' ')
    })

  // Remove any exiting nodes
  var nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr('transform', function (d) {
      return 'translate(' + sourceHierarchy.y + ',' + sourceHierarchy.x + ')'
    })
    .remove()

  // On exit reduce the node circles size to 0
  nodeExit.select('circle').attr('r', 1e-6)

  // On exit reduce the opacity of text labels
  nodeExit.select('text').style('fill-opacity', 1e-6)

  // ****************** links section ***************************

  // Update the links...
  link = svgG.selectAll('path.link').data(links, (d) => d.id)

  // Enter any new links at the parent's previous position.
  linkEnter = link
    .enter()
    .insert('path', 'g')
    .attr('class', 'link')
    .attr('d', function (d) {
      var o = { x: sourceHierarchy.x0, y: sourceHierarchy.y0 }
      return diagonal(o, o)
    })

  // UPDATE
  linkUpdate = linkEnter.merge(link)

  // Transition back to the parent element position
  linkUpdate
    .transition()
    .duration(duration)
    .attr('d', (d) => diagonal(d, d.parent))
    .end()
    .then(() => {
      clonePaths()
      processTextlessNodes()
      offsetAndNarrowPaths()
      drawCrossBranches()
    })

  // Remove any exiting links
  linkExit = link
    .exit()
    .transition()
    .on('end', offsetAndNarrowPaths)
    .duration(duration)
    // .attr('d', treeLink)
    .attr('d', function (d) {
      var o = { x: sourceHierarchy.x, y: sourceHierarchy.y }
      return diagonal(o, o)
    })
    .remove()

  // Store the old positions for transition.
  nodes.forEach(function (d) {
    d.x0 = d.x
    d.y0 = d.y
  })

  var nodesSelection = d3.selectAll('node')
  var circles = d3.selectAll('circle.match')
  // nodeUpdate
  // nodeEnter
  circles.classed('highlight', function (d) {
    var filtered = nodesSelection.filter((e) => d.ancestors().indexOf(e) > -1)
    filtered.selectAll('g.node, .node-text, circle').classed('highlight', true)

    // d3.selectAll('path').classed('highlight', function(link_d) {
    d3.selectAll('g.node, path').classed('highlight', function (link_d) {
      if (d3.select(this).classed('highlight')) {
        return true
      }
      var srcIdx = d.ancestors().indexOf(link_d.parent)
      var tarIdx = d.ancestors().indexOf(link_d)

      if (srcIdx > -1 && tarIdx > -1) {
        return true
      }
    })
    return true
  })
}
 */
