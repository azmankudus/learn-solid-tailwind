export const BAR_DATA = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  values: [120, 200, 150, 80, 70, 110, 130]
};

export const LINE_DATA = {
  timeline: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Revenue', data: [150, 230, 224, 218, 135, 147] },
    { name: 'Expenses', data: [120, 180, 150, 200, 110, 105] }
  ]
};

export const PIE_DATA = [
  { value: 1048, name: 'Search Engine' },
  { value: 735, name: 'Direct' },
  { value: 580, name: 'Email' },
  { value: 484, name: 'Union Ads' },
  { value: 300, name: 'Video Ads' }
];

export const DONUT_DATA = [
  { value: 1048, name: 'Desktop' },
  { value: 735, name: 'Mobile' },
  { value: 580, name: 'Tablet' },
  { value: 484, name: 'Others' }
];

export const SCATTER_DATA = [
  [10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81], [11.0, 8.33],
  [14.0, 7.66], [13.4, 6.81], [10.0, 6.33], [14.0, 8.96], [12.5, 6.82],
  [9.15, 7.20], [11.5, 7.20], [3.03, 4.23], [12.2, 7.83], [2.02, 4.47],
  [1.05, 3.33], [4.05, 4.96], [6.03, 7.24], [12.0, 6.26], [12.0, 8.84],
  [7.08, 5.82], [5.02, 5.68]
];

export const STACKED_BAR_DATA = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    { name: 'Email', data: [120, 132, 101, 134, 90, 230, 210] },
    { name: 'Union Ads', data: [220, 182, 191, 234, 290, 330, 310] },
    { name: 'Video Ads', data: [150, 232, 201, 154, 190, 330, 410] }
  ]
};

export const RADAR_DATA = {
  indicators: [
    { name: 'Sales', max: 6500 },
    { name: 'Administration', max: 16000 },
    { name: 'Information Technology', max: 30000 },
    { name: 'Customer Support', max: 38000 },
    { name: 'Development', max: 52000 },
    { name: 'Marketing', max: 25000 }
  ],
  series: [
    {
      value: [4200, 3000, 20000, 35000, 50000, 18000],
      name: 'Allocated Budget'
    },
    {
      value: [5000, 14000, 28000, 26000, 42000, 21000],
      name: 'Actual Spending'
    }
  ]
};

export const BOXPLOT_DATA = [
  [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
  [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
  [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
  [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
  [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
];

export const CANDLESTICK_DATA = [
  ['2017-10-24', 2320.26, 2320.26, 2287.3, 2362.94],
  ['2017-10-25', 2300, 2291.3, 2288.26, 2308.38],
  ['2017-10-26', 2295.35, 2346.5, 2295.35, 2346.5],
  ['2017-10-27', 2347.22, 2358.98, 2337.35, 2363.8],
  ['2017-10-30', 2360.75, 2382.48, 2347.89, 2383.76],
  ['2017-10-31', 2383.43, 2385.42, 2371.23, 2391.82],
  ['2017-11-01', 2377.41, 2419.02, 2369.57, 2421.15]
];

export const HEATMAP_DATA: any[] = [];
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 24; j++) {
    HEATMAP_DATA.push([j, i, Math.floor(Math.random() * 10)]);
  }
}

export const TREEMAP_DATA = [
  {
    name: 'nodeA',
    value: 10,
    children: [
      { name: 'nodeAa', value: 4 },
      { name: 'nodeAb', value: 6 }
    ]
  },
  {
    name: 'nodeB',
    value: 20,
    children: [
      {
        name: 'nodeBa',
        value: 20,
        children: [{ name: 'nodeBa1', value: 20 }]
      }
    ]
  }
];

export const SUNBURST_DATA = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          { name: 'Cousin Jack', value: 2 },
          { name: 'Cousin Mary', value: 5 },
          { name: 'Nice Peter', value: 4 }
        ]
      },
      {
        name: 'Father',
        value: 10,
        children: [
          { name: 'Me', value: 5 },
          { name: 'Brother Akxl', value: 1 }
        ]
      }
    ]
  }
];

export const GAUGE_DATA = [
  { value: 50, name: 'SCORE' }
];

export const FUNNEL_DATA = [
  { value: 60, name: 'Visit' },
  { value: 40, name: 'Inquiry' },
  { value: 20, name: 'Order' },
  { value: 80, name: 'Click' },
  { value: 100, name: 'Show' }
];

export const NIGHTINGALE_DATA = [
  { value: 40, name: 'rose 1' },
  { value: 38, name: 'rose 2' },
  { value: 32, name: 'rose 3' },
  { value: 30, name: 'rose 4' },
  { value: 28, name: 'rose 5' },
  { value: 26, name: 'rose 6' },
  { value: 22, name: 'rose 7' },
  { value: 18, name: 'rose 8' }
];
