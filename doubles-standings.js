
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const container =
    document.getElementById("standings-container");

  if (!container) return;

  if (
    typeof doublesLeagueData === "undefined" ||
    !doublesLeagueData
  ) {
    container.innerHTML = `
      <section class="standings-card">
        <div class="standings-message">
          <p>Doubles League standings could not be loaded.</p>
        </div>
      </section>
    `;
    return;
  }

  renderDoublesStandings(container, doublesLeagueData);
});

function renderDoublesStandings(container, data) {
  const regular = calculateDoublesStandings(
    data, "regular"
  );

  const playoffA = calculateDoublesStandings(
    data, "playoffs", "A"
  );

  const playoffB = calculateDoublesStandings(
    data, "playoffs", "B"
  );

  
const playoffsStarted = true;


  const scoring = data.scoring || {};

  let html = "";

  if (playoffsStarted) {
    html += renderDoublesStandingsCard(
      "A-Side Playoff Standings",
      "2026 Fall Playoffs",
      playoffA,
      "playoffs",
      scoring
    );

    html += renderDoublesStandingsCard(
      "B-Side Playoff Standings",
      "2026 Fall Playoffs",
      playoffB,
      "playoffs",
      scoring
    );
  }

  html += renderDoublesStandingsCard(
    "Regular Season Standings",
    "2026 Fall Round Robin",
    regular,
    "regular",
    scoring
  );

  container.innerHTML = html;
}

function calculateDoublesStandings(
  data,
  phase,
  pool = null
) {
  const standings = new Map();

  if (phase === "regular") {
    Object.keys(data.teams || {})
      .map(Number)
      .sort((a, b) => a - b)
      .forEach(team => {
        standings.set(String(team), {
          id: String(team),
          label: `Team ${team}`,
          gp: 0,
          wins: 0,
          losses: 0,
          ties: 0,
          points: 0,
          beaten: new Set()
        });
      });
  } else {
    const labels = pool === "A"
      ? ["A1", "A2", "A3", "A4"]
      : ["B1", "B2", "B3"];

    labels.forEach(label => {
      standings.set(label, {
        id: label,
        label,
        gp: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        points: 0,
        beaten: new Set()
      });
    });
  }

  const schedule = Array.isArray(data.schedule)
    ? data.schedule
    : [];

  schedule.forEach(week => {
    const weekPhase = String(
      week.phase || ""
    ).toLowerCase();

    if (phase === "regular") {
      if (
        weekPhase !== "regular" &&
        weekPhase !== "regular-season"
      ) return;
    } else {
      if (weekPhase !== "playoffs") return;

      // Provisional: December 20 crossover games
      // do not count toward playoff standings.
      if (
        week.date === "2026-12-20" ||
        week.countsForStandings === false
      ) return;
    }

    const games = Array.isArray(week.games)
      ? week.games
      : [];

    games.forEach(game => {
      if (game.countsForStandings === false) return;

      const teamA = phase === "regular"
        ? String(game.teamA)
        : String(game.teamALabel || "");

      const teamB = phase === "regular"
        ? String(game.teamB)
        : String(game.teamBLabel || "");

      if (
        !standings.has(teamA) ||
        !standings.has(teamB)
      ) return;

      applyDoublesResult(
        standings,
        teamA,
        teamB,
        game,
        data.scoring || {},
        phase
      );
    });
  });

  return [...standings.values()].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }

    if (a.gp !== b.gp) {
      return a.gp - b.gp;
    }

    const aBeatB = hasDoublesHeadToHeadPath(
      a.id, b.id, standings
    );

    const bBeatA = hasDoublesHeadToHeadPath(
      b.id, a.id, standings
    );

    if (aBeatB && !bBeatA) return -1;
    if (bBeatA && !aBeatB) return 1;

    return a.id.localeCompare(
      b.id, undefined, { numeric: true }
    );
  });
}

function applyDoublesResult(
  standings,
  teamA,
  teamB,
  game,
  scoring,
  phase
) {
  const a = standings.get(teamA);
  const b = standings.get(teamB);

  const type = String(
    game.resultType || ""
  ).toLowerCase();

  if (
    !type ||
    [
      "pending",
      "postponed",
      "rescheduled",
      "cancelled",
      "canceled",
      "no-contest"
    ].includes(type)
  ) return;

  const score = (key, fallback) => {
    const value = Number(scoring[key]);
    return Number.isFinite(value)
      ? value
      : fallback;
  };

  if (type === "tie") {
    a.gp++;
    b.gp++;
    a.ties++;
    b.ties++;

    a.points += score("tie", 7);
    b.points += score("tie", 7);
    return;
  }

  const winner = phase === "regular"
    ? String(game.winner ?? "")
    : String(game.winnerLabel ?? "");

  if (winner !== teamA && winner !== teamB) {
    return;
  }

  const winningTeam = standings.get(winner);
  const losingId = winner === teamA
    ? teamB
    : teamA;
  const losingTeam = standings.get(losingId);

  winningTeam.gp++;
  losingTeam.gp++;

  winningTeam.wins++;
  losingTeam.losses++;

  winningTeam.beaten.add(losingId);

  const isDefault = [
    "default",
    "forfeit",
    "default-win",
    "forfeit-win"
  ].includes(type);

  winningTeam.points += isDefault
    ? score("defaultWin", 10)
    : score("win", 10);

  losingTeam.points += isDefault
    ? score("defaultLoss", 0)
    : score("loss", 5);
}

function hasDoublesHeadToHeadPath(
  from,
  target,
  standings
) {
  if (from === target) return false;

  const visited = new Set();
  const queue = [from];

  while (queue.length) {
    const current = queue.shift();

    if (visited.has(current)) continue;
    visited.add(current);

    const team = standings.get(current);
    if (!team) continue;

    for (const beaten of team.beaten) {
      if (beaten === target) return true;

      if (!visited.has(beaten)) {
        queue.push(beaten);
      }
    }
  }

  return false;
}

function renderDoublesStandingsCard(
  title,
  subtitle,
  standings,
  phase,
  scoring
) {
  return `
    <section class="standings-card">

      <header class="standings-card-heading">
        <h1>${escapeDoublesHtml(title)}</h1>
        <p>${escapeDoublesHtml(subtitle)}</p>
      </header>

      <div class="standings-table-wrapper">
        <table class="standings-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team</th>
              <th scope="col">GP</th>
              <th scope="col">Record</th>
              <th scope="col">Pts</th>
            </tr>
          </thead>

          <tbody>
            ${standings.map((team, index) => {
              const link = phase === "regular"
                ? `team.html?league=doubles&team=${team.id}`
                : `team.html?league=doubles&phase=playoffs&team=${team.id}`;

              return `
                <tr>
                  <td class="standings-position">
                    ${index + 1}
                  </td>

                  <td class="standings-team">
                    <a
                      href="${link}"
                      class="standings-team-link"
                    >
                      ${escapeDoublesHtml(team.label)}
                    </a>
                  </td>

                  <td>${team.gp}</td>

                  <td class="standings-record">
                    ${team.wins}-${team.losses}-${team.ties}
                  </td>

                  <td class="standings-points">
                    ${team.points}
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>

      <div class="standings-scoring-note">
        <strong>Scoring:</strong>
        Win = ${Number(scoring.win ?? 10)} points,
        Loss = ${Number(scoring.loss ?? 5)} points,
        Tie = ${Number(scoring.tie ?? 7)} points.
      </div>

    </section>
  `;
}

function escapeDoublesHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
