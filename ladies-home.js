"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById(
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
  !Array.isArray(ladiesLeagueData.schedule) ||
  ladiesLeagueData.schedule.length === 0
) {
  updateUpcomingWeekPhase(null);

  container.innerHTML = `
    <div class="upcoming-week-message">
      <p>
        <strong>Schedule Coming Soon</strong>
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
    const upcomingWeek = findUpcomingWeek(
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

    showUpcomingWeekMessage(
      container,
      "The upcoming league night could not be displayed."
    );
  }
});


function findUpcomingWeek(schedule) {
  if (!Array.isArray(schedule)) {
    return null;
  }

  const today = startOfToday();

  return schedule
    .filter((week) => {
      return week && week.date;
    })
    .slice()
    .sort((weekA, weekB) => {
      return parseLocalDate(weekA.date) -
        parseLocalDate(weekB.date);
    })
    .find((week) => {
      const weekDate = parseLocalDate(week.date);

      return (
        weekDate instanceof Date &&
        !Number.isNaN(weekDate.getTime()) &&
        weekDate >= today
      );
    }) || null;
}


function renderUpcomingWeek(
  container,
  week,
  leagueData
) {
  const earlyGames = Array.isArray(week.earlyGames)
    ? week.earlyGames
    : [];

  const lateGames = Array.isArray(week.lateGames)
    ? week.lateGames
    : [];

  updateUpcomingWeekPhase(week);
  
  container.innerHTML = `
    <div class="upcoming-week-date">
      <strong>
        ${escapeHtml(week.displayDate || week.date)}
      </strong>

      <div class="upcoming-week-number">
        Week ${escapeHtml(week.week)}
      </div>
    </div>

    ${renderDraw(
      "Early Draw",
      week.earlyTime,
      earlyGames,
      leagueData
    )}

    ${renderDraw(
      "Late Draw",
      week.lateTime,
      lateGames,
      leagueData
    )}

    <div class="upcoming-week-fifty-fifty">
      <p>
        <strong>50/50 Team:</strong>
        ${escapeHtml(
          getTeamName(
            week.fiftyFiftyTeam,
            leagueData
          )
        )}
      </p>

      <p>
        <strong>Bye:</strong>
        ${escapeHtml(
          getTeamName(
            week.byeTeam,
            leagueData
          )
        )}
      </p>
    </div>
  `;
}


function updateUpcomingWeekPhase(week) {
  const phaseBubble = document.getElementById(
    "upcoming-week-phase"
  );

  if (!phaseBubble) {
    return;
  }

  if (!week) {
    phaseBubble.hidden = true;
    return;
  }

  const phase = String(
    week.phase || "regular"
  ).toLowerCase();

  const isPlayoffs =
    phase === "playoff" ||
    phase === "playoffs";

  phaseBubble.textContent = isPlayoffs
    ? "Playoffs"
    : "Regular Season";

  phaseBubble.classList.toggle(
    "playoffs",
    isPlayoffs
  );

  phaseBubble.hidden = false;
}

function renderDraw(
  drawName,
  drawTime,
  games,
  leagueData
) {
  if (!games.length) {
    return "";
  }

  const gameRows = games
    .map((game) => {
      const teamA = getTeamName(
        game.teamA,
        leagueData
      );

      const teamB = getTeamName(
        game.teamB,
        leagueData
      );

      return `
        <div class="upcoming-week-game">
          <div class="upcoming-week-sheet">
            Sheet ${escapeHtml(game.sheet)}
          </div>

          <div class="upcoming-week-matchup">
            <span>${escapeHtml(teamA)}</span>

            <span class="upcoming-week-vs">
              vs
            </span>

            <span>${escapeHtml(teamB)}</span>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <section class="upcoming-week-draw">
      <h3>
        ${escapeHtml(drawName)}
        ·
        ${escapeHtml(drawTime || "")}
      </h3>

      ${gameRows}
    </section>
  `;
}


function getTeamName(teamNumber, leagueData) {
  if (
    teamNumber === null ||
    teamNumber === undefined ||
    teamNumber === ""
  ) {
    return "To Be Announced";
  }

  const teams = leagueData.teams || {};

  return teams[teamNumber] ||
    `Team ${teamNumber}`;
}


function startOfToday() {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
}


function parseLocalDate(dateValue) {
  const parts = String(dateValue || "")
    .split("-")
    .map(Number);

  if (
    parts.length !== 3 ||
    parts.some((part) => !Number.isFinite(part))
  ) {
    return new Date(NaN);
  }

  const [year, month, day] = parts;

  return new Date(
    year,
    month - 1,
    day
  );
}


function showUpcomingWeekMessage(
  container,
  message
) {
  container.innerHTML = `
    <div class="upcoming-week-message">
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}


function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
