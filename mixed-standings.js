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
      typeof mixedLeagueData === "undefined" ||
      !mixedLeagueData
    ) {
      renderStandingsError(
        container,
        "The Mixed League standings could not be loaded."
      );

      return;
    }

    renderStandings(
      container,
      mixedLeagueData
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
          Mixed League Standings
        </h1>

        <p>
          2026–27 Regular Season
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
              .map(renderStandingsRow)
              .join("")}
          </tbody>
        </table>
      </div>

      <p class="standings-scoring-note">
        ${renderScoringNote(
          leagueData.scoring
        )}
      </p>
    </section>
  `;
}


function calculateStandings(
  leagueData
) {
  const teams =
    leagueData.teams || {};

  const scoring = {
    win:
      numberOrFallback(
        leagueData.scoring?.win,
        10
      ),

    loss:
      numberOrFallback(
        leagueData.scoring?.loss,
        5
      ),

    tie:
      numberOrFallback(
        leagueData.scoring?.tie,
        7
      ),

    defaultWin:
      numberOrFallback(
        leagueData.scoring?.defaultWin,
        10
      ),

    defaultLoss:
      numberOrFallback(
        leagueData.scoring?.defaultLoss,
        0
      )
  };

  const standings =
    Object.keys(teams)
      .map(Number)
      .filter(Number.isFinite)
      .sort((teamA, teamB) => {
        return teamA - teamB;
      })
      .map((teamNumber) => {
        return {
          teamNumber,
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          ties: 0,
          points: 0
        };
      });

  const standingsByTeam =
    new Map(
      standings.map((team) => {
        return [
          team.teamNumber,
          team
        ];
      })
    );

  const schedule =
    Array.isArray(
      leagueData.schedule
    )
      ? leagueData.schedule
      : [];

  schedule.forEach((week) => {
    if (
      normalizeResultType(
        week.phase
      ) !== "regular"
    ) {
      return;
    }

    const games = [
      ...normalizeGames(
        week.earlyGames
      ),

      ...normalizeGames(
        week.lateGames
      )
    ];

    games.forEach((game) => {
      applyGameResult(
        game,
        standingsByTeam,
        scoring
      );
    });
  });

  return standings.sort(
    compareStandings
  );
}


function applyGameResult(
  game,
  standingsByTeam,
  scoring
) {
  const teamA =
    Number(game.teamA);

  const teamB =
    Number(game.teamB);

  const teamAStats =
    standingsByTeam.get(teamA);

  const teamBStats =
    standingsByTeam.get(teamB);

  if (
    !teamAStats ||
    !teamBStats
  ) {
    return;
  }

  const resultType =
    normalizeResultType(
      game.resultType
    );

  if (
    shouldIgnoreResult(
      resultType
    )
  ) {
    return;
  }

  const winner =
    Number(game.winner);

  const winnerText =
    normalizeResultType(
      game.winner
    );

  if (
    resultType === "tie" ||
    winnerText === "tie"
  ) {
    addTie(
      teamAStats,
      scoring.tie
    );

    addTie(
      teamBStats,
      scoring.tie
    );

    return;
  }

  if (
    !Number.isFinite(winner) ||
    (
      winner !== teamA &&
      winner !== teamB
    )
  ) {
    return;
  }

  const winningStats =
    winner === teamA
      ? teamAStats
      : teamBStats;

  const losingStats =
    winner === teamA
      ? teamBStats
      : teamAStats;

  if (
    isDefaultResult(
      resultType
    )
  ) {
    addWin(
      winningStats,
      scoring.defaultWin
    );

    addLoss(
      losingStats,
      scoring.defaultLoss
    );

    return;
  }

  addWin(
    winningStats,
    scoring.win
  );

  addLoss(
    losingStats,
    scoring.loss
  );
}


function addWin(
  team,
  points
) {
  team.gamesPlayed += 1;
  team.wins += 1;
  team.points += points;
}


function addLoss(
  team,
  points
) {
  team.gamesPlayed += 1;
  team.losses += 1;
  team.points += points;
}


function addTie(
  team,
  points
) {
  team.gamesPlayed += 1;
  team.ties += 1;
  team.points += points;
}


function compareStandings(
  teamA,
  teamB
) {
  return (
    teamB.points -
      teamA.points ||

    teamB.wins -
      teamA.wins ||

    teamB.ties -
      teamA.ties ||

    teamA.losses -
      teamB.losses ||

    teamA.teamNumber -
      teamB.teamNumber
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

      <td>
        ${team.wins}-${team.losses}-${team.ties}
      </td>

      <td class="standings-points">
        ${team.points}
      </td>
    </tr>
  `;
}


function renderScoringNote(
  scoring = {}
) {
  const win =
    numberOrFallback(
      scoring.win,
      10
    );

  const loss =
    numberOrFallback(
      scoring.loss,
      5
    );

  const tie =
    numberOrFallback(
      scoring.tie,
      7
    );

  return (
    `Win: ${win} Points - ` +
    `Loss: ${loss} Points - ` +
    `Tie: ${tie} Points`
  );
}


function shouldIgnoreResult(
  resultType
) {
  return [
    "",
    "pending",
    "rescheduled",
    "postponed",
    "cancelled",
    "canceled",
    "no-contest"
  ].includes(resultType);
}


function isDefaultResult(
  resultType
) {
  return [
    "default",
    "forfeit",
    "default-win",
    "forfeit-win"
  ].includes(resultType);
}


function normalizeGames(
  games
) {
  return Array.isArray(games)
    ? games
    : [];
}


function normalizeResultType(
  value
) {
  return String(
    value ?? ""
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}


function numberOrFallback(
  value,
  fallback
) {
  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}


function renderStandingsError(
  container,
  message
) {
  container.innerHTML = `
    <section class="standings-card">
      <header class="standings-card-heading">
        <h1>
          Standings Unavailable
        </h1>
      </header>

      <p>
        ${escapeHtml(message)}
      </p>
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
