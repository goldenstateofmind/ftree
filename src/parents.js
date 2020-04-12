// http://www.census.nationalarchives.ie/search/results.jsp?searchMoreVisible=&census_year=1911&surname=Dooher&firstname=&county19011911=Tyrone&county1821=&county1831=&county1841=&county1851=&parish=&ward=&barony=&townland=Cavanalee&houseNumber=&ded=&age=&sex=&search=Search&ageInMonths=&relationToHead=&religion=&education=&occupation=&marriageStatus=&yearsMarried=&birthplace=&nativeCountry=&language=&deafdumb=&causeOfDeath=&yearOfDeath=&familiesNumber=&malesNumber=&femalesNumber=&maleServNumber=&femaleServNumber=&estChurchNumber=&romanCatNumber=&presbNumber=&protNumber=&marriageYears=&childrenBorn=&childrenLiving=
// http://www.census.nationalarchives.ie/pages/1911/Tyrone/Camus/Cavanalee/849969/
// https://stackoverflow.com/questions/31245751/how-do-you-create-a-family-tree-in-d3-js

const GENERATION_WIDTH = 180
const duration = 750

/* 
Works, but doesn't balance patriarchy, matriarchy:
Father's child(ren) is the marriage, which has the "id"
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
      //   data: A.unionsKellyRefNuclear,
      data: A.unionsKelly,
      treeId: 'unionsKelly',
      //   joinId: 'id',
      fullWidth: fullWidth,
      fullHeight: heightKelly,
      offsetY: heightKelly + offsetYKelly,
      //   offsetY: (1 * fullHeight) / 4,
      classProp: 'pm',
    })

    drawNFTree({
      parentSVG: svg,
      data: A.unionsMcGlynn,
      treeId: 'unionsMcGlynn',
      joinId: 'join_id',
      fullWidth: fullWidth,
      fullHeight: heightMcGlynn,
      offsetY: 0,
      classProp: 'pm',
    })

    drawNFTree({
      parentSVG: svg,
      //   data: A.unionsKellyRefNuclear,
      data: A.unionsMonaghan,
      treeId: 'unionsMonaghan',
      joinId: 'join_id',
      fullWidth: fullWidth,
      fullHeight: 200,
      offsetY: 0,
      //   offsetY: (1 * fullHeight) / 4,
      classProp: 'pm',
    })

    drawNFTree({
      parentSVG: svg,
      //   data: A.unionsKellyRefNuclear,
      data: A.unionsShiel,
      treeId: 'unionsShiel',
      joinId: 'join_id',
      fullWidth: fullWidth,
      fullHeight: 200,
      offsetY: heightKelly - offsetYGeneric,
      //   offsetY: (1 * fullHeight) / 4,
      classProp: 'pm',
    })

    drawNFTree({
      parentSVG: svg,
      data: A.unionsDooher,
      treeId: 'unionsDooher',
      joinId: 'join_id',
      fullWidth,
      fullHeight: heightDooher,
      offsetY: heightKelly + heightMcGlynn + offsetYKelly + offsetYDooher,
      //   offsetY: (2 * fullHeight) / 4,
      classProp: 'pm',
    })

    drawNFTree({
      parentSVG: svg,
      //   data: A.unionsKellyRefNuclear,
      data: A.unionsMcGurk,
      treeId: 'unionsMcGurk',
      joinId: 'join_id',
      fullWidth: fullWidth,
      fullHeight: 200,
      offsetY:
        heightKelly +
        heightMcGlynn +
        offsetYKelly +
        offsetYDooher +
        offsetYGeneric,
      //   offsetY: (1 * fullHeight) / 4,
      classProp: 'pm',
    })

    drawNFTree({
      parentSVG: svg,
      data: A.unionsHannigan,
      treeId: 'unionsHannigan',
      joinId: 'join_id',
      fullWidth,
      fullHeight: heightHannigan,
      offsetY:
        heightKelly +
        heightMcGlynn +
        heightDooher +
        offsetYKelly +
        offsetYDooher +
        offsetYHannigan,
      //   offsetY: (3 * fullHeight) / 4,
      classProp: 'pm',
    })

    drawNFTree({
      parentSVG: svg,
      //   data: A.unionsKellyRefNuclear,
      data: A.unionsTemple,
      treeId: 'unionsTemple',
      joinId: 'join_id',
      fullWidth: fullWidth,
      fullHeight: 200,
      offsetY:
        heightKelly +
        heightMcGlynn +
        heightDooher +
        offsetYKelly +
        offsetYDooher +
        offsetYHannigan +
        offsetYGeneric,
      //   offsetY: (1 * fullHeight) / 4,
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

  //  assigns the data to a hierarchy using parent-child relationships
  var rootIsD3hierarchy = d3.hierarchy(data, (d) => d.children)

  var d3tree = d3.tree().size([innerHeight, innerWidth])

  rootNode = d3tree(rootIsD3hierarchy)

  var nodes = rootNode.descendants()
  var links = rootNode.descendants().slice(1)
  nodes.forEach((d) => (d.y = d.depth * GENERATION_WIDTH))

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

  // adds the links between the nodes
  var link = g
    .selectAll('.link')
    .data(links)
    // .data(nodes.descendants().slice(1))
    .enter()
    .append('path')
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
      return 'translate(' + translateX + ',' + d.x + ')'
    })
  // .on('click', click)

  // adds the circle to the node
  node
    .append('circle')
    .attr('id', (d) => d.data.id || 'nil')
    .attr('data--join-id', (d) => d.data[joinId] || null)
    .attr('r', 3)
    .attr('class', 'test')

  // adds the text to the node
  node
    .append('foreignObject')
    .attr('class', 'fo')
    .attr('width', 300)
    .attr('height', 200)
    .attr('x', (d) => (d.children ? 6 : 6))
    .attr('y', (d) => (d.children ? 1 : -7))
    .append('xhtml:div')
    .attr('class', 'decision')
    .html((d) => formatPersonInfo(d.data))
  // .html(d => d.data.name || '')

  if (joinId) {
    var origin = document
      .querySelector('#' + treeId)
      .querySelector(`[data--join-id^="JOINID"]`)

    var joinId = origin.getAttribute('data--join-id')
    var originPoint = getCirclePosition(origin)

    targetCircle = document.querySelector('circle#' + joinId)
    targetPosition = getCirclePosition(targetCircle)

    d3.select('#' + treeId)
      .append('path')
      .attr('class', `link join-link`)
      .attr('d', diagonalXY(originPoint, targetPosition))
      .attr(
        'transform',
        `translate(${-childX}, ${-childY})`
        // `translate(${-margin.left}, ${-(margin.top + 2 * fullHeight)})`
      )
      .lower()
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
