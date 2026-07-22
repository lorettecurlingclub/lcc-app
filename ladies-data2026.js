const ladiesLeagueData = {
  season: "2026-27",
  leagueName: "Ladies League",

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
    9: "Team 9"
  },

  schedule: [
    {
      week: 1,
      date: "2026-10-05",
      displayDate: "October 5, 2026",
      phase: "regular",
      fiftyFiftyTeam: 1,
      byeTeam: 8,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 4, teamB: 1, resultType: null, winner: null },
        { sheet: 2, teamA: 2, teamB: 9, resultType: null, winner: null },
        { sheet: 3, teamA: 6, teamB: 3, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 5, teamB: 7, resultType: null, winner: null }
      ]
    },

    {
      week: 2,
      date: "2026-10-12",
      displayDate: "October 12, 2026",
      phase: "regular",
      fiftyFiftyTeam: 2,
      byeTeam: 4,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 2, teamB: 5, resultType: null, winner: null },
        { sheet: 2, teamA: 8, teamB: 6, resultType: null, winner: null },
        { sheet: 3, teamA: 7, teamB: 1, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 9, teamB: 3, resultType: null, winner: null }
      ]
    },

    {
      week: 3,
      date: "2026-10-19",
      displayDate: "October 19, 2026",
      phase: "regular",
      fiftyFiftyTeam: 3,
      byeTeam: 3,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 9, teamB: 7, resultType: null, winner: null },
        { sheet: 2, teamA: 5, teamB: 4, resultType: null, winner: null },
        { sheet: 3, teamA: 8, teamB: 2, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 1, teamB: 6, resultType: null, winner: null }
      ]
    },

    {
      week: 4,
      date: "2026-10-26",
      displayDate: "October 26, 2026",
      phase: "regular",
      fiftyFiftyTeam: 4,
      byeTeam: 6,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 1, teamB: 8, resultType: null, winner: null },
        { sheet: 2, teamA: 7, teamB: 3, resultType: null, winner: null },
        { sheet: 3, teamA: 5, teamB: 9, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 2, teamB: 4, resultType: null, winner: null }
      ]
    },

    {
      week: 5,
      date: "2026-11-02",
      displayDate: "November 2, 2026",
      phase: "regular",
      fiftyFiftyTeam: 5,
      byeTeam: 7,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 3, teamB: 2, resultType: null, winner: null },
        { sheet: 2, teamA: 9, teamB: 1, resultType: null, winner: null },
        { sheet: 3, teamA: 4, teamB: 6, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 8, teamB: 5, resultType: null, winner: null }
      ]
    },

    {
      week: 6,
      date: "2026-11-09",
      displayDate: "November 9, 2026",
      phase: "regular",
      fiftyFiftyTeam: 6,
      byeTeam: 5,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 6, teamB: 9, resultType: null, winner: null },
        { sheet: 2, teamA: 4, teamB: 8, resultType: null, winner: null },
        { sheet: 3, teamA: 2, teamB: 7, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 3, teamB: 1, resultType: null, winner: null }
      ]
    },

    {
      week: 7,
      date: "2026-11-16",
      displayDate: "November 16, 2026",
      phase: "regular",
      fiftyFiftyTeam: 7,
      byeTeam: 1,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 7, teamB: 4, resultType: null, winner: null },
        { sheet: 2, teamA: 3, teamB: 5, resultType: null, winner: null },
        { sheet: 3, teamA: 9, teamB: 8, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 6, teamB: 2, resultType: null, winner: null }
      ]
    },

    {
      week: 8,
      date: "2026-11-23",
      displayDate: "November 23, 2026",
      phase: "regular",
      fiftyFiftyTeam: 8,
      byeTeam: 2,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 8, teamB: 3, resultType: null, winner: null },
        { sheet: 2, teamA: 6, teamB: 7, resultType: null, winner: null },
        { sheet: 3, teamA: 1, teamB: 5, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 4, teamB: 9, resultType: null, winner: null }
      ]
    },

    {
      week: 9,
      date: "2026-11-30",
      displayDate: "November 30, 2026",
      phase: "regular",
      fiftyFiftyTeam: 9,
      byeTeam: 9,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 5, teamB: 6, resultType: null, winner: null },
        { sheet: 2, teamA: 1, teamB: 2, resultType: null, winner: null },
        { sheet: 3, teamA: 3, teamB: 4, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 7, teamB: 8, resultType: null, winner: null }
      ]
    },

    {
      week: 10,
      date: "2026-12-07",
      displayDate: "December 7, 2026",
      phase: "regular",
      fiftyFiftyTeam: 1,
      byeTeam: 8,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 4, teamB: 1, resultType: null, winner: null },
        { sheet: 2, teamA: 2, teamB: 9, resultType: null, winner: null },
        { sheet: 3, teamA: 6, teamB: 3, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 5, teamB: 7, resultType: null, winner: null }
      ]
    },

    {
      week: 11,
      date: "2026-12-14",
      displayDate: "December 14, 2026",
      phase: "regular",
      fiftyFiftyTeam: 2,
      byeTeam: 4,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 2, teamB: 5, resultType: null, winner: null },
        { sheet: 2, teamA: 8, teamB: 6, resultType: null, winner: null },
        { sheet: 3, teamA: 7, teamB: 1, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 9, teamB: 3, resultType: null, winner: null }
      ]
    },

    {
      week: 12,
      date: "2026-12-21",
      displayDate: "December 21, 2026",
      phase: "regular",
      fiftyFiftyTeam: 3,
      byeTeam: 3,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 9, teamB: 7, resultType: null, winner: null },
        { sheet: 2, teamA: 5, teamB: 4, resultType: null, winner: null },
        { sheet: 3, teamA: 8, teamB: 2, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 1, teamB: 6, resultType: null, winner: null }
      ]
    },

    {
      week: 13,
      date: "2027-01-04",
      displayDate: "January 4, 2027",
      phase: "regular",
      fiftyFiftyTeam: 4,
      byeTeam: 6,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 1, teamB: 8, resultType: null, winner: null },
        { sheet: 2, teamA: 7, teamB: 3, resultType: null, winner: null },
        { sheet: 3, teamA: 5, teamB: 9, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 2, teamB: 4, resultType: null, winner: null }
      ]
    },

    {
      week: 14,
      date: "2027-01-11",
      displayDate: "January 11, 2027",
      phase: "regular",
      fiftyFiftyTeam: 5,
      byeTeam: 7,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 3, teamB: 2, resultType: null, winner: null },
        { sheet: 2, teamA: 9, teamB: 1, resultType: null, winner: null },
        { sheet: 3, teamA: 4, teamB: 6, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 8, teamB: 5, resultType: null, winner: null }
      ]
    },

    {
      week: 15,
      date: "2027-01-18",
      displayDate: "January 18, 2027",
      phase: "regular",
      fiftyFiftyTeam: 6,
      byeTeam: 5,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 6, teamB: 9, resultType: null, winner: null },
        { sheet: 2, teamA: 4, teamB: 8, resultType: null, winner: null },
        { sheet: 3, teamA: 2, teamB: 7, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 3, teamB: 1, resultType: null, winner: null }
      ]
    },

    {
      week: 16,
      date: "2027-01-25",
      displayDate: "January 25, 2027",
      phase: "regular",
      fiftyFiftyTeam: 7,
      byeTeam: 1,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 7, teamB: 4, resultType: null, winner: null },
        { sheet: 2, teamA: 3, teamB: 5, resultType: null, winner: null },
        { sheet: 3, teamA: 9, teamB: 8, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 6, teamB: 2, resultType: null, winner: null }
      ]
    },

    {
      week: 17,
      date: "2027-02-01",
      displayDate: "February 1, 2027",
      phase: "regular",
      fiftyFiftyTeam: 8,
      byeTeam: 2,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 8, teamB: 3, resultType: null, winner: null },
        { sheet: 2, teamA: 6, teamB: 7, resultType: null, winner: null },
        { sheet: 3, teamA: 1, teamB: 5, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 4, teamB: 9, resultType: null, winner: null }
      ]
    },

    {
      week: 18,
      date: "2027-02-08",
      displayDate: "February 8, 2027",
      phase: "regular",
      fiftyFiftyTeam: 9,
      byeTeam: 9,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 5, teamB: 6, resultType: null, winner: null },
        { sheet: 2, teamA: 1, teamB: 2, resultType: null, winner: null },
        { sheet: 3, teamA: 3, teamB: 4, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 7, teamB: 8, resultType: null, winner: null }
      ]
    },

    {
      week: 19,
      date: "2027-02-15",
      displayDate: "February 15, 2027",
      phase: "regular",
      fiftyFiftyTeam: 1,
      byeTeam: 8,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 4, teamB: 1, resultType: null, winner: null },
        { sheet: 2, teamA: 2, teamB: 9, resultType: null, winner: null },
        { sheet: 3, teamA: 6, teamB: 3, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 5, teamB: 7, resultType: null, winner: null }
      ]
    },

    {
      week: 20,
      date: "2027-02-22",
      displayDate: "February 22, 2027",
      phase: "regular",
      fiftyFiftyTeam: 2,
      byeTeam: 4,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 2, teamB: 5, resultType: null, winner: null },
        { sheet: 2, teamA: 8, teamB: 6, resultType: null, winner: null },
        { sheet: 3, teamA: 7, teamB: 1, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 9, teamB: 3, resultType: null, winner: null }
      ]
    },

    {
      week: 21,
      date: "2027-03-01",
      displayDate: "March 1, 2027",
      phase: "regular",
      fiftyFiftyTeam: 3,
      byeTeam: 3,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 9, teamB: 7, resultType: null, winner: null },
        { sheet: 2, teamA: 5, teamB: 4, resultType: null, winner: null },
        { sheet: 3, teamA: 8, teamB: 2, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 1, teamB: 6, resultType: null, winner: null }
      ]
    },

    {
      week: 22,
      date: "2027-03-08",
      displayDate: "March 8, 2027",
      phase: "regular",
      fiftyFiftyTeam: 4,
      byeTeam: 6,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 1, teamB: 8, resultType: null, winner: null },
        { sheet: 2, teamA: 7, teamB: 3, resultType: null, winner: null },
        { sheet: 3, teamA: 5, teamB: 9, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 2, teamB: 4, resultType: null, winner: null }
      ]
    },

    {
      week: 23,
      date: "2027-03-15",
      displayDate: "March 15, 2027",
      phase: "regular",
      fiftyFiftyTeam: 5,
      byeTeam: 7,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 3, teamB: 2, resultType: null, winner: null },
        { sheet: 2, teamA: 9, teamB: 1, resultType: null, winner: null },
        { sheet: 3, teamA: 4, teamB: 6, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 8, teamB: 5, resultType: null, winner: null }
      ]
    },

    {
      week: 24,
      date: "2027-03-22",
      displayDate: "March 22, 2027",
      phase: "regular",
      fiftyFiftyTeam: 6,
      byeTeam: 5,
      earlyTime: "7:00 PM",
      lateTime: "9:15 PM",
      earlyGames: [
        { sheet: 1, teamA: 6, teamB: 9, resultType: null, winner: null },
        { sheet: 2, teamA: 4, teamB: 8, resultType: null, winner: null },
        { sheet: 3, teamA: 2, teamB: 7, resultType: null, winner: null }
      ],
      lateGames: [
        { sheet: 2, teamA: 3, teamB: 1, resultType: null, winner: null }
      ]
    }
  ]
};
