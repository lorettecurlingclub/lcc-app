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
      typeof doublesLeagueData === "undefined" ||
      !doublesLeagueData
    ) {
      renderScheduleError(
        container,
        "The Doubles League schedule could not be loaded."
      );

      return;
    }

    renderSchedule(
      container,
      doublesLeagueData
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
      ? [...leagueData.schedule]
      : [];

  if (schedule.length === 0) {
    renderScheduleError(
      container,
      "No Doubles League schedule is currently available."
    );

    return;
  }

  schedule.sort(compareWeeks);

  const months =
    groupScheduleByMonth(
      schedule
    );

  container.innerHTML =
    months
      .map((month) => {
        return renderMonth(
          month,
          leagueData
        );
      })
      .join("");
}


function groupScheduleByMonth(
  schedule
) {
  const groupedMonths =
    new Map();

  schedule.forEach((week) => {
    const date =
      parseLocalDate(
        week.date
      );

    if (!date) {
      return;
    }

    const monthId =
      date
        .toLocaleDateString(
          "en-CA",
          {
            month: "long"
          }
        )
        .toLowerCase();

    const monthName =
      date.toLocaleDateString(
        "en-CA",
        {
          month: "long"
        }
      );

    if (
      !groupedMonths.has(
        monthId
      )
    ) {
      groupedMonths.set(
        monthId,
        {
          id: monthId,
          name: monthName,
          weeks: []
        }
      );
    }

    groupedMonths
      .get(monthId)
      .weeks
      .push(week);
  });

  return Array.from(
    groupedMonths.values()
  );
}


function renderMonth(
  month,
  leagueData
) {
  return `
    <section
      id="${escapeHtml(month.id)}"
      class="schedule-month-section"
    >
      <h2 class="schedule-month-heading">
        ${escapeHtml(month.name)}
      </h2>

      <div class="schedule-month-cards">
        ${month.weeks
          .map((week) => {
            return renderWeek(
              week,
              leagueData
            );
          })
          .join("")}
      </div>
    </section>
  `;
}


function renderWeek(
  week,
  leagueData
) {
  const phase =
    normalizeValue(
      week.phase
    );

  const isPlayoffs =
    phase === "playoffs" ||
    phase === "playoff";

  const games =
    Array.isArray(
      week.games
    )
      ? week.games
      : [];

  return `
    <article class="schedule-card">

      <header class="schedule-card-header">
        <span class="schedule-week-label">
          Week ${numberOrBlank(
            week.week
          )}
          ${isPlayoffs
            ? " · Playoffs"
            : ""}
        </span>

        <span class="schedule-date-area">
          ${escapeHtml(
            getDisplayDate(
              week
            )
          )}
        </span>
      </header>

      ${renderWeekInformation(
        week,
        leagueData,
        isPlayoffs
      )}

      <section class="schedule-draw-section">
        <header class="schedule-draw-heading">
          <span>
            ${isPlayoffs
              ? escapeHtml(
                  week.roundName ||
                  "Playoff Draw"
                )
              : "Doubles Draw"}
          </span>

          <span class="schedule-draw-time">
            ${escapeHtml(
              week.drawTime ||
              "4:30 PM"
            )}
          </span>
        </header>

        ${renderGamesTable(
          games,
          leagueData
        )}
      </section>

    </article>
  `;
}


function renderWeekInformation(
  week,
  leagueData,
  isPlayoffs
) {
  const fiftyFiftyTeam =
    formatTeam(
      week.fiftyFiftyTeam,
      leagueData
    );

  if (
    isPlayoffs &&
    week.roundName
  ) {
    return `
      <div class="schedule-week-information">

        <div class="schedule-fifty-fifty">
          <strong>
            50/50 Team
          </strong>

          <span>
            ${fiftyFiftyTeam}
          </span>
        </div>

        <div class="schedule-bye">
          <strong>
            Round
          </strong>

          <span>
            ${escapeHtml(
              week.roundName
            )}
          </span>
        </div>

      </div>
    `;
  }

  return `
    <div
      class="
        schedule-week-information
        schedule-week-information-single
      "
    >
      <div class="schedule-fifty-fifty">
        <strong>
          50/50 Team
        </strong>

        <span>
          ${fiftyFiftyTeam}
        </span>
      </div>
    </div>
  `;
}


function renderGamesTable(
  games,
  leagueData
) {
  if (games.length === 0) {
    return `
      <div class="schedule-message-card">
        <p>
          No games are listed for this week.
        </p>
      </div>
    `;
  }

  return `
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
              Result
            </th>
          </tr>
        </thead>

        <tbody>
          ${games
            .map((game) => {
              return renderGameRow(
                game,
                leagueData
              );
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}


function renderGameRow(
  game,
  leagueData
) {
  const teamA =
    getGameTeamLabel(
      game,
      "A",
      leagueData
    );

  const teamB =
    getGameTeamLabel(
      game,
      "B",
      leagueData
    );

  const gameLabel =
    typeof game.gameLabel === "string" &&
    game.gameLabel.trim()
      ? `
          <span class="schedule-secondary-information">
            ${escapeHtml(
              game.gameLabel.trim()
            )}
          </span>
        `
      : "";

  return `
    <tr class="schedule-game-row">
      <td>
        Sheet ${numberOrBlank(
          game.sheet
        )}
      </td>

      <td>
        <div class="schedule-matchup">
          <span>
            ${teamA}
          </span>

          <span class="schedule-versus">
            vs
          </span>

          <span>
            ${teamB}
          </span>
        </div>

        ${gameLabel}
      </td>

      <td class="schedule-result">
        ${renderGameResult(
          game,
          leagueData
        )}
      </td>
    </tr>
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


function renderGameResult(
  game,
  leagueData
) {
  const resultType =
    normalizeValue(
      game.resultType
    );

  if (
    !resultType ||
    resultType === "pending"
  ) {
    return `
      <span class="schedule-result-pending">
        —
      </span>
    `;
  }

  if (
    resultType === "tie"
  ) {
    return `
      <span class="schedule-result-tie">
        Tie
      </span>
    `;
  }

  if (
    resultType === "rescheduled"
  ) {
    return `
      <span class="schedule-result-rescheduled">
        Rescheduled
      </span>
    `;
  }

  if (
    resultType === "postponed"
  ) {
    return `
      <span class="schedule-result-rescheduled">
        Postponed
      </span>
    `;
  }

  if (
    resultType === "cancelled" ||
    resultType === "canceled"
  ) {
    return `
      <span class="schedule-result-rescheduled">
        Cancelled
      </span>
    `;
  }

  if (
    resultType === "no-contest"
  ) {
    return `
      <span class="schedule-result-rescheduled">
        No Contest
      </span>
    `;
  }

  const winner =
    formatWinner(
      game,
      leagueData
    );

  if (
    resultType === "default" ||
    resultType === "forfeit" ||
    resultType === "default-win" ||
    resultType === "forfeit-win"
  ) {
    return `
      <span class="schedule-result-winner">
        ${winner}
      </span>

      <span class="schedule-result-detail">
        by forfeit
      </span>
    `;
  }

  if (
    resultType === "win" ||
    resultType === "completed" ||
    resultType === "final"
  ) {
    return `
      <span class="schedule-result-winner">
        ${winner}
      </span>
    `;
  }

  return `
    <span class="schedule-result-pending">
      —
    </span>
  `;
}


function formatWinner(
  game,
  leagueData
) {
  const winnerNumber =
    Number(
      game.winner
    );

  if (
    Number.isFinite(
      winnerNumber
    )
  ) {
    return `${formatTeam(
      winnerNumber,
      leagueData
    )} wins`;
  }

  if (
    typeof game.winnerLabel === "string" &&
    game.winnerLabel.trim()
  ) {
    return `${escapeHtml(
      game.winnerLabel.trim()
    )} wins`;
  }

  return "Winner TBD";
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
    return "TBD";
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


function renderScheduleError(
  container,
  message
) {
  container.innerHTML = `
    <section class="schedule-message-card">
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
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
