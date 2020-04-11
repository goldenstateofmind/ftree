// https://stackoverflow.com/questions/31245751/how-do-you-create-a-family-tree-in-d3-js

// set the dimensions and margins of the diagram

// function diagonalJK(d) {
//   var c0 = [d.y, d.x].join(',')
//   var c1 = [(d.y + d.parent.y) / 2, d.x].join(',')
//   var c2 = [(d.y + d.parent.y) / 2, d.parent.x].join(',')
//   var c3 = [d.parent.y, d.parent.x].join(',')

//   return ['M', c0, 'C', c1, c2, c3].join(' ')
// }

fetch('parents.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    var fullWidth = 1200
    var fullHeight = 800
    var margin = { top: 20, right: 100, bottom: 30, left: 90 },
      innerWidth = fullWidth - margin.left - margin.right,
      innerHeight = fullHeight - margin.top - margin.bottom

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3
      // .select('body')
      .select('body')
      .append('svg')
      .attr('width', fullWidth)
      .attr('height', fullHeight)

    drawNFTree(svg, data, 1200, 800, 'body', 'join_id', 'right-to-left')
    drawNFTree(svg, A.nukes['a1-00'], 300, 200, '#a2-01', 'join_id')
  })

function drawNFTree(
  parentSVG,
  data,
  fullWidth = 600,
  fullHeight = 400,
  domParentSelector = 'body',
  joinId = 'nil',
  flowDir = 'left-to-right'
) {
  var margin = { top: 20, right: 100, bottom: 30, left: 90 },
    innerWidth = fullWidth - margin.left - margin.right,
    innerHeight = fullHeight - margin.top - margin.bottom

  // declares a tree layout and assigns the size
  var treemap = d3.tree().size([innerHeight, innerWidth])
  //  assigns the data to a hierarchy using parent-child relationships
  var nodes = d3.hierarchy(data, d => d.children)

  // maps the node data to the tree layout
  nodes = treemap(nodes)

  //   // append the svg object to the body of the page
  //   // appends a 'group' element to 'svg'
  //   // moves the 'group' element to the top left margin
  //   var svg = d3
  //     // .select('body')
  //     .select(domParentSelector)
  //     .append('svg')
  //     .attr('width', fullWidth)
  //     .attr('height', fullHeight)

  if (domParentSelector != 'body') {
    var anchorElement = d3.select(domParentSelector).node()
    var anchorPt = getCirclePosition(anchorElement)
    var childX = anchorPt.x
    var childY = anchorPt.y - innerHeight / 2
    console.log(anchorPt)
    var g = parentSVG.append('g')
    g.attr('transform', 'translate(' + childX + ',' + childY + ')')
  } else {
    var g = parentSVG.append('g')
    g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  }

  //   var totalSize = parentSVG
  //     .append('rect')
  //     .attr('width', fullWidth)
  //     .attr('height', fullHeight)
  //     .attr('class', 'svg-total-rect')

  //   var backgroundSansMargin = parentSVG
  //     .append('rect')
  //     .attr('width', innerWidth)
  //     .attr('height', innerHeight)
  //     .attr('class', 'svg-background-rect')
  //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  //   flowDir = 'nil'
  if (flowDir === 'right-to-left') {
    diagonalJK = d => {
      var c0 = [innerWidth - d.y, d.x].join(',')
      var c1 = [innerWidth - (d.y + d.parent.y) / 2, d.x].join(',')
      var c2 = [innerWidth - (d.y + d.parent.y) / 2, d.parent.x].join(',')
      var c3 = [innerWidth - d.parent.y, d.parent.x].join(',')
      return ['M', c0, 'C', c1, c2, c3].join(' ')
    }
  } else {
    diagonalJK = d => {
      var c0 = [d.y, d.x].join(',')
      var c1 = [(d.y + d.parent.y) / 2, d.x].join(',')
      var c2 = [(d.y + d.parent.y) / 2, d.parent.x].join(',')
      var c3 = [d.parent.y, d.parent.x].join(',')
      return ['M', c0, 'C', c1, c2, c3].join(' ')
    }
  }

  // adds the links between the nodes
  var link = g
    .selectAll('.link')
    .data(nodes.descendants().slice(1))
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d => diagonalJK(d))

  // adds each node as a group
  var node = g
    .selectAll('.node')
    .data(nodes.descendants())
    .enter()
    .append('g')
    .attr(
      'class',
      d => 'node' + (d.children ? ' node--internal' : ' node--leaf')
    )
    // .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')')
    .attr('transform', d => {
      var translateX = d.y
      if (flowDir === 'right-to-left') {
        translateX = innerWidth - d.y
      }
      return 'translate(' + translateX + ',' + d.x + ')'
    })

  // adds the circle to the node
  node
    .append('circle')
    .attr('id', d => d.data.join_id || 'nil')
    .attr('r', 4)
    .attr('class', 'test')

  // adds the text to the node
  node
    .append('foreignObject')
    .attr('class', 'fo')
    .attr('width', 300)
    .attr('x', d => (d.children ? -16 : 6))
    .attr('y', d => (d.children ? 6 : -6))
    .append('xhtml:div')
    .attr('class', 'decision')
    .html(d => d.data.name || 'x')
  // .html(d => d.data.name)
}
