var A = {}

A.colors = {
  '538': [
    { orange: '#E86C31' },
    { pink: '#E215AE' },
    { teal: '#44A6BE' },
    { purple: '#8147ED' },
    { gold: '#DAA928' },
  ],
}

A.nukes = {
  a1_00: {
    join_id: 'a1_00',
    name: 'Kelly-Dooher',
    father: 'M Kelly',
    mother: 'M Dooher',
    children: [{ name: 'B' }, { name: 'J' }, { name: 'M' }, { name: 'P' }],
  },
  a2_01: {
    join_id: 'a2_01',
    name: 'Patrick Kelly & Delia McGlynn',
    father: 'Patrick Kelly',
    mother: 'Delia McGlynn',
    children: [
      { name: 'Mary' },
      { name: 'Margaret' },
      { name: 'Peter' },
      { name: 'Tony' },
      { name: 'Pat' },
      { name: 'Martin', children: [] },
      { name: 'Tom' },
      { name: 'Mike' },
      { name: 'John Joe' },
    ],
  },
  a2_02: {
    join_id: 'a2_02',
    name: 'Leonard Dooher & Greta Hannigan',
    father: 'Arthur (Leonard) Dooher',
    mother: 'Margaret (Greta) Hannigan',
    children: [
      { name: 'Mary', children: [] },
      { name: 'Paddy' },
      { name: 'Danny' },
      { name: 'John' },
      { name: 'Francis (Gerald)' },
    ],
  },
  a3_03: {
    join_id: 'a3_03',
    name: 'Peter Kelly & ? Shiel',
    father: 'Peter Kelly',
    mother: '? Shiel',
    children: [
      { name: 'Mary Fallon' },
      { name: 'Patrick', children: [] },
      { name: 'Bridget (twin)' },
      { name: 'Thomas (twin)' },
    ],
  },
  a3_04: {
    join_id: 'a3-04',
    name: 'Peter McGlynn & Mary Monahan',
    father: 'Peter McGlynn',
    mother: 'Mary Monahan',
    children: [
      { name: 'Bridget (Delia)', children: [] },
      { name: 'Martin' },
      { name: 'Sr Carmel' },
      { name: 'Sr Rita' },
      { name: 'Sr Antony' },
      { name: 'May' },
      { name: 'Poraig' },
      { name: 'Tommy' },
    ],
  },
}

// A.nukes['a3_03'].children['Patrick'].children = A.nukes['a2_01']
// A.nukes['a3_04'].children['Bridget (Delia)'].children = A.nukes['a2_01']
// A.nukes['a2_01'].children['Martin'].children = A.nukes['a1_00']

A.unionsKelly = {
  name: 'Peter Kelly &<br/>? Shiel',
  pm: 'paternal-paternal-parents',
  children: [
    { name: 'Mary Fallon' },
    {
      name: 'Patrick Kelly',
      //  & Delia McGlynn',
      children: [
        {
          pm: 'paternal-parents',
          name: 'Kelly-McGlynn',
          id: 'JOINID-19xx-Kelly-McGlynn',
          join_id: 'JOINID-19xx-Kelly-McGlynn',
          children: [
            { name: 'Mary' },
            { name: 'Margaret' },
            { name: 'Peter' },
            { name: 'Tony' },
            { name: 'Pat' },
            {
              name: 'Martin',
              children: [
                {
                  name: '1971-Kelly-Dooher',
                  id: 'JOINID-1971-Kelly-Dooher',
                  join_id: 'JOINID-1971-Kelly-Dooher',
                  pm: 'parents',
                  children: [
                    { name: 'B' },
                    { name: 'J' },
                    { name: 'M' },
                    { name: 'P' },
                  ],
                },
              ],
            },
            { name: 'Tom' },
            { name: 'Mike' },
            { name: 'John Joe' },
          ],
        },
      ],
    },
    { name: 'Bridget (twin)' },
    { name: 'Thomas (twin)' },
  ],
}

A.unionsMcGlynn = {
  name: 'Peter McGlynn &<br/>Mary Monahan',
  pm: 'paternal-maternal-parents',
  children: [
    {
      name: 'Bridget (Delia)',
      join_id: 'JOINID-19xx-Kelly-McGlynn',
      children: [],
    },
    { name: 'Martin' },
    { name: 'Sr Carmel' },
    { name: 'Sr Rita' },
    { name: 'Sr Antony' },
    { name: 'May' },
    { name: 'Poraig' },
    { name: 'Tommy' },
  ],
}

A.unionsDooher = {
  name: 'Charles Dooher &<br/>Bridget McGurk',
  pm: 'maternal-paternal-parents',
  children: [
    { name: 'Patrick Joseph Dooher' },
    { name: 'Mary Margaret Dooher' },
    { name: 'Daniel Paul Dooher' },
    { name: 'Bridget Alice Dooher' },
    { name: 'Charles Vincent Dooher' },
    { name: 'James John Dooher' },
    { name: 'Anne Josephine (Nancy)' },
    { name: 'Francis Hugh Dooher' },
    { name: 'Rose Eileen (Rosaleen)' },
    {
      name: 'Arthur (Leonard)',
      children: [
        {
          name: '1940?-Dooher-Hannigan',
          id: '1940?-Dooher-Hannigan',
          pm: 'maternal-parents',
          children: [
            {
              name: 'Mary',
              join_id: 'JOINID-1971-Kelly-Dooher',
              children: [],
            },
            { name: 'Paddy' },
            { name: 'Danny' },
            { name: 'John' },
            { name: 'Francis (Gerald)' },
          ],
        },
      ],
    },
  ],
}

// var gridOrdinates = [...Array(20).keys()].map(x => 100 * x)
// svg
// .selectAll('.horizontalGridLines')
// .data(gridOrdinates)
// .enter()
// .append('line')
// .attr('class', 'horizontalGridLines')
// .attr('x1', 0)
// .attr('y1', d => d)
// .attr('x2', 900)
// .attr('y2', d => d)

// svg
// .selectAll('.verticalGridLines')
// .data(gridOrdinates)
// .enter()
// .append('line')
// .attr('class', 'verticalGridLines')
// .attr('y1', 0)
// .attr('x1', d => d)
// .attr('y2', 900)
// .attr('x2', d => d)
