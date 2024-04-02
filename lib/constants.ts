export const nflDivisonTeams: any = {
  "AFC East": [
    ["Miami Dolphins", 15],
    ["Buffalo Bills", 2],
    ["New England Patriots", 17],
    ["New York Jets", 20],
  ],
  "AFC North": [
    ["Pittsburgh Steelers", 23],
    ["Cleveland Browns", 5],
    ["Baltimore Ravens", 33],
    ["Cincinnati Bengals", 4],
  ],
  "AFC South": [
    ["Jacksonville Jaguars", 30],
    ["Indianapolis Colts", 11],
    ["Houston Texans", 34],
    ["Tennessee Titans", 10],
  ],
  "AFC West": [
    ["Las Vegas Raiders", 13],
    ["Kansas City Chiefs", 12],
    ["Los Angeles Chargers", 24],
    ["Denver Broncos", 7],
  ],
  "NFC East": [
    ["Washington Commanders", 28],
    ["New York Giants", 19],
    ["Philadelphia Eagles", 21],
    ["Dallas Cowboys", 6],
  ],
  "NFC North": [
    ["Detroit Lions", 8],
    ["Chicago Bears", 3],
    ["Green Bay Packers", 9],
    ["Minnesota Vikings", 16],
  ],
  "NFC South": [
    ["New Orleans Saints", 18],
    ["Atlanta Falcons", 1],
    ["Tampa Bay Buccaneers", 27],
    ["Carolina Panthers", 29],
  ],
  "NFC West": [
    ["Seattle Seahawks", 26],
    ["San Francisco 49ers", 25],
    ["Arizona Cardinals", 22],
    ["Los Angeles Rams", 14],
  ],
};

export const mlbDivisonTeams: any = {
  "AL East": [
    ["Baltimore Orioles", 1],
    ["Tampa Bay Rays", 30],
    ["Boston Red Sox", 2],
    ["New York Yankees", 10],
    ["Toronto Blue Jays", 14],
  ],
  "AL Central": [
    ["Chicago White Sox", 4],
    ["Cleveland Guardians", 5],
    ["Detroit Tigers", 6],
    ["Kansas City Royals", 7],
    ["Minnesota Twins", 9],
  ],
  "AL West": [
    ["Houston Astros", 18],
    ["Los Angeles Angels", 3],
    ["Oakland Athletics", 11],
    ["Seattle Mariners", 12],
    ["Texas Rangers", 13],
  ],
  "NL East": [
    ["Atlanta Braves", 15],
    ["Miami Marlins", 28],
    ["New York Mets", 21],
    ["Philadelphia Phillies", 22],
    ["Washington Nationals", 20],
  ],
  "NL Central": [
    ["Chicago Cubs", 16],
    ["Cincinnati Reds", 17],
    ["Milwaukee Brewers", 8],
    ["Pittsburgh Pirates", 23],
    ["St. Louis Cardinals", 24],
  ],
  "NL West": [
    ["Arizona Diamondbacks", 29],
    ["Colorado Rockies", 27],
    ["Los Angeles Dodgers", 19],
    ["San Diego Padres", 25],
    ["San Francisco Giants", 26],
  ],
};

export const nbaDivisionTeams = {
  Atlantic: [
    ["Boston Celtics", 2],
    ["Philadelphia 76ers", 20],
    ["New York Knicks", 18],
    ["Brooklyn Nets", 17],
    ["Toronto Raptors", 28],
  ],
  Central: [
    ["Milwaukee Bucks", 15],
    ["Cleveland Cavaliers", 5],
    ["Detroit Pistons", 8],
    ["Chicago Bulls", 4],
    ["Indiana Pacers", 11],
  ],
  Southeast: [
    ["Atlanta Hawks", 1],
    ["Charlotte Hornets", 30],
    ["Miami Heat", 14],
    ["Orlando Magic", 19],
    ["Washington Wizards", 27],
  ],
  Northwest: [
    ["Denver Nuggets", 7],
    ["Minnesota Timberwolves", 16],
    ["Oklahoma City Thunder", 25],
    ["Portland Trailblazers", 22],
    ["Utah Jazz", 26],
  ],
  Pacific: [
    ["Golden State Warriors", 9],
    ["Los Angeles Clippers", 12],
    ["Los Angeles Lakers", 13],
    ["Phoenix Suns", 21],
    ["Sacramento Kings", 23],
  ],
  Southwest: [
    ["Dallas Mavericks", 6],
    ["Houston Rockets", 10],
    ["Memphis Grizzlies", 29],
    ["New Orleans Pelicans", 3],
    ["San Antonio Spurs", 24],
  ],
};

export const nameExceptions: string[] = [
  "Boston Red Sox",
  "Toronto Blue Jays",
  "Chicago White Sox",
];

export const allNFLDates = [
  {
    year: "2008",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2009",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2010",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2011",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2012",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2013",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2014",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2015",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2016",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2017",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2018",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 2 - Aug 7",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 8 - 14",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 15 - 21",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 22 - 28",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 29 - Sep 4",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 5 - 11",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 12 - 18",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 19 - 25",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 26 - Oct 2",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 3 - 9",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 10 - 16",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 17 - 23",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 24 - Oct 30",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 31 - Nov 6",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 7 - 13",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 14 - 20",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 21 - 27",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 28 - Dec 4",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 5- 11",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 12 - 18",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 19 - 25",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 26 - Jan 1",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 2 - 8",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 9 - 15",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 16 - 22",
            label: "Conf Champ",
            value: "3",
          },
          {
            dateRange: "Jan 30 - Feb 5",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2019",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Jul 30 - Aug 6",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 7 - 13",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 14 - 20",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 21 - 27",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Aug 28 - Sep 3",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 4 - 10",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 11 - 17",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 18 - 24",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 25 - Oct 1",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 2 - 8",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 9 - 15",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 16 - 22",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 23 - Oct 29",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Oct 30 - Nov 5",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 6 - 12",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 13 - 19",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 20 - 26",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 27 - Dec 3",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 4 - 10",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 11 - 17",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 18 - 24",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 25 - 31",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 1 - 7",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 8 - 14",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 15 - 21",
            label: "Conf Champ",
            value: "3",
          },

          {
            dateRange: "Jan 29 - Feb 4",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2020",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 5 - 11",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 12 - 18",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 19 - 25",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 26 - Sep 1",
            label: "Pre Week 3",
            value: "4",
          },
          {
            dateRange: "Sep 2 - Sep 8",
            label: "Pre Week 4",
            value: "5",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 9 - 15",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 16 - 22",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 23 - 29",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 30 - Oct 6",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 7 - 13",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 14 - 20",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 21 - 27",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 28 - Nov 3",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Nov 4 - 10",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 11 - 17",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 18 - 24",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 25 - Dec 2",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Dec 3 - 8",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 9 - 15",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 16 - 22",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 23 - 29",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 30 - Jan 5",
            label: "Week 17",
            value: "17",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 6 - 12",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 13 - 19",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 20 - 26",
            label: "Conf Champ",
            value: "3",
          },

          {
            dateRange: "Feb 3 - 9",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2021",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "July 7 - Aug 10",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 11 - 17",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 18 - 24",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 25 - 35",
            label: "Pre Week 3",
            value: "4",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 9 - 14",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 15 - 21",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 22 - 28",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 29 - Oct 5",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 6 - 12",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 13 - 19",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 20 - 26",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 27 - Nov 2",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Nov 3 - 9",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 10 - 16",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 17 - 23",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 24 - 30",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Dec 1 - 7",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 8 - 14",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 15 - 21",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 22 - 28",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 29 - Jan 4",
            label: "Week 17",
            value: "17",
          },
          {
            dateRange: "Jan 5 - 11",
            label: "Week 18",
            value: "18",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 12 - 18",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 19 - 25",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 26 - Feb 1",
            label: "Conf Champ",
            value: "3",
          },

          {
            dateRange: "Feb 9 - 15",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2022",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 1 - 9",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 10 - 16",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 17 - 23",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 24 - Sep 7",
            label: "Pre Week 3",
            value: "4",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 8 - 13",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 14 - 20",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 21 - 27",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 28 - Oct 4",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 5 - 11",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 12 - 18",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 19 - 25",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 26 - Nov 1",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Nov 2 - 8",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 9 - 15",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 16 - 22",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 23 - 29",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 30 - Dec 6",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 7 - 13",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 14 - 20",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 21 - 27",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 28 - Jan 3",
            label: "Week 17",
            value: "17",
          },
          {
            dateRange: "Jan 4 - 11",
            label: "Week 18",
            value: "18",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 12 - 17",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 18 - 24",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 25 - 31",
            label: "Conf Champ",
            value: "3",
          },

          {
            dateRange: "Feb 8 - 14",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
  {
    year: "2023",
    weeksInYear: [
      {
        label: "Preseason",
        seasonType: 1,
        weeks: [
          {
            dateRange: "Aug 1 - 8",
            label: "HOF",
            value: "1",
          },
          {
            dateRange: "Aug 9 - 15",
            label: "Pre Week 1",
            value: "2",
          },
          {
            dateRange: "Aug 16 - 22",
            label: "Pre Week 2",
            value: "3",
          },
          {
            dateRange: "Aug 23 - Sep 6",
            label: "Pre Week 3",
            value: "4",
          },
        ],
      },
      {
        label: "Regular Season",
        seasonType: 2,
        weeks: [
          {
            dateRange: "Sep 7 - 12",
            label: "Week 1",
            value: "1",
          },
          {
            dateRange: "Sep 13 - 19",
            label: "Week 2",
            value: "2",
          },
          {
            dateRange: "Sep 20 - 26",
            label: "Week 3",
            value: "3",
          },
          {
            dateRange: "Sep 27 - Oct 3",
            label: "Week 4",
            value: "4",
          },
          {
            dateRange: "Oct 4 - 10",
            label: "Week 5",
            value: "5",
          },
          {
            dateRange: "Oct 11 - 17",
            label: "Week 6",
            value: "6",
          },
          {
            dateRange: "Oct 18 - 24",
            label: "Week 7",
            value: "7",
          },
          {
            dateRange: "Oct 25 - 31",
            label: "Week 8",
            value: "8",
          },
          {
            dateRange: "Nov 1 - 7",
            label: "Week 9",
            value: "9",
          },
          {
            dateRange: "Nov 8 - 14",
            label: "Week 10",
            value: "10",
          },
          {
            dateRange: "Nov 15 - 21",
            label: "Week 11",
            value: "11",
          },
          {
            dateRange: "Nov 22 - 28",
            label: "Week 12",
            value: "12",
          },
          {
            dateRange: "Nov 29 - Dec 5",
            label: "Week 13",
            value: "13",
          },
          {
            dateRange: "Dec 6 - 12",
            label: "Week 14",
            value: "14",
          },
          {
            dateRange: "Dec 13 - 19",
            label: "Week 15",
            value: "15",
          },
          {
            dateRange: "Dec 20 - 26",
            label: "Week 16",
            value: "16",
          },
          {
            dateRange: "Dec 27 - Jan 2",
            label: "Week 17",
            value: "17",
          },
          {
            dateRange: "Jan 3 - 12",
            label: "Week 18",
            value: "18",
          },
        ],
      },
      {
        label: "Post Season",
        seasonType: 3,
        weeks: [
          {
            dateRange: "Jan 13 - 16",
            label: "Wild Card",
            value: "1",
          },
          {
            dateRange: "Jan 17 - 23",
            label: "Div Rnd",
            value: "2",
          },
          {
            dateRange: "Jan 24 - 30",
            label: "Conf Champ",
            value: "3",
          },

          {
            dateRange: "Feb 7 - 14",
            label: "Super Bowl",
            value: "5",
          },
        ],
      },
    ],
  },
];
