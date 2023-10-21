import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const seasonDataResponse = await fetch(`https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50`, {
    cache: "no-cache",
  });

  // we need to select the weeks matching the given seasonType

  if (!seasonDataResponse.ok) {
    throw new Error("Failed to fetch NFL weeks data");
  }

  const seasonData = await seasonDataResponse.json();

  const newsData = seasonData.news;

  let weeks: any = [];

  // we only want the selected season type weeks, not weeks for every season type

  for (let seasonType of seasonData.content.sbData.leagues[0].calendar) {
    {
      if (seasonType.value == seasonData.content.sbData.season.type) {
        for (let week of seasonType.entries) {
          weeks.push(week);
        }
      }
    }
  }

  return NextResponse.json({
    seasonWeeks: weeks,
    newsData: newsData,
    currentType: seasonData.content.sbData.season.type,
    currentYear: seasonData.content.sbData.season.year,
    currentWeek: seasonData.content.sbData.week.number,
  });
}
