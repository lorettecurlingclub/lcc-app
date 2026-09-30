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
      typeof doublesLeagueData === "undefined" ||
      !doublesLeagueData
    ) {
      showScheduleError(
        scheduleContainer,
        "The Doubles League schedule could not be loaded."
      );

      return;
    }

    try {
      renderSchedule(
        scheduleContainer,
        doublesLeagueData
      );
    } catch (error) {
      console.error(
        "Unable to render the Doubles League schedule:",
        error
      );

      showScheduleError(
        scheduleContainer,
        "The Doubles League schedule could not be displayed."
      );
    }
  }
);


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
          Fall Doubles Schedule Coming Soon
        </h2>

        <p>
          The Fall Doubles schedule will appear here
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

  const weekLabel =
    isPlayoffs
      ? `Week ${numberOrBlank(
          week.week
        )} · Playoffs`
      : `Week ${numberOrBlank(
          week.week
        )}`;

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

      ${renderByeInformation(
        week,
        leagueData
      )}

      ${renderDrawSection(
        week,
        leagueData
      )}
    </article>
  `;
}


function renderByeInformation(
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
    <div
      class="
        schedule-week-information
        schedule-week-information-single
      "
    >
      <div class="schedule-bye">
        <span class="schedule-information-label">
          Bye:
        </span>

        <strong>
          ${escapeHtml(
            byeName
          )}
        </strong>
      </div>
    </div>
  `;
}


function renderDrawSection(
  week,
  leagueData
) {
  const games =
    Array.isArray(
      week.games
    )
      ? week.games
      : [];

  if (games.length === 0) {
    return "";
  }

  return `
    <section class="schedule-draw-section">
      <div class="schedule-draw-heading">
        <h3>
          Doubles Draw
        </h3>

        <span class="schedule-draw-time">
          ${escapeHtml(
            week.drawTime ||
            "6:30 PM"
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
            ${games
              .map((game) =>
                renderGameRow(
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


function renderGameRow(
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

  return `
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
}


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
    game.winnerLabel.trim() &&
    typeof teamLabel === "string" &&
    teamLabel.trim()
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

  if (
    resultType === "tie"
  ) {
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


function normalizeResultType(
  value
) {
  return String(
    value || ""
  )
    .trim()
    .toLowerCase();
}


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
