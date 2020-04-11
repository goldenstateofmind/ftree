// http://www.census.nationalarchives.ie/search/results.jsp?searchMoreVisible=&census_year=1911&surname=Dooher&firstname=&county19011911=Tyrone&county1821=&county1831=&county1841=&county1851=&parish=&ward=&barony=&townland=Cavanalee&houseNumber=&ded=&age=&sex=&search=Search&ageInMonths=&relationToHead=&religion=&education=&occupation=&marriageStatus=&yearsMarried=&birthplace=&nativeCountry=&language=&deafdumb=&causeOfDeath=&yearOfDeath=&familiesNumber=&malesNumber=&femalesNumber=&maleServNumber=&femaleServNumber=&estChurchNumber=&romanCatNumber=&presbNumber=&protNumber=&marriageYears=&childrenBorn=&childrenLiving=
// http://www.census.nationalarchives.ie/pages/1911/Tyrone/Camus/Cavanalee/849969/
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
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    var fullWidth = 800
    var fullHeight = 1200
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

    drawNFTree({
      parentSVG: svg,
      data: A.unionsKelly,
      treeId: 'unionsKelly',
      //   joinId: 'id',
      fullWidth: fullWidth,
      fullHeight: fullHeight / 4,
      offsetY: (1 * fullHeight) / 4,
      classProp: 'pm',
    })

    drawNFTree({
      parentSVG: svg,
      data: A.unionsMcGlynn,
      treeId: 'unionsMcGlynn',
      joinId: 'join_id',
      fullWidth: fullWidth,
      fullHeight: fullHeight / 4,
      offsetY: (0 * fullHeight) / 4,
      classProp: 'pm',
    })

    drawNFTree({
      parentSVG: svg,
      data: A.unionsDooher,
      treeId: 'unionsDooher',
      joinId: 'join_id',
      fullWidth,
      fullHeight: fullHeight / 4,
      offsetY: (2 * fullHeight) / 4,
      classProp: 'pm',
    })

    // drawNFTree(svg, data, 1200, 800, 'body', 'join_id', 'right-to-left')
    // drawNFTree(svg, A.nukes['a1-00'], 300, 200, '#a2-01', 'join_id')
  })

function drawNFTree({
  parentSVG,
  data,
  treeId = null,
  fullWidth = 600,
  fullHeight = 400,
  offsetX = 0,
  offsetY = 0,
  domParentSelector = 'body',
  joinId = null,
  flowDir = 'left-to-right',
  classProp = 'class',
} = {}) {
  var margin = { top: 20, right: 100, bottom: 30, left: 90 },
    innerWidth = fullWidth - margin.left - margin.right,
    innerHeight = fullHeight - margin.top - margin.bottom

  // declares a tree layout and assigns the size
  var treemap = d3.tree().size([innerHeight, innerWidth])
  //  assigns the data to a hierarchy using parent-child relationships
  var rootIsD3hierarchy = d3.hierarchy(data, (d) => d.children)
  //   nodes = treemap(rootIsD3hierarchy)

  var d3tree = d3.tree().size([innerHeight, innerWidth])
  rootNode = d3tree(rootIsD3hierarchy)
  var nodes = rootNode.descendants()
  var links = rootNode.descendants().slice(1)
  nodes.forEach(function (d) {
    d.y = d.depth * 120
  })

  //   // append the svg object to the body of the page
  //   // appends a 'group' element to 'svg'
  //   // moves the 'group' element to the top left margin
  //   var svg = d3
  //     // .select('body')
  //     .select(domParentSelector)
  //     .append('svg')
  //     .attr('width', fullWidth)
  //     .attr('height', fullHeight)

  var childX = margin.left + offsetX
  var childY = margin.top + offsetY

  if (domParentSelector != 'body') {
    var anchorElement = d3.select(domParentSelector).node()
    var anchorPt = getCirclePosition(anchorElement)
    childX = offsetX + anchorPt.x
    childY = offsetY + anchorPt.y - innerHeight / 2
  }
  var g = parentSVG.append('g')
  g.attr('transform', 'translate(' + childX + ',' + childY + ')')

  if (treeId) {
    g.attr('id', treeId)
  }

  if (flowDir === 'right-to-left') {
    diagonalJK = (d) => {
      var c0 = [innerWidth - d.y, d.x].join(',')
      var c1 = [innerWidth - (d.y + d.parent.y) / 2, d.x].join(',')
      var c2 = [innerWidth - (d.y + d.parent.y) / 2, d.parent.x].join(',')
      var c3 = [innerWidth - d.parent.y, d.parent.x].join(',')
      return ['M', c0, 'C', c1, c2, c3].join(' ')
    }
  } else {
    diagonalJK = (d) => {
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
    .data(links)
    // .data(nodes.descendants().slice(1))
    .enter()
    .append('path')
    // .attr('data--join-id', d => d.data[joinId] || null)
    .attr('class', (d) => {
      var ret = ['link', d.parent.data[classProp]].join(' ')
      return ret
    })
    .attr('d', (d) => diagonalJK(d))

  // adds each node as a group
  var node = g
    .selectAll('.node')
    .data(nodes)
    // .data(nodes.descendants())
    .enter()
    .append('g')
    .attr(
      'class',
      (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf')
    )
    // .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')')
    .attr('transform', (d) => {
      var translateX = d.y
      if (flowDir === 'right-to-left') {
        translateX = innerWidth - d.y
      }
      return 'translate(' + translateX + ',' + d.x + ')'
    })

  // adds the circle to the node
  node
    .append('circle')
    .attr('id', (d) => d.data.id || 'nil')
    .attr('data--join-id', (d) => d.data[joinId] || null)
    .attr('r', 4)
    .attr('class', 'test')

  // adds the text to the node
  node
    .append('foreignObject')
    .attr('class', 'fo')
    .attr('width', 300)
    .attr('x', (d) => (d.children ? 6 : 6))
    .attr('y', (d) => (d.children ? 1 : -5))
    // .attr('y', d => (d.children ? 6 : -6))
    .append('xhtml:div')
    .attr('class', 'decision')
    .html((d) => d.data.name || '')
  // .html(d => d.data.name)

  if (joinId) {
    var origin = document
      .querySelector('#' + treeId)
      .querySelector(`[data--join-id^="JOINID"]`)
    //   .select('#' + treeId)

    // var joinId = originPoint.attr('data--join-id')
    var joinId = origin.getAttribute('data--join-id')
    console.log('joinId', joinId)

    var parentSVG = document.querySelector('svg')
    // var d3svg = d3.select('svg')

    var originPoint = getCirclePosition(origin)
    // originPoint = { x: 610 + 90, y: 215 + 420 }
    console.log('path start point', originPoint)

    targetCircle = document.querySelector('circle#' + joinId)
    console.log('targetCircle', targetCircle)

    targetPosition = getCirclePosition(targetCircle)

    debugger

    // d3svg
    //   .append('circle')
    //   .attr('class', 'origin')
    //   .attr('r', 5)
    //   .attr('cx', originPoint.x)
    //   .attr('cy', originPoint.y)

    // d3svg
    //   .append('circle')
    //   .attr('class', 'target')
    //   .attr('r', 5)
    //   .attr('cx', targetPosition.x)
    //   .attr('cy', targetPosition.y)

    console.log(-(margin.top + 1.5 * fullHeight))
    console.log(-(margin.top + 2.5 * fullHeight))

    d3.select('#' + treeId)
      .append('path')
      .attr('class', `link join-link`)
      .attr('d', diagonalXY(originPoint, targetPosition))
      //   .attr('d', diagonalYX(originPoint, targetPosition))
      // .attr('transform', `translate(${groupOffset.x}, -${groupOffset.y})`)
      .attr(
        'transform',
        `translate(${-childX}, ${-childY})`
        // `translate(${-margin.left}, ${-(margin.top + 2 * fullHeight)})`
      )
      .lower()
  }
}
