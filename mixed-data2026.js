"use strict";

const mixedLeagueData = {
  season: "2026-27",

  leagueName: "Mixed League",

  scoring: {
    win: 10,
    loss: 5,
    tie: 7,
    defaultWin: 10,
    defaultLoss: 0
  },

  teams: {
    1: "Team 1",
    2: "Team 2",
    3: "Team 3",
    4: "Team 4",
    5: "Team 5",
    6: "Team 6",
    7: "Team 7",
    8: "Team 8",
    9: "Team 9",
    10: "Team 10"
  },

  schedule: [
    {
      week: 1,
      date: "2026-10-02",
      displayDate: "October 2, 2026",
      phase: "regular",
      fiftyFiftyTeam: 6,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 8,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 3,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 4,
          teamB: 9,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 6,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 2,
      date: "2026-10-09",
      displayDate: "October 9, 2026",
      phase: "regular",
      fiftyFiftyTeam: 8,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 2,
          teamB: 3,
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
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 9,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 10,
          teamB: 4,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 3,
      date: "2026-10-16",
      displayDate: "October 16, 2026",
      phase: "regular",
      fiftyFiftyTeam: 1,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 6,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 7,
          teamB: 8,
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
          teamA: 2,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 5,
          teamB: 10,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 4,
      date: "2026-10-23",
      displayDate: "October 23, 2026",
      phase: "regular",
      fiftyFiftyTeam: 4,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 10,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 2,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 3,
          teamB: 4,
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
          teamA: 9,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 5,
      date: "2026-10-30",
      displayDate: "October 30, 2026",
      phase: "regular",
      fiftyFiftyTeam: 2,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 3,
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
          teamA: 7,
          teamB: 10,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 8,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 4,
          teamB: 1,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 6,
      date: "2026-11-06",
      displayDate: "November 6, 2026",
      phase: "regular",
      fiftyFiftyTeam: 3,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 10,
          teamB: 8,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 4,
          teamB: 5,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 3,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 2,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 7,
      date: "2026-11-13",
      displayDate: "November 13, 2026",
      phase: "regular",
      fiftyFiftyTeam: 9,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 6,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 7,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 8,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 9,
          teamB: 10,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 8,
      date: "2026-11-20",
      displayDate: "November 20, 2026",
      phase: "regular",
      fiftyFiftyTeam: 7,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 1,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 2,
          teamB: 9,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 3,
          teamB: 8,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 4,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 9,
      date: "2026-11-27",
      displayDate: "November 27, 2026",
      phase: "regular",
      fiftyFiftyTeam: 5,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 8,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 10,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 6,
          teamB: 1,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 7,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 9,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 10,
      date: "2026-12-04",
      displayDate: "December 4, 2026",
      phase: "regular",
      fiftyFiftyTeam: 3,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 8,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 3,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 4,
          teamB: 9,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 6,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 11,
      date: "2026-12-11",
      displayDate: "December 11, 2026",
      phase: "regular",
      fiftyFiftyTeam: 6,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 7,
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
          teamA: 8,
          teamB: 6,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 10,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 2,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: null,
      date: "2026-12-18",
      displayDate: "December 18, 2026",
      phase: "special",
      specialEvent: "Christmas Potluck",
      earlyGames: [],
      lateGames: []
    },

    {
      week: null,
      date: "2026-12-25",
      displayDate: "December 25, 2026",
      phase: "special",
      specialEvent: "Christmas Break",
      earlyGames: [],
      lateGames: []
    },

    {
      week: 12,
      date: "2027-01-01",
      displayDate: "January 1, 2027",
      phase: "regular",
      fiftyFiftyTeam: 8,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 6,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 7,
          teamB: 8,
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
          teamA: 2,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 5,
          teamB: 10,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 13,
      date: "2027-01-08",
      displayDate: "January 8, 2027",
      phase: "regular",
      fiftyFiftyTeam: 1,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 9,
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 2,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 3,
          teamB: 4,
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
          teamA: 10,
          teamB: 6,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 14,
      date: "2027-01-15",
      displayDate: "January 15, 2027",
      phase: "regular",
      fiftyFiftyTeam: 4,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 3,
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
          teamA: 7,
          teamB: 10,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 8,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 4,
          teamB: 1,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 15,
      date: "2027-01-22",
      displayDate: "January 22, 2027",
      phase: "regular",
      fiftyFiftyTeam: 7,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 10,
          teamB: 8,
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
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 3,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 4,
          teamB: 5,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 16,
      date: "2027-01-29",
      displayDate: "January 29, 2027",
      phase: "regular",
      fiftyFiftyTeam: 5,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 6,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 7,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 8,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 9,
          teamB: 10,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 17,
      date: "2027-02-05",
      displayDate: "February 5, 2027",
      phase: "regular",
      fiftyFiftyTeam: 2,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 1,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 2,
          teamB: 9,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 3,
          teamB: 8,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 4,
          teamB: 7,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 18,
      date: "2027-02-12",
      displayDate: "February 12, 2027",
      phase: "regular",
      fiftyFiftyTeam: 9,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 9,
          teamB: 3,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 10,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 8,
          teamB: 4,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 7,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 6,
          teamB: 1,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 19,
      date: "2027-02-19",
      displayDate: "February 19, 2027",
      phase: "playoffs",
      specialEvent: "Playoff Schedule Coming Soon",
      earlyGames: [],
      lateGames: []
    },

    {
      week: 20,
      date: "2027-02-26",
      displayDate: "February 26, 2027",
      phase: "playoffs",
      specialEvent: "Playoff Schedule Coming Soon",
      earlyGames: [],
      lateGames: []
    },

    {
      week: 21,
      date: "2027-03-05",
      displayDate: "March 5, 2027",
      phase: "playoffs",
      specialEvent: "Playoff Schedule Coming Soon",
      earlyGames: [],
      lateGames: []
    },

    {
      week: null,
      date: "2027-03-12",
      displayDate: "March 12, 2027",
      phase: "special",
      specialEvent:
        "Lorette Open Bonspiel — No Mixed Curling",
      earlyGames: [],
      lateGames: []
    },

    {
      week: 22,
      date: "2027-03-19",
      displayDate: "March 19, 2027",
      phase: "playoffs",
      specialEvent: "Playoff Schedule Coming Soon",
      earlyGames: [],
      lateGames: []
    }
  ]
};
