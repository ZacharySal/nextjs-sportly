import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const seasonDataResponse = await fetch(
    `https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50`,
    {
      cache: "no-cache",
    }
  );

  if (!seasonDataResponse.ok) {
    throw new Error("Failed to fetch NFL weeks data");
  }

  const seasonData = await seasonDataResponse.json();

  const newsData = seasonData.news;

  let weeks: any = [];

  for (let seasonType of seasonData.content.sbData.leagues[0].calendar) {
    {
      if (seasonType.value == seasonData.content.sbData.season.type) {
        for (let week of seasonType.entries) {
          weeks.push(week);
        }
      }
    }
  }

  const standingsDataResponse = await fetch(
    "https://cdn.espn.com/core/nfl/standings?xhr=1",
    {
      cache: "no-cache",
    }
  );

  if (!standingsDataResponse.ok) {
    throw new Error("Failed to fetch NFL standings data");
  }

  const standingsData = await standingsDataResponse.json();

  return NextResponse.json({
    seasonWeeks: weeks,
    newsData: newsData,
    standings: standingsData.content,
    currentType: seasonData.content.sbData.season.type,
    currentYear: seasonData.content.sbData.season.year,
    currentWeek: seasonData.content.sbData.week.number,
  });
}
