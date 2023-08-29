export async function getNflWeeks() {
  const response = await fetch(
    "https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50"
  );

  if (!response.ok) {
    throw new Error("Failed to get NFL weeks data");
  }

  const data = await response.json();

  let seasonInfo: any = [];
  let weeks: any;
  let finalWeeks: any = [];

  data.content.sbData.leagues[0].calendar.map(
    (week: any) => (
      (weeks = week.entries.map((weekEntry: any) => ({
        weekEndDate: weekEntry.endDate,
        weekStartDate: weekEntry.startDate,
        weekLabel: weekEntry.alternateLabel,
        weekDisplayDateRange: weekEntry.detail,
        weekValue: weekEntry.value,
        seasonValue: week.value,
      }))),
      seasonInfo.push({
        seasonStartDate: week.startDate,
        seasonEndDate: week.endDate,
        seasonLabel: week.label,
        seasonWeeks: weeks,
      }),
      (weeks = []),
      finalWeeks.push(seasonInfo)
    )
  );

  return finalWeeks[0];
}
