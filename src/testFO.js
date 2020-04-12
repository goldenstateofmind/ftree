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

svgG = svg.append('g')

svgG
  .append('foreignObject')
  .attr('class', 'fo')
  .attr('width', '380')
  .attr('height', '380')
  .style('position', 'relative')
  .attr('x', '250')
  .attr('y', '250')
  .append('xhtml:body')
  // .attr('xmlns', 'http://www.w3.org/1999/xhtml')
  .append('xhtml:div')
  .attr('class', 'decision')
  .style('position', 'relative')
  .html((d) => {
    return `test text html`
  })
