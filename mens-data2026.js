"use strict";

const mensLeagueData = {
  season: "2026-27",

  leagueName: "Men’s League",

  teamNorthamNumber: 7,

  scoring: {
    win: 10,
    loss: 5,
    tie: 7,
    defaultWin: 10,
    defaultLoss: 0
  },

  teams: {
    1: "Team Fouasse",
    2: "Team Audette",
    3: "Team M. Rondeau",
    4: "Team Messner",
    5: "Team Brunette",
    6: "Team G. Rondeau",
    7: "Team Northam",
    8: "Team Bjarnason",
    9: "Team Lyle",
    10: "Team Ridge",
    11: "Team Stevenson",
    12: "Team Hallonquist"
  },

  schedule: [
    {
      week: 1,
      date: "2026-10-01",
      displayDate: "October 1, 2026",
      phase: "regular",
      fiftyFiftyTeam: null,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 12,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 9,
          teamB: 11,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 2,
          teamB: 8,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 7,
          teamB: 3,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 10,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 4,
          teamB: 6,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 2,
      date: "2026-10-08",
      displayDate: "October 8, 2026",
      phase: "regular",
      fiftyFiftyTeam: 4,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 4,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 11,
          teamB: 3,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 7,
          teamB: 6,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 8,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 2,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 10,
          teamB: 12,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 3,
      date: "2026-10-15",
      displayDate: "October 15, 2026",
      phase: "regular",
      fiftyFiftyTeam: 1,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 3,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 12,
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 10,
          teamB: 1,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 8,
          teamB: 11,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 9,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 4,
          teamB: 2,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 4,
      date: "2026-10-22",
      displayDate: "October 22, 2026",
      phase: "regular",
      fiftyFiftyTeam: 2,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 2,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 7,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 1,
          teamB: 6,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 11,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 8,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 12,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 5,
      date: "2026-10-29",
      displayDate: "October 29, 2026",
      phase: "regular",
      fiftyFiftyTeam: 12,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 9,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 3,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 12,
          teamB: 5,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 10,
          teamB: 11,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 1,
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 8,
          teamB: 6,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 6,
      date: "2026-11-05",
      displayDate: "November 5, 2026",
      phase: "regular",
      fiftyFiftyTeam: 3,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 3,
          teamB: 8,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 7,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 11,
          teamB: 6,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 2,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 9,
          teamB: 12,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 1,
          teamB: 4,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 7,
      date: "2026-11-12",
      displayDate: "November 12, 2026",
      phase: "regular",
      fiftyFiftyTeam: 6,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 6,
          teamB: 12,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 5,
          teamB: 3,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 8,
          teamB: 10,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 9,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 11,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 2,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 8,
      date: "2026-11-19",
      displayDate: "November 19, 2026",
      phase: "regular",
      fiftyFiftyTeam: 8,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 8,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 4,
          teamB: 12,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 11,
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 6,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 3,
          teamB: 10,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 9,
      date: "2026-11-26",
      displayDate: "November 26, 2026",
      phase: "regular",
      fiftyFiftyTeam: 7,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 11,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 1,
          teamB: 3,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 5,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 8,
          teamB: 12,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 4,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 6,
          teamB: 9,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 10,
      date: "2026-12-03",
      displayDate: "December 3, 2026",
      phase: "regular",
      fiftyFiftyTeam: 9,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 4,
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 2,
          teamB: 12,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 9,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 6,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 11,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 5,
          teamB: 8,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 11,
      date: "2026-12-10",
      displayDate: "December 10, 2026",
      phase: "regular",
      fiftyFiftyTeam: 10,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 10,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 5,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 1,
          teamB: 2,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 7,
          teamB: 8,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 3,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 12,
          teamB: 11,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 12,
      date: "2026-12-17",
      displayDate: "December 17, 2026",
      phase: "regular",
      fiftyFiftyTeam: 5,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 4,
          teamB: 8,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 9,
          teamB: 11,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 10,
          teamB: 12,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 2,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 3,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 13,
      date: "2027-01-07",
      displayDate: "January 7, 2027",
      phase: "regular",
      fiftyFiftyTeam: 11,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 6,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 3,
          teamB: 11,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 12,
          teamB: 8,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 2,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 1,
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 5,
          teamB: 9,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 14,
      date: "2027-01-14",
      displayDate: "January 14, 2027",
      phase: "regular",
      fiftyFiftyTeam: 4,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 9,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 4,
          teamB: 12,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 11,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 3,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 8,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 2,
          teamB: 10,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 15,
      date: "2027-01-21",
      displayDate: "January 21, 2027",
      phase: "regular",
      fiftyFiftyTeam: 2,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 8,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 5,
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 10,
          teamB: 4,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 6,
          teamB: 12,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 11,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 3,
          teamB: 9,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 16,
      date: "2027-01-28",
      displayDate: "January 28, 2027",
      phase: "regular",
      fiftyFiftyTeam: 1,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 4,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 2,
          teamB: 12,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 1,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 7,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 8,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 5,
          teamB: 11,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 17,
      date: "2027-02-04",
      displayDate: "February 4, 2027",
      phase: "regular",
      fiftyFiftyTeam: 5,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 9,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 5,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 8,
          teamB: 11,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 12,
          teamB: 3,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 1,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 4,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ]
    }
  ]
};
