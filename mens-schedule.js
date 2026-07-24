"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const scheduleContainer =
    document.getElementById("schedule-container");

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
});


function renderSchedule(
  container,
  leagueData
) {
  const schedule = Array.isArray(
    leagueData.schedule
  )
    ? leagueData.schedule
    : [];

  if (schedule.length === 0) {
    container.innerHTML = `
      <section class="schedule-message-card">
        <h2>Schedule Unavailable</h2>

        <p>
          The Men’s League schedule has not been added yet.
        </p>
      </section>
    `;

    return;
  }

  const scheduleByMonth =
    groupScheduleByMonth(schedule);

  container.innerHTML = Object.entries(
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
            ${escapeHtml(month.name)}
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


function groupScheduleByMonth(schedule) {
  const groupedSchedule = {};

  schedule.forEach((week) => {
    const date = parseLocalDate(week.date);

    if (!date) {
      return;
    }

    const monthKey = date
      .toLocaleString("en-CA", {
        month: "long"
      })
      .toLowerCase();

    const monthName = date.toLocaleString(
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

    groupedSchedule[monthKey].weeks.push(
      week
    );
  });

  return groupedSchedule;
}


function renderScheduleWeek(
  week,
  leagueData
) {
  const fiftyFiftyText =
    week.fiftyFiftyTeam === null ||
    week.fiftyFiftyTeam === undefined ||
    week.fiftyFiftyTeam === ""
      ? "—"
      : `Team ${week.fiftyFiftyTeam}`;

  return `
    <article
      class="schedule-card"
      data-week="${numberOrBlank(week.week)}"
      data-date="${escapeHtml(week.date || "")}"
    >
      <header class="schedule-card-header">
        <span class="schedule-week-label">
          Week ${numberOrBlank(week.week)}
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
              getDisplayDate(week)
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
        <div
          class="
            schedule-fifty-fifty
            schedule-secondary-information
          "
        >
          <span class="schedule-information-label">
            50/50 Team:
          </span>

          <strong>
            ${escapeHtml(fiftyFiftyText)}
          </strong>
        </div>
      </div>

      ${renderDrawSection(
        "Early Draw",
        week.earlyTime || "7:00 PM",
        week.earlyGames,
        leagueData
      )}

      ${renderDrawSection(
        "Late Draw",
        week.lateTime || "9:15 PM",
        week.lateGames,
        leagueData
      )}
    </article>
  `;
}


function renderDrawSection(
  drawName,
  drawTime,
  games,
  leagueData
) {
  const drawGames = Array.isArray(games)
    ? games
    : [];

  if (drawGames.length === 0) {
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
              <th scope="col">Sheet</th>
              <th scope="col">Matchup</th>
              <th scope="col">Winner</th>
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


function renderGameRows(
  game,
  leagueData
) {
  const teamA = Number(game.teamA);
  const teamB = Number(game.teamB);

  const gameRow = `
    <tr class="schedule-game-row">
      <td>
        ${numberOrBlank(game.sheet)}
      </td>

      <td>
  <span class="schedule-matchup">
    ${renderTeamLabel(
      teamA,
      game,
      leagueData
    )}

    <span class="schedule-versus">
      vs
    </span>

    ${renderTeamLabel(
      teamB,
      game,
      leagueData
    )}
  </span>
</td>
      </td>

      <td>
        ${renderGameResult(game)}
      </td>
    </tr>
  `;

  const note = getGameNote(game);

  if (!note) {
    return gameRow;
  }

  return `
    ${gameRow}

    <tr class="schedule-game-notes-row">
      <td colspan="3">
        <span class="schedule-game-note">
          ${escapeHtml(note)}
        </span>
      </td>
    </tr>
  `;
}


function renderTeamLabel(
  teamNumber,
  game,
  leagueData
) {
  const winner =
    game.winner === null ||
    game.winner === undefined ||
    game.winner === ""
      ? null
      : Number(game.winner);

  const winningClass =
    winner === teamNumber
      ? " schedule-winning-team"
      : "";

  const northamClass =
    Number(leagueData.teamNorthamNumber) ===
    teamNumber
      ? " schedule-team-northam"
      : "";

  return `
    <span
      class="
        schedule-team${winningClass}${northamClass}
      "
    >
      Team ${numberOrBlank(teamNumber)}
    </span>
  `;
}


function renderGameResult(game) {
  const resultType = normalizeResultType(
    game.resultType
  );

  const winner =
    game.winner === null ||
    game.winner === undefined ||
    game.winner === ""
      ? null
      : Number(game.winner);

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
        ${capitalizeWord(resultType)}
      </span>
    `;
  }

  if (resultType === "cancelled") {
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
    if (!Number.isFinite(winner)) {
      return `
        <span
          class="
            schedule-result
            schedule-result-default
          "
        >
          Default
        </span>
      `;
    }

    return `
      <span
        class="
          schedule-result
          schedule-result-default
        "
      >
        Team ${winner} by default
      </span>
    `;
  }

  if (Number.isFinite(winner)) {
    return `
      <span
        class="
          schedule-result
          schedule-result-win
        "
      >
        Team ${winner}
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


function getGameNote(game) {
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


function getDisplayDate(week) {
  if (
    typeof week.displayDate === "string" &&
    week.displayDate.trim()
  ) {
    return week.displayDate.trim();
  }

  const date = parseLocalDate(week.date);

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


function parseLocalDate(value) {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return null;
  }

  const date = new Date(
    `${value.trim()}T12:00:00`
  );

  return Number.isNaN(date.getTime())
    ? null
    : date;
}


function normalizeResultType(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}


function capitalizeWord(value) {
  const text = String(value || "");

  if (!text) {
    return "";
  }

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
}


function numberOrBlank(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : "";
}


function showScheduleError(
  container,
  message
) {
  container.innerHTML = `
    <section class="schedule-message-card">
      <h2>Schedule Unavailable</h2>

      <p>
        ${escapeHtml(message)}
      </p>
    </section>
  `;
}


function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
