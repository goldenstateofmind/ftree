// https://bl.ocks.org/schutt/91bf0ff0cba3908bf243 great tree cross-branch example with transition stroke dashoffset
// http://www.census.nationalarchives.ie/search/results.jsp?searchMoreVisible=&census_year=1911&surname=Dooher&firstname=&county19011911=Tyrone&county1821=&county1831=&county1841=&county1851=&parish=&ward=&barony=&townland=Cavanalee&houseNumber=&ded=&age=&sex=&search=Search&ageInMonths=&relationToHead=&religion=&education=&occupation=&marriageStatus=&yearsMarried=&birthplace=&nativeCountry=&language=&deafdumb=&causeOfDeath=&yearOfDeath=&familiesNumber=&malesNumber=&femalesNumber=&maleServNumber=&femaleServNumber=&estChurchNumber=&romanCatNumber=&presbNumber=&protNumber=&marriageYears=&childrenBorn=&childrenLiving=
// http://www.census.nationalarchives.ie/pages/1911/Tyrone/Camus/Cavanalee/849969/
// https://stackoverflow.com/questions/31245751/how-do-you-create-a-family-tree-in-d3-js

var yearToMilliseconds = d3
  .scaleLinear()
  //   .domain([1835, 1990])
  .domain([1885, 1990])
  .range([10, 29000])

// fetch('parents.json')
//   .then((response) => {
//     return response.json()
//   })
//   .then((data) => {

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3
  // .select('body')
  .select('body')
  .append('svg')
  .attr('width', fullWidth)
  .attr('height', fullHeight)

Object.values(A.trees).forEach((T) => {
  drawNFTree({
    parentSVG: svg,
    data: T,
    treeId: T.tid,
    joinId: 'join_id',
    fullWidth: T.width,
    fullHeight: T.height,
    offsetY: T.offsetY,
    classProp: 'pm',
  })
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

  var childX = margin.left + offsetX
  var childY = margin.top + offsetY

  var svgG = parentSVG.append('g')
  svgG.attr('transform', 'translate(' + childX + ',' + childY + ')')

  if (treeId) {
    svgG.attr('id', treeId)
    svgG.attr('class', 'tree-head')
  }

  var treemap = d3.tree().size([innerHeight, innerWidth])

  //  assigns the data to a hierarchy using parent-child relationships
  var root = d3.hierarchy(data, (d) => d.children)
  root.x0 = innerHeight / 2
  root.y0 = 0

  function collapseLevel(d, depth) {
    if (d.children && d.depth > 5) {
      d._children = d.children
      d._children.forEach(collapseLevel)
      d.children = null
    } else if (d.children) {
      d.children.forEach(collapseLevel)
    }
  }

  // Toggle children on click.
  function click(d) {
    console.log('click', d)
    if (d.children) {
      d._children = d.children
      d.children = null
    } else {
      d.children = d._children
      d._children = null
    }
    update(d)
  }

  // Collapse after the second level
  if (root.children) {
    root.children.forEach(collapseLevel)
  }

  update(root, joinId)

  function update(source, joinId) {
    // Remove any crossover branches
    document.querySelectorAll('path.join-link').forEach((el) => el.remove())

    //0
    var treeData = treemap(root)

    // 1
    var nodes = treeData.descendants()
    var links = treeData.descendants().slice(1)
    // 2
    nodes.forEach((d) => (d.y = d.depth * GENERATION_WIDTH))

    // adds each node as a group
    // 3
    var node = svgG.selectAll('g.node').data(nodes, function (d) {
      return d.id || (d.id = ++i)
    })

    // 4
    var nodeEnter = node
      .enter()
      .append('g')
      .attr('class', (d) => {
        var classes = ['node']
        if (d.children) {
          classes.push('node--internal')
        } else {
          classes.push('node--leaf')
        }
        if (!d.parent) classes.push('tree-head')
        return classes.join(' ')
      })
      .attr('transform', (d) => {
        var translateX = source.y0
        var translateY = source.x0
        return 'translate(' + translateX + ',' + translateY + ')'
      })

    // adds the circle to the node
    // 5
    nodeEnter
      .append('circle')
      .attr(
        'class',
        (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf')
      )
      .attr('r', 4)
      .attr('jid', (d) => d.data.id || 'nil')
      .attr('data--join-id', (d) => d.data[joinId] || null)
      // .on('click', click)
      .raise()

    // adds the text to the node
    // 6
    nodeEnter
      .append('text')
      .attr('class', 'fo')
      .attr('width', '180')
      .attr('height', '180')
      .style('position', 'relative')
      .attr('x', (d) => (d.children ? '6' : '6'))
      .attr('y', (d) => (d.children ? '0' : '0'))
      //   .append('xhtml:body')
      // .attr('xmlns', 'http://www.w3.org/1999/xhtml')
      //   .append('xhtml:div')
      .attr('class', 'decision')
      .style('position', 'relative')
      .html((d) => formatPersonInfoText(d.data))
      .clone(true)
      .lower()
      .attr('stroke', 'white')
      .style('stroke-width', '2')
    //   .html((d) => formatPersonInfo(d.data))

    // UPDATE
    // 7
    var nodeUpdate = nodeEnter.merge(node)

    // Transition to the proper position for the node
    // 8
    nodeUpdate
      .style('fill-opacity', 0)
      .style('stroke-opacity', 0)
      .transition()
      .duration(TRANSIDATION)
      .attr('transform', (d) => 'translate(' + d.y + ',' + d.x + ')')
      .on('start', function () {
        d3.active(this)
          .transition()
          .delay((d) => delayTime(d))
          .style('fill-opacity', 1)
          .style('stroke-opacity', 1)
          .transition()
      })

    // Update the node attributes and style
    // 9
    // nodeUpdate.select('circle.node').attr('r', 4).attr('cursor', 'pointer')
    // .raise()

    // Remove any exiting nodes
    // 10
    var nodeExit = node
      .exit()
      .transition()
      .duration(TRANSIDATION)
      .attr('transform', function (d) {
        return 'translate(' + source.y + ',' + source.x + ')'
      })
      .remove()

    // On exit reduce the node circles size to 0
    // 11
    nodeExit.select('circle').attr('r', 1e-6)

    // On exit reduce the opacity of text labels
    // 12
    nodeExit.select('foreignObject').style('opacity', 1e-6)
    // nodeExit.select('text').style('fill-opacity', 1e-6)

    // adds the links between the nodes
    // 13
    // console.log('links', links)
    // debugger

    var link = svgG.selectAll('path.link').data(links, (d) => {
      return d.id
    })

    // 14
    var linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', (d) => {
        var ret = ['link', d.parent.data[classProp]].join(' ')
        return ret
      })
      .attr('d', (d) => {
        var o = { x: source.x0, y: source.y0 }
        return diagonal(o, o)
      })
    // .lower()

    // UPDATE
    // 15
    var linkUpdate = linkEnter.merge(link)

    // Transition back to the parent element position
    // 16
    var pathLength

    linkUpdate
      //   .attr('stroke-dashoffset', -1 * pathLength)
      //   .style('stroke', '#2af')
      .attr('d', function (d) {
        pathLength = this.getTotalLength()
        return diagonal(d, d.parent)
      })
      .attr('stroke-dasharray', function () {
        // console.log(this.getTotalLength())
        pathLength = this.getTotalLength()
        return 1 * pathLength
      })
      .attr('stroke-dashoffset', function () {
        // console.log(this.getTotalLength())
        pathLength = this.getTotalLength()
        return 1 * pathLength
      })
      .transition()
      .duration(TRANSIDATION)
      .on('start', function () {
        pathLength = this.getTotalLength()
        d3.active(this)
          .attr('stroke-dashoffset', 1 * pathLength)
          .transition()
          .delay((d) => delayTime(d))
          .attr('stroke-dashoffset', 2 * pathLength)
          //   .attr('stroke-dashoffset', 0)
          .transition()
      })
      .on('end', (x) => {
        joinCrossoverBranches()
        // ANIMATE = false
        // TRANSIDATION = 0
      })

    // linkUpdate
    //   .transition()
    //   .duration(TRANSIDATION)
    //   .attr('d', function (d) {
    //     return diagonal(d, d.parent)
    //   })
    //   .on('end', (x) => {
    //     joinCrossoverBranches()
    //   })

    // Remove any exiting links
    // 17
    var linkExit = link
      .exit()
      .transition()
      .duration(TRANSIDATION)
      .attr('d', function (d) {
        var o = { x: source.x, y: source.y }
        return diagonal(o, o)
      })
      .remove()

    // Store the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x
      d.y0 = d.y
    })

    function diagonal(s, d) {
      path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

      return path
    }

    // // Toggle children on click.
    // function click(d) {
    //   console.log('click', d)
    //   if (d.children) {
    //     d._children = d.children
    //     d.children = null
    //   } else {
    //     d.children = d._children
    //     d._children = null
    //   }
    //   update(d)
    // }
  } // end update()
}
