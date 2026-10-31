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
  const leagueData =
    typeof mensLeagueData !== "undefined"
      ? mensLeagueData
      : null;

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

  renderSeasonRecord(
    seasonStats
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


function renderSeasonRecord(
  stats
) {
  const container =
    document.getElementById(
      "team-season-record"
    );

  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="team-stat-grid">

      <div class="team-stat-item">
        <strong>
          ${stats.gamesPlayed}
        </strong>

        <span>
          GP
        </span>
      </div>

      <div class="team-stat-item">
        <strong>
          ${stats.wins}-${stats.losses}-${stats.ties}
        </strong>

        <span>
          Record
        </span>
      </div>

      <div class="team-stat-item">
        <strong>
          ${stats.points}
        </strong>

        <span>
          Points
        </span>
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
    leagueConfig.drawMode !==
    "early-late"
  ) {
    heading.textContent =
      "Draw Performance";

    container.innerHTML = `
      <p>
        Draw statistics will appear here.
      </p>
    `;

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
