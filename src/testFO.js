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
  .attr('xmlns', 'http://www.w3.org/2000/svg')
  .append('svg')
  .attr('width', fullWidth)
  .attr('height', fullHeight)

var svgG = svg.append('g')

svgG
  .append('rect')
  .attr('width', '380')
  .attr('height', '380')
  .style('position', 'fixed')
  .attr('x', 250)
  //   .attr('x', '250')
  .attr('y', '250')
  .style('fill', '#22aaff88')
  .attr('transform', (d) => {
    var translateX = -200
    var translateY = -3
    return 'translate(' + translateX + ',' + translateY + ')'
  })

var fO = svgG
  .append('foreignObject')
  .attr('class', 'fo')
  .attr('width', '380')
  .attr('height', '380')
  .style('border', '13px dashed orange')
  .style('position', 'fixed')
  .attr('x', 250)
  //   .attr('x', '250')
  .attr('y', '250')

fO.append('xhtml:body')
  // .attr('xmlns', 'http://www.w3.org/1999/xhtml')
  .append('xhtml:div')
  .attr('class', 'decision')
  .style('position', 'fixed')
  .style('border', '3px solid yellow')
  .html((d) => {
    return `test text html`
  })
  .attr('transform', (d) => {
    var translateX = 20
    var translateY = 100
    return 'translate(' + translateX + ',' + translateY + ')'
  })

d3.select('#fo2')
  .style('background', 'orange')
  .attr('transform', (d) => {
    var translateX = 100
    var translateY = 50
    return 'translate(' + translateX + ',' + translateY + ')'
  })
