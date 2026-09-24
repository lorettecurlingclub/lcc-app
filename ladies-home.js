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
      typeof ladiesLeagueData === "undefined" ||
      !ladiesLeagueData
    ) {
      showUpcomingWeekMessage(
        container,
        "The Ladies League schedule could not be loaded."
      );

      return;
    }

    if (
      !Array.isArray(
        ladiesLeagueData.schedule
      ) ||
      ladiesLeagueData.schedule.length === 0
    ) {
      updateUpcomingWeekPhase(null);

      container.innerHTML = `
        <div class="upcoming-week-message">
          <p>
            <strong>
              Schedule Coming Soon
            </strong>
          </p>

          <p>
            Upcoming games will appear here once the official
            2026–27 Ladies League schedule is available.
          </p>
        </div>
      `;

      return;
    }

    try {
      const upcomingWeek =
        findUpcomingWeek(
          ladiesLeagueData.schedule
        );

      if (!upcomingWeek) {
        updateUpcomingWeekPhase(null);

        showUpcomingWeekMessage(
          container,
          "The 2026–27 Ladies League schedule is complete."
        );

        return;
      }

      renderUpcomingWeek(
        container,
        upcomingWeek,
        ladiesLeagueData
      );
    } catch (error) {
      console.error(
        "Unable to load the upcoming Ladies League week:",
        error
      );

      updateUpcomingWeekPhase(null);

      showUpcomingWeekMessage(
        container,
        "The upcoming league night could not be displayed."
      );
    }
  }
);


/*
  Finds the first schedule entry that is today
  or later.

  This includes regular games, league events
  and playoff dates.
*/

function findUpcomingWeek(
  schedule
) {
  if (!Array.isArray(schedule)) {
    return null;
  }

  const today =
    startOfToday();

  return (
    schedule
      .filter((week) => {
        return (
          week &&
          week.date
        );
      })
      .slice()
      .sort(
        (
          weekA,
          weekB
        ) => {
          return (
            parseLocalDate(
              weekA.date
            ) -
            parseLocalDate(
              weekB.date
            )
          );
        }
      )
      .find((week) => {
        const weekDate =
          parseLocalDate(
            week.date
          );

        return (
          weekDate instanceof Date &&
          !Number.isNaN(
            weekDate.getTime()
          ) &&
          weekDate >= today
        );
      }) || null
  );
}


/*
  Renders the next schedule entry.
*/

function renderUpcomingWeek(
  container,
  week,
  leagueData
) {
  const phase =
    String(
      week.phase || "regular"
    )
      .trim()
      .toLowerCase();

  /*
    Special dates such as the Christmas Party
    and Christmas Break.
  */

  if (
    phase === "special" ||
    week.specialEvent
  ) {
    renderSpecialEvent(
      container,
      week
    );

    return;
  }

  const earlyGames =
    Array.isArray(
      week.earlyGames
    )
      ? week.earlyGames
      : [];

  const lateGames =
    Array.isArray(
      week.lateGames
    )
      ? week.lateGames
      : [];

  updateUpcomingWeekPhase(
    week
  );

  container.innerHTML = `
    <div class="upcoming-week-date">
      <strong>
        ${escapeHtml(
          week.displayDate ||
          formatDisplayDate(
            week.date
          )
        )}
      </strong>

      <div class="upcoming-week-number">
        Week ${escapeHtml(
          week.week
        )}
      </div>
    </div>

    ${renderWeekNote(
      week
    )}

    ${renderRoundName(
      week
    )}

    ${renderDraw(
      "Early Draw",
      week.earlyTime ||
        "7:00 PM",
      earlyGames,
      leagueData
    )}

    ${renderDraw(
      "Late Draw",
      week.lateTime ||
        "9:15 PM",
      lateGames,
      leagueData
    )}

    ${renderUpcomingInformation(
      week,
      leagueData
    )}
  `;
}


/*
  Renders Christmas Party, Christmas Break
  or another future special date.
*/

function renderSpecialEvent(
  container,
  week
) {
  updateUpcomingWeekPhase(null);

  container.innerHTML = `
    <div class="upcoming-week-date">
      <strong>
        ${escapeHtml(
          week.displayDate ||
          formatDisplayDate(
            week.date
          )
        )}
      </strong>

      <div class="upcoming-week-number">
        League Event
      </div>
    </div>

    <div class="upcoming-week-message">
      <p>
        <strong>
          ${escapeHtml(
            week.specialEvent ||
            "League Event"
          )}
        </strong>
      </p>
    </div>
  `;
}


/*
  Shows notes such as Thanksgiving
  or Louis Riel Day.
*/

function renderWeekNote(
  week
) {
  if (
    typeof week.notes !== "string" ||
    !week.notes.trim()
  ) {
    return "";
  }

  return `
    <div class="upcoming-week-message">
      <p>
        ${escapeHtml(
          week.notes.trim()
        )}
      </p>
    </div>
  `;
}


/*
  Shows the playoff round name when provided.
*/

function renderRoundName(
  week
) {
  if (
    typeof week.roundName !== "string" ||
    !week.roundName.trim()
  ) {
    return "";
  }

  return `
    <div class="upcoming-week-message">
      <p>
        <strong>
          ${escapeHtml(
            week.roundName.trim()
          )}
        </strong>
      </p>
    </div>
  `;
}


/*
  Displays 50/50 information.

  There is no Bye field for the official
  eight-team Ladies League schedule.
*/

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

        ${escapeHtml(
          getTeamName(
            week.fiftyFiftyTeam,
            leagueData
          )
        )}
      </p>
    </div>
  `;
}


/*
  Controls the Regular Season / Playoffs bubble.
*/

function updateUpcomingWeekPhase(
  week
) {
  const phaseBubble =
    document.getElementById(
      "upcoming-week-phase"
    );

  if (!phaseBubble) {
    return;
  }

  if (!week) {
    phaseBubble.hidden = true;

    phaseBubble.classList.remove(
      "playoffs"
    );

    return;
  }

  const phase =
    String(
      week.phase || "regular"
    )
      .trim()
      .toLowerCase();

  if (phase === "special") {
    phaseBubble.hidden = true;

    phaseBubble.classList.remove(
      "playoffs"
    );

    return;
  }

  const isPlayoffs =
    phase === "playoff" ||
    phase === "playoffs";

  phaseBubble.textContent =
    isPlayoffs
      ? "Playoffs"
      : "Regular Season";

  phaseBubble.classList.toggle(
    "playoffs",
    isPlayoffs
  );

  phaseBubble.hidden = false;
}


/*
  Renders one Early Draw or Late Draw.
*/

function renderDraw(
  drawName,
  drawTime,
  games,
  leagueData
) {
  if (!games.length) {
    return "";
  }

  const gameRows =
    games
      .map((game) => {
        const teamA =
          getGameTeamName(
            game.teamA,
            game.teamALabel,
            leagueData
          );

        const teamB =
          getGameTeamName(
            game.teamB,
            game.teamBLabel,
            leagueData
          );

        return `
          <div class="upcoming-week-game">
            <div class="upcoming-week-sheet">
              Sheet ${escapeHtml(
                game.sheet
              )}
            </div>

            <div class="upcoming-week-matchup">
              <span>
                ${escapeHtml(
                  teamA
                )}
              </span>

              <span class="upcoming-week-vs">
                vs
              </span>

              <span>
                ${escapeHtml(
                  teamB
                )}
              </span>
            </div>
          </div>
        `;
      })
      .join("");

  return `
    <section class="upcoming-week-draw">
      <h3>
        ${escapeHtml(
          drawName
        )}
        ·
        ${escapeHtml(
          drawTime || ""
        )}
      </h3>

      ${gameRows}
    </section>
  `;
}


/*
  Returns either:

  Team 1–8 for regular-season games

  or

  A1–A4 / B1–B4 for playoff games.
*/

function getGameTeamName(
  teamNumber,
  teamLabel,
  leagueData
) {
  if (
    typeof teamLabel === "string" &&
    teamLabel.trim()
  ) {
    return teamLabel.trim();
  }

  return getTeamName(
    teamNumber,
    leagueData
  );
}


/*
  Returns the display name for a numbered team.
*/

function getTeamName(
  teamNumber,
  leagueData
) {
  if (
    teamNumber === null ||
    teamNumber === undefined ||
    teamNumber === ""
  ) {
    return "To Be Announced";
  }

  const teams =
    leagueData.teams || {};

  return (
    teams[teamNumber] ||
    `Team ${teamNumber}`
  );
}


/*
  Gets today's date at midnight.
*/

function startOfToday() {
  const today =
    new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
}


/*
  Converts YYYY-MM-DD to a local Date.
*/

function parseLocalDate(
  dateValue
) {
  const parts =
    String(
      dateValue || ""
    )
      .split("-")
      .map(Number);

  if (
    parts.length !== 3 ||
    parts.some(
      (part) =>
        !Number.isFinite(part)
    )
  ) {
    return new Date(
      NaN
    );
  }

  const [
    year,
    month,
    day
  ] = parts;

  return new Date(
    year,
    month - 1,
    day
  );
}


/*
  Formats YYYY-MM-DD for display.
*/

function formatDisplayDate(
  dateValue
) {
  const date =
    parseLocalDate(
      dateValue
    );

  if (
    !(date instanceof Date) ||
    Number.isNaN(
      date.getTime()
    )
  ) {
    return (
      dateValue || ""
    );
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


/*
  Simple message renderer.
*/

function showUpcomingWeekMessage(
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


/*
  Prevents schedule text from being interpreted
  as HTML.
*/

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
