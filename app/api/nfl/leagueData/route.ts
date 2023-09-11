import { NextResponse } from "next/server";

export async function GET() {
  const weeksDataResponse = await fetch("https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50",{
      cache: "no-cache",
  });

  if (!weeksDataResponse.ok) {
    throw new Error("Failed to fetch NFL weeks data");
  }

  const weeksData = await weeksDataResponse.json();

  const newsData = weeksData.news;

  let seasonInfo: any = [];
  let weeks: any; 
  let finalWeeks: any = [];

    weeksData.content.sbData.leagues[0].calendar.map(
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
    
  return NextResponse.json({seasonWeeks: finalWeeks[0], newsData: newsData})
}