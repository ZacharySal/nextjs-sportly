import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: {year: string, type: string }}) {

  const seasonDataResponse = await fetch(`https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50&seasontype=${params.type}&year=${params.year}`, {
    cache: "no-cache",
  })

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
      if(seasonType.value === params.type) {
        for (let week of seasonType.entries) {
          weeks.push(week);
        }
      }
    }
  }
      
  return NextResponse.json({seasonWeeks: weeks, events: seasonData.content.sbData.events, newsData: newsData})
}