import { NextResponse } from "next/server"

export async function GET(request: Request,{ params }: { params: { teamId: string } }) {
    const teamDataResponse = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.teamId}`);

    if(!teamDataResponse.ok) {
        throw new Error("Failed to fetch team data")
    }

    const teamData = await teamDataResponse.json();

    const teamScheduleResponse = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.teamId}/schedule`);

    if(!teamScheduleResponse.ok) {
        throw new Error("Failed to fetch team data")
    }

    const teamSchedule = await teamScheduleResponse.json();

    const teamStatsResponse = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/1/teams/${params.teamId}/statistics`);

    if(!teamStatsResponse.ok) {
        throw new Error("Failed to fetch team data")
    }

    const teamStats = await teamStatsResponse.json();

    const teamNewsResponse = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?team=${params.teamId}`);

    if(!teamNewsResponse.ok) {
        throw new Error("Failed to fetch team news");
    } 

    const teamNews = await teamNewsResponse.json();

    const displayStats = {
        "Passing YPG": teamStats.splits.categories[1].stats[9],
        "Rushing YPG": teamStats.splits.categories[2].stats[13],
        "Total PPG": teamStats.splits.categories[1].stats[30],
        "3rd Down %": teamStats.splits.categories[10].stats[14],
        "Turnover Diff": teamStats.splits.categories[10].stats[21],
      };

    return NextResponse.json({"teamData":teamData, "teamSchedule":teamSchedule, "teamStats":displayStats, "teamNews":teamNews});
}