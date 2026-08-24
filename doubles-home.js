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
  const phaseBadge =
    document.getElementById(
      "upcoming-week-phase"
    );

  if (phaseBadge) {
    phaseBadge.hidden = true;
  }

  container.innerHTML = `
    <div class="upcoming-week-message">
      <p>
        <strong>Schedule Coming Soon</strong>
      </p>

      <p>
        Upcoming games will appear here once the official
        2026–27 Doubles League schedule is available.
      </p>
    </div>
  `;

  return;
}

  schedule.sort(compareWeeks);

  const upcomingWeek =
    findUpcomingWeek(schedule);

  if (!upcomingWeek) {
    renderUpcomingWeekMessage(
      container,
      "The 2026–27 Doubles League season is complete."
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
        ${escapeHtml(
          getDrawHeading(
            upcomingWeek
          )
        )}
        ·
        ${escapeHtml(
          upcomingWeek.drawTime ||
          "4:30 PM"
        )}
      </h3>

      ${games.length > 0
        ? games
            .map((game) => {
              return renderGame(
                game,
                leagueData
              );
            })
            .join("")
        : `
            <div class="upcoming-week-message">
              <p>
                No games are listed for this week.
              </p>
            </div>
          `}
    </section>

    <div class="upcoming-week-fifty-fifty">
      <p style="grid-column: 1 / -1;">
        <strong>
          50/50 Team
        </strong>
        <br>
        ${formatTeam(
          upcomingWeek.fiftyFiftyTeam,
          leagueData
        )}
      </p>
    </div>
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

  return schedule.find((week) => {
    const weekDate =
      parseLocalDate(
        week.date
      );

    return (
      weekDate &&
      weekDate >= today
    );
  }) || null;
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

      <span class="upcoming-week-matchup">
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
      </span>
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

  const teamNumber =
    Number(
      game[teamKey]
    );

  if (
    Number.isFinite(
      teamNumber
    )
  ) {
    return formatTeam(
      teamNumber,
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


function getDrawHeading(
  week
) {
  const phase =
    normalizeValue(
      week.phase
    );

  const isPlayoffs =
    phase === "playoffs" ||
    phase === "playoff";

  if (
    isPlayoffs &&
    typeof week.roundName === "string" &&
    week.roundName.trim()
  ) {
    return week.roundName.trim();
  }

  return "Doubles Draw";
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
}


function formatTeam(
  teamNumber,
  leagueData
) {
  const number =
    Number(teamNumber);

  if (
    !Number.isFinite(
      number
    )
  ) {
    return "—";
  }

  const teamName =
    leagueData.teams?.[number];

  return escapeHtml(
    teamName ||
    `Team ${number}`
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

  const date =
    new Date(
      `${value.trim()}T00:00:00`
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
  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : "";
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


function renderUpcomingWeekMessage(
  container,
  message
) {
  container.innerHTML = `
    <div class="upcoming-week-message">
      <p>
        ${escapeHtml(message)}
      </p>
    </div>
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
