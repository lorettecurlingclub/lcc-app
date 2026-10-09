"use strict";

const doublesLeagueData = {
  season: "2026-27",
  session: "Fall",
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
    6: "Team 6",
    7: "Team 7"
  },

  schedule: [
    {
      week: 1,
      date: "2026-10-04",
      displayDate: "October 4, 2026",
      phase: "regular",
      drawTime: "6:30 PM",
      byeTeam: 7,

      games: [
        {
  sheet: 1,
  teamA: 5,
  teamB: 3,
  resultType: "win",
  winner: 3
},
{
  sheet: 2,
  teamA: 1,
  teamB: 6,
  resultType: "win",
  winner: 6
},
{
  sheet: 3,
  teamA: 2,
  teamB: 4,
  resultType: "win",
  winner: 2
}
      ]
    },

    {
      week: 2,
      date: "2026-10-18",
      displayDate: "October 18, 2026",
      phase: "regular",
      drawTime: "6:30 PM",
      byeTeam: 4,

      games: [
        {
          sheet: 1,
          teamA: 7,
          teamB: 1,
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
          teamB: 6,
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
      drawTime: "6:30 PM",
      byeTeam: 2,

      games: [
        {
          sheet: 1,
          teamA: 6,
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 2,
          teamA: 3,
          teamB: 1,
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
      week: 4,
      date: "2026-11-01",
      displayDate: "November 1, 2026",
      phase: "regular",
      drawTime: "6:30 PM",
      byeTeam: 5,

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
      week: 5,
      date: "2026-11-08",
      displayDate: "November 8, 2026",
      phase: "regular",
      drawTime: "6:30 PM",
      byeTeam: 6,

      games: [
        {
          sheet: 1,
          teamA: 7,
          teamB: 5,
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
          teamA: 1,
          teamB: 2,
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
      drawTime: "6:30 PM",
      byeTeam: 1,

      games: [
        {
          sheet: 1,
          teamA: 2,
          teamB: 3,
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
          teamA: 7,
          teamB: 4,
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
      drawTime: "6:30 PM",
      byeTeam: 3,

      games: [
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
          teamB: 7,
          resultType: null,
          winner: null
        },
        {
          sheet: 3,
          teamA: 1,
          teamB: 5,
          resultType: null,
          winner: null
        }
      ]
    },

    {
      week: 8,
      date: "2026-11-29",
      displayDate: "November 29, 2026",
      phase: "playoffs",
      drawTime: "6:30 PM",
      byeLabel: "B3",

      games: [
        {
          sheet: 1,
          teamALabel: "A1",
          teamBLabel: "A2",
          resultType: null,
          winnerLabel: null
        },
        {
          sheet: 2,
          teamALabel: "A3",
          teamBLabel: "A4",
          resultType: null,
          winnerLabel: null
        },
        {
          sheet: 3,
          teamALabel: "B1",
          teamBLabel: "B2",
          resultType: null,
          winnerLabel: null
        }
      ]
    },

    {
      week: 9,
      date: "2026-12-06",
      displayDate: "December 6, 2026",
      phase: "playoffs",
      drawTime: "6:30 PM",
      byeLabel: "B2",

      games: [
        {
          sheet: 1,
          teamALabel: "B1",
          teamBLabel: "B3",
          resultType: null,
          winnerLabel: null
        },
        {
          sheet: 2,
          teamALabel: "A2",
          teamBLabel: "A3",
          resultType: null,
          winnerLabel: null
        },
        {
          sheet: 3,
          teamALabel: "A1",
          teamBLabel: "A4",
          resultType: null,
          winnerLabel: null
        }
      ]
    },

    {
      week: 10,
      date: "2026-12-13",
      displayDate: "December 13, 2026",
      phase: "playoffs",
      drawTime: "6:30 PM",
      byeLabel: "B1",

      games: [
        {
          sheet: 1,
          teamALabel: "A1",
          teamBLabel: "A3",
          resultType: null,
          winnerLabel: null
        },
        {
          sheet: 2,
          teamALabel: "B2",
          teamBLabel: "B3",
          resultType: null,
          winnerLabel: null
        },
        {
          sheet: 3,
          teamALabel: "A4",
          teamBLabel: "A2",
          resultType: null,
          winnerLabel: null
        }
      ]
    },

    {
      week: 11,
      date: "2026-12-20",
      displayDate: "December 20, 2026",
      phase: "playoffs",
      drawTime: "6:30 PM",
      byeLabel: "A4",

      games: [
        {
          sheet: 1,
          teamALabel: "A2",
          teamBLabel: "B2",
          resultType: null,
          winnerLabel: null
        },
        {
          sheet: 2,
          teamALabel: "A1",
          teamBLabel: "B1",
          resultType: null,
          winnerLabel: null
        },
        {
          sheet: 3,
          teamALabel: "A3",
          teamBLabel: "B3",
          resultType: null,
          winnerLabel: null
        }
      ]
    }
  ]
};
