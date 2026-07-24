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
      typeof mensLeagueData === "undefined" ||
      !mensLeagueData
    ) {
      renderStandingsError(
        container,
        "The Men’s League standings data could not be loaded."
      );

      return;
    }

    renderStandings(
      container,
      mensLeagueData
    );
  }
);


function renderStandings(
  container,
  leagueData
) {
  const teams =
    normalizeTeams(
      leagueData.teams
    );

  if (teams.length === 0) {
    renderStandingsError(
      container,
      "No Men’s League teams were found."
    );

    return;
  }

  const scoring =
    normalizeScoring(
      leagueData.scoring
    );

  const standings =
    calculateStandings(
      teams,
      leagueData.schedule,
      scoring
    );

  container.innerHTML = `
    <section class="standings-card">
      <div class="standings-card-heading">
        <h1>
          Men’s League Standings
        </h1>

        <p>
          ${escapeHtml(
            formatSeason(
              leagueData.season
            )
          )}
          Regular Season
        </p>
      </div>

      <div class="standings-table-wrapper">
        <table class="standings-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team</th>
              <th scope="col">GP</th>
              <th scope="col">Record</th>
              <th scope="col">Pts</th>
            </tr>
          </thead>

          <tbody>
            ${standings
              .map(
                (
                  team,
                  index
                ) => {
                  return renderStandingsRow(
                    team,
                    index + 1
                  );
                }
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <p class="standings-scoring-note">
        Win: ${scoring.win} Points -
        Loss: ${scoring.loss} Points -
        Tie: ${scoring.tie} Points
      </p>
    </section>
  `;
}


function calculateStandings(
  teams,
  schedule,
  scoring
) {
  const standingsMap =
    new Map();

  teams.forEach((team) => {
    standingsMap.set(
      team.number,
      {
        teamNumber: team.number,
        teamName: team.name,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        points: 0
      }
    );
  });

  const scheduleWeeks =
    Array.isArray(schedule)
      ? schedule
      : [];

  scheduleWeeks.forEach((week) => {
    if (!isRegularSeasonWeek(week)) {
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
        standingsMap,
        scoring
      );
    });
  });

  return Array.from(
    standingsMap.values()
  ).sort(compareStandings);
}


function applyGameResult(
  game,
  standingsMap,
  scoring
) {
  const teamA =
    standingsMap.get(
      Number(game.teamA)
    );

  const teamB =
    standingsMap.get(
      Number(game.teamB)
    );

  if (!teamA || !teamB) {
    return;
  }

  const resultType =
    normalizeResultType(
      game.resultType
    );

  if (
    isNonStandingResult(resultType)
  ) {
    return;
  }

  if (
    resultType === "tie" ||
    normalizeResultType(
      game.winner
    ) === "tie"
  ) {
    recordTie(
      teamA,
      teamB,
      scoring
    );

    return;
  }

  const winnerNumber =
    Number(game.winner);

  if (
    winnerNumber !== teamA.teamNumber &&
    winnerNumber !== teamB.teamNumber
  ) {
    return;
  }

  const winner =
    winnerNumber === teamA.teamNumber
      ? teamA
      : teamB;

  const loser =
    winnerNumber === teamA.teamNumber
      ? teamB
      : teamA;

  if (
    isDefaultResult(resultType)
  ) {
    recordDefaultResult(
      winner,
      loser,
      scoring
    );

    return;
  }

  recordWin(
    winner,
    loser,
    scoring
  );
}


function recordWin(
  winner,
  loser,
  scoring
) {
  winner.gamesPlayed += 1;
  winner.wins += 1;
  winner.points += scoring.win;

  loser.gamesPlayed += 1;
  loser.losses += 1;
  loser.points += scoring.loss;
}


function recordTie(
  teamA,
  teamB,
  scoring
) {
  teamA.gamesPlayed += 1;
  teamA.ties += 1;
  teamA.points += scoring.tie;

  teamB.gamesPlayed += 1;
  teamB.ties += 1;
  teamB.points += scoring.tie;
}


function recordDefaultResult(
  winner,
  loser,
  scoring
) {
  winner.gamesPlayed += 1;
  winner.wins += 1;
  winner.points +=
    scoring.defaultWin;

  loser.gamesPlayed += 1;
  loser.losses += 1;
  loser.points +=
    scoring.defaultLoss;
}


function compareStandings(
  teamA,
  teamB
) {
  if (
    teamB.points !== teamA.points
  ) {
    return (
      teamB.points -
      teamA.points
    );
  }

  if (
    teamB.wins !== teamA.wins
  ) {
    return (
      teamB.wins -
      teamA.wins
    );
  }

  if (
    teamB.ties !== teamA.ties
  ) {
    return (
      teamB.ties -
      teamA.ties
    );
  }

  if (
    teamA.losses !== teamB.losses
  ) {
    return (
      teamA.losses -
      teamB.losses
    );
  }

  return (
    teamA.teamNumber -
    teamB.teamNumber
  );
}


function renderStandingsRow(
  team,
  position
) {
  return `
    <tr>
      <td class="standings-position">
        ${position}
      </td>

      <td class="standings-team">
        ${escapeHtml(
          team.teamName
        )}
      </td>

      <td class="standings-games-played">
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


function normalizeTeams(teams) {
  if (
    !teams ||
    typeof teams !== "object"
  ) {
    return [];
  }

  return Object.entries(teams)
    .map(
      ([
        teamNumber,
        teamName
      ]) => {
        return {
          number: Number(
            teamNumber
          ),
          name: String(
            teamName
          ).trim()
        };
      }
    )
    .filter((team) => {
      return (
        Number.isFinite(
          team.number
        ) &&
        team.name
      );
    })
    .sort((teamA, teamB) => {
      return (
        teamA.number -
        teamB.number
      );
    });
}


function normalizeScoring(scoring) {
  const source =
    scoring &&
    typeof scoring === "object"
      ? scoring
      : {};

  return {
    win: numberOrDefault(
      source.win,
      10
    ),

    loss: numberOrDefault(
      source.loss,
      5
    ),

    tie: numberOrDefault(
      source.tie,
      7
    ),

    defaultWin: numberOrDefault(
      source.defaultWin,
      10
    ),

    defaultLoss: numberOrDefault(
      source.defaultLoss,
      0
    )
  };
}


function normalizeGames(games) {
  return Array.isArray(games)
    ? games
    : [];
}


function isRegularSeasonWeek(week) {
  if (
    !week ||
    typeof week !== "object"
  ) {
    return false;
  }

  const phase =
    normalizeResultType(
      week.phase
    );

  return (
    !phase ||
    phase === "regular" ||
    phase === "regular-season"
  );
}


function isNonStandingResult(
  resultType
) {
  return [
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


function normalizeResultType(value) {
  return String(
    value ?? ""
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}


function formatSeason(season) {
  const value =
    String(
      season ?? "2026-27"
    ).trim();

  return value.replace(
    "-",
    "–"
  );
}


function numberOrDefault(
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
    <section class="standings-card standings-error-card">
      <h1>
        Standings Unavailable
      </h1>

      <p>
        ${escapeHtml(message)}
      </p>
    </section>
  `;
}


function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
