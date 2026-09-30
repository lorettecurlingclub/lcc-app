"use strict";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const scheduleContainer =
      document.getElementById(
        "schedule-container"
      );

    if (!scheduleContainer) {
      return;
    }

    if (
      typeof mensLeagueData === "undefined" ||
      !mensLeagueData
    ) {
      showScheduleError(
        scheduleContainer,
        "The Men’s League schedule data could not be loaded."
      );

      return;
    }

    try {
      renderSchedule(
        scheduleContainer,
        mensLeagueData
      );
    } catch (error) {
      console.error(
        "Unable to render the Men’s League schedule:",
        error
      );

      showScheduleError(
        scheduleContainer,
        "The Men’s League schedule could not be displayed."
      );
    }
  }
);


/*
  Creates the complete Men’s League schedule.
*/

function renderSchedule(
  container,
  leagueData
) {
  const schedule =
    Array.isArray(
      leagueData.schedule
    )
      ? leagueData.schedule
      : [];

  if (schedule.length === 0) {
    container.innerHTML = `
      <section class="schedule-message-card">
        <h2>
          2026–27 Schedule Coming Soon
        </h2>

        <p>
          The official Men’s League schedule will be posted here
          once it has been finalized.
        </p>
      </section>
    `;

    return;
  }

  const scheduleByMonth =
    groupScheduleByMonth(
      schedule
    );

  container.innerHTML =
    Object.entries(
      scheduleByMonth
    )
      .map(
        ([monthKey, month]) => `
          <section
            class="schedule-month-section"
            id="${monthKey}"
            data-schedule-month="${monthKey}"
          >
            <h2 class="schedule-month-heading">
              ${escapeHtml(
                month.name
              )}
            </h2>

            <div class="schedule-month-cards">
              ${month.weeks
                .map((week) =>
                  renderScheduleWeek(
                    week,
                    leagueData
                  )
                )
                .join("")}
            </div>
          </section>
        `
      )
      .join("");
}


/*
  Groups schedule entries by month.
*/

function groupScheduleByMonth(
  schedule
) {
  const groupedSchedule = {};

  schedule.forEach((week) => {
    const date =
      parseLocalDate(
        week.date
      );

    if (!date) {
      return;
    }

    const monthKey =
      date
        .toLocaleString(
          "en-CA",
          {
            month: "long"
          }
        )
        .toLowerCase();

    const monthName =
      date.toLocaleString(
        "en-CA",
        {
          month: "long"
        }
      );

    if (!groupedSchedule[monthKey]) {
      groupedSchedule[monthKey] = {
        name: monthName,
        weeks: []
      };
    }

    groupedSchedule[
      monthKey
    ].weeks.push(
      week
    );
  });

  return groupedSchedule;
}


/*
  Creates one weekly schedule card.
*/

function renderScheduleWeek(
  week,
  leagueData
) {
  const phase =
    String(
      week.phase || "regular"
    )
      .trim()
      .toLowerCase();

  const isPlayoffs =
  phase === "playoff" ||
  phase === "playoffs";

const isSpecial =
  phase === "special";

let weekLabel = "";

if (isSpecial) {
  weekLabel = "League Event";
} else if (isPlayoffs) {
  weekLabel =
    `Week ${numberOrBlank(
      week.week
    )} · Playoffs`;
} else {
  weekLabel =
    `Week ${numberOrBlank(
      week.week
    )}`;
}

  /*
    The playoff dates are known, but the actual
    playoff schedule will not be available until
    February.
  */

  if (week.specialEvent) {
    return `
      <article
        class="schedule-card"
        data-week="${numberOrBlank(
          week.week
        )}"
        data-date="${escapeHtml(
          week.date || ""
        )}"
      >
        <header class="schedule-card-header">
          <span class="schedule-week-label">
            ${escapeHtml(
              weekLabel
            )}
          </span>

          <div class="schedule-date-area">
            <span
              class="schedule-calendar-icon"
              aria-hidden="true"
            >
              ▣
            </span>

            <span class="schedule-date-text">
              ${escapeHtml(
                getDisplayDate(
                  week
                )
              )}
            </span>
          </div>
        </header>

        <div
          class="
            schedule-week-information
            schedule-week-information-single
          "
        >
          <div class="schedule-fifty-fifty">
            <strong>
              ${escapeHtml(
                week.specialEvent
              )}
            </strong>
          </div>
        </div>
      </article>
    `;
  }

  return `
    <article
      class="schedule-card"
      data-week="${numberOrBlank(
        week.week
      )}"
      data-date="${escapeHtml(
        week.date || ""
      )}"
    >
      <header class="schedule-card-header">
        <span class="schedule-week-label">
          ${escapeHtml(
            weekLabel
          )}
        </span>

        <div class="schedule-date-area">
          <span
            class="schedule-calendar-icon"
            aria-hidden="true"
          >
            ▣
          </span>

          <span class="schedule-date-text">
            ${escapeHtml(
              getDisplayDate(
                week
              )
            )}
          </span>
        </div>
      </header>

      ${renderWeeklyInformation(
        week,
        leagueData
      )}

      ${renderDrawSection(
        "Early Draw",
        week.earlyTime ||
          "7:00 PM",
        week.earlyGames,
        leagueData
      )}

      ${renderDrawSection(
        "Late Draw",
        week.lateTime ||
          "9:15 PM",
        week.lateGames,
        leagueData
      )}
    </article>
  `;
}


/*
  Creates the 50/50 and Bye information.

  October 1 has no 50/50 assignment listed
  on the official schedule, so only the Bye
  is displayed that week.
*/

function renderWeeklyInformation(
  week,
  leagueData
) {
  const items = [];

  if (
    week.fiftyFiftyTeam !== null &&
    week.fiftyFiftyTeam !== undefined &&
    week.fiftyFiftyTeam !== ""
  ) {
    items.push(`
      <div class="schedule-fifty-fifty">
      
        <span class="schedule-information-label">
          50/50 Team:
        </span>

        <strong>
          ${escapeHtml(
            getTeamName(
              week.fiftyFiftyTeam,
              leagueData
            )
          )}
        </strong>
      </div>
    `);
  }

  if (
    week.byeTeam !== null &&
    week.byeTeam !== undefined &&
    week.byeTeam !== ""
  ) {
    items.push(`
      <div class="schedule-bye">
        <span class="schedule-information-label">
          Bye:
        </span>

        <strong>
          ${escapeHtml(
            getTeamName(
              week.byeTeam,
              leagueData
            )
          )}
        </strong>
      </div>
    `);
  }

  if (items.length === 0) {
    return "";
  }

  return `
    <div
      class="
        schedule-week-information
        schedule-week-information-single
      "
    >
      ${items.join("")}
    </div>
  `;
}


/*
  Creates an Early Draw or Late Draw.
*/

function renderDrawSection(
  drawName,
  drawTime,
  games,
  leagueData
) {
  const drawGames =
    Array.isArray(games)
      ? games
      : [];

  if (drawGames.length === 0) {
    return "";
  }

  return `
    <section class="schedule-draw-section">
      <div class="schedule-draw-heading">
        <h3>
          ${escapeHtml(
            drawName
          )}
        </h3>

        <span class="schedule-draw-time">
          ${escapeHtml(
            drawTime
          )}
        </span>
      </div>

      <div class="schedule-table-wrapper">
        <table class="schedule-table">
          <thead>
            <tr>
              <th scope="col">
                Sheet
              </th>

              <th scope="col">
                Matchup
              </th>

              <th scope="col">
                Winner
              </th>
            </tr>
          </thead>

          <tbody>
            ${drawGames
              .map((game) =>
                renderGameRows(
                  game,
                  leagueData
                )
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}


/*
  Creates one game row.
*/

function renderGameRows(
  game,
  leagueData
) {
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

  const gameRow = `
    <tr class="schedule-game-row">
      <td>
        ${escapeHtml(
          numberOrBlank(
            game.sheet
          )
        )}
      </td>

      <td>
        <span class="schedule-matchup">
          ${renderTeamLabel(
            teamA,
            game,
            "A"
          )}

          <span class="schedule-versus">
            vs
          </span>

          ${renderTeamLabel(
            teamB,
            game,
            "B"
          )}
        </span>
      </td>

      <td>
        ${renderGameResult(
          game,
          leagueData
        )}
      </td>
    </tr>
  `;

  const note =
    getGameNote(
      game
    );

  if (!note) {
    return gameRow;
  }

  return `
    ${gameRow}

    <tr class="schedule-game-notes-row">
      <td colspan="3">
        <span class="schedule-game-note">
          ${escapeHtml(
            note
          )}
        </span>
      </td>
    </tr>
  `;
}


/*
  Returns a numbered regular-season team
  or a future playoff label.
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
  Creates one matchup team label.
*/

function renderTeamLabel(
  displayName,
  game,
  side
) {
  const isWinner =
    isGameWinner(
      game,
      side
    );

  const winningClass =
    isWinner
      ? " schedule-winning-team"
      : "";

  return `
    <span
      class="schedule-team${winningClass}"
    >
      ${escapeHtml(
        displayName
      )}
    </span>
  `;
}


/*
  Determines whether side A or B won.

  This supports both numbered teams and
  future playoff labels.
*/

function isGameWinner(
  game,
  side
) {
  const teamNumber =
    side === "A"
      ? game.teamA
      : game.teamB;

  const teamLabel =
    side === "A"
      ? game.teamALabel
      : game.teamBLabel;

  if (
    game.winner !== null &&
    game.winner !== undefined &&
    game.winner !== "" &&
    teamNumber !== null &&
    teamNumber !== undefined &&
    teamNumber !== ""
  ) {
    return (
      Number(game.winner) ===
      Number(teamNumber)
    );
  }

  if (
    typeof game.winnerLabel === "string" &&
    typeof teamLabel === "string"
  ) {
    return (
      game.winnerLabel
        .trim()
        .toLowerCase() ===
      teamLabel
        .trim()
        .toLowerCase()
    );
  }

  return false;
}


/*
  Creates the Winner column.
*/

function renderGameResult(
  game,
  leagueData
) {
  const resultType =
    normalizeResultType(
      game.resultType
    );

  const winnerName =
    getWinnerName(
      game,
      leagueData
    );

  if (
    resultType === "rescheduled" ||
    resultType === "postponed"
  ) {
    return `
      <span
        class="
          schedule-result
          schedule-result-${resultType}
        "
      >
        ${capitalizeWord(
          resultType
        )}
      </span>
    `;
  }

  if (
    resultType === "cancelled" ||
    resultType === "canceled"
  ) {
    return `
      <span
        class="
          schedule-result
          schedule-result-postponed
        "
      >
        Cancelled
      </span>
    `;
  }

  if (resultType === "tie") {
    return `
      <span
        class="
          schedule-result
          schedule-result-tie
        "
      >
        Tie
      </span>
    `;
  }

  if (
    resultType === "default" ||
    resultType === "forfeit"
  ) {
    return `
      <span
        class="
          schedule-result
          schedule-result-default
        "
      >
        ${
          winnerName
            ? `${escapeHtml(
                winnerName
              )} by default`
            : "Default"
        }
      </span>
    `;
  }

  if (winnerName) {
    return `
      <span
        class="
          schedule-result
          schedule-result-win
        "
      >
        ${escapeHtml(
          winnerName
        )}
      </span>
    `;
  }

  return `
    <span
      class="
        schedule-result
        schedule-result-pending
      "
      aria-label="Winner not entered"
    >
      —
    </span>
  `;
}


/*
  Returns winner text for either a numbered
  team or a future playoff label.
*/

function getWinnerName(
  game,
  leagueData
) {
  if (
    typeof game.winnerLabel === "string" &&
    game.winnerLabel.trim()
  ) {
    return game.winnerLabel.trim();
  }

  if (
    game.winner !== null &&
    game.winner !== undefined &&
    game.winner !== ""
  ) {
    return getTeamName(
      game.winner,
      leagueData
    );
  }

  return "";
}


/*
  Returns one game note.
*/

function getGameNote(
  game
) {
  if (
    typeof game.note === "string" &&
    game.note.trim()
  ) {
    return game.note.trim();
  }

  if (
    typeof game.notes === "string" &&
    game.notes.trim()
  ) {
    return game.notes.trim();
  }

  return "";
}


/*
  Returns a neutral numbered team name.
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
  Returns the schedule display date.
*/

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


/*
  Reads YYYY-MM-DD without UTC date shifting.
*/

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


/*
  Normalizes result types.
*/

function normalizeResultType(
  value
) {
  return String(
    value || ""
  )
    .trim()
    .toLowerCase();
}


/*
  Capitalizes one word.
*/

function capitalizeWord(
  value
) {
  const text =
    String(
      value || ""
    );

  if (!text) {
    return "";
  }

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
}


/*
  Returns a number or an empty string.
*/

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


/*
  Error state.
*/

function showScheduleError(
  container,
  message
) {
  container.innerHTML = `
    <section class="schedule-message-card">
      <h2>
        Schedule Unavailable
      </h2>

      <p>
        ${escapeHtml(
          message
        )}
      </p>
    </section>
  `;
}


/*
  Prevents schedule text from being
  interpreted as HTML.
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
