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
                athlete: {
                  active: boolean;
                  displayName: string;
                  fullName: string;
                  headshot: string;
                  id: string;
                  jersey: string;
                  links: Array<any>;
                  position: { abbreviation: string };
                  shortName: string;
                  team: { id: string };
                };
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
