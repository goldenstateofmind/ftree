// http://www.census.nationalarchives.ie/search/results.jsp?searchMoreVisible=&census_year=1911&surname=Dooher&firstname=&county19011911=Tyrone&county1821=&county1831=&county1841=&county1851=&parish=&ward=&barony=&townland=Cavanalee&houseNumber=&ded=&age=&sex=&search=Search&ageInMonths=&relationToHead=&religion=&education=&occupation=&marriageStatus=&yearsMarried=&birthplace=&nativeCountry=&language=&deafdumb=&causeOfDeath=&yearOfDeath=&familiesNumber=&malesNumber=&femalesNumber=&maleServNumber=&femaleServNumber=&estChurchNumber=&romanCatNumber=&presbNumber=&protNumber=&marriageYears=&childrenBorn=&childrenLiving=
// http://www.census.nationalarchives.ie/pages/1911/Tyrone/Camus/Cavanalee/849969/
// https://stackoverflow.com/questions/31245751/how-do-you-create-a-family-tree-in-d3-js

const GENERATION_WIDTH = 180
const duration = 750
var i = 0

/* 
Works, but doesn't balance patriarchy, matriarchy:
Father's child(ren) is the marriage, which has the "jid"
Mother's child(ren) is empty; mother has the "join_id"

A.unionsMcGlynn = {
    name: '...',
    children: [
        name: 'Delia',
        join_id: 'JOINID-19xx-Kelly-McGlynn',
        children: [],
    ]
}

A.unionsKelly = {
    name: '...',
    children: [
        name: 'Patrick',
        children: [
            {
                name: 'Patrick Kelly &<br/>Delia McGlynn',
                id: 'JOINID-19xx-Kelly-McGlynn',
            }
        ],
    ]
}

 */

fetch('parents.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    var fullWidth = 3000
    var fullHeight = 2000
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

    const heightMcGlynn = 380
    const heightKelly = 650
    const heightDooher = 650
    const heightHannigan = 300

    const offsetYGeneric = 150
    const offsetYKelly = -450
    const offsetYDooher = 130
    const offsetYHannigan = -200

    drawNFTree({
      parentSVG: svg,
      data: A.unionsKelly,
      treeId: 'unionsKelly',
      //   joinId: 'id',
      fullWidth: fullWidth,
      fullHeight: heightKelly,
      offsetY: heightKelly + offsetYKelly,
      classProp: 'pm',
    })

    // drawNFTree({
    //   parentSVG: svg,
    //   data: A.unionsMcGlynn,
    //   treeId: 'unionsMcGlynn',
    //   joinId: 'join_id',
    //   fullWidth: fullWidth,
    //   fullHeight: heightMcGlynn,
    //   offsetY: 0,
    //   classProp: 'pm',
    // })

    // drawNFTree({
    //   parentSVG: svg,
    //   data: A.unionsMonaghan,
    //   treeId: 'unionsMonaghan',
    //   joinId: 'join_id',
    //   fullWidth: fullWidth,
    //   fullHeight: 200,
    //   offsetY: 0,
    //   classProp: 'pm',
    // })

    drawNFTree({
      parentSVG: svg,
      data: A.unionsShiel,
      treeId: 'unionsShiel',
      joinId: 'join_id',
      fullWidth: fullWidth,
      fullHeight: 200,
      offsetY: heightKelly - offsetYGeneric,
      classProp: 'pm',
    })

    // drawNFTree({
    //   parentSVG: svg,
    //   data: A.unionsDooher,
    //   treeId: 'unionsDooher',
    //   joinId: 'join_id',
    //   fullWidth,
    //   fullHeight: heightDooher,
    //   offsetY: heightKelly + heightMcGlynn + offsetYKelly + offsetYDooher,
    //   classProp: 'pm',
    // })

    // drawNFTree({
    //   parentSVG: svg,
    //   data: A.unionsMcGurk,
    //   treeId: 'unionsMcGurk',
    //   joinId: 'join_id',
    //   fullWidth: fullWidth,
    //   fullHeight: 200,
    //   offsetY:
    //     heightKelly +
    //     heightMcGlynn +
    //     offsetYKelly +
    //     offsetYDooher +
    //     offsetYGeneric,
    //   classProp: 'pm',
    // })

    // drawNFTree({
    //   parentSVG: svg,
    //   data: A.unionsHannigan,
    //   treeId: 'unionsHannigan',
    //   joinId: 'join_id',
    //   fullWidth,
    //   fullHeight: heightHannigan,
    //   offsetY:
    //     heightKelly +
    //     heightMcGlynn +
    //     heightDooher +
    //     offsetYKelly +
    //     offsetYDooher +
    //     offsetYHannigan,
    //   classProp: 'pm',
    // })

    //  drawNFTree({
    //   parentSVG: svg,
    //   data: A.unionsTemple,
    //   treeId: 'unionsTemple',
    //   joinId: 'join_id',
    //   fullWidth: fullWidth,
    //   fullHeight: 200,
    //   offsetY:
    //     heightKelly +
    //     heightMcGlynn +
    //     heightDooher +
    //     offsetYKelly +
    //     offsetYDooher +
    //     offsetYHannigan +
    //     offsetYGeneric,
    //   classProp: 'pm',
    // })

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

  var childX = margin.left + offsetX
  var childY = margin.top + offsetY

  var svgG = parentSVG.append('g')
  svgG.attr('transform', 'translate(' + childX + ',' + childY + ')')

  if (treeId) {
    svgG.attr('id', treeId)
  }

  var treemap = d3.tree().size([innerHeight, innerWidth])

  //  assigns the data to a hierarchy using parent-child relationships
  var root = d3.hierarchy(data, function (d) {
    return d.children
  })
  root.x0 = innerHeight / 2
  root.y0 = 0

  // Collapse after the second level
  console.log(root)
  //   root.children.forEach(collapse)

  update(root, joinId)
  // First set the parent object in each data object:

  function collapse(d) {
    if (d.children) {
      d._children = d.children
      //set the parent object in all the children
      d._children.forEach(function (d1) {
        d1.parent = d
        collapse(d1)
      })
      d.children = null
    }
  }

  function update(source, joinId) {
    //0
    var treeData = treemap(root)
    console.log('update, joinId', joinId)

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
      .attr(
        'class',
        'node'
        // (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf')
      )
      // .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')')
      .attr('transform', (d) => {
        // var translateX = d.y
        // var translateY = d.x
        var translateX = source.y0
        var translateY = source.x0
        return 'translate(' + translateX + ',' + translateY + ')'
      })
      .on('click', click)

    // adds the circle to the node
    // 5
    nodeEnter
      .append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      //   .style('fill', function (d) {
      //     return d._children ? 'lightsteelblue' : '#fff'
      //   })
      .attr('jid', (d) => d.data.id || 'nil')
      .attr('data--join-id', (d) => d.data[joinId] || null)
    //   .attr('r', 4)

    // adds the text to the node
    // 6
    nodeEnter
      .append('foreignObject')
      .attr('class', 'fo')
      .attr('width', 300)
      .attr('height', 200)
      .attr('x', (d) => (d.children ? 6 : 6))
      .attr('y', (d) => (d.children ? 1 : -7))
      .append('xhtml:div')
      .attr('class', 'decision')
      .html((d) => formatPersonInfo(d.data))

    // UPDATE
    // 7
    var nodeUpdate = nodeEnter.merge(node)

    // Transition to the proper position for the node
    // 8
    nodeUpdate
      .transition()
      .duration(duration)
      .attr('transform', (d) => 'translate(' + d.y + ',' + d.x + ')')

    // Update the node attributes and style
    // 9
    nodeUpdate.select('circle.node').attr('r', 5).attr('cursor', 'pointer')

    // Remove any exiting nodes
    // 10
    var nodeExit = node
      .exit()
      .transition()
      .duration(duration)
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

    // UPDATE
    // 15
    var linkUpdate = linkEnter.merge(link)

    // Transition back to the parent element position
    // 16
    linkUpdate
      .transition()
      .duration(duration)
      .attr('d', function (d) {
        return diagonal(d, d.parent)
      })
      .on('end', (x) => {
        // console.log(x.data)
        if (x.parent) {
          if (x.parent.data.name === 'Bridget Shiel') {
            // console.log(x.parent.data)
          }
        }
        // console.log(joinId)
        // Father's child(ren) is the marriage, which has the "jid"
        // Mother's child(ren) is empty; mother has the "join_id"
        if (x.parent.data.jid) {
          console.log('jid', x.parent.data)
        }
        if (x.parent.data.join_id) {
          console.log('join_id', x.parent.data.join_id)
          // origin:
          // <circle class="node" r="5" jid="nil" data--join-id="JOINID-18xx-Kelly-Shiel" cursor="pointer"></circle>
          // target:
          // <circle class="node" r="5" jid="JOINID-18xx-Kelly-Shiel" cursor="pointer"></circle>

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

          targetCircle = document.querySelector(`circle[jid="${joinId}"`)
          //   targetCircle = document.querySelector('circle#' + joinId)
          console.log('targetCircle', targetCircle)

          targetPosition = getCirclePosition(targetCircle)

          // debugger

          d3.select('#' + treeId)
            .selectAll('.join-link')
            .data([{ id: joinId }])
            .enter()
            .append('path')
            .attr('class', `link join-link`)
            .attr('d', (d) => {
              console.log(d)
              console.log(originPoint)
              console.log(targetPosition)
              return diagonalXY(originPoint, targetPosition)
            })
            //   .attr('d', diagonalYX(originPoint, targetPosition))
            // .attr('transform', `translate(${groupOffset.x}, -${groupOffset.y})`)
            .attr(
              'transform',
              `translate(${-childX}, ${-childY})`
              // `translate(${-margin.left}, ${-(margin.top + 2 * fullHeight)})`
            )
            .lower()
        }

        //update(newData)
      })

    //   linkUpdate
    //   .transition()
    //   .duration(duration)
    //   .attr('d', function (d) {
    //     return diagonal(d, d.parent)
    //   })
    //   .end((x) => {
    //     console.log(this)
    //     console.log(x)
    //     console.log(x)
    //     console.log('at linkUpdate.end: joinId: ', joinId)
    //   })
    //   .then(() => {
    //     console.log(this)
    //     console.log(joinId)
    //     console.log(source)
    //     console.log('at linkUpdate.end.then: joinId: ')
    //     if (joinId) debugger
    //     joinPaths(joinId)
    //   })

    // Remove any exiting links
    // 17
    var linkExit = link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', function (d) {
        var o = { x: source.x, y: source.y }
        return diagonal(o, o)
      })
      .remove()

    function joinPaths() {
      // function joinPaths(joinId) {
      //   if (joinId) {
      console.log(treeId, joinId)
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

      targetCircle = document.querySelector(`circle[jid="${joinId}"`)
      //   targetCircle = document.querySelector('circle#' + joinId)
      console.log('targetCircle', targetCircle)

      targetPosition = getCirclePosition(targetCircle)

      // debugger

      d3.select('#' + treeId)
        .selectAll('.join-link')
        .data([{ id: joinId }])
        .enter()
        .append('path')
        .attr('class', `link join-link`)
        .attr('d', (d) => {
          console.log(d)
          console.log(originPoint)
          console.log(targetPosition)
          return diagonalXY(originPoint, targetPosition)
        })
        //   .attr('d', diagonalYX(originPoint, targetPosition))
        // .attr('transform', `translate(${groupOffset.x}, -${groupOffset.y})`)
        .attr(
          'transform',
          `translate(${-childX}, ${-childY})`
          // `translate(${-margin.left}, ${-(margin.top + 2 * fullHeight)})`
        )
        .lower()
      //   }
    }
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

    //

    // Toggle children on click.
    function click(d) {
      console.log('click')
      console.log('d.children', d.children)
      console.log('d._children', d._children)
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        d.children = d._children
        d._children = null
      }
      update(d)
    }
  }
}

function formatPersonInfo(obj) {
  var lines = []
  lines.push(`<span class="fullname">${obj.name}</span>`)

  var yearsInfo = ''
  var birthYear = obj.birth_year || obj.birth_year_est || ''
  var deathYear = obj.death_year || obj.death_year_est || ''
  var ageInfo = ''
  if (birthYear && deathYear && !isNaN(birthYear) && !isNaN(deathYear)) {
    ageInfo = '(' + (deathYear - birthYear) + ')'
  }
  if (birthYear != '' || deathYear != '') {
    lines.push(`${birthYear}&ndash;${deathYear} ${ageInfo}`)
  }

  if (obj.home) lines.push(obj.home)
  if (obj.url) lines.push(`<a href=${obj.url}>census</a>`)

  //   var bornInfo = []
  //   bornInfo.push(obj.born || null)
  //   bornInfo.push(obj.birth_location || null)

  //   bornInfo = bornInfo.filter(x => x)
  //   if (bornInfo.length > 0) {
  //     lines.push('born ' + bornInfo.join(', '))
  //   }

  //   var deathInfo = []
  //   deathInfo.push(obj.died || null)
  //   deathInfo.push(obj.cause_of_Death || null)

  //   deathInfo = deathInfo.filter(x => x)
  //   if (deathInfo.length > 0) {
  //     lines.push('died ' + deathInfo.join(', '))
  //   }

  lines = lines.filter((x) => x)
  return lines.join('<br>')
}
