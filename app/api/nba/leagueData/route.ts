import { NextResponse } from "next/server";

export async function GET(){
    const nbaWeeksResponse = await fetch("http://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/calendar/ondays?lang=en&region=us");

    if (!nbaWeeksResponse.ok){
        throw new Error("Failed to fetch NBA weeks");
    }

    const nbaWeeks = await nbaWeeksResponse.json();

    const nbaNewsResponse = await fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?limit=50");

    if (!nbaNewsResponse.ok){
        throw new Error("Failed to fetch NBA weeks");
    }

    const nbaNews = await nbaNewsResponse.json();

    const nbaDates = nbaWeeks.eventDate.dates.map((date: string) => (date));

    return NextResponse.json({ "nbaWeeks": nbaDates, "news": nbaNews})
}