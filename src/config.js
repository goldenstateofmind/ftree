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

/* 
My Mom was born in (???) Donegal and so were her parents.
Mom- Margaret (Greta) HANNIGAN born 4-2-1916
Katie (I guess Kathleen) McGettigan 2 girls 
Annie Doherty Malachy’s Mom and he also had 4 sisters;
Sarah - Sr Malachy born 12-4-1906; died March 2010
Bridget (Bridie) Dooher born 
4-11-1902 no children died 7-1994
John lived in Philadelphia had 3 girls;  died at age 33 years (heart attack)
Michael lived outside Strabane had 2 boys and maybe 4 girls;
Mom had maybe 2 more brothers who went to Scotland and never came back again.  
Mom’s mother was Sarah Temple born in either Stranorla, or Castlefin Co Donegal. She died while living with us in 1954
Mom's father's name???
 */

A.unionsMonaghan = {
  name: 'Mary Monaghan',
  join_id: 'JOINID-18xx-McGlynn-Monaghan',
  birth_year: 1911 - 38,
  // children: [{ name: 'one' }],
}

A.unionsShiel = {
  name: 'Bridget Shiel',
  join_id: 'JOINID-18xx-Kelly-Shiel',
  birth_year: 1911 - 49,
  death_year: 1934,
  // children: [{ name: 'x' }],
}

A.unionsMcGurk = {
  name: 'Bridget McGurk',
  join_id: 'JOINID-18xx-Dooher-McGurk',
  birth_year: 1911 - 42,
  children: [],
}

A.unionsTemple = {
  name: 'Sarah Temple',
  join_id: 'JOINID-18xx-Hannigan-Temple',
  birth_year: 1911 - 35,
  children: [],
}

A.unionsKelly = {
  name: 'Peter Kelly',
  birth_year: 1845,
  death_year: 1928,
  children: [
    {
      name: 'Peter Kelly & Bridget Shiel',
      birth_year: 1885,
      home: 'Funshadaun, Kilnadeema(?), Galway',
      id: 'JOINID-18xx-Kelly-Shiel',
      url: 'http://www.census.nationalarchives.ie/reels/nai000827421/',
      url2:
        'http://www.census.nationalarchives.ie/pages/1901/Galway/Aille/Funshadaun/1386514/',
      url3:
        'http://www.census.nationalarchives.ie/pages/1911/Galway/Aille/Funshadaun/463525/',
      pm: 'paternal-paternal-parents',
      children: [
        { name: 'Mary (Fallon)', birth_year: 1901 - 13 },
        { name: 'Bridget (twin)', birth_year: 1911 - 21 },
        { name: 'Thomas (twin)', birth_year: 1911 - 21 },
        {
          name: 'Patrick Kelly',
          birth_year: 1893,
          death_year: 1964,
          children: [
            {
              pm: 'paternal-parents',
              name: 'Patrick Kelly & Delia McGlynn',
              birth_year: 1923,
              id: 'JOINID-19xx-Kelly-McGlynn',
              home:
                '<a href="https://www.google.com/maps/@53.1578899,-8.6023166,3a,75y,13.83h,86.88t/data=!3m6!1e1!3m4!1szNOlniwP5zkqEN6Xcox6Hg!2e0!7i13312!8i6656">Caheratrim</a>, Kilnadeema, Galway',
              //   join_id: 'JOINID-19xx-Kelly-McGlynn',
              children: [
                { name: 'Mary', birth_year: 1927 },
                {
                  name: 'Margaret',
                  birth_year: 1929,
                  children: [
                    {
                      name: 'Margaret Kelly & Nick Silk',
                      birth_year: 1962,
                      home: 'Cork',
                      children: [
                        { name: 'Rita', birth_year: 1963 },
                        { name: 'Mary', birth_year: 1964 },
                        { name: 'Helen', birth_year: 1967 },
                        { name: 'Sarah', birth_year: 1972 },
                      ],
                    },
                  ],
                },
                { name: 'Peter', birth_year: 1930, death_year: 2013 },
                {
                  name: 'Tony',
                  birth_year: 1932,
                  children: [
                    {
                      name: 'Tony Kelly & Mary ?',
                      birth_year: 1960,
                      home: 'Ballycoony, Loughrea, Galway',
                      children: [
                        { name: 'Patrick', birth_year: 1961 },
                        { name: 'Maureen', birth_year: 1963 },
                        { name: 'Carmel', birth_year: 1966 },
                        { name: 'Caroline', birth_year: 1968 },
                      ],
                    },
                  ],
                },
                { name: 'Pat', birth_year: 1933 },
                {
                  name: 'Martin',
                  birth_year: 1934,
                  children: [
                    // A.nuclear['1971-Kelly-Dooher'],
                    {
                      name: 'Martin Kelly & Mary Dooher',
                      birth_year: 1973,
                      home: 'Martinez, Calif.',
                      id: 'JOINID-1971-Kelly-Dooher',
                      //   join_id: 'JOINID-1971-Kelly-Dooher',
                      pm: 'parents',
                      children: [
                        { name: 'Brendan', birth_year: 1974 },
                        { name: 'John', birth_year: 1976 },
                        { name: 'Martina', birth_year: 1980 },
                        { name: 'Peter', birth_year: 1985 },
                      ],
                    },
                  ],
                },
                { name: 'Tom', birth_year: 1935 },
                { name: 'Mike', birth_year: 1939 },
                { name: 'John Joe', birth_year: 1941 },
              ],
            },
          ],
        },
      ],
    },
  ],
}

A.unionsMcGlynn = {
  name: 'Peter McGlynn',
  birth_year: 1858,
  death_year: 1948,
  children: [
    {
      id: 'JOINID-18xx-McGlynn-Monaghan',
      name: 'Peter McGlynn & Mary Monahan',
      birth_year: 1897,
      pm: 'paternal-maternal-parents',
      home: 'Caheratrim (Ballinagrieve), Kilnadeema, Galway',
      url: 'http://www.census.nationalarchives.ie/reels/nai002409614/',
      url1:
        'http://www.census.nationalarchives.ie/pages/1911/Galway/Aille/Caheratrim/463497/',
      url2:
        'http://www.census.nationalarchives.ie/pages/1901/Galway/Aille/Caheratrim/1386487/',
      father: 'Peter McGlynn, born: 1901-44 = 1857',
      mother: 'Mary Monaghan, born: 1901-29 = 1872',
      // http://www.census.nationalarchives.ie/pages/1911/Galway/Aille/Cahercrea__East/463513/
      // http://www.census.nationalarchives.ie/pages/1901/Galway/Aille/Cahererea_East/1386497/
      grandmother: 'Bridget (Kelly?), born: 1901-70 = 1831',
      children: [
        {
          name: 'Bridget (Delia)',
          // id: 'JOINID-19xx-Kelly-McGlynn',
          join_id: 'JOINID-19xx-Kelly-McGlynn',
          children: [],
          birth_year: 1911 - 13,
          death_year: 1990,
        },
        { name: 'Mary (May)', birth_year: 1911 - 11 },
        {
          name: 'Martin "Sonny"',
          birth_year: 1911 - 9,
          home: '   Roxborough, Co. Galway',
        },
        { name: 'Teresa "Tessie" (Sr Antony)', birth_year: 1911 - 10 },
        { name: 'Margaret "Maude" (Sr Carmel)', birth_year: 1911 - 5 },
        { name: 'Patrick "Pádraig"', birth_year: 1911 - 2 },
        { name: 'Tommy', birth_year_est: 1911 - -1 },
        { name: 'Nora (Sr Rita)', birth_year_est: 1912 },
      ],
    },
  ],
}

A.unionsDooher = {
  name: 'Charles Dooher',
  birth_year: 1863,
  death_year: 1933,
  children: [
    {
      name: 'Charles Dooher & Bridget McGurk',
      birth_year: 1889,
      id: 'JOINID-18xx-Dooher-McGurk',
      url: 'http://www.census.nationalarchives.ie/reels/nai003400580/',
      url1:
        'http://www.census.nationalarchives.ie/pages/1911/Tyrone/Camus/Cavanalee/849969/',
      home: 'Cavanalee, Strabane, Tyrone',
      pm: 'maternal-paternal-parents',
      children: [
        { name: 'Patrick Joseph Dooher', birth_year: 1890, death_year: 1917 },
        { name: 'Mary Margaret Dooher', birth_year: 1893, death_year: 1959 },
        { name: 'Daniel Paul Dooher', birth_year: 1896, death_year: 1931 },
        { name: 'Bridget Alice Dooher', birth_year: 1898, death_year: 1987 },
        { name: 'Charles Vincent Dooher', birth_year: 1900, death_year: 1966 },
        { name: 'James John Dooher', birth_year: 1902, death_year: 1986 },
        { name: 'Anne Josephine (Nancy)', birth_year: 1903, death_year: 1970 },
        { name: 'Francis Hugh Dooher', birth_year: 1907, death_year: 1977 },
        {
          name: 'Rose Eileen "Rosaleen" (Sr Gerard)',
          birth_year: 1908,
          death_year: '19??',
        },
        {
          name: 'Arthur (Leonard)',
          birth_year: 1911,
          death_year: 1985,
          children: [
            {
              name: 'Leonard Dooher & Greta Hannigan',
              birth_year: 1938,
              id: 'JOINID-19XX-Dooher-Hannigan',
              home:
                '<a href="https://www.google.com/maps/@54.8050318,-7.4141031,3a,75y,67.08h,80.38t/data=!3m6!1e1!3m4!1s_wrKs9Piv733VNgfhxLTXw!2e0!7i13312!8i6656">8? Ligford Rd, Cavanalee</a>, Strabane, Tyrone',
              pm: 'maternal-parents',
              children: [
                {
                  name: 'Mary',
                  birth_year: 1942,
                  join_id: 'JOINID-1971-Kelly-Dooher',
                  children: [],
                },
                {
                  name: 'Paddy',
                  birth_year: 1944,
                  death_year: 2012,
                  home: '',
                  children: [
                    {
                      name: 'Paddy Dooher & Eileen Kelly',
                      birth_year: 1969,
                      home: 'Cavanalee, Strabane, Tyrone',
                      children: [
                        { name: 'Geraldine', birth_year: 1970 },
                        { name: 'Margaret "Elaine"', birth_year: 1971 },
                        { name: 'Kevin', birth_year: 1974 },
                        { name: 'Sean', birth_year: 1978 },
                      ],
                    },
                  ],
                },
                {
                  name: 'Danny',
                  birth_year: 1946,
                  home: '',
                  children: [
                    {
                      name: 'Danny Dooher & Mary Lynch',
                      birth_year: 1970,
                      home: 'Strabane, Tyrone',
                      children: [
                        { name: 'Martin', birth_year: 1971 },
                        { name: 'Adrian', birth_year: 1973 },
                        { name: 'John', birth_year: 1979 },
                      ],
                    },
                  ],
                },
                {
                  name: 'John',
                  birth_year: 1948,
                  home: '',
                  children: [
                    {
                      name: 'John Dooher & Janice ',
                      birth_year: 1970,
                      home: 'Strabane, Tyrone',
                      children: [
                        { name: 'Andrea', birth_year: 1972 },
                        { name: 'Gary', birth_year: 1975 },
                        { name: 'David', birth_year: 1978 },
                        { name: 'Julie', birth_year: 1982 },
                      ],
                    },
                  ],
                },
                {
                  name: 'Francis (Gerald)',
                  birth_year: 1952,
                  children: [
                    {
                      name: 'Gerald Dooher & Rosemary McCullagh',
                      birth_year: 1975,
                      home: 'Corte Madera, Calif.',
                      children: [
                        { name: 'Seamus', birth_year: 1980 },
                        { name: 'Michael', birth_year: 1985 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

A.unionsHannigan = {
  name: 'John Hannigan',
  birth_year: 1911 - 35,
  children: [
    {
      name: 'John Hannigan & Sarah Temple',
      birth_year: 1895,
      id: 'JOINID-18xx-Hannigan-Temple',
      pm: 'maternal-maternal-parents',
      home: 'Magherahee, Castlefinn, then Cottown, Raphoe, Donegal',
      father: 'John, born: 1911-35 = 1876',
      mother: 'Sarah, born: 1911-34 = 1877',
      url: 'http://www.census.nationalarchives.ie/reels/nai002127102/',
      url1:
        'http://www.census.nationalarchives.ie/pages/1911/Donegal/Raphoe/Cottown/506398/',
      children: [
        {
          name: 'son',
          birth_year_est: 1896,
          note: 'Emigrated to Scotland before 1911?',
        },
        {
          name: 'son',
          birth_year_est: 1898,
          note: 'Emigrated to Scotland before 1911?',
        },
        { name: 'Michael', birth_year: 1911 - 11 },
        { name: 'Kathleen "Katie" (McGettigan)', birth_year: 1911 - 10 },
        {
          name: 'Bridget "Bridie" (Dooher)',
          born: '1902-04-11',
          died: '1994-07-01',
          birth_year: 1902,
          death_year: 1994,
        },
        { name: 'John', birth_year: 1911 - 7 },
        { name: 'Sarah (Sr Malachy)', birth_year: 1906, death_year: 2010 },
        { name: 'Annie (Doherty)', birth_year: 1911 - 3 },
        {
          name: 'Margaret "Greta" (Dooher)',
          join_id: 'JOINID-19XX-Dooher-Hannigan',
          born: '1916-04-02',
          birth_year: 1916,
          death_year: 1972,
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
