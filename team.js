"use strict";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const leagueKey =
      String(
        params.get("league") ?? ""
      )
        .trim()
        .toLowerCase();

    const teamNumber =
      Number(
        params.get("team")
      );

    const leagueConfig =
      getLeagueConfig(
        leagueKey
      );

    if (
      !leagueConfig ||
      !Number.isFinite(teamNumber)
    ) {
      renderTeamPageError(
        "The requested team could not be found."
      );

      return;
    }

    loadLeagueData(
      leagueConfig,
      teamNumber
    );
  }
);


function getLeagueConfig(
  leagueKey
) {
  const leagues = {
    mens: {
      key: "mens",
      name: "Men’s League",
      shortName: "Men’s",
      logo: "lcc-logo-mens.jpg?v=1",
      home: "mens.html",
      schedule:
        "mens-schedule2026.html",
      standings:
        "mens-standings2026.html",
      dataFile:
        "mens-data2026.js?v=2",
      dataVariable:
        "mensLeagueData",
      bodyClass:
        "mens-home-page",
      drawMode:
        "early-late"
    },

    ladies: {
      key: "ladies",
      name: "Ladies League",
      shortName: "Ladies",
      logo: "lcc-logo-ladies.jpg?v=1",
      home: "ladies.html",
      schedule:
        "ladies-schedule2026.html",
      standings:
        "ladies-standings2026.html",
      dataFile:
        "ladies-data2026.js?v=1",
      dataVariable:
        "ladiesLeagueData",
      bodyClass:
        "ladies-home-page",
      drawMode:
        "early-late"
    },

    mixed: {
      key: "mixed",
      name: "Mixed League",
      shortName: "Mixed",
      logo: "lcc-logo-mixed.jpg?v=1",
      home: "mixed.html",
      schedule:
        "mixed-schedule2026.html",
      standings:
        "mixed-standings2026.html",
      dataFile:
        "mixed-data2026.js?v=1",
      dataVariable:
        "mixedLeagueData",
      bodyClass:
        "mixed-home-page",
      drawMode:
        "early-late"
    },

    doubles: {
  key: "doubles",
  name: "Doubles League",
  shortName: "Doubles",
  logo: "lcc-logo-doubles.jpg?v=1",
  home: "doubles.html",
  schedule:
    "doubles-schedule2026.html",
  standings:
    "doubles-standings2026.html",
  dataFile:
    "doubles-data2026.js?v=1",
  dataVariable:
    "doublesLeagueData",
  bodyClass:
    "doubles-home-page",
  drawMode:
    "none"
}
  };

  return (
    leagues[leagueKey] ??
    null
  );
}


function loadLeagueData(
  leagueConfig,
  teamNumber
) {
  const script =
    document.createElement(
      "script"
    );

  script.src =
    leagueConfig.dataFile;

  script.onload = () => {
    let leagueData = null;

    if (
      leagueConfig.key === "mens" &&
      typeof mensLeagueData !== "undefined"
    ) {
      leagueData =
        mensLeagueData;
    }

    if (
      leagueConfig.key === "ladies" &&
      typeof ladiesLeagueData !== "undefined"
    ) {
      leagueData =
        ladiesLeagueData;
    }

    if (
      leagueConfig.key === "mixed" &&
      typeof mixedLeagueData !== "undefined"
    ) {
      leagueData =
        mixedLeagueData;
    }

    if (
  leagueConfig.key === "doubles" &&
  typeof doublesLeagueData !== "undefined"
) {
  leagueData =
    doublesLeagueData;
}

    if (!leagueData) {
      renderTeamPageError(
        `${leagueConfig.name} data could not be loaded.`
      );

      return;
    }

    renderTeamPage(
      leagueConfig,
      leagueData,
      teamNumber
    );
  };

  script.onerror = () => {
    renderTeamPageError(
      `${leagueConfig.name} data could not be loaded.`
    );
  };

  document.head.appendChild(
    script
  );
}


function renderTeamPage(
  leagueConfig,
  leagueData,
  teamNumber
) {
  const teamName =
    leagueData.teams?.[
      teamNumber
    ];

  if (!teamName) {
    renderTeamPageError(
      `Team ${teamNumber} was not found in ${leagueConfig.name}.`
    );

    return;
  }

  configurePageAppearance(
    leagueConfig,
    leagueData,
    teamNumber
  );

  const teamResults =
    buildTeamResults(
      leagueData,
      teamNumber
    );

  const seasonStats =
    calculateRecord(
      teamResults
    );

  const currentRank =
  calculateCurrentRank(
    leagueData,
    teamNumber
  );

renderSeasonRecord(
  seasonStats,
  currentRank,
  teamNumber
);

  renderDrawPerformance(
    teamResults,
    leagueConfig
  );

  renderSheetPerformance(
    teamResults
  );

  renderWeeklyResults(
    teamResults,
    teamNumber
  );
}


function configurePageAppearance(
  leagueConfig,
  leagueData,
  teamNumber
) {
  document.body.classList.add(
    leagueConfig.bodyClass
  );

  document.title =
    `Team ${teamNumber} - ${leagueConfig.name}`;

  const logo =
    document.getElementById(
      "team-league-logo"
    );

  if (logo) {
    logo.src =
      leagueConfig.logo;

    logo.alt =
      leagueConfig.name;
  }

  const title =
    document.getElementById(
      "team-page-title"
    );

  if (title) {
    title.textContent =
      `Team ${teamNumber}`;
  }

  const season =
    document.getElementById(
      "team-page-season"
    );

  if (season) {
    season.textContent =
      `${formatSeason(
        leagueData.season
      )} ${leagueConfig.name}`;
  }

  setLink(
    "team-league-home-link",
    leagueConfig.home
  );

  setLink(
    "team-schedule-link",
    leagueConfig.schedule
  );

  setLink(
    "team-standings-link",
    leagueConfig.standings
  );

  const leagueLabel =
    document.getElementById(
      "team-league-home-label"
    );

  if (leagueLabel) {
    leagueLabel.textContent =
      leagueConfig.shortName;
  }

  const nav =
    document.getElementById(
      "team-bottom-nav"
    );

  if (nav) {
    nav.setAttribute(
      "aria-label",
      `${leagueConfig.name} navigation`
    );
  }
}


function buildTeamResults(
  leagueData,
  teamNumber
) {
  const results = [];

  const schedule =
    Array.isArray(
      leagueData.schedule
    )
      ? leagueData.schedule
      : [];

  schedule.forEach((week) => {
    if (
      !isRegularSeasonWeek(
        week
      )
    ) {
      return;
    }

    addTeamGames(
      results,
      week,
      week.earlyGames,
      "Early",
      week.earlyTime,
      teamNumber
    );

    addTeamGames(
      results,
      week,
      week.lateGames,
      "Late",
      week.lateTime,
      teamNumber
    );

    addTeamGames(
      results,
      week,
      week.games,
      "Single Draw",
      week.drawTime ??
        week.time ??
        "6:30 PM",
      teamNumber
    );
  });

  return results;
}


function addTeamGames(
  results,
  week,
  games,
  drawLabel,
  drawTime,
  teamNumber
) {
  const gameList =
    Array.isArray(games)
      ? games
      : [];

  gameList.forEach((game) => {
    const teamA =
      Number(game.teamA);

    const teamB =
      Number(game.teamB);

    if (
      teamA !== teamNumber &&
      teamB !== teamNumber
    ) {
      return;
    }

    const result =
      determineTeamResult(
        game,
        teamNumber
      );

    if (!result) {
      return;
    }

    const opponent =
      teamA === teamNumber
        ? teamB
        : teamA;

    results.push({
      week:
        week.week ?? null,

      date:
        week.date ?? "",

      displayDate:
        week.displayDate ??
        week.date ??
        "",

      drawLabel,
      drawTime:
        drawTime ?? "",

      sheet:
        Number(game.sheet),

      opponent,

      result:
        result.result,

      resultType:
        result.resultType,

      points:
        result.points
    });
  });
}


function determineTeamResult(
  game,
  teamNumber
) {
  const resultType =
    normalizeValue(
      game.resultType
    );

  if (
    !resultType ||
    [
      "rescheduled",
      "postponed",
      "cancelled",
      "canceled",
      "no-contest"
    ].includes(resultType)
  ) {
    return null;
  }

  if (
    resultType === "tie" ||
    normalizeValue(
      game.winner
    ) === "tie"
  ) {
    return {
      result: "Tie",
      resultType,
      points: 7
    };
  }

  const winner =
    Number(game.winner);

  if (!Number.isFinite(winner)) {
    return null;
  }

  const isWinner =
    winner === teamNumber;

  const isDefault =
    [
      "default",
      "forfeit",
      "default-win",
      "forfeit-win"
    ].includes(resultType);

  if (isWinner) {
    return {
      result: "Win",
      resultType:
        isDefault
          ? "default"
          : "win",
      points: 10
    };
  }

  return {
    result: "Loss",
    resultType:
      isDefault
        ? "default"
        : "loss",
    points:
      isDefault
        ? 0
        : 5
  };
}


function calculateRecord(
  results
) {
  const stats = {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    ties: 0,
    points: 0
  };

  results.forEach((game) => {
    stats.gamesPlayed += 1;
    stats.points +=
      Number(game.points) || 0;

    if (
      game.result === "Win"
    ) {
      stats.wins += 1;
    } else if (
      game.result === "Loss"
    ) {
      stats.losses += 1;
    } else if (
      game.result === "Tie"
    ) {
      stats.ties += 1;
    }
  });

  return stats;
}

function calculateCurrentRank(
  leagueData,
  teamNumber
) {
  const teams =
    Object.keys(
      leagueData.teams ?? {}
    )
      .map(Number)
      .filter(
        Number.isFinite
      );

  const standingsMap =
    new Map();

  const headToHeadWins =
    new Map();

  teams.forEach((number) => {
    standingsMap.set(
      number,
      {
        teamNumber: number,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        points: 0
      }
    );

    headToHeadWins.set(
      number,
      new Set()
    );
  });

  const scoring = {
    win:
      Number(
        leagueData.scoring?.win
      ) || 10,

    loss:
      Number(
        leagueData.scoring?.loss
      ) || 5,

    tie:
      Number(
        leagueData.scoring?.tie
      ) || 7,

    defaultWin:
      Number(
        leagueData.scoring?.defaultWin
      ) || 10,

    defaultLoss:
      Number(
        leagueData.scoring?.defaultLoss
      ) || 0
  };

  const schedule =
    Array.isArray(
      leagueData.schedule
    )
      ? leagueData.schedule
      : [];

  schedule.forEach((week) => {
    if (
      !isRegularSeasonWeek(
        week
      )
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
    : []),

  ...(Array.isArray(
    week.games
  )
    ? week.games
    : [])
];

    games.forEach((game) => {
      applyGameToStandings(
        game,
        standingsMap,
        headToHeadWins,
        scoring
      );
    });
  });

  const standings =
    sortTeamStandings(
      Array.from(
        standingsMap.values()
      ),
      headToHeadWins
    );

  const index =
    standings.findIndex(
      (team) =>
        team.teamNumber ===
        teamNumber
    );

  return index >= 0
    ? index + 1
    : "—";
}


function applyGameToStandings(
  game,
  standingsMap,
  headToHeadWins,
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
    normalizeValue(
      game.resultType
    );

  if (
    !resultType ||
    [
      "rescheduled",
      "postponed",
      "cancelled",
      "canceled",
      "no-contest"
    ].includes(resultType)
  ) {
    return;
  }

  if (
    resultType === "tie" ||
    normalizeValue(
      game.winner
    ) === "tie"
  ) {
    teamA.gamesPlayed += 1;
    teamB.gamesPlayed += 1;

    teamA.ties += 1;
    teamB.ties += 1;

    teamA.points +=
      scoring.tie;

    teamB.points +=
      scoring.tie;

    return;
  }

  const winnerNumber =
    Number(game.winner);

  if (
    winnerNumber !==
      teamA.teamNumber &&
    winnerNumber !==
      teamB.teamNumber
  ) {
    return;
  }

  const winner =
    winnerNumber ===
      teamA.teamNumber
      ? teamA
      : teamB;

  const loser =
    winnerNumber ===
      teamA.teamNumber
      ? teamB
      : teamA;

  const loserNumber =
    loser.teamNumber;

  const isDefault =
    [
      "default",
      "forfeit",
      "default-win",
      "forfeit-win"
    ].includes(resultType);

  winner.gamesPlayed += 1;
  winner.wins += 1;

  loser.gamesPlayed += 1;
  loser.losses += 1;

  winner.points +=
    isDefault
      ? scoring.defaultWin
      : scoring.win;

  loser.points +=
    isDefault
      ? scoring.defaultLoss
      : scoring.loss;

  headToHeadWins
    .get(winner.teamNumber)
    ?.add(loserNumber);
}


function sortTeamStandings(
  standings,
  headToHeadWins
) {
  const baseSorted =
    [...standings].sort(
      (teamA, teamB) => {
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

    finalStandings.push(
      ...rankTeamTiedGroup(
        tiedGroup,
        headToHeadWins
      )
    );

    index = nextIndex;
  }

  return finalStandings;
}


function rankTeamTiedGroup(
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
    (teamA, teamB) => {
      const aAheadOfB =
        hasTeamHeadToHeadPath(
          teamA.teamNumber,
          teamB.teamNumber,
          allowedTeams,
          headToHeadWins
        );

      const bAheadOfA =
        hasTeamHeadToHeadPath(
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


function hasTeamHeadToHeadPath(
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

function renderSeasonRecord(
  stats,
  currentRank,
  teamNumber
) {
  const container =
    document.getElementById(
      "team-season-record"
    );

  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="team-summary-table">

      <div class="team-summary-header">
        <span>Rank</span>
        <span>Team</span>
        <span>GP</span>
        <span>Record</span>
        <span>Pts</span>
      </div>

      <div class="team-summary-values">
        <strong>${currentRank}</strong>
        <strong>${teamNumber}</strong>
        <strong>${stats.gamesPlayed}</strong>
        <strong>
          ${stats.wins}-${stats.losses}-${stats.ties}
        </strong>
        <strong>${stats.points}</strong>
      </div>

    </div>
  `;
}

function renderDrawPerformance(
  results,
  leagueConfig
) {
  const container =
    document.getElementById(
      "team-draw-performance"
    );

  const heading =
    document.getElementById(
      "team-draw-heading"
    );

  if (
    !container ||
    !heading
  ) {
    return;
  }

  if (
  leagueConfig.drawMode ===
  "none"
) {
  const section =
    document.getElementById(
      "team-draw-section"
    );

  if (section) {
    section.hidden = true;
  }

  return;
}

  heading.textContent =
    "Early vs Late Draw";

  const earlyStats =
    calculateRecord(
      results.filter(
        (game) =>
          game.drawLabel ===
          "Early"
      )
    );

  const lateStats =
    calculateRecord(
      results.filter(
        (game) =>
          game.drawLabel ===
          "Late"
      )
    );

  container.innerHTML = `
    <div class="team-performance-grid">

      ${renderPerformanceCard(
        "Early Draw",
        earlyStats,
        "7:00 PM"
      )}

      ${renderPerformanceCard(
        "Late Draw",
        lateStats,
        "9:15 PM"
      )}

    </div>
  `;
}


function renderSheetPerformance(
  results
) {
  const container =
    document.getElementById(
      "team-sheet-performance"
    );

  if (!container) {
    return;
  }

  const sheets = [
    1,
    2,
    3
  ];

  container.innerHTML = `
    <div class="team-performance-grid">

      ${sheets
        .map((sheet) => {
          const stats =
            calculateRecord(
              results.filter(
                (game) =>
                  game.sheet ===
                  sheet
              )
            );

          return renderPerformanceCard(
            `Sheet ${sheet}`,
            stats,
            `${stats.gamesPlayed} GP`
          );
        })
        .join("")}

    </div>
  `;
}


function renderPerformanceCard(
  title,
  stats,
  subtitle
) {
  return `
    <div class="team-performance-card">

      <strong>
        ${escapeHtml(title)}
      </strong>

      <span class="team-performance-record">
        ${stats.wins}-${stats.losses}-${stats.ties}
      </span>

      <span class="team-performance-subtitle">
        ${escapeHtml(subtitle)}
      </span>

    </div>
  `;
}


function renderWeeklyResults(
  results,
  teamNumber
) {
  const container =
    document.getElementById(
      "team-weekly-results"
    );

  if (!container) {
    return;
  }

  if (results.length === 0) {
    container.innerHTML = `
      <p>
        No completed results are available yet.
      </p>
    `;

    return;
  }

  const newestFirst =
    [...results].sort(
      (gameA, gameB) =>
        String(gameB.date)
          .localeCompare(
            String(gameA.date)
          )
    );

  container.innerHTML =
    newestFirst
      .map((game) => {
        return renderWeeklyResultCard(
          game,
          teamNumber
        );
      })
      .join("");
}


function renderWeeklyResultCard(
  game,
  teamNumber
) {
  const resultClass =
    game.result.toLowerCase();

  const resultText =
    game.resultType ===
      "default"
      ? `${game.result} by Default`
      : game.result;

  return `
    <article class="team-result-card">

      <div class="team-result-heading">

        <strong>
          ${escapeHtml(
            game.displayDate
          )}
        </strong>

        <span
          class="
            team-result-badge
            team-result-${resultClass}
          "
        >
          ${escapeHtml(
            resultText
          )}
        </span>

      </div>

      <p class="team-result-matchup">
        Team ${teamNumber}
        vs
        Team ${game.opponent}
      </p>

      <div class="team-result-details">

        <span>
          <strong>Draw:</strong>
          ${escapeHtml(
            game.drawLabel
          )}
        </span>

        <span>
          <strong>Time:</strong>
          ${escapeHtml(
            game.drawTime
          )}
        </span>

        <span>
          <strong>Sheet:</strong>
          ${game.sheet}
        </span>

      </div>

    </article>
  `;
}


function isRegularSeasonWeek(
  week
) {
  if (
    !week ||
    typeof week !==
      "object"
  ) {
    return false;
  }

  const phase =
    normalizeValue(
      week.phase
    );

  return (
    !phase ||
    phase === "regular" ||
    phase === "regular-season"
  );
}


function setLink(
  elementId,
  href
) {
  const link =
    document.getElementById(
      elementId
    );

  if (link) {
    link.href = href;
  }
}


function normalizeValue(
  value
) {
  return String(
    value ?? ""
  )
    .trim()
    .toLowerCase()
    .replace(
      /\s+/g,
      "-"
    );
}


function formatSeason(
  season
) {
  return String(
    season ??
    "2026-27"
  ).replace(
    "-",
    "–"
  );
}


function renderTeamPageError(
  message
) {
  const main =
    document.querySelector(
      "main"
    );

  if (!main) {
    return;
  }

  main.innerHTML = `
    <section class="card">
      <h2>
        Team Stats Unavailable
      </h2>

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
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}
