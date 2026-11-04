// Which days the daily results go to Teams: Norwegian working days, so not
// weekends, public holidays, or Christmas Eve and New Year's Eve (Zivid days off).

// Easter Sunday (Gregorian), anonymous algorithm. Month is 1-based.
function easter(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(year, month - 1, day);
}

const key = (ms) => new Date(ms).toISOString().slice(0, 10);
const DAY = 864e5;

export function holidays(year) {
  const e = easter(year);
  return new Map([
    [`${year}-01-01`, "New Year's Day"],
    [key(e - 3 * DAY), "Maundy Thursday"],
    [key(e - 2 * DAY), "Good Friday"],
    [key(e), "Easter Sunday"],
    [key(e + 1 * DAY), "Easter Monday"],
    [`${year}-05-01`, "Labour Day"],
    [`${year}-05-17`, "Constitution Day"],
    [key(e + 39 * DAY), "Ascension Day"],
    [key(e + 49 * DAY), "Whit Sunday"],
    [key(e + 50 * DAY), "Whit Monday"],
    [`${year}-12-24`, "Christmas Eve"],
    [`${year}-12-25`, "Christmas Day"],
    [`${year}-12-26`, "Boxing Day"],
    [`${year}-12-31`, "New Year's Eve"],
  ]);
}

// day: YYYY-MM-DD. Returns why it's a day off, or null for a working day.
export function dayOff(day) {
  const [y, m, d] = day.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  if (weekday === 0 || weekday === 6) return "weekend";
  return holidays(y).get(day) || null;
}
