"use strict";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const container =
      document.getElementById(
        "upcoming-week-container"
      );

    if (!container) {
      return;
    }

    if (
      typeof doublesLeagueData === "undefined" ||
      !doublesLeagueData
    ) {
      renderUpcomingWeekMessage(
        container,
        "The Doubles League schedule could not be loaded."
      );

      return;
    }

    renderUpcomingWeek(
      container,
      doublesLeagueData
    );
  }
);


function renderUpcomingWeek(
  container,
  leagueData
) {
  const schedule =
    Array.isArray(
      leagueData.schedule
    )
      ? [...leagueData.schedule]
      : [];

  if (schedule.length === 0) {
    updatePhaseBadge(null);

    container.innerHTML = `
      <div class="upcoming-week-message">
        <p>
          <strong>
            Schedule Coming Soon
          </strong>
        </p>

        <p>
          Upcoming games will appear here once the Fall
          Doubles League schedule is available.
        </p>
      </div>
    `;

    return;
  }

  schedule.sort(
    compareWeeks
  );

  const upcomingWeek =
    findUpcomingWeek(
      schedule
    );

  if (!upcomingWeek) {
    updatePhaseBadge(null);

    renderUpcomingWeekMessage(
      container,
      "The 2026 Fall Doubles League session is complete."
    );

    return;
  }

  updatePhaseBadge(
    upcomingWeek.phase
  );

  const games =
    Array.isArray(
      upcomingWeek.games
    )
      ? upcomingWeek.games
      : [];

  container.innerHTML = `
    <div class="upcoming-week-date">
      <strong>
        ${escapeHtml(
          getDisplayDate(
            upcomingWeek
          )
        )}
      </strong>

      <span class="upcoming-week-number">
        Week ${numberOrBlank(
          upcomingWeek.week
        )}
      </span>
    </div>

    <section class="upcoming-week-draw">
      <h3>
        Doubles Draw
        ·
        ${escapeHtml(
          upcomingWeek.drawTime ||
          "6:30 PM"
        )}
      </h3>

      ${games.length > 0
        ? games
            .map((game) =>
              renderGame(
                game,
                leagueData
              )
            )
            .join("")
        : `
            <div class="upcoming-week-message">
              <p>
                No games are listed for this week.
              </p>
            </div>
          `}
    </section>

    ${renderUpcomingBye(
      upcomingWeek,
      leagueData
    )}
  `;
}


function findUpcomingWeek(
  schedule
) {
  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  return (
    schedule.find(
      (week) => {
        const weekDate =
          parseLocalDate(
            week.date
          );

        return (
          weekDate &&
          weekDate >= today
        );
      }
    ) || null
  );
}


function renderGame(
  game,
  leagueData
) {
  return `
    <div class="upcoming-week-game">
      <span class="upcoming-week-sheet">
        Sheet ${numberOrBlank(
          game.sheet
        )}
      </span>

      <div class="upcoming-week-matchup">
        <span>
          ${getGameTeamLabel(
            game,
            "A",
            leagueData
          )}
        </span>

        <span class="upcoming-week-vs">
          vs
        </span>

        <span>
          ${getGameTeamLabel(
            game,
            "B",
            leagueData
          )}
        </span>
      </div>
    </div>
  `;
}


function getGameTeamLabel(
  game,
  side,
  leagueData
) {
  const teamKey =
    side === "A"
      ? "teamA"
      : "teamB";

  const labelKey =
    side === "A"
      ? "teamALabel"
      : "teamBLabel";

  const teamValue =
    game[teamKey];

  if (
    teamValue !== null &&
    teamValue !== undefined &&
    teamValue !== ""
  ) {
    return formatTeam(
      teamValue,
      leagueData
    );
  }

  const label =
    game[labelKey];

  if (
    typeof label === "string" &&
    label.trim()
  ) {
    return escapeHtml(
      label.trim()
    );
  }

  return "TBD";
}


function renderUpcomingBye(
  week,
  leagueData
) {
  let byeName = "";

  if (
    typeof week.byeLabel === "string" &&
    week.byeLabel.trim()
  ) {
    byeName =
      week.byeLabel.trim();
  } else if (
    week.byeTeam !== null &&
    week.byeTeam !== undefined &&
    week.byeTeam !== ""
  ) {
    byeName =
      getTeamName(
        week.byeTeam,
        leagueData
      );
  }

  if (!byeName) {
    return "";
  }

  return `
    <div class="upcoming-week-fifty-fifty">
      <p style="grid-column: 1 / -1;">
        <strong>
          Bye:
        </strong>

        ${escapeHtml(
          byeName
        )}
      </p>
    </div>
  `;
}


function updatePhaseBadge(
  phase
) {
  const badge =
    document.getElementById(
      "upcoming-week-phase"
    );

  if (!badge) {
    return;
  }

  if (!phase) {
    badge.hidden = true;

    badge.classList.remove(
      "playoffs"
    );

    return;
  }

  const normalizedPhase =
    normalizeValue(
      phase
    );

  const isPlayoffs =
    normalizedPhase === "playoffs" ||
    normalizedPhase === "playoff";

  badge.textContent =
    isPlayoffs
      ? "Playoffs"
      : "Regular Season";

  badge.classList.toggle(
    "playoffs",
    isPlayoffs
  );

  badge.hidden = false;
}


function getTeamName(
  teamNumber,
  leagueData
) {
  if (
    teamNumber === null ||
    teamNumber === undefined ||
    teamNumber === ""
  ) {
    return "TBD";
  }

  const teams =
    leagueData.teams || {};

  return (
    teams[teamNumber] ||
    `Team ${teamNumber}`
  );
}


function formatTeam(
  teamNumber,
  leagueData
) {
  return escapeHtml(
    getTeamName(
      teamNumber,
      leagueData
    )
  );
}


function getDisplayDate(
  week
) {
  if (
    typeof week.displayDate === "string" &&
    week.displayDate.trim()
  ) {
    return week.displayDate.trim();
  }

  const date =
    parseLocalDate(
      week.date
    );

  if (!date) {
    return "";
  }

  return date.toLocaleDateString(
    "en-CA",
    {
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  );
}


function compareWeeks(
  weekA,
  weekB
) {
  const dateA =
    parseLocalDate(
      weekA.date
    );

  const dateB =
    parseLocalDate(
      weekB.date
    );

  if (
    dateA &&
    dateB
  ) {
    return dateA - dateB;
  }

  return (
    numberOrZero(
      weekA.week
    ) -
    numberOrZero(
      weekB.week
    )
  );
}


function parseLocalDate(
  value
) {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return null;
  }

  const parts =
    value
      .trim()
      .split("-")
      .map(Number);

  if (
    parts.length !== 3 ||
    parts.some(
      (part) =>
        !Number.isFinite(part)
    )
  ) {
    return null;
  }

  const [
    year,
    month,
    day
  ] = parts;

  const date =
    new Date(
      year,
      month - 1,
      day
    );

  return Number.isNaN(
    date.getTime()
  )
    ? null
    : date;
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


function numberOrBlank(
  value
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  const number =
    Number(
      value
    );

  return Number.isFinite(
    number
  )
    ? number
    : "";
}


function numberOrZero(
  value
) {
  const number =
    Number(
      value
    );

  return Number.isFinite(
    number
  )
    ? number
    : 0;
}


function renderUpcomingWeekMessage(
  container,
  message
) {
  container.innerHTML = `
    <div class="upcoming-week-message">
      <p>
        ${escapeHtml(
          message
        )}
      </p>
    </div>
  `;
}


function escapeHtml(
  value
) {
  return String(
    value ?? ""
  )
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
