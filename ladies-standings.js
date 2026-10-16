"use strict";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const standingsContainer =
      document.getElementById(
        "standings-container"
      );

    if (!standingsContainer) {
      return;
    }

    if (
      typeof ladiesLeagueData ===
        "undefined" ||
      !ladiesLeagueData
    ) {
      showStandingsError(
        standingsContainer,
        "The Ladies League data could not be loaded."
      );

      return;
    }

    try {
      const standings =
        calculateStandings(
          ladiesLeagueData
        );

      renderStandings(
        standingsContainer,
        standings,
        ladiesLeagueData
      );
    } catch (error) {
      console.error(
        "Unable to calculate Ladies standings:",
        error
      );

      showStandingsError(
        standingsContainer,
        "The standings could not be calculated."
      );
    }
  }
);


function calculateStandings(
  leagueData
) {
  const scoring =
    leagueData.scoring || {};

  const teams =
    leagueData.teams || {};

  const schedule =
    Array.isArray(
      leagueData.schedule
    )
      ? leagueData.schedule
      : [];

  const standingsByTeam = {};

  const headToHeadWins =
    new Map();

  Object.entries(
    teams
  ).forEach(
    ([
      teamNumber,
      teamName
    ]) => {
      const numericTeamNumber =
        Number(teamNumber);

      standingsByTeam[
        numericTeamNumber
      ] = {
        teamNumber:
          numericTeamNumber,

        teamName:
          teamName,

        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        points: 0
      };

      headToHeadWins.set(
        numericTeamNumber,
        new Set()
      );
    }
  );

  schedule.forEach(
    (week) => {
      if (
        week.phase &&
        week.phase !== "regular"
      ) {
        return;
      }

      const games = [
        ...(Array.isArray(
          week.earlyGames
        )
          ? week.earlyGames
          : []),

        ...(Array.isArray(
          week.lateGames
        )
          ? week.lateGames
          : [])
      ];

      games.forEach(
        (game) => {
          applyGameResult(
            game,
            standingsByTeam,
            scoring
          );

          recordHeadToHeadResult(
            game,
            standingsByTeam,
            headToHeadWins
          );
        }
      );
    }
  );

  return sortStandings(
    Object.values(
      standingsByTeam
    ),
    headToHeadWins
  );
}


function recordHeadToHeadResult(
  game,
  standingsByTeam,
  headToHeadWins
) {
  const teamA =
    Number(game.teamA);

  const teamB =
    Number(game.teamB);

  if (
    !standingsByTeam[
      teamA
    ] ||
    !standingsByTeam[
      teamB
    ]
  ) {
    return;
  }

  const resultType =
    normalizeResultType(
      game.resultType
    );

  if (
    resultType ===
      "rescheduled" ||
    resultType ===
      "postponed" ||
    resultType ===
      "cancelled" ||
    resultType ===
      "canceled" ||
    resultType ===
      "no-contest" ||
    resultType ===
      "tie"
  ) {
    return;
  }

  const winner =
    game.winner === null ||
    game.winner ===
      undefined ||
    game.winner === ""
      ? null
      : Number(
          game.winner
        );

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

    index =
      nextIndex;
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

  return [
    ...tiedGroup
  ].sort(
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
    startTeam ===
    targetTeam
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
  game,
  standingsByTeam,
  scoring
) {
  const teamA =
    Number(game.teamA);

  const teamB =
    Number(game.teamB);

  const teamAStanding =
    standingsByTeam[
      teamA
    ];

  const teamBStanding =
    standingsByTeam[
      teamB
    ];

  if (
    !teamAStanding ||
    !teamBStanding
  ) {
    return;
  }

  const resultType =
    normalizeResultType(
      game.resultType
    );

  const winner =
    game.winner === null ||
    game.winner ===
      undefined ||
    game.winner === ""
      ? null
      : Number(
          game.winner
        );

  if (
    !resultType &&
    winner === null
  ) {
    return;
  }

  if (
    resultType ===
      "rescheduled" ||
    resultType ===
      "postponed" ||
    resultType ===
      "cancelled" ||
    resultType ===
      "canceled" ||
    resultType ===
      "no-contest"
  ) {
    return;
  }

  if (
    resultType ===
    "tie"
  ) {
    teamAStanding
      .gamesPlayed += 1;

    teamBStanding
      .gamesPlayed += 1;

    teamAStanding
      .ties += 1;

    teamBStanding
      .ties += 1;

    teamAStanding
      .points +=
      numberOrZero(
        scoring.tie
      );

    teamBStanding
      .points +=
      numberOrZero(
        scoring.tie
      );

    return;
  }

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

  const winningStanding =
    standingsByTeam[
      winner
    ];

  const losingStanding =
    standingsByTeam[
      loser
    ];

  const isDefault =
    resultType ===
      "default" ||
    resultType ===
      "forfeit" ||
    resultType ===
      "default-win" ||
    resultType ===
      "forfeit-win";

  winningStanding
    .gamesPlayed += 1;

  losingStanding
    .gamesPlayed += 1;

  winningStanding
    .wins += 1;

  losingStanding
    .losses += 1;

  if (isDefault) {
    winningStanding
      .points +=
      numberOrZero(
        scoring.defaultWin
      );

    losingStanding
      .points +=
      numberOrZero(
        scoring.defaultLoss
      );

    return;
  }

  winningStanding
    .points +=
    numberOrZero(
      scoring.win
    );

  losingStanding
    .points +=
    numberOrZero(
      scoring.loss
    );
}


function renderStandings(
  container,
  standings,
  leagueData
) {
  const standingsRows =
    standings
      .map(
        (
          team,
          index
        ) => {
          const record =
            `${team.wins}-${team.losses}-${team.ties}`;

          return `
            <tr>
              <td class="standings-position">
                ${index + 1}
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
                ${record}
              </td>

              <td class="standings-points">
                ${team.points}
              </td>
            </tr>
          `;
        }
      )
      .join("");

  const winPoints =
    numberOrZero(
      leagueData.scoring
        ?.win
    );

  const lossPoints =
    numberOrZero(
      leagueData.scoring
        ?.loss
    );

  const tiePoints =
    numberOrZero(
      leagueData.scoring
        ?.tie
    );

  container.innerHTML = `
    <section class="standings-card">

      <div class="standings-card-heading">
        <h1>
          Regular Season Standings
        </h1>

        <p>
          ${escapeHtml(
            leagueData.season ||
              ""
          )}
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
            ${standingsRows}
          </tbody>
        </table>
      </div>

      <p class="standings-scoring-note">
        Win: ${winPoints} Points -
        Loss: ${lossPoints} Points -
        Tie: ${tiePoints} Points
      </p>

    </section>
  `;
}


function showStandingsError(
  container,
  message
) {
  container.innerHTML = `
    <section class="standings-card standings-error-card">
      <h1>
        Standings Unavailable
      </h1>

      <p>
        ${escapeHtml(
          message
        )}
      </p>
    </section>
  `;
}


function normalizeResultType(
  value
) {
  return String(
    value || ""
  )
    .trim()
    .toLowerCase()
    .replace(
      /\s+/g,
      "-"
    );
}


function numberOrZero(
  value
) {
  const number =
    Number(value);

  return Number.isFinite(
    number
  )
    ? number
    : 0;
}


function escapeHtml(
  value
) {
  return String(value)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}
