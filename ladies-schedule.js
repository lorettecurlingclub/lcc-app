"use strict";

/*
  ladies-schedule.js

  Reads the schedule from ladies-data2026.js and creates
  the complete Ladies League schedule page automatically.

  Supports:
  - Regular-season Team 1–8 matchups
  - A1–A4 / B1–B4 playoff labels
  - Special league dates such as Christmas events/breaks
  - 50/50 assignments
  - Results, defaults and rescheduled games
*/

document.addEventListener(
  "DOMContentLoaded",
  renderLadiesSchedule
);


/*
  Creates the complete schedule.
*/

function renderLadiesSchedule() {
  const scheduleContainer =
    document.getElementById(
      "schedule-container"
    );

  if (!scheduleContainer) {
    console.error(
      'Ladies schedule could not load because "#schedule-container" was not found.'
    );

    return;
  }

  if (
    typeof ladiesLeagueData === "undefined" ||
    !Array.isArray(
      ladiesLeagueData.schedule
    )
  ) {
    scheduleContainer.innerHTML = `
      <section class="schedule-message-card">
        <h2>Schedule unavailable</h2>

        <p>
          The Ladies League schedule data could not be loaded.
        </p>
      </section>
    `;

    console.error(
      "ladiesLeagueData was not found. Make sure ladies-data2026.js loads before ladies-schedule.js."
    );

    return;
  }

  scheduleContainer.innerHTML = "";

  if (
    ladiesLeagueData.schedule.length === 0
  ) {
    scheduleContainer.innerHTML = `
      <section class="schedule-message-card">
        <h2>
          2026–27 Schedule Coming Soon
        </h2>

        <p>
          The official Ladies League schedule will be posted here
          once it has been finalized.
        </p>
      </section>
    `;

    return;
  }

  const scheduleByMonth =
    groupScheduleByMonth(
      ladiesLeagueData.schedule
    );

  Object.entries(
    scheduleByMonth
  ).forEach(
    ([monthKey, weeks]) => {
      const monthSection =
        createMonthSection(
          monthKey,
          weeks
        );

      scheduleContainer.appendChild(
        monthSection
      );
    }
  );
}


/*
  Groups all schedule entries by calendar month.
*/

function groupScheduleByMonth(
  schedule
) {
  return schedule.reduce(
    (months, week) => {
      const date =
        parseLocalDate(
          week.date
        );

      if (!date) {
        return months;
      }

      const monthKey =
        `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

      if (!months[monthKey]) {
        months[monthKey] = [];
      }

      months[monthKey].push(
        week
      );

      return months;
    },
    {}
  );
}


/*
  Creates one month section.
*/

function createMonthSection(
  monthKey,
  weeks
) {
  const monthSection =
    document.createElement(
      "section"
    );

  const firstWeekDate =
    parseLocalDate(
      weeks[0].date
    );

  const monthName =
    firstWeekDate.toLocaleDateString(
      "en-CA",
      {
        month: "long",
        year: "numeric"
      }
    );

  const monthId =
    firstWeekDate
      .toLocaleDateString(
        "en-CA",
        {
          month: "long"
        }
      )
      .toLowerCase();

  monthSection.className =
    "schedule-month-section";

  monthSection.id =
    monthId;

  monthSection.dataset.month =
    monthKey;

  const monthHeading =
    document.createElement(
      "h2"
    );

  monthHeading.className =
    "schedule-month-heading";

  monthHeading.textContent =
    monthName;

  const cardsContainer =
    document.createElement(
      "div"
    );

  cardsContainer.className =
    "schedule-month-cards";

  weeks.forEach((week) => {
    cardsContainer.appendChild(
      createScheduleCard(
        week
      )
    );
  });

  monthSection.appendChild(
    monthHeading
  );

  monthSection.appendChild(
    cardsContainer
  );

  return monthSection;
}


/*
  Creates one weekly/event schedule card.
*/

function createScheduleCard(
  week
) {
  const card =
    document.createElement(
      "article"
    );

  card.className =
    "schedule-card";

  if (
    week.week !== null &&
    week.week !== undefined
  ) {
    card.id =
      `week-${week.week}`;
  } else {
    card.id =
      `schedule-${week.date}`;
  }

  card.dataset.date =
    week.date;

  card.appendChild(
    createCardHeader(
      week
    )
  );

  /*
    Special dates such as the Christmas party
    and Christmas break do not contain games.
  */

  if (week.specialEvent) {
    card.appendChild(
      createSpecialEventArea(
        week.specialEvent
      )
    );

    return card;
  }

  const informationArea =
    createWeeklyInformation(
      week
    );

  if (informationArea) {
    card.appendChild(
      informationArea
    );
  }

  if (week.notes) {
    card.appendChild(
      createWeekNote(
        week.notes
      )
    );
  }

  if (
    Array.isArray(
      week.earlyGames
    ) &&
    week.earlyGames.length > 0
  ) {
    card.appendChild(
      createDrawSection(
        "Early Draw",
        week.earlyTime ||
          "7:00 PM",
        week.earlyGames
      )
    );
  }

  if (
    Array.isArray(
      week.lateGames
    ) &&
    week.lateGames.length > 0
  ) {
    card.appendChild(
      createDrawSection(
        "Late Draw",
        week.lateTime ||
          "9:15 PM",
        week.lateGames
      )
    );
  }

  return card;
}


/*
  Creates the top of each schedule card.
*/

function createCardHeader(
  week
) {
  const header =
    document.createElement(
      "header"
    );

  header.className =
    "schedule-card-header";

  const weekLabel =
    document.createElement(
      "div"
    );

  weekLabel.className =
    "schedule-week-label";

  const phase =
    String(
      week.phase || ""
    )
      .trim()
      .toLowerCase();

  if (
    phase === "special"
  ) {
    weekLabel.textContent =
      "League Event";
  } else if (
    phase === "playoff" ||
    phase === "playoffs"
  ) {
    weekLabel.textContent =
      `Week ${week.week} · Playoffs`;
  } else {
    weekLabel.textContent =
      `Week ${week.week}`;
  }

  const dateArea =
    document.createElement(
      "div"
    );

  dateArea.className =
    "schedule-date-area";

  const calendarIcon =
    document.createElement(
      "span"
    );

  calendarIcon.className =
    "schedule-calendar-icon";

  calendarIcon.setAttribute(
    "aria-hidden",
    "true"
  );

  calendarIcon.textContent =
    "📅";

  const dateText =
    document.createElement(
      "span"
    );

  dateText.className =
    "schedule-date-text";

  dateText.textContent =
    week.displayDate ||
    formatDisplayDate(
      week.date
    );

  dateArea.appendChild(
    calendarIcon
  );

  dateArea.appendChild(
    dateText
  );

  header.appendChild(
    weekLabel
  );

  header.appendChild(
    dateArea
  );

  return header;
}


/*
  Creates the special-event message
  for non-game dates.
*/

function createSpecialEventArea(
  message
) {
  const eventArea =
    document.createElement(
      "div"
    );

  eventArea.className =
    "schedule-week-information";

  const eventText =
    document.createElement(
      "strong"
    );

  eventText.textContent =
    message;

  eventArea.appendChild(
    eventText
  );

  return eventArea;
}


/*
  Creates an optional note for a league night.
*/

function createWeekNote(
  message
) {
  const note =
    document.createElement(
      "div"
    );

  note.className =
    "schedule-game-note";

  note.textContent =
    message;

  return note;
}


/*
  Creates the 50/50, bye and playoff-round information.
*/

function createWeeklyInformation(
  week
) {
  const informationArea =
    document.createElement(
      "div"
    );

  informationArea.className =
    "schedule-week-information";

  let hasInformation =
    false;

  if (
    week.fiftyFiftyTeam !== null &&
    week.fiftyFiftyTeam !== undefined &&
    week.fiftyFiftyTeam !== ""
  ) {
    informationArea.appendChild(
      createInformationItem(
        "50/50 Team:",
        getTeamName(
          week.fiftyFiftyTeam
        ),
        "schedule-fifty-fifty"
      )
    );

    hasInformation = true;
  }

  if (
    week.byeTeam !== null &&
    week.byeTeam !== undefined &&
    week.byeTeam !== ""
  ) {
    informationArea.appendChild(
      createInformationItem(
        "Bye:",
        getTeamName(
          week.byeTeam
        ),
        "schedule-bye"
      )
    );

    hasInformation = true;
  }

  if (
    typeof week.roundName ===
      "string" &&
    week.roundName.trim()
  ) {
    informationArea.appendChild(
      createInformationItem(
        "Round:",
        week.roundName.trim(),
        "schedule-bye"
      )
    );

    hasInformation = true;
  }

  return hasInformation
    ? informationArea
    : null;
}


/*
  Creates one information item.
*/

function createInformationItem(
  labelText,
  valueText,
  className
) {
  const item =
    document.createElement(
      "div"
    );

  item.className =
    className;

  const label =
    document.createElement(
      "span"
    );

  label.className =
    "schedule-information-label";

  label.textContent =
    labelText;

  const value =
    document.createElement(
      "strong"
    );

  value.textContent =
    valueText;

  item.appendChild(
    label
  );

  item.appendChild(
    value
  );

  return item;
}


/*
  Creates one Early Draw or Late Draw section.
*/

function createDrawSection(
  drawName,
  drawTime,
  games = []
) {
  const drawSection =
    document.createElement(
      "section"
    );

  drawSection.className =
    "schedule-draw-section";

  const drawHeading =
    document.createElement(
      "div"
    );

  drawHeading.className =
    "schedule-draw-heading";

  const drawTitle =
    document.createElement(
      "h3"
    );

  drawTitle.textContent =
    drawName;

  const time =
    document.createElement(
      "span"
    );

  time.className =
    "schedule-draw-time";

  time.textContent =
    drawTime;

  drawHeading.appendChild(
    drawTitle
  );

  drawHeading.appendChild(
    time
  );

  const tableWrapper =
    document.createElement(
      "div"
    );

  tableWrapper.className =
    "schedule-table-wrapper";

  const table =
    document.createElement(
      "table"
    );

  table.className =
    "schedule-table";

  const tableHead =
    document.createElement(
      "thead"
    );

  tableHead.innerHTML = `
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
  `;

  const tableBody =
    document.createElement(
      "tbody"
    );

  games.forEach((game) => {
    tableBody.appendChild(
      createGameRow(
        game
      )
    );
  });

  table.appendChild(
    tableHead
  );

  table.appendChild(
    tableBody
  );

  tableWrapper.appendChild(
    table
  );

  drawSection.appendChild(
    drawHeading
  );

  drawSection.appendChild(
    tableWrapper
  );

  return drawSection;
}


/*
  Creates one game row.
*/

function createGameRow(
  game
) {
  const row =
    document.createElement(
      "tr"
    );

  row.className =
    "schedule-game-row";

  if (game.resultType) {
    row.dataset.resultType =
      game.resultType;
  }

  const sheetCell =
    document.createElement(
      "td"
    );

  sheetCell.className =
    "schedule-sheet-cell";

  sheetCell.textContent =
    game.sheet ?? "";

  const matchupCell =
    document.createElement(
      "td"
    );

  matchupCell.className =
    "schedule-matchup-cell";

  matchupCell.appendChild(
    createMatchup(
      game
    )
  );

  const winnerCell =
    document.createElement(
      "td"
    );

  winnerCell.className =
    "schedule-winner-cell";

  winnerCell.appendChild(
    createWinnerDisplay(
      game
    )
  );

  row.appendChild(
    sheetCell
  );

  row.appendChild(
    matchupCell
  );

  row.appendChild(
    winnerCell
  );

  const specialNotes =
    createSpecialGameNotes(
      game
    );

  if (specialNotes) {
    const notesRow =
      document.createElement(
        "tr"
      );

    notesRow.className =
      "schedule-game-notes-row";

    const notesCell =
      document.createElement(
        "td"
      );

    notesCell.colSpan =
      3;

    notesCell.appendChild(
      specialNotes
    );

    notesRow.appendChild(
      notesCell
    );

    const group =
      document.createDocumentFragment();

    group.appendChild(
      row
    );

    group.appendChild(
      notesRow
    );

    return group;
  }

  return row;
}


/*
  Creates the matchup.

  Regular season:
  Team 1 vs Team 2

  Playoffs:
  A1 vs A4
  B1 vs B4
*/

function createMatchup(
  game
) {
  const matchup =
    document.createElement(
      "span"
    );

  matchup.className =
    "schedule-matchup";

  const teamA =
    createTeamNameElement(
      game.teamA,
      game.teamALabel,
      game
    );

  const versus =
    document.createTextNode(
      " vs "
    );

  const teamB =
    createTeamNameElement(
      game.teamB,
      game.teamBLabel,
      game
    );

  matchup.appendChild(
    teamA
  );

  matchup.appendChild(
    versus
  );

  matchup.appendChild(
    teamB
  );

  return matchup;
}


/*
  Creates a regular team number or playoff label.
*/

function createTeamNameElement(
  teamNumber,
  teamLabel,
  game
) {
  const displayName =
    getGameTeamName(
      teamNumber,
      teamLabel
    );

  const isWinner =
    isGameWinner(
      game,
      teamNumber,
      teamLabel
    );

  const team =
    document.createElement(
      isWinner
        ? "strong"
        : "span"
    );

  team.textContent =
    displayName;

  if (isWinner) {
    team.className =
      "schedule-winning-team";
  }

  return team;
}


/*
  Returns the regular team name or
  the literal playoff label.
*/

function getGameTeamName(
  teamNumber,
  teamLabel
) {
  if (
    typeof teamLabel === "string" &&
    teamLabel.trim()
  ) {
    return teamLabel.trim();
  }

  return getTeamName(
    teamNumber
  );
}


/*
  Determines whether this side won the game.
*/

function isGameWinner(
  game,
  teamNumber,
  teamLabel
) {
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
    typeof game.winnerLabel ===
      "string" &&
    typeof teamLabel ===
      "string"
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

function createWinnerDisplay(
  game
) {
  const winner =
    document.createElement(
      "span"
    );

  const winnerName =
    getWinnerName(
      game
    );

  switch (game.resultType) {
    case "win":
      winner.className =
        "schedule-result schedule-result-win";

      winner.textContent =
        winnerName || "—";

      break;

    case "tie":
      winner.className =
        "schedule-result schedule-result-tie";

      winner.textContent =
        "Tie";

      break;

    case "default":
    case "forfeit":
      winner.className =
        "schedule-result schedule-result-default";

      winner.textContent =
        winnerName
          ? `${winnerName} by default`
          : "Default";

      break;

    case "rescheduled":
      winner.className =
        "schedule-result schedule-result-rescheduled";

      winner.textContent =
        "Rescheduled";

      break;

    case "postponed":
      winner.className =
        "schedule-result schedule-result-postponed";

      winner.textContent =
        "Postponed";

      break;

    case "cancelled":
    case "canceled":
      winner.className =
        "schedule-result schedule-result-postponed";

      winner.textContent =
        "Cancelled";

      break;

    default:
      winner.className =
        "schedule-result schedule-result-pending";

      winner.textContent =
        "—";
  }

  return winner;
}


/*
  Returns the winner name for either a regular
  team number or a playoff label.
*/

function getWinnerName(
  game
) {
  if (
    typeof game.winnerLabel ===
      "string" &&
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
      game.winner
    );
  }

  return "";
}


/*
  Adds extra information for defaults
  and rescheduled games.
*/

function createSpecialGameNotes(
  game
) {
  const notes =
    [];

  if (
    game.resultType === "default" &&
    game.forfeitingTeam
  ) {
    notes.push(
      `${getTeamName(
        game.forfeitingTeam
      )} recorded the default.`
    );
  }

  if (
    (
      game.resultType === "rescheduled" ||
      game.resultType === "postponed"
    ) &&
    game.rescheduledDisplayDate
  ) {
    notes.push(
      `New date: ${game.rescheduledDisplayDate}`
    );
  } else if (
    (
      game.resultType === "rescheduled" ||
      game.resultType === "postponed"
    ) &&
    game.rescheduledDate
  ) {
    notes.push(
      `New date: ${formatDisplayDate(
        game.rescheduledDate
      )}`
    );
  }

  if (game.notes) {
    notes.push(
      game.notes
    );
  }

  if (
    notes.length === 0
  ) {
    return null;
  }

  const note =
    document.createElement(
      "div"
    );

  note.className =
    "schedule-game-note";

  note.textContent =
    notes.join(" ");

  return note;
}


/*
  Returns the display name for a numbered team.
*/

function getTeamName(
  teamNumber
) {
  if (
    teamNumber === null ||
    teamNumber === undefined ||
    teamNumber === ""
  ) {
    return "To Be Determined";
  }

  const teamName =
    ladiesLeagueData
      .teams?.[teamNumber];

  return (
    teamName ||
    `Team ${teamNumber}`
  );
}


/*
  Converts YYYY-MM-DD into a local Date
  without UTC shifting.
*/

function parseLocalDate(
  dateString
) {
  if (
    !dateString ||
    typeof dateString !== "string"
  ) {
    return null;
  }

  const parts =
    dateString
      .split("-")
      .map(Number);

  if (
    parts.length !== 3 ||
    parts.some(
      (part) =>
        Number.isNaN(part)
    )
  ) {
    return null;
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
  dateString
) {
  const date =
    parseLocalDate(
      dateString
    );

  if (!date) {
    return (
      dateString || ""
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
