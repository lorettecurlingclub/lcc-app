"use strict";

const mensLeagueData = {
  season: "2026-27",

  leagueName: "Men’s League",

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
    10: "Team 10",
    11: "Team 11"
  },

  schedule: [
    {
      week: 1,
date: "2026-10-01",
displayDate: "October 1, 2026",
phase: "regular",
fiftyFiftyTeam: null,
byeTeam: 2,
earlyTime: "7:00 PM",
lateTime: "9:15 PM",

earlyGames: [
  {
    sheet: 1,
    teamA: 7,
    teamB: 6,
    resultType: "win",
    winner: 7
  },
  {
    sheet: 2,
    teamA: 1,
    teamB: 8,
    resultType: "win",
    winner: 8
  },
  {
    sheet: 3,
    teamA: 10,
    teamB: 3,
    resultType: "win",
    winner: 10
  }
],

lateGames: [
  {
    sheet: 1,
    teamA: 9,
    teamB: 11,
    resultType: "win",
    winner: 11
  },
  {
    sheet: 2,
    teamA: 4,
    teamB: 5,
    resultType: "win",
    winner: 5
  }
]
},

    {
      week: 2,
      date: "2026-10-08",
      displayDate: "October 8, 2026",
      phase: "regular",
      fiftyFiftyTeam: 1,
      byeTeam: 9,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 11,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 7,
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
          teamA: 4,
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
        }
      ]
    },

    {
      week: 3,
      date: "2026-10-15",
      displayDate: "October 15, 2026",
      phase: "regular",
      fiftyFiftyTeam: 2,
      byeTeam: 11,
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
          teamA: 4,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 9,
          teamB: 1,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 8,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 10,
          teamB: 7,
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
      fiftyFiftyTeam: 3,
      byeTeam: 4,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 11,
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
          teamA: 1,
          teamB: 6,
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
          teamA: 2,
          teamB: 9,
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
      fiftyFiftyTeam: 5,
      byeTeam: 9,
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
          teamA: 3,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 11,
          teamB: 5,
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
          teamA: 1,
          teamB: 7,
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
      fiftyFiftyTeam: 4,
      byeTeam: 3,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 7,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 1,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 10,
          teamB: 6,
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
          teamA: 2,
          teamB: 5,
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
      byeTeam: 11,
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
          teamA: 5,
          teamB: 3,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 8,
          teamB: 1,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 2,
          teamB: 7,
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
      week: 8,
      date: "2026-11-19",
      displayDate: "November 19, 2026",
      phase: "regular",
      fiftyFiftyTeam: 7,
      byeTeam: 8,
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
          teamA: 10,
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 4,
          teamB: 11,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 6,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 3,
          teamB: 9,
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
      fiftyFiftyTeam: 8,
      byeTeam: 10,
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
          teamA: 4,
          teamB: 9,
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
          teamA: 1,
          teamB: 3,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 6,
          teamB: 8,
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
      byeTeam: 5,
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
          teamB: 11,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 8,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 6,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 10,
          teamB: 1,
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
      byeTeam: 7,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 9,
          teamB: 8,
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
          teamA: 11,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 3,
          teamB: 4,
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
      fiftyFiftyTeam: 11,
      byeTeam: 4,
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
          teamA: 3,
          teamB: 7,
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
          teamA: 2,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 9,
          teamB: 11,
          resultType: null,
          winner: null
        }
      ]
    },

{
  week: null,
  date: "2026-12-24",
  displayDate: "December 24, 2026",
  phase: "special",
  specialEvent: "Christmas Break",
  earlyGames: [],
  lateGames: []
},

{
  week: null,
  date: "2026-12-31",
  displayDate: "December 31, 2026",
  phase: "special",
  specialEvent: "Christmas Break",
  earlyGames: [],
  lateGames: []
},
    
    {
      week: 13,
      date: "2027-01-07",
      displayDate: "January 7, 2027",
      phase: "regular",
      fiftyFiftyTeam: 2,
      byeTeam: 1,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 3,
          teamB: 10,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 6,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 2,
          teamB: 4,
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
          teamA: 5,
          teamB: 8,
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
      fiftyFiftyTeam: 1,
      byeTeam: 6,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 8,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 4,
          teamB: 11,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 10,
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
          teamA: 2,
          teamB: 9,
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
      fiftyFiftyTeam: 3,
      byeTeam: 2,
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
          teamA: 5,
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 9,
          teamB: 4,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 10,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 6,
          teamB: 11,
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
      fiftyFiftyTeam: 4,
      byeTeam: 7,
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
          teamB: 11,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 9,
          teamB: 10,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 8,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 1,
          teamB: 3,
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
      byeTeam: 10,
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
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 11,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 6,
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
      date: "2027-02-11",
      displayDate: "February 11, 2027",
      phase: "regular",
      fiftyFiftyTeam: 6,
      byeTeam: 1,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",

      earlyGames: [
        {
          sheet: 1,
          teamA: 10,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 11,
          teamB: 9,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 5,
          teamB: 6,
          resultType: null,
          winner: null
        }
      ],

      lateGames: [
        {
          sheet: 1,
          teamA: 3,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 7,
          teamB: 8,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 19,
      date: "2027-02-18",
      displayDate: "February 18, 2027",
      phase: "playoffs",
      specialEvent: "Playoff Schedule Coming Soon",
      earlyGames: [],
      lateGames: []
    },

    {
      week: 20,
      date: "2027-02-25",
      displayDate: "February 25, 2027",
      phase: "playoffs",
      specialEvent: "Playoff Schedule Coming Soon",
      earlyGames: [],
      lateGames: []
    },

    {
      week: 21,
      date: "2027-03-04",
      displayDate: "March 4, 2027",
      phase: "playoffs",
      specialEvent: "Playoff Schedule Coming Soon",
      earlyGames: [],
      lateGames: []
    },

    {
  week: null,
  date: "2027-03-11",
  displayDate: "March 11, 2027",
  phase: "special",
  specialEvent:
    "Lorette Open Bonspiel — No Men’s Curling",
  earlyGames: [],
  lateGames: []
},

    {
      week: 22,
      date: "2027-03-18",
      displayDate: "March 18, 2027",
      phase: "playoffs",
      specialEvent: "Playoff Schedule Coming Soon",
      earlyGames: [],
      lateGames: []
    },

    {
      week: 23,
      date: "2027-03-25",
      displayDate: "March 25, 2027",
      phase: "playoffs",
      specialEvent: "Playoff Schedule Coming Soon",
      earlyGames: [],
      lateGames: []
    }
  ]
};
