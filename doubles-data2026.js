"use strict";

const doublesLeagueData = {
  season: "2026-27",
  leagueName: "Doubles League",

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
    6: "Team 6"
  },

  schedule: [
    {
      week: 1,
      date: "2026-10-11",
      displayDate: "October 11, 2026",
      phase: "regular",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 1,

      games: [
        {
          sheet: 1,
          teamA: 1,
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
      ]
    },

    {
      week: 2,
      date: "2026-10-18",
      displayDate: "October 18, 2026",
      phase: "regular",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 2,

      games: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 5,
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
          teamA: 2,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 3,
      date: "2026-10-25",
      displayDate: "October 25, 2026",
      phase: "regular",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 3,

      games: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 4,
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
          teamA: 6,
          teamB: 2,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 4,
      date: "2026-11-01",
      displayDate: "November 1, 2026",
      phase: "regular",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 4,

      games: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 3,
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
          teamA: 5,
          teamB: 6,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 5,
      date: "2026-11-08",
      displayDate: "November 8, 2026",
      phase: "regular",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 5,

      games: [
        {
          sheet: 1,
          teamA: 1,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 3,
          teamB: 6,
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
      ]
    },

    {
      week: 6,
      date: "2026-11-15",
      displayDate: "November 15, 2026",
      phase: "regular",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 6,

      games: [
        {
          sheet: 1,
          teamA: 6,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 5,
          teamB: 2,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 4,
          teamB: 3,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 7,
      date: "2026-11-22",
      displayDate: "November 22, 2026",
      phase: "regular",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 1,

      games: [
        {
          sheet: 1,
          teamA: 5,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 4,
          teamB: 6,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 3,
          teamB: 2,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 8,
      date: "2026-11-29",
      displayDate: "November 29, 2026",
      phase: "regular",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 2,

      games: [
        {
          sheet: 1,
          teamA: 4,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 3,
          teamB: 5,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 2,
          teamB: 6,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 9,
      date: "2026-12-06",
      displayDate: "December 6, 2026",
      phase: "regular",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 3,

      games: [
        {
          sheet: 1,
          teamA: 3,
          teamB: 1,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 2,
          teamB: 4,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 6,
          teamB: 5,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 10,
      date: "2026-12-13",
      displayDate: "December 13, 2026",
      phase: "playoffs",
      roundName: "Playoff Semifinals",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 4,

      games: [
        {
          sheet: 1,
          teamALabel: "1st Place",
          teamBLabel: "4th Place",
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamALabel: "2nd Place",
          teamBLabel: "3rd Place",
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamALabel: "5th Place",
          teamBLabel: "6th Place",
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 11,
      date: "2026-12-20",
      displayDate: "December 20, 2026",
      phase: "playoffs",
      roundName: "Playoff Finals",
      drawTime: "4:30 PM",
      fiftyFiftyTeam: 5,

      games: [
        {
          sheet: 1,
          teamALabel: "Semifinal 1 Winner",
          teamBLabel: "Semifinal 2 Winner",
          gameLabel: "Championship",
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamALabel: "Semifinal 1 Loser",
          teamBLabel: "Semifinal 2 Loser",
          gameLabel: "Third Place",
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamALabel: "5th-Place Team",
          teamBLabel: "6th-Place Team",
          gameLabel: "Placement Game",
          resultType: null,
          winner: null
        }
      ]
    }
  ]
};
