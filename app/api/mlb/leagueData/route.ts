import { NextResponse } from "next/server";

export async function GET() {
  const newsResponse = await fetch("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news?limit=50", {
    cache: "no-cache",
  });

  if (!newsResponse.ok) {
    throw new Error("Failed to fetch news");
  }

  const newsData = await newsResponse.json();

  const mlbDaysResponse = await fetch(
    "http://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/calendar/ondays?lang=en&region=us", 
  );

  if (!mlbDaysResponse.ok) {
    throw new Error("Failed to fetch MLB schedule");
  }

  const mlbDaysData = await mlbDaysResponse.json();

  const mlbDate = await fetch("https://cdn.espn.com/core/mlb/scoreboard?xhr=1&limit=50", {
    cache: "no-cache",
  });

  if (!mlbDate.ok) {
    throw new Error("Failed to fetch NBA weeks");
  }

  const mlbDateResponse = await mlbDate.json();

  let mlbDays: any[] = [];

  mlbDaysData.eventDate.dates.map((date: string) => mlbDays.push(date));

  const standingsDataResponse = await fetch("https://cdn.espn.com/core/mlb/standings?xhr=1", { cache: "no-cache" });

  if (!standingsDataResponse.ok) {
    throw new Error("Failed to fetch NFL standings data");
  }

  const standingsData = await standingsDataResponse.json();

  return NextResponse.json({
    news: newsData,
    days: mlbDays,
    currentDate: mlbDateResponse.content.dateParams.date,
    standings: standingsData.content,
  });
}
