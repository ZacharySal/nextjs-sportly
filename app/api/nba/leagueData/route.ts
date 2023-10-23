import { NextResponse } from "next/server";

export async function GET() {
  const nbaWeeksResponse = await fetch(
    "http://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/calendar/ondays?lang=en&region=us",
    {
      cache: "no-cache",
    }
  );

  if (!nbaWeeksResponse.ok) {
    throw new Error("Failed to fetch NBA weeks");
  }

  const nbaWeeks = await nbaWeeksResponse.json();

  const nbaDate = await fetch("https://cdn.espn.com/core/nba/scoreboard?xhr=1&limit=50");

  if (!nbaDate.ok) {
    throw new Error("Failed to fetch NBA weeks");
  }

  const nbaDateResponse = await nbaDate.json();

  const nbaNewsResponse = await fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?limit=50");

  if (!nbaNewsResponse.ok) {
    throw new Error("Failed to fetch NBA weeks");
  }

  const nbaNews = await nbaNewsResponse.json();

  const nbaDates = nbaWeeks.eventDate.dates.map((date: string) => date);

  const standingsDataResponse = await fetch("https://cdn.espn.com/core/nba/standings?xhr=1&seasonType=1", {
    cache: "no-cache",
  });

  if (!standingsDataResponse.ok) {
    throw new Error("Failed to fetch NFL standings data");
  }

  const standingsData = await standingsDataResponse.json();

  return NextResponse.json({
    nbaWeeks: nbaDates,
    news: nbaNews,
    currentDate: nbaDateResponse.content.dateParams.date,
    standings: standingsData.content,
  });
}
