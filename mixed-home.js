"use strict";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const upcomingWeekContainer =
      document.getElementById(
        "upcoming-week-container"
      );

    if (!upcomingWeekContainer) {
      return;
    }

    if (
      typeof mixedLeagueData === "undefined" ||
      !mixedLeagueData
    ) {
      renderUpcomingWeekMessage(
        upcomingWeekContainer,
        "The Mixed League schedule could not be loaded."
      );

      return;
    }

    renderUpcomingWeek(
      upcomingWeekContainer,
      mixedLeagueData
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
          Upcoming games will appear here once the official
          2026–27 Mixed League schedule is available.
        </p>
      </div>
    `;

    return;
  }

  schedule.sort(compareWeeks);

  const upcomingWeek =
    findUpcomingWeek(
      schedule
    );

  if (!upcomingWeek) {
    updatePhaseBadge(null);

    renderUpcomingWeekMessage(
      container,
      "The 2026–27 Mixed League season is complete."
    );

    return;
  }

  const phase =
    String(
      upcomingWeek.phase || "regular"
    )
      .trim()
      .toLowerCase();

  const isSpecial =
    phase === "special";

  updatePhaseBadge(
    isSpecial
      ? null
      : upcomingWeek.phase
  );

  if (
    upcomingWeek.specialEvent
  ) {
    container.innerHTML = `
      <div class="upcoming-week-date">
        <strong>
          ${escapeHtml(
            getDisplayDate(
              upcomingWeek
            )
          )}
        </strong>

        ${
          upcomingWeek.week !== null &&
          upcomingWeek.week !== undefined
            ? `
              <span class="upcoming-week-number">
                Week ${numberOrBlank(
                  upcomingWeek.week
                )}
              </span>
            `
            : ""
        }
      </div>

      <div class="upcoming-week-message">
        <p>
          <strong>
            ${escapeHtml(
              upcomingWeek.specialEvent
            )}
          </strong>
        </p>
      </div>
    `;

    return;
  }

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

    ${renderDraw(
      "Early Draw",
      upcomingWeek.earlyTime ||
        "7:00 PM",
      upcomingWeek.earlyGames,
      leagueData
    )}

    ${renderDraw(
      "Late Draw",
      upcomingWeek.lateTime ||
        "9:15 PM",
      upcomingWeek.lateGames,
      leagueData
    )}

    ${renderUpcomingInformation(
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


function renderDraw(
  drawName,
  drawTime,
  games,
  leagueData
) {
  const gameList =
    Array.isArray(games)
      ? games
      : [];

  if (
    gameList.length === 0
  ) {
    return "";
  }

  return `
    <section class="upcoming-week-draw">
      <h3>
        ${escapeHtml(
          drawName
        )}
        ·
        ${escapeHtml(
          drawTime
        )}
      </h3>

      ${gameList
        .map((game) => {
          return renderGame(
            game,
            leagueData
          );
        })
        .join("")}
    </section>
  `;
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
          ${formatTeam(
            game.teamA,
            leagueData
          )}
        </span>

        <span class="upcoming-week-vs">
          vs
        </span>

        <span>
          ${formatTeam(
            game.teamB,
            leagueData
          )}
        </span>
      </div>
    </div>
  `;
}


function renderUpcomingInformation(
  week,
  leagueData
) {
  if (
    week.fiftyFiftyTeam === null ||
    week.fiftyFiftyTeam === undefined ||
    week.fiftyFiftyTeam === ""
  ) {
    return "";
  }

  return `
    <div class="upcoming-week-fifty-fifty">
      <p style="grid-column: 1 / -1;">
        <strong>
          50/50 Team:
        </strong>

        ${formatTeam(
          week.fiftyFiftyTeam,
          leagueData
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
    String(
      phase
    )
      .trim()
      .toLowerCase();

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


function formatTeam(
  teamNumber,
  leagueData
) {
  const number =
    Number(
      teamNumber
    );

  if (
    !Number.isFinite(
      number
    )
  ) {
    return "—";
  }

  const teamName =
    leagueData.teams?.[
      number
    ];

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
    return (
      dateA -
      dateB
    );
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
        !Number.isFinite(
          part
        )
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


function numberOrBlank(
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
