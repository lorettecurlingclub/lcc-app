"use strict";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const container =
      document.getElementById(
        "standings-container"
      );

    if (!container) {
      return;
    }

    if (
      typeof doublesLeagueData === "undefined" ||
      !doublesLeagueData
    ) {
      renderStandingsError(
        container,
        "The Doubles League standings could not be loaded."
      );

      return;
    }

    renderStandings(
      container,
      doublesLeagueData
    );
  }
);


function renderStandings(
  container,
  leagueData
) {
  const standings =
    calculateStandings(
      leagueData
    );

  container.innerHTML = `
    <section class="standings-card">

      <header class="standings-card-heading">
        <h1>
          Doubles League Standings
        </h1>

        <p>
          2026 Fall Round Robin
        </p>
      </header>

      <div class="standings-table-wrapper">
        <table class="standings-table">
          <thead>
            <tr>
              <th scope="col">
                #
              </th>

              <th scope="col">
                Team
              </th>

              <th scope="col">
                GP
              </th>

              <th scope="col">
                Record
              </th>

              <th scope="col">
                Pts
              </th>
            </tr>
          </thead>

          <tbody>
            ${standings
              .map((team, index) => {
                return renderStandingsRow(
                  team,
                  index
                );
              })
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="standings-scoring-note">
        <strong>
          Scoring:
        </strong>

        Win = ${numberOrZero(
          leagueData.scoring?.win
        )} points,

        Loss = ${numberOrZero(
          leagueData.scoring?.loss
        )} points,

        Tie = ${numberOrZero(
          leagueData.scoring?.tie
        )} points.
      </div>

    </section>
  `;
}


function calculateStandings(
  leagueData
) {
  const standingsMap =
    createStandingsMap(
      leagueData
    );

  const headToHeadWins =
    new Map();

  standingsMap.forEach(
    (team) => {
      headToHeadWins.set(
        team.teamNumber,
        new Set()
      );
    }
  );

  const schedule =
    Array.isArray(
      leagueData.schedule
    )
      ? leagueData.schedule
      : [];

  schedule.forEach((week) => {
    const phase =
      normalizeValue(
        week.phase
      );

    if (
      phase !== "regular" &&
      phase !== "regular-season"
    ) {
      return;
    }

    const games =
      Array.isArray(
        week.games
      )
        ? week.games
        : [];

    games.forEach((game) => {
      applyGameResult(
        standingsMap,
        game,
        leagueData.scoring || {}
      );

      recordHeadToHeadResult(
        game,
        standingsMap,
        headToHeadWins
      );
    });
  });

  return sortStandings(
    Array.from(
      standingsMap.values()
    ),
    headToHeadWins
  );
}


function createStandingsMap(
  leagueData
) {
  const map =
    new Map();

  const teams =
    leagueData.teams || {};

  Object.keys(teams)
    .map(Number)
    .filter(Number.isFinite)
    .sort((teamA, teamB) => {
      return teamA - teamB;
    })
    .forEach((teamNumber) => {
      map.set(
        teamNumber,
        {
          teamNumber,
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          ties: 0,
          points: 0
        }
      );
    });

  return map;
}


function recordHeadToHeadResult(
  game,
  standingsMap,
  headToHeadWins
) {
  const teamA =
    Number(game.teamA);

  const teamB =
    Number(game.teamB);

  if (
    !Number.isFinite(teamA) ||
    !Number.isFinite(teamB) ||
    !standingsMap.has(teamA) ||
    !standingsMap.has(teamB)
  ) {
    return;
  }

  const resultType =
    normalizeValue(
      game.resultType
    );

  if (
    !resultType ||
    resultType === "pending" ||
    resultType === "rescheduled" ||
    resultType === "postponed" ||
    resultType === "cancelled" ||
    resultType === "canceled" ||
    resultType === "no-contest" ||
    resultType === "tie"
  ) {
    return;
  }

  const winnerText =
    normalizeValue(
      game.winner
    );

  if (
    winnerText === "tie"
  ) {
    return;
  }

  const winner =
    Number(game.winner);

  if (
    winner !== teamA &&
    winner !== teamB
  ) {
    return;
  }

  const loser =
    winner === teamA
      ? teamB
      : teamA;

  const winnerResults =
    headToHeadWins.get(
      winner
    );

  if (!winnerResults) {
    return;
  }

  winnerResults.add(
    loser
  );
}


function sortStandings(
  standings,
  headToHeadWins
) {
  const baseSorted =
    [...standings].sort(
      (
        teamA,
        teamB
      ) => {
        if (
          teamB.points !==
          teamA.points
        ) {
          return (
            teamB.points -
            teamA.points
          );
        }

        if (
          teamA.gamesPlayed !==
          teamB.gamesPlayed
        ) {
          return (
            teamA.gamesPlayed -
            teamB.gamesPlayed
          );
        }

        return (
          teamA.teamNumber -
          teamB.teamNumber
        );
      }
    );

  const finalStandings = [];

  let index = 0;

  while (
    index <
    baseSorted.length
  ) {
    const firstTeam =
      baseSorted[index];

    const tiedGroup = [
      firstTeam
    ];

    let nextIndex =
      index + 1;

    while (
      nextIndex <
      baseSorted.length
    ) {
      const nextTeam =
        baseSorted[
          nextIndex
        ];

      if (
        nextTeam.points !==
          firstTeam.points ||
        nextTeam.gamesPlayed !==
          firstTeam.gamesPlayed
      ) {
        break;
      }

      tiedGroup.push(
        nextTeam
      );

      nextIndex += 1;
    }

    const rankedGroup =
      rankTiedGroup(
        tiedGroup,
        headToHeadWins
      );

    finalStandings.push(
      ...rankedGroup
    );

    index = nextIndex;
  }

  return finalStandings;
}


function rankTiedGroup(
  tiedGroup,
  headToHeadWins
) {
  if (
    tiedGroup.length <= 1
  ) {
    return tiedGroup;
  }

  const allowedTeams =
    new Set(
      tiedGroup.map(
        (team) =>
          team.teamNumber
      )
    );

  return [...tiedGroup].sort(
    (
      teamA,
      teamB
    ) => {
      const aAheadOfB =
        hasHeadToHeadPath(
          teamA.teamNumber,
          teamB.teamNumber,
          allowedTeams,
          headToHeadWins
        );

      const bAheadOfA =
        hasHeadToHeadPath(
          teamB.teamNumber,
          teamA.teamNumber,
          allowedTeams,
          headToHeadWins
        );

      if (
        aAheadOfB &&
        !bAheadOfA
      ) {
        return -1;
      }

      if (
        bAheadOfA &&
        !aAheadOfB
      ) {
        return 1;
      }

      return (
        teamA.teamNumber -
        teamB.teamNumber
      );
    }
  );
}


function hasHeadToHeadPath(
  startTeam,
  targetTeam,
  allowedTeams,
  headToHeadWins
) {
  if (
    startTeam === targetTeam
  ) {
    return false;
  }

  const visited =
    new Set();

  const queue = [
    startTeam
  ];

  while (
    queue.length > 0
  ) {
    const currentTeam =
      queue.shift();

    if (
      visited.has(
        currentTeam
      )
    ) {
      continue;
    }

    visited.add(
      currentTeam
    );

    const defeatedTeams =
      headToHeadWins.get(
        currentTeam
      );

    if (!defeatedTeams) {
      continue;
    }

    for (
      const defeatedTeam
      of defeatedTeams
    ) {
      if (
        !allowedTeams.has(
          defeatedTeam
        )
      ) {
        continue;
      }

      if (
        defeatedTeam ===
        targetTeam
      ) {
        return true;
      }

      if (
        !visited.has(
          defeatedTeam
        )
      ) {
        queue.push(
          defeatedTeam
        );
      }
    }
  }

  return false;
}


function applyGameResult(
  standingsMap,
  game,
  scoring
) {
  const teamA =
    Number(game.teamA);

  const teamB =
    Number(game.teamB);

  if (
    !Number.isFinite(teamA) ||
    !Number.isFinite(teamB) ||
    !standingsMap.has(teamA) ||
    !standingsMap.has(teamB)
  ) {
    return;
  }

  const resultType =
    normalizeValue(
      game.resultType
    );

  if (
    !resultType ||
    resultType === "pending" ||
    resultType === "rescheduled" ||
    resultType === "postponed" ||
    resultType === "cancelled" ||
    resultType === "canceled" ||
    resultType === "no-contest"
  ) {
    return;
  }

  const teamAStanding =
    standingsMap.get(teamA);

  const teamBStanding =
    standingsMap.get(teamB);

  if (
    resultType === "tie"
  ) {
    teamAStanding.gamesPlayed += 1;
    teamBStanding.gamesPlayed += 1;

    teamAStanding.ties += 1;
    teamBStanding.ties += 1;

    teamAStanding.points +=
      numberWithFallback(
        scoring.tie,
        7
      );

    teamBStanding.points +=
      numberWithFallback(
        scoring.tie,
        7
      );

    return;
  }

  const winner =
    Number(game.winner);

  if (
    winner !== teamA &&
    winner !== teamB
  ) {
    return;
  }

  const loser =
    winner === teamA
      ? teamB
      : teamA;

  const winnerStanding =
    standingsMap.get(winner);

  const loserStanding =
    standingsMap.get(loser);

  winnerStanding.gamesPlayed += 1;
  loserStanding.gamesPlayed += 1;

  winnerStanding.wins += 1;
  loserStanding.losses += 1;

  const isDefault =
    resultType === "default" ||
    resultType === "forfeit" ||
    resultType === "default-win" ||
    resultType === "forfeit-win";

  if (isDefault) {
    winnerStanding.points +=
      numberWithFallback(
        scoring.defaultWin,
        10
      );

    loserStanding.points +=
      numberWithFallback(
        scoring.defaultLoss,
        0
      );

    return;
  }

  winnerStanding.points +=
    numberWithFallback(
      scoring.win,
      10
    );

  loserStanding.points +=
    numberWithFallback(
      scoring.loss,
      5
    );
}


function renderStandingsRow(
  team,
  index
) {
  return `
    <tr>
      <td class="standings-position">
        ${index + 1}
      </td>

      <td class="standings-team">
        Team ${team.teamNumber}
      </td>

      <td>
        ${team.gamesPlayed}
      </td>

      <td class="standings-record">
        ${team.wins}-${team.losses}-${team.ties}
      </td>

      <td class="standings-points">
        ${team.points}
      </td>
    </tr>
  `;
}


function normalizeValue(
  value
) {
  return String(
    value ?? ""
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}


function numberWithFallback(
  value,
  fallback
) {
  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}


function numberOrZero(
  value
) {
  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}


function renderStandingsError(
  container,
  message
) {
  container.innerHTML = `
    <section class="standings-card">
      <header class="standings-card-heading">
        <h1>
          Doubles League Standings
        </h1>
      </header>

      <div class="standings-message">
        <p>
          ${escapeHtml(message)}
        </p>
      </div>
    </section>
  `;
}


function escapeHtml(
  value
) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
