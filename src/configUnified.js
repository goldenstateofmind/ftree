var A = {}

const GENERATION_WIDTH = 280
const duration = 750
var i = 0
var DELAY = 10
var TRANSIDATION = 1000
var ANIMATE = true
var TIMELINE_TIME_MS = 15000

var fullWidth = 3000
var fullHeight = 2000
var margin = { top: 20, right: 100, bottom: 30, left: 90 },
  innerWidth = fullWidth - margin.left - margin.right,
  innerHeight = fullHeight - margin.top - margin.bottom

const heightDefault = 200
const heightMcGlynn = 380
const heightKelly = 650
const heightDooher = 650
const heightHannigan = 300

const offsetYGeneric = 150
const offsetYKelly = -450
const offsetYDooher = 130
const offsetYHannigan = -200

A.personCount = 0

A.colors = {
  '538': [
    { orange: '#E86C31' },
    { pink: '#E215AE' },
    { teal: '#44A6BE' },
    { purple: '#8147ED' },
    { gold: '#DAA928' },
  ],
}

function propertiesToArray(obj) {
  const isObject = (val) => typeof val === 'object' && !Array.isArray(val)

  const addDelimiter = (a, b) => (a ? `${a}.${b}` : b)

  const paths = (obj = {}, head = '') => {
    return Object.entries(obj).reduce((product, [key, value]) => {
      let fullPath = addDelimiter(head, key)
      return isObject(value)
        ? product.concat(paths(value, fullPath))
        : product.concat(fullPath)
    }, [])
  }

  return paths(obj)
}

A.trees = {
  TreeKelly: {
    tid: 'TreeKelly',
    height: 650,
    width: 3000,
    offsetY: 200,
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
          {
            name: 'Mary (Fallon)',
            birth_year: 1888,
            generation: 2,
          },
          {
            name: 'Bridget',
            birth_year: 1890,
            generation: 2,
          },
          {
            name: 'Thomas',
            birth_year: 1890,
            generation: 2,
          },
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
                children: [
                  {
                    name: 'Mary',
                    birth_year: 1927,
                    generation: 3,
                  },
                  {
                    name: 'Margaret',
                    birth_year: 1929,
                    children: [
                      {
                        name: 'Margaret Kelly & Nick Silk',
                        birth_year: 1962,
                        home: 'Cork / Galway',
                        children: [
                          {
                            name: 'Rita McCormack',
                            birth_year: 1963,
                            children: [
                              {
                                name: 'boy',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                              {
                                name: 'boy',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                              {
                                name: 'girl',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'Mary Veenstra-Silk',
                            birth_year: 1964,
                            homey: 'Co. Galway',
                            married: '1995 Bauke Veenstra',
                            children: [
                              {
                                name: 'boy?',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                              {
                                name: 'girl?',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: "Helen O'Grady",
                            birth_year: 1967,
                            married: '1997 Ultan ',
                            children: [
                              {
                                name: 'boy',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                              {
                                name: 'girl',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'Sarah',
                            birth_year: 1972,
                            home: 'Co. Galway',
                            generation: 4,
                          },
                        ],
                        generation: 3.5,
                      },
                    ],
                    generation: 3,
                  },
                  {
                    name: 'Peter',
                    birth_year: 1930,
                    death_year: 2013,
                    married: '1979 Kathleen E. Farrell',
                    generation: 3,
                  },
                  {
                    name: 'Tony',
                    birth_year: 1932,
                    children: [
                      {
                        name: 'Tony Kelly & Mary Carroll',
                        birth_year: 1960,
                        home: 'Ballycoony, Loughrea, Galway',
                        children: [
                          {
                            name: 'Patrick',
                            birth_year: 1961,
                            homey: 'Ballycooney, Loughrea, Co Galway',
                            married: 'Clare',
                            children: [
                              {
                                name: 'Rory',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                              {
                                name: 'Lughaidh (Louis)',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                              {
                                name: 'Olivia',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                              {
                                name: 'Isabel',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'Maureen',
                            birth_year: 1963,
                            home: '',
                            married: '1991 Jacques Chahin',
                            children: [
                              {
                                name: 'Caitrina',
                                birth_year: 1991,
                                generation: 4.5,
                              },
                              {
                                name: 'Jacques Anthony',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                              {
                                name: 'Declan',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'Carmel',
                            birth_year: 1966,
                            generation: 4,
                          },
                          {
                            name: 'Caroline',
                            birth_year: 1968,
                            home: '',
                            married: '1995 Randy Worcester',
                            children: [
                              {
                                name: 'Jonah',
                                birth_year: 1995,
                                generation: 4.5,
                              },
                              {
                                name: 'Ellie',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                        ],
                        generation: 3.5,
                      },
                    ],
                    generation: 3,
                  },
                  {
                    name: 'Pat',
                    birth_year: 1933,
                    generation: 3,
                  },
                  {
                    name: 'Martin',
                    birth_year: 1934,
                    children: [
                      {
                        name: 'Martin Kelly & Mary Dooher',
                        birth_year: 1971,
                        home: 'Martinez, Calif.',
                        id: 'JOINID-1971-Kelly-Dooher',
                        pm: 'parents',
                        children: [
                          {
                            name: 'Brendan',
                            birth_year: 1974,
                            children: [
                              {
                                name: 'Mila',
                                birth_year: 2016,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'John',
                            birth_year: 1976,
                            generation: 4,
                          },
                          {
                            name: 'Martina',
                            birth_year: 1980,
                            children: [
                              {
                                name: 'Thomas',
                                birth_year: 2015,
                                generation: 4.5,
                              },
                              {
                                name: 'Neave',
                                birth_year: 2017,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'Peter',
                            birth_year: 1985,
                            generation: 4,
                          },
                        ],
                        generation: 3.5,
                      },
                    ],
                    generation: 3,
                  },
                  {
                    name: 'Tom',
                    birth_year: 1935,
                    generation: 3,
                  },
                  {
                    name: 'Mike',
                    birth_year: 1939,
                    generation: 3,
                  },
                  {
                    name: 'John Joe',
                    birth_year: 1941,
                    generation: 3,
                  },
                ],
                generation: 2.5,
              },
            ],
            generation: 2,
          },
        ],
        generation: 1.5,
      },
    ],
    generation: 1,
  },
  TreeMcGlynn: {
    tid: 'TreeMcGlynn',
    height: 380,
    width: 3000,
    offsetY: 0,
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
        url_maternal:
          'http://www.census.nationalarchives.ie/pages/1911/Galway/Aille/Cahercrea__East/463513/',
        url_maternal2:
          'http://www.census.nationalarchives.ie/pages/1901/Galway/Aille/Cahererea_East/1386497/',
        grandmother: 'Bridget (Kelly?), born: 1901-70 = 1831',
        children: [
          {
            name: 'Bridget (Delia)',
            join_id: 'JOINID-19xx-Kelly-McGlynn',
            children: [],
            birth_year: 1898,
            death_year: 1990,
            generation: 2,
          },
          {
            name: 'Mary (May)',
            birth_year: 1900,
            generation: 2,
          },
          {
            name: 'Teresa "Tessie" (Sr Anthony)',
            birth_year: 1901,
            generation: 2,
          },
          {
            name: 'Martin "Sonny"',
            birth_year: 1902,
            home: '   Roxborough, Co. Galway',
            generation: 2,
          },
          {
            name: 'Margaret "Maude" (Sr Carmel)',
            birth_year: 1906,
            generation: 2,
          },
          {
            name: 'Patrick "Pádraig"',
            birth_year: 1909,
            generation: 2,
          },
          {
            name: 'Nora (Sr Rita)',
            birth_year_est: 1912,
            death_year: 1945,
            generation: 2,
          },
          {
            name: 'Tommy',
            birth_year_est: 1913,
            generation: 2,
          },
        ],
        generation: 1.5,
      },
    ],
    generation: 1,
  },
  TreeMonaghan: {
    tid: 'TreeMonaghan',
    height: 200,
    width: 3000,
    offsetY: 0,
    name: 'Mary Monaghan',
    join_id: 'JOINID-18xx-McGlynn-Monaghan',
    birth_year: 1873,
    generation: 1,
  },
  TreeShiel: {
    tid: 'TreeShiel',
    height: 200,
    width: 3000,
    offsetY: heightKelly - offsetYGeneric,
    name: 'Bridget Shiel',
    join_id: 'JOINID-18xx-Kelly-Shiel',
    birth_year: 1862,
    death_year: 1934,
    generation: 1,
  },
  TreeDooher: {
    tid: 'TreeDooher',
    height: 650,
    width: 3000,
    offsetY: 710,
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
          {
            name: 'Patrick Joseph Dooher',
            birth_year: 1890,
            death_year: 1917,
            generation: 2,
          },
          {
            name: 'Mary Margaret Dooher',
            birth_year: 1893,
            death_year: 1959,
            generation: 2,
          },
          {
            name: 'Daniel Paul Dooher',
            birth_year: 1896,
            death_year: 1931,
            generation: 2,
          },
          {
            name: 'Bridget Alice Dooher',
            birth_year: 1898,
            death_year: 1987,
            generation: 2,
          },
          {
            name: 'Charles Vincent Dooher',
            birth_year: 1900,
            death_year: 1966,
            generation: 2,
          },
          {
            name: 'James John Dooher',
            birth_year: 1902,
            death_year: 1986,
            generation: 2,
          },
          {
            name: 'Anne Josephine (Nancy)',
            birth_year: 1903,
            death_year: 1970,
            generation: 2,
          },
          {
            name: 'Francis Hugh Dooher',
            birth_year: 1907,
            death_year: 1977,
            generation: 2,
          },
          {
            name: 'Rose Eileen "Rosaleen" (Sr Gerard)',
            // home: 'El Cerrito',
            birth_year: 1908,
            death_year: 1994,
            generation: 2,
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
                  '<a href="https://www.google.com/maps/@54.8050318,-7.4141031,3a,75y,67.08h,80.38t/data=!3m6!1e1!3m4!1s_wrKs9Piv733VNgfhxLTXw!2e0!7i13312!8i6656">8 Ligford Rd, Cavanalee</a>, Strabane, Tyrone',
                pm: 'maternal-parents',
                children: [
                  {
                    name: 'Mary',
                    birth_year: 1942,
                    join_id: 'JOINID-1971-Kelly-Dooher',
                    children: [],
                    generation: 3,
                  },
                  {
                    name: 'Paddy',
                    birth_year: 1944,
                    death_year: 2012,
                    home: '',
                    children: [
                      {
                        name: 'Paddy Dooher & Eileen Kelly',
                        birth_year: 1967,
                        home: 'Cavanalee, Strabane, Tyrone',
                        children: [
                          {
                            name: 'Geraldine',
                            birth_year: 1970,
                            married: 'Kevin Magill',
                            generation: 4,
                          },
                          {
                            name: 'Margaret "Elaine"',
                            birth_year: 1971,
                            married: 'Martin McDonnell',
                            homey: 'Dungiven, Derry',
                            children: [
                              {
                                name: 'Aaron Fox',
                                birth_year: 1990,
                                generation: 4.5,
                              },
                              {
                                name: 'Luke McDonnell',
                                birth_year: 2002,
                                generation: 4.5,
                              },
                              {
                                name: 'Calum McDonnell',
                                birth_year: 2006,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'Kevin',
                            birth_year: 1974,
                            children: [
                              {
                                name: 'Ellie Boland-Dooher',
                                birth_year: 2002,
                                homey: 'Dublin',
                                generation: 4.5,
                              },
                              {
                                name: 'Kelsey Dooher',
                                birth_year: 2014,
                                homey: 'England',
                                generation: 4.5,
                              },
                              {
                                name: 'Kaitlynn Dooher',
                                birth_year: 2016,
                                homey: 'England',
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'Sean',
                            birth_year: 1978,
                            married: 'Joanne Dougherty',
                            homey: 'Armagh',
                            children: [
                              {
                                name: 'Noah',
                                birth_year: 2016,
                                generation: 4.5,
                              },
                              {
                                name: 'Amy',
                                birth_year: 2018,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                        ],
                        generation: 3.5,
                      },
                    ],
                    generation: 3,
                  },
                  {
                    name: 'Daniel',
                    birth_year: 1946,
                    home: '',
                    children: [
                      {
                        name: 'Danny Dooher & Mary Lynch',
                        birth_year: 1970,
                        home: 'Strabane, Tyrone',
                        children: [
                          {
                            name: 'Martin',
                            birth_year: 1971,
                            generation: 4,
                            partner: 'Leona Quinn',
                            children: [
                              {
                                name: 'Danni',
                                birth_year: 2011,
                                generation: 4.5,
                              },
                              { name: '', birth_year: 2000, generation: 4.5 },
                            ],
                          },
                          {
                            name: 'Adrian',
                            birth_year: 1973,
                            generation: 4,
                            children: [
                              {
                                name: 'Claire',
                                birth_year: 1999,
                                generation: 4.5,
                              },
                              {
                                name: 'Kirsty',
                                birth_year: 2004,
                                generation: 4.5,
                              },
                              {
                                name: 'Adam',
                                birth_year: 2006,
                                generation: 4.5,
                              },
                            ],
                          },
                          {
                            name: 'John',
                            birth_year: 1979,
                            generation: 4,
                            partner: 'Joanne McGonigle',
                            children: [
                              {
                                name: 'Belle',
                                birth_year: 2011,
                                generation: 4.5,
                              },
                              {
                                name: 'Leo',
                                birth_year: 2017,
                                generation: 4.5,
                              },
                            ],
                          },
                        ],
                        generation: 3.5,
                      },
                    ],
                    generation: 3,
                  },
                  {
                    name: 'John',
                    birth_year: 1948,
                    home: '',
                    children: [
                      {
                        name: 'John Dooher & Janice ',
                        birth_year: 1970,
                        homey: 'Strabane, Tyrone',
                        children: [
                          {
                            name: 'Andrea',
                            birth_year: 1972,
                            married: '1997 Gary Wallace',
                            homey: 'Strabane',
                            children: [
                              {
                                name: 'Isla Wallace',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'Gary',
                            birth_year: 1975,
                            homey: 'England',
                            married: '',
                            children: [
                              {
                                name: 'boy',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                              {
                                name: 'boy',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                              {
                                name: 'girl',
                                birth_year: 2000,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'David',
                            birth_year: 1978,
                            generation: 4,
                          },
                          {
                            name: 'Julie',
                            birth_year: 1982,
                            generation: 4,
                          },
                        ],
                        generation: 3.5,
                      },
                    ],
                    generation: 3,
                  },
                  {
                    name: 'Francis (Gerard)',
                    birth_year: 1952,
                    children: [
                      {
                        name: 'Gerard Dooher & Rosemary McCullagh',
                        birth_year: 1975,
                        home: 'Corte Madera, Calif.',
                        children: [
                          {
                            name: 'Seamus',
                            birth_year: 1980,
                            homey: 'Novato, Calif',
                            married: '2006 Sarah Hicks',
                            children: [
                              {
                                name: 'Peyton',
                                birth_year: 2011,
                                generation: 4.5,
                              },
                              {
                                name: 'Emerson',
                                birth_year: 2013,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                          {
                            name: 'Michael',
                            birth_year: 1985,
                            homey: 'Lafayette, Calif',
                            married: '2018 Kaylin',
                            children: [
                              {
                                name: 'Caroline',
                                birth_year: 2019,
                                generation: 4.5,
                              },
                            ],
                            generation: 4,
                          },
                        ],
                        generation: 3.5,
                      },
                    ],
                    generation: 3,
                  },
                ],
                generation: 2.5,
              },
            ],
            generation: 2,
          },
        ],
        generation: 1.5,
      },
    ],
    generation: 1,
  },
  TreeMcGurk: {
    tid: 'TreeMcGurk',
    height: 200,
    width: 3000,
    offsetY: 860,
    name: 'Bridget McGurk',
    join_id: 'JOINID-18xx-Dooher-McGurk',
    birth_year: 1869,
    children: [],
    generation: 1,
  },
  TreeHannigan: {
    tid: 'TreeHannigan',
    height: 300,
    width: 3000,
    offsetY: 1160,
    name: 'John Hannigan',
    birth_year: 1876,
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
            generation: 2,
          },
          {
            name: 'son',
            birth_year_est: 1898,
            note: 'Emigrated to Scotland before 1911?',
            generation: 2,
          },
          {
            name: 'Michael',
            birth_year: 1900,
            generation: 2,
          },
          {
            name: 'Kathleen "Katie" (McGettigan)',
            birth_year: 1901,
            generation: 2,
          },
          {
            name: 'Bridget "Bridie" (Dooher)',
            born: '1902-04-11',
            died: '1994-07-01',
            birth_year: 1902,
            death_year: 1994,
            generation: 2,
          },
          {
            name: 'John',
            birth_year: 1904,
            generation: 2,
          },
          {
            name: 'Sarah (Sr Malachy)',
            birth_year: 1906,
            death_year: 2010,
            generation: 2,
          },
          {
            name: 'Annie (Doherty)',
            birth_year: 1908,
            generation: 2,
          },
          {
            name: 'Margaret "Greta" (Dooher)',
            join_id: 'JOINID-19XX-Dooher-Hannigan',
            born: '1916-04-02',
            birth_year: 1916,
            death_year: 1972,
            generation: 2,
          },
        ],
        generation: 1.5,
      },
    ],
    generation: 1,
  },
  TreeTemple: {
    tid: 'TreeTemple',
    height: 200,
    width: 3000,
    offsetY: 1310,
    name: 'Sarah Temple',
    join_id: 'JOINID-18xx-Hannigan-Temple',
    birth_year: 1876,
    children: [],
    generation: 1,
  },
  generation: 1,
}

var setDepths = function (tree) {
  var leaves = []
  //   GEN = 0

  var walk = function (obj, path, GEN) {
    path = path || ''
    GEN = GEN || 1.0
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' || obj[key] instanceof Array) {
          var pathkey = [path, key].filter((x) => x).join('.')
          if (key === 'children') {
            obj['generation'] = GEN
            walk(obj[key], pathkey, GEN + 0.5)
          } else {
            walk(obj[key], pathkey, GEN)
          }
        } else {
          // leaf
          var pathkey = [path, key].filter((x) => x).join('.')
          obj['generation'] = GEN
          leaves.push(pathkey)
          //   GEN = 1
        }
      }
    }
  }
  walk(tree, '', 0)
  //   return leaves
}

// setDepths(A.trees)
