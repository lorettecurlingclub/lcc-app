"use strict";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const container =
      document.getElementById(
        "schedule-container"
      );

    if (!container) {
      return;
    }

    if (
      typeof mixedLeagueData === "undefined" ||
      !mixedLeagueData
    ) {
      renderScheduleError(
        container,
        "The Mixed League schedule could not be loaded."
      );

      return;
    }

    renderSchedule(
      container,
      mixedLeagueData
    );
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
      <h2>2026–27 Schedule Coming Soon</h2>

      <p>
        The official Mixed League schedule will be posted here
        once it has been finalized.
      </p>
    </section>
  `;

  return;
}

  const groupedSchedule =
    groupScheduleByMonth(
      schedule
    );

  container.innerHTML =
    groupedSchedule
      .map(renderMonthSection)
      .join("");
}


function groupScheduleByMonth(
  schedule
) {
  const monthOrder = [
    "October",
    "November",
    "December",
    "January",
    "February",
    "March"
  ];

  const monthGroups =
    new Map();

  monthOrder.forEach((month) => {
    monthGroups.set(
      month,
      []
    );
  });

  [...schedule]
    .sort(compareScheduleWeeks)
    .forEach((week) => {
      const monthName =
        getMonthName(week);

      if (!monthName) {
        return;
      }

      if (
        !monthGroups.has(monthName)
      ) {
        monthGroups.set(
          monthName,
          []
        );
      }

      monthGroups
        .get(monthName)
        .push(week);
    });

  return monthOrder
    .map((monthName) => {
      return {
        monthName,
        weeks:
          monthGroups.get(
            monthName
          ) || []
      };
    })
    .filter((month) => {
      return month.weeks.length > 0;
    });
}


function renderMonthSection(month) {
  const monthId =
    month.monthName.toLowerCase();

  return `
    <section
      id="${escapeHtml(monthId)}"
      class="schedule-month-section"
      aria-labelledby="${escapeHtml(
        `${monthId}-heading`
      )}"
    >
      <h2
        id="${escapeHtml(
          `${monthId}-heading`
        )}"
        class="schedule-month-heading"
      >
        ${escapeHtml(
          month.monthName
        )}
      </h2>

      <div class="schedule-month-cards">
        ${month.weeks
          .map(renderScheduleCard)
          .join("")}
      </div>
    </section>
  `;
}


function renderScheduleCard(week) {
  const earlyGames =
    normalizeGames(
      week.earlyGames
    );

  const lateGames =
    normalizeGames(
      week.lateGames
    );

  return `
    <article class="schedule-card">
      <header class="schedule-card-header">
        <span class="schedule-week-label">
          Week ${numberOrBlank(
            week.week
          )}
        </span>

        <span class="schedule-date-area">
          <span class="schedule-date-text">
            ${escapeHtml(
              getDisplayDate(week)
            )}
          </span>
        </span>
      </header>

      ${renderWeekInformation(week)}

      ${renderDrawSection(
        "Early Draw",
        week.earlyTime ||
          "7:00 PM",
        earlyGames
      )}

      ${renderDrawSection(
        "Late Draw",
        week.lateTime ||
          "9:15 PM",
        lateGames
      )}
    </article>
  `;
}


function renderWeekInformation(week) {
  return `
    <div class="schedule-week-information">
      <div
        class="
          schedule-fifty-fifty
          schedule-secondary-information
        "
      >
        <span class="schedule-information-label">
          50/50 Team
        </span>

        <strong>
          ${formatTeamNumber(
            week.fiftyFiftyTeam
          )}
        </strong>
      </div>

      <div
        class="
          schedule-bye
          schedule-secondary-information
        "
      >
        <span class="schedule-information-label">
          Bye Week
        </span>

        <strong>
          ${formatTeamNumber(
            week.byeTeam
          )}
        </strong>
      </div>
    </div>
  `;
}


function renderDrawSection(
  drawName,
  drawTime,
  games
) {
  if (games.length === 0) {
    return "";
  }

  return `
    <section class="schedule-draw-section">
      <div class="schedule-draw-heading">
        <h3>
          ${escapeHtml(drawName)}
        </h3>

        <span class="schedule-draw-time">
          ${escapeHtml(drawTime)}
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
              .map(renderGameRows)
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}


function renderGameRows(game) {
  const result =
    getGameResult(game);

  const notes =
    getGameNotes(game);

  return `
    <tr class="schedule-game-row">
      <td>
        ${numberOrBlank(
          game.sheet
        )}
      </td>

      <td>
        <span class="schedule-matchup">
          ${renderTeamLabel(
            game.teamA,
            game
          )}

          <span class="schedule-versus">
            vs
          </span>

          ${renderTeamLabel(
            game.teamB,
            game
          )}
        </span>
      </td>

      <td>
        <span
          class="
            schedule-result
            ${result.className}
          "
        >
          ${escapeHtml(
            result.text
          )}
        </span>
      </td>
    </tr>

    ${notes
      ? `
        <tr class="schedule-game-notes-row">
          <td colspan="3">
            <span class="schedule-game-note">
              ${escapeHtml(notes)}
            </span>
          </td>
        </tr>
      `
      : ""}
  `;
}


function renderTeamLabel(
  teamNumber,
  game
) {
  const number =
    Number(teamNumber);

  const winner =
    Number(game.winner);

  const isWinner =
    Number.isFinite(winner) &&
    winner === number;

  return `
    <span
      class="${
        isWinner
          ? "schedule-winning-team"
          : ""
      }"
    >
      Team ${numberOrBlank(number)}
    </span>
  `;
}


function getGameResult(game) {
  const resultType =
    normalizeResultType(
      game.resultType
    );

  const winner =
    Number(game.winner);

  if (
    resultType === "tie" ||
    normalizeResultType(
      game.winner
    ) === "tie"
  ) {
    return {
      text: "Tie",
      className:
        "schedule-result-tie"
    };
  }

  if (
    resultType === "rescheduled"
  ) {
    return {
      text: "Rescheduled",
      className:
        "schedule-result-rescheduled"
    };
  }

  if (
    resultType === "postponed"
  ) {
    return {
      text: "Postponed",
      className:
        "schedule-result-postponed"
    };
  }

  if (
    resultType === "cancelled" ||
    resultType === "canceled"
  ) {
    return {
      text: "Cancelled",
      className:
        "schedule-result-postponed"
    };
  }

  if (
    resultType === "no-contest"
  ) {
    return {
      text: "No Contest",
      className:
        "schedule-result-postponed"
    };
  }

  if (
    isDefaultResult(resultType) &&
    Number.isFinite(winner)
  ) {
    return {
      text:
        `Team ${winner} by forfeit`,
      className:
        "schedule-result-default"
    };
  }

  if (
    Number.isFinite(winner)
  ) {
    return {
      text: `Team ${winner}`,
      className:
        "schedule-result-win"
    };
  }

  return {
    text: "—",
    className:
      "schedule-result-pending"
  };
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


function getGameNotes(game) {
  const possibleNotes = [
    game.notes,
    game.note,
    game.resultNote,
    game.rescheduleNote
  ];

  const note =
    possibleNotes.find((value) => {
      return (
        typeof value === "string" &&
        value.trim()
      );
    });

  return note
    ? note.trim()
    : "";
}


function getDisplayDate(week) {
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


function getMonthName(week) {
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
      month: "long"
    }
  );
}


function compareScheduleWeeks(
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

  if (dateA && dateB) {
    return dateA - dateB;
  }

  return (
    numberOrZero(weekA.week) -
    numberOrZero(weekB.week)
  );
}


function parseLocalDate(value) {
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


function normalizeGames(games) {
  return Array.isArray(games)
    ? games
    : [];
}


function normalizeResultType(value) {
  return String(
    value ?? ""
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}


function formatTeamNumber(value) {
  const number =
    Number(value);

  return Number.isFinite(number)
    ? `Team ${number}`
    : "—";
}


function numberOrBlank(value) {
  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : "";
}


function numberOrZero(value) {
  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}


function renderScheduleError(
  container,
  message
) {
  container.innerHTML = `
    <section class="schedule-message-card">
      <h2>
        Schedule Unavailable
      </h2>

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
