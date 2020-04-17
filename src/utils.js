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
/* 
function formatPersonInfoHTML(obj) {
  var lines = []

  lines.push(`<span class="fullname">${obj.name}</span>`)

  var birthYear = obj.birth_year || obj.birth_year_est || ''
  var deathYear = obj.death_year || obj.death_year_est || ''
  var ageInfo = ''
  if (birthYear && deathYear && !isNaN(birthYear) && !isNaN(deathYear)) {
    ageInfo = '(' + (deathYear - birthYear) + ')'
  }
  if (birthYear != '' || deathYear != '') {
    if (obj.name.includes('&')) {
      lines.push(`m. ${birthYear}`)
    } else {
      lines.push(`${birthYear}&ndash;${deathYear} ${ageInfo}`)
    }
  }

  if (obj.home) lines.push(obj.home)
  if (obj.url) lines.push(`<a href=${obj.url}>census</a>`)

  lines = lines.filter((x) => x)
  return lines.join('<br>')
}
 */
function formatPersonInfoText(obj) {
  if (!obj.name) return ''

  A.personCount += 1
  var lines = []
  // lines.push(`<tspan class="fullname">${obj.name}</tspan>`)
  lines.push(`<tspan class="fullname">${obj.name}</tspan>`)

  var yearsInfo = ''
  var birthYear = obj.birth_year || obj.birth_year_est || ''
  var deathYear = obj.death_year || obj.death_year_est || ''
  var ageInfo = ''
  if (birthYear && deathYear && !isNaN(birthYear) && !isNaN(deathYear)) {
    ageInfo = '(' + (deathYear - birthYear) + ')'
  }
  if (birthYear != '' || deathYear != '') {
    if (obj.name.includes('&')) {
      lines.push(
        `<tspan class="misc-info" x="6" dy="1.2em">m. ${birthYear}?</tspan>`
      )
    } else {
      lines.push(
        `<tspan class="misc-info" x="6" dy="1.2em">${birthYear}&ndash;${deathYear} ${ageInfo}</tspan>`
      )
    }
  }

  if (obj.home)
    lines.push(`<tspan class="misc-info" x="6" dy="1.2em">${obj.home}</tspan>`)
  if (obj.url)
    lines.push(
      `<tspan class="misc-info" x="6" dy="1.2em"><a href=${obj.url}>census</a></tspan>`
    )

  lines = lines.filter((x) => x)
  return lines.join('')
}

function joinCrossoverBranches() {
  // get all the tree heads and their ids
  var treeHeads = document.querySelectorAll('g.tree-head')
  var allTreeIds = [...treeHeads].map((x) => x.getAttribute('id'))

  allTreeIds.forEach((treeId) => {
    try {
      var crosslinkData = []

      var originTree = document.querySelector('#' + treeId)
      if (originTree) {
        var origin = originTree.querySelector(`[data--join-id^="JOINID"]`)
        //   .select('#' + treeId)

        if (origin) {
          var joinId = origin.getAttribute('data--join-id')

          var originPoint = getCirclePosition(origin)
          var originNode = origin.parentNode

          var targetCircle = document.querySelector(`circle[jid="${joinId}"`)
          var targetPosition = getCirclePosition(targetCircle)
          var targetNode = targetCircle.parentNode

          var targetEntry = {
            id: joinId,
            data: {
              birth_year: targetNode.__data__.data.birth_year || 1800,
            },
          }

          // crosslinkData.push({ source: originNode, target: targetNode })

          var groupOffset = getPathStartPoint(
            document.querySelector('svg'),
            document.querySelector('g#' + treeId)
          )
          var childX = groupOffset.x
          var childY = groupOffset.y

          d3.select('#' + treeId)
            .selectAll('.join-link')
            .data([targetEntry])
            // .data([{ id: joinId, birth_year: birthYear }])
            .enter()
            .append('path')
            .attr('fill', 'none')
            .attr('stroke-width', 3)
            // .attr('class', `link join-link`)
            .attr('d', (d) => {
              return diagonalXY(originPoint, targetPosition)
            })
            .lower()
            .attr('transform', `translate(${-childX}, ${-childY})`)
            // .lower()
            .attr('stroke', '#ccc')
            // .attr('stroke-dashoffset', -1 * pathLength)
            .attr('stroke-dasharray', function () {
              pathLength = this.getTotalLength()
              return 1.0 * pathLength
            })
            .attr('stroke-dashoffset', function () {
              pathLength = this.getTotalLength()
              return 1.0 * pathLength
            })
            .transition()
            .duration(400)
            .on('start', function () {
              pathLength = this.getTotalLength()
              d3.active(this)
                .attr('stroke-dashoffset', 1 * pathLength)
                .transition()
                .delay((d) => delayTime(d))
                .attr('stroke-dashoffset', 0)
                .transition()
            })

          // end
        }
      }
    } catch (err) {
      console.log('joinCrossoverBranches error', err)
    }

    //
  })
}

var yearToMilliseconds = d3
  .scaleLinear()
  //   .domain([1835, 1990])
  .domain([1885, 1990])
  .range([10, TIMELINE_TIME_MS]) // 29 seconds
// .range([10, 2900]) // 3 seconds

function delayTime(d) {
  if (!ANIMATE) {
    return 0
  } else {
    var pseudoYear = d.data.birth_year || d.data.birth_year_est || 1800
    if (pseudoYear < 1885) pseudoYear = 1885
    var ret = 2 + Math.round(yearToMilliseconds(pseudoYear))
    if (ret < 400) {
      console.log(d.data.name, d.data.birth_year, ret)
    }
    return ret
  }
}
