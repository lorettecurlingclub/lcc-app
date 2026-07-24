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
      typeof mensLeagueData === "undefined" ||
      !mensLeagueData
    ) {
      showUpcomingWeekMessage(
        container,
        "The Men’s League schedule could not be loaded."
      );

      return;
    }

    renderUpcomingWeek(
      container,
      mensLeagueData
    );
  }
);


function renderUpcomingWeek(
  container,
  leagueData
) {
  const schedule = Array.isArray(
    leagueData.schedule
  )
    ? leagueData.schedule
    : [];

  const upcomingWeek =
    findUpcomingWeek(schedule);

  if (!upcomingWeek) {
    updatePhaseBubble(null);

    showUpcomingWeekMessage(
      container,
      "The 2026–27 Men’s League schedule has been completed."
    );

    return;
  }

  updatePhaseBubble(
    upcomingWeek.phase
  );

  container.innerHTML = `
    <div class="upcoming-week-date">
      <strong>
        ${escapeHtml(
          getDisplayDate(upcomingWeek)
        )}
      </strong>

      <span class="upcoming-week-number">
        Week ${numberOrBlank(
          upcomingWeek.week
        )}
      </span>
    </div>

    ${renderUpcomingDraw(
      "Early Draw",
      upcomingWeek.earlyTime ||
        "7:00 PM",
      upcomingWeek.earlyGames
    )}

    ${renderUpcomingDraw(
      "Late Draw",
      upcomingWeek.lateTime ||
        "9:15 PM",
      upcomingWeek.lateGames
    )}

    ${renderUpcomingInformation(
      upcomingWeek
    )}
  `;
}


function findUpcomingWeek(schedule) {
  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const validWeeks = schedule
    .filter((week) => {
      return Boolean(
        parseLocalDate(week.date)
      );
    })
    .sort((weekA, weekB) => {
      return (
        parseLocalDate(weekA.date) -
        parseLocalDate(weekB.date)
      );
    });

  return (
    validWeeks.find((week) => {
      const weekDate =
        parseLocalDate(week.date);

      return weekDate >= today;
    }) || null
  );
}


function renderUpcomingDraw(
  drawName,
  drawTime,
  games
) {
  const drawGames = Array.isArray(games)
    ? games
    : [];

  if (drawGames.length === 0) {
    return "";
  }

  return `
    <section class="upcoming-week-draw">
      <h3>
        ${escapeHtml(drawName)}
        ·
        ${escapeHtml(drawTime)}
      </h3>

      ${drawGames
        .map(renderUpcomingGame)
        .join("")}
    </section>
  `;
}


function renderUpcomingGame(game) {
  return `
    <div class="upcoming-week-game">
      <span class="upcoming-week-sheet">
        Sheet ${numberOrBlank(game.sheet)}
      </span>

      <div class="upcoming-week-matchup">
        <span>
          Team ${numberOrBlank(game.teamA)}
        </span>

        <span class="upcoming-week-vs">
          vs
        </span>

        <span>
          Team ${numberOrBlank(game.teamB)}
        </span>
      </div>
    </div>
  `;
}


function renderUpcomingInformation(week) {
  const fiftyFiftyTeam =
    week.fiftyFiftyTeam === null ||
    week.fiftyFiftyTeam === undefined ||
    week.fiftyFiftyTeam === ""
      ? "—"
      : `Team ${week.fiftyFiftyTeam}`;

  return `
    <div class="upcoming-week-fifty-fifty">
      <p style="grid-column: 1 / -1;">
        <strong>50/50 Team:</strong>
        ${escapeHtml(fiftyFiftyTeam)}
      </p>
    </div>
  `;
}


function updatePhaseBubble(phase) {
  const phaseBubble =
    document.getElementById(
      "upcoming-week-phase"
    );

  if (!phaseBubble) {
    return;
  }

  if (!phase) {
    phaseBubble.hidden = true;
    phaseBubble.classList.remove(
      "playoffs"
    );

    return;
  }

  const normalizedPhase = String(phase)
    .trim()
    .toLowerCase();

  const isPlayoffs =
    normalizedPhase === "playoff" ||
    normalizedPhase === "playoffs";

  phaseBubble.textContent = isPlayoffs
    ? "Playoffs"
    : "Regular Season";

  phaseBubble.classList.toggle(
    "playoffs",
    isPlayoffs
  );

  phaseBubble.hidden = false;
}


function getDisplayDate(week) {
  if (
    typeof week.displayDate === "string" &&
    week.displayDate.trim()
  ) {
    return week.displayDate.trim();
  }

  const date = parseLocalDate(
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


function parseLocalDate(value) {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return null;
  }

  const date = new Date(
    `${value.trim()}T00:00:00`
  );

  return Number.isNaN(
    date.getTime()
  )
    ? null
    : date;
}


function showUpcomingWeekMessage(
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


function numberOrBlank(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : "";
}


function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
