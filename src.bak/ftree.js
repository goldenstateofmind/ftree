// https://stackoverflow.com/questions/31245751/how-do-you-create-a-family-tree-in-d3-js

width = 954
var A = {}

fetch('kelly_mcglynn_tree.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
    A.data = data

    tree = data => {
      const root = d3.hierarchy(data)
      //   root.height = 30 // here this is number or generations?
      root.dx = 80 // here this is actually cell height?
      root.dy = width / (root.height + 1)
      console.log(root.height, root.dy)
      return d3.tree().nodeSize([root.dx, root.dy])(root)
    }

    const root = tree(data)

    let x0 = Infinity
    let x1 = -x0
    root.each(d => {
      if (d.x > x1) x1 = d.x
      if (d.x < x0) x0 = d.x
    })

    var svg = d3
      .select('body')
      .append('svg')
      .attr('viewBox', [0, 0, width, x1 - x0 + root.dx * 2])

    const g = svg
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`)

    const link = g
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr(
        'd',
        d3
          .linkHorizontal()
          .x(d => d.y)
          .y(d => d.x)
      )

    /////

    const node = g
      .append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `translate(${d.y},${d.x})`)

    node
      .append('circle')
      .attr('fill', d => (d.children ? '#555' : '#999'))
      .attr('r', 2.5)

    node
      .append('foreignObject')
      .attr('class', 'fo')
      .attr('y', d => (d.children ? 6 : -6))
      .attr('width', 300)
      //   .attr('height', 20)
      .attr('x', d => (d.children ? -16 : 6))
      //   .attr('x', d => (d.children ? -6 : 6))
      //   .style('text-anchor', d => (d.children ? 'end' : 'start'))
      .append('xhtml:div')
      .attr('class', 'decision')
      .html(d => {
        var html = formatPersonInfo(d.data)
        return html
        // return d.id.substring(d.id.lastIndexOf('.') + 1)
      })

    return svg.node()
  })

function formatPersonInfo(obj) {
  var lines = []
  lines.push(`<span class="fullname">${obj.name}</span>`)

  var bornInfo = []
  bornInfo.push(obj.born || null)
  bornInfo.push(obj.birth_location || null)

  bornInfo = bornInfo.filter(x => x)
  if (bornInfo.length > 0) {
    lines.push('born ' + bornInfo.join(', '))
  }

  var deathInfo = []
  deathInfo.push(obj.died || null)
  deathInfo.push(obj.cause_of_Death || null)

  deathInfo = deathInfo.filter(x => x)
  if (deathInfo.length > 0) {
    lines.push('died ' + deathInfo.join(', '))
  }

  lines = lines.filter(x => x)
  return lines.join('<br>')
}
