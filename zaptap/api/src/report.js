// The daily results post for Teams: today's leaderboard as it stands at
// 16:00 Oslo time, on working days only. Sent to a Teams Workflow
// ("Send webhook alerts to a chat") at TEAMS_WEBHOOK_URL.

import { dayOff } from "./calendar.js";
import { osloHour, today } from "./game.js";

export const POST_HOUR = 16;

// Whether today's post is due now: a working day, 16:00 or later in Oslo.
export function reportDue(now = new Date()) {
  const day = today(now);
  const off = dayOff(day);
  if (off) return { day, due: false, reason: off };
  if (osloHour(now) < POST_HOUR) return { day, due: false, reason: "too_early" };
  return { day, due: true };
}

const medal = (n) => ["🥇", "🥈", "🥉"][n - 1] || `${n}.`;
const square = (s) => (s >= 95 ? "🎯" : s >= 80 ? "🟩" : s >= 60 ? "🟨" : s >= 35 ? "🟧" : "🟥");
const longDate = (day) =>
  new Date(day + "T12:00:00Z").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

// An Adaptive Card message, the format Teams Workflows expect. Never names
// today's places, so it can't spoil the puzzle for anyone.
export function reportCard(board) {
  const body = [
    { type: "TextBlock", text: `⚡ ZapTap #${board.number} results`, weight: "Bolder", size: "Large", wrap: true },
    { type: "TextBlock", text: `${longDate(board.day)} · standings at ${POST_HOUR}:00`, isSubtle: true, spacing: "None", wrap: true },
  ];
  if (board.entries.length) {
    body.push({
      type: "FactSet",
      facts: board.entries.map((e, i) => ({ title: `${medal(i + 1)} ${e.name}`, value: `**${e.total}**  ${e.scores.map(square).join("")}` })),
    });
  } else {
    body.push({ type: "TextBlock", text: `Nobody finished today's ZapTap before ${POST_HOUR}:00. 👀`, wrap: true });
  }
  if (board.playing) {
    const who = board.playing === 1 ? "1 person" : `${board.playing} people`;
    body.push({ type: "TextBlock", text: `${who} started but didn't finish in time.`, isSubtle: true, wrap: true });
  }
  const card = { $schema: "http://adaptivecards.io/schemas/adaptive-card.json", type: "AdaptiveCard", version: "1.4", body };
  return { type: "message", attachments: [{ contentType: "application/vnd.microsoft.card.adaptive", contentUrl: null, content: card }] };
}

export async function sendToTeams(message) {
  const res = await fetch(process.env.TEAMS_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  if (!res.ok) throw new Error(`Teams webhook answered ${res.status}: ${(await res.text()).slice(0, 300)}`);
}
