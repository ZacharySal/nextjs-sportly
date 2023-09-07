import { NextResponse } from "next/server"

export async function GET() {

    const newsResponse = await fetch(
        "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news?limit=50"
    );
    
    if (!newsResponse.ok) {
        throw new Error("Failed to fetch news");
    }
    
    const newsData = await newsResponse.json();

    const mlbDaysResponse = await fetch("http://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/calendar/ondays?lang=en&region=us");
    
    if (!mlbDaysResponse.ok) {
    throw new Error("Failed to fetch MLB schedule");
    }

    const mlbDaysData = await mlbDaysResponse.json();

    let mlbDays: any[] = [];

    mlbDaysData.eventDate.dates.map((date: string) => mlbDays.push(date));
    return NextResponse.json({"news":newsData, "days": mlbDays});
}