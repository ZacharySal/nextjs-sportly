import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { teamId: string }}) {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');

    const teamDataResponse = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${params.teamId}`,  {
        next: { revalidate: 10 },
  });

    if(!teamDataResponse.ok) {
        throw new Error("Failed to fetch team data")
    }

    const teamData = await teamDataResponse.json();

    const teamScheduleResponse = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${params.teamId}/schedule`);

    if(!teamScheduleResponse.ok) {
        throw new Error("Failed to fetch team data")
    }

    const teamSchedule = await teamScheduleResponse.json();

    const teamStatsResponse = await fetch(`https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/2023/types/2/teams/${params.teamId}/statistics`);

    if(!teamStatsResponse.ok) {
        throw new Error("Failed to fetch team data")
    }

    const teamStats = await teamStatsResponse.json();

    const teamNewsResponse = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?team=${params.teamId}`);

    if(!teamNewsResponse.ok) {
        throw new Error("Failed to fetch team news");
    } 

    const teamNews = await teamNewsResponse.json();

    const displayStats: Record<string, any> = {
    "Points Per Game": teamStats.splits.categories[2].stats[32],
    "Assists Per Game": teamStats.splits.categories[2].stats[34],
    "Rebounds Per Game": teamStats.splits.categories[1].stats[12],
    "Field Goal %": teamStats.splits.categories[2].stats[5],
    "3 Point %": teamStats.splits.categories[1].stats[13],
    };
    
    return NextResponse.json({"teamData":teamData, "teamSchedule":teamSchedule, "teamStats":displayStats, "teamNews":teamNews});
}