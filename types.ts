export type ScoreData = {
  DTCpackages: {
    packages: Array<any>;
  };
  ads: any;
  analytics: any;
  content: {
    league: string;
    calendar: Array<string>;
    canonical: string;
    dateParams: {
      date: string;
    };
    defaults: {
      scoDat: string;
    };
    description: string;
    isWeekOriented: boolean;
    og_type: string;
    sbData: {
      day: {
        date: string;
      };
      events: Array<{
        uid: string;
        competitons: Array<{
          attendance: number;
          broadcasts: Array<any>;
          competitors: Array<{
            homeAway: string;
            id: string;
            leaders: Array<{
              abbreviation: string;
              displayName: string;
              leaders: Array<{
                athlete: Athlete;
                displayValue: string;
                team: { id: string };
                value: number;
              }>;
              name: string;
              shortDisplayName: string;
            }>;
            linescores: Array<{ value: number }>;
            order: number;
            records: Array<{
              summary: string;
              name: string;
              abbreviation?: string;
              type: string;
            }>;
            score: string;
            statistics: Array<{
              displayValue: string;
              name: string;
              abbreviation: string;
            }>;
            team: {
              abbreviation: string;
              alternateColor: string;
              color: string;
              displayName: string;
              id: string;
              isActive: boolean;
              links: Array<any>;
              location: string;
              logo: string;
              name: string;
              shortDisplayName: string;
              uid: string;
              venue: {
                id: string;
              };
            };
            type: string;
            uid: string;
          }>;
          conferenceCompetition: boolean;
          date: string;
          format: {
            regulation: {
              periods: number;
            };
          };
          geoBroadcasts: Array<any>;
          id: string;
          neutralSite: boolean;
          notes: Array<any>;
          playByPlayAvailable: boolean;
          recent: boolean;
          situation: {
            lastPlay: {
              id: string;
              athletesInvolved: Array<{
                displayName: string;
                fullName: string;
                headshot: string;
                id: string;
                jersey: string;
                links: Array<any>;
                position: string;
                shortNmae: string;
                team: {
                  id: string;
                };
              }>;
            };
          };
          startDate: string;
          status: {
            period: number;
            displayClock: string;
            clock: number;
            type: {
              completed: boolean;
              description: string;
              detail: string;
              id: string;
              name: string;
              shortDetail: string;
              state: string;
            };
          };
          timeValid: boolean;
          type: { id: string; abbreviation: string };
          uid: string;
          venue: {
            address: {
              city: string;
              state: string;
            };
            capacity: number;
            fullName: string;
            id: string;
            indoor: boolean;
          };
        }>;
        date: string;
        id: string;
        links: Array<any>;
        name: string;
        season: {
          year: number;
          type: number;
          slug: string;
        };
        shortName: string;
        status: {
          period: number;
          displayCLock: string;
          clock: number;
          type: {
            completed: boolean;
            description: string;
            detail: string;
            id: string;
            name: string;
            shortDetail: string;
            state: string;
          };
        };
      }>;
    };
    sbGroup: {
      altTitle: string;
      isCollege: boolean;
      league: string;
      pageTitle: string;
      scheduleStartDate: string;
      sport: string;
    };
    title: string;
  };
  meta: any;
  news: any;
  nowFeed: any;
  sport: Array<string>;
  tier2Nav: any;
  type: string;
};

export type NBAPlay = {
  awayScore: number;
  homeScore: number;
  clock: {
    displayValue: string;
  };
  coordinate: {
    x: number;
    y: number;
  };
  id: string;
  participants: Array<{
    athlete: {
      id: string;
    };
  }>;
  period: {
    number: number;
    displayValue: string;
  };
  scoreValue: number;
  scoringPlay: boolean;
  shootingPlay: boolean;
  team: {
    id: string;
  };
  sequenceNumber: string;
  text: string;
  type: {
    id: number;
    text: string;
  };
  wallClock: string;
};

export type NFLPlay = NBAPlay & {
  scoringType: {
    name: string;
    displayName: string;
    abbreviation: string;
  };
};

export type NFLGameData = {
  awayTeam: NFLTeamGameData;
  homeTeam: NFLTeamGameData;
  gameData: {
    lastFiveGames: any;
    injuries: any;
    article: {
      dataSourceIdentifier: string;
      description: string;
      gameId: string;
      headline: string;
      lastModified: string;
      published: string;
      source: string;
      type: string;
      images: Array<
        Image & {
          url: string;
        }
      >;
      video: Array<{
        links: {
          web: {
            href: string;
          };
        };
      }>;
      links: any;
    };
    boxscore: {
      teams: Array<{
        displayOrder: number;
        team: {
          shortDisplayName: string;
          logo: string;
        };
        statistics: Array<{
          displayValue: string;
          label: string;
          name: string;
        }>;
      }>;
    };
    drives: any;
    gameInfo: {
      attendance: number;
      venue: {
        id: string;
        fullName: string;
        address: {
          city: string;
          state: string;
          zipCode: string;
        };
        capacity: number;
        images: Array<Image>;
      };
    };
    header: {
      competitions: Array<{
        date: string;
        id: string;
        competitors: Array<NFLTeamGameData>;
        status: Status;
      }>;
      gameNote: string;
      id: string;
      week: string;
      season: {
        year: number;
        type: number;
      };
    };
    leaders: Array<{
      leaders: Array<{
        displayName: string;
        name: string;
        leaders: Array<{
          athlete: Athlete;
          displayValue: string;
        }>;
      }>;
      team: Team;
    }>;
    news: {
      header: string;
      articles: Array<any>;
    };
    predictor: {
      homeTeam: {
        id: string;
        gameProjection: string;
        teamChanceLoss: string;
        teamChanceTie: string;
      };
      awayTeam: {
        id: string;
        gameProjection: string;
        teamChanceLoss: string;
        teamChanceTie: string;
      };
      header: string;
    };
    scoringPlays: Array<NFLPlay>;
    videos?: any;
    winProbability: Array<{
      homeWinPercentage: number;
      playId: string;
      secondsLeft: number;
      tiePercentage: number;
    }>;
    standings: {
      groups: Array<{
        header: string;
        href: string;
        standings: {
          entries: Array<{
            team: string;
            id: string;
            link: string;
            logo: Array<Image>;
            stats: Array<{
              abbreviation: string;
              description: string;
              displayName: string;
              displayValue: string;
              name: string;
              shortDisplayname: string;
              type: string;
              value: number;
            }>;
          }>;
        };
      }>;
    };
  };
  gameInfo: any;
  isGameStarted: boolean;
  scoringPlays: {
    firstQuarterScoringPlays: Array<NFLPlay>;
    secondQuarterScoringPlays: Array<NFLPlay>;
    thirdQuarterScoringPlays: Array<NFLPlay>;
    fourthQuarterScoringPlays: Array<NFLPlay>;
  };
};

export type NFLTeamGameData = {
  homeAway: string;
  id: string;
  linescores: Array<{ displayValue: string }>;
  order: number;
  possession: false;
  record: {
    type: string;
    summary: string;
    displayValue: string;
  };
  score: string;
  team: Team;
};

export type Team = {
  abbreviation: string;
  alternateColor: string;
  color: string;
  displayName: string;
  id: string;
  links: Array<{
    href: string;
    rel: Array<string>;
    text: string;
  }>;
  location: string;
  name: string;
  nickname: string;
  logos: Array<Image>;
  uid: string;
};

export type Image = {
  alt: string;
  height: number;
  width: number;
  href: string;
  lastUpdated?: string;
  rel?: Array<string>;
};

export type Status = {
  type: {
    id: string;
    name: string;
    completed: boolean;
    description: string;
    shortDetail: string;
    state: string;
  };
};

export type Athlete = {
  active?: boolean;
  displayName: string;
  fullName: string;
  headshot: { href: string };
  id: string;
  jersey: string;
  links: Array<any>;
  position: { abbreviation: string };
  shortName: string;
  team: { id: string };
};

export type Article = {
  categories: Array<{
    createDate: string;
    description: string;
    id: number;
    sportId: number;
    topicId: number;
    type: string;
  }>;
  dataSourceIdentifier: string;
  description: string;
  headline: string;
  images: Array<{
    credit: string;
    dataSourceIdentifier: string;
    height: number;
    id: number;
    name: string;
    type: string;
    url: string;
    width: number;
  }>;
};

export type NBAGameData = any;

export type MLBGameData = any;

export type GameData = NFLGameData | NBAGameData | MLBGameData;
