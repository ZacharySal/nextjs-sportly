import { Box, Typography, Divider } from "@mui/material";
import ArticleCard from "@/app/_components/ArticleCard";
import ScoreCard from "@/app/_components/ScoreCard";
import { divisonTeams } from "@/app/_lib/constants";

async function getTeamData(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team data");
  }

  return response.json();
}

async function getTeamSchedule(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}/schedule`,
    { next: { revalidate: 30 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team schedule");
  }

  return response.json();
}

async function getTeamRoster(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}/roster`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team roser");
  }

  return response.json();
}

async function getTeamStats(teamId: string) {
  const response = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/1/teams/${teamId}/statistics`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team stats");
  }

  return response.json();
}

async function getTeamNews(teamId: string) {
  const response = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?team=${teamId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team stats");
  }

  return response.json();
}

function findTeamDivison(teamName: string) {
  for (const conference in divisonTeams) {
    if (divisonTeams[conference].includes(teamName)) {
      return conference;
    }
  }
}

export default async function TeamPage({
  params,
}: {
  params: { teamId: string };
}) {
  const teamData = await getTeamData(params.teamId);
  const teamSchedule = await getTeamSchedule(params.teamId);
  const teamRoster = await getTeamRoster(params.teamId);
  const teamStats = await getTeamStats(params.teamId);
  const teamNews = await getTeamNews(params.teamId);

  const displayStats = {
    "Passing YPG": teamStats.splits.categories[1].stats[9],
    "Rushing YPG": teamStats.splits.categories[2].stats[13],
    "Total PPG": teamStats.splits.categories[1].stats[30],
    "3rd Down %": teamStats.splits.categories[10].stats[14],
    "Turnover Diff": teamStats.splits.categories[10].stats[21],
  };

  return (
    <>
      {/* HEADER */}
      <Box
        sx={{ backgroundColor: `#${teamData.team.color}` }}
        className="w-full h-40 flex-row flex justify-start items-center gap-6 pl-60 border-b-4"
      >
        <Box className="flex flex-row justify-center items-center gap-3">
          <img
            className="w-36 object-cover"
            src={`/nfl/${teamData.team.name}.png`}
          />
          <Box className="flex flex-col text-white opacity-80 pr-6 border-r-4">
            <Typography className="text-3xl opacity-70">
              {teamData.team.location}
            </Typography>
            <Typography className="text-3xl font-bold">
              {teamData.team.name}
            </Typography>
          </Box>
        </Box>

        <Box className="flex flex-col justify-center items-center text-white">
          <Typography className="text-2xl font-semibold opacity-80">
            {findTeamDivison(teamData.team.displayName)}
          </Typography>
          <Typography className="text-2xl opacity-70 tracking-widest">
            {teamData.team.record.items[0].summary}
          </Typography>
        </Box>
      </Box>

      {/* CONTAINER BOXES */}
      <Box className="w-full h-full flex justify-center relative items-center">
        <Box
          sx={{
            "&::before": {
              content: `""`,
              borderLeft: `60px solid #${teamData.team.alternateColor}`,
              borderRight: `60px solid #${teamData.team.color}`,
              width: "10rem",
              height: "100vh",
              position: "fixed",
              zIndex: "-20",
              bottom: "-15rem",
              left: "10rem",
              rotate: "130deg",
            },
          }}
          className="w-3/4 h-full flex flex-row justify-center items-start gap-8 my-8"
        >
          {/* TEAM STATS */}
          <Box className="w-auto h-full flex flex-col justify-center items-center gap-4">
            {Object.entries(displayStats).map(([statName, value]) => (
              <>
                <Box className="w-40 h-full flex justify-center items-center flex-row bg-white gap-1 rounded-xl py-2 drop-shadow-md">
                  <Box className="flex flex-col justify-center gap-2 items-center">
                    <Typography className="text-sm">{statName}</Typography>
                    <Typography className="font-semibold text-3xl">
                      {Math.round(value.value)}
                    </Typography>
                    <Typography className="text-base opacity-70">
                      {value.rankDisplayValue}
                    </Typography>
                  </Box>
                  {/* <Box className="basis-1/3">
                    <div className="relative w-8 h-24 bg-[#edeef0]">
                      <div
                        style={{
                          height: `${Math.round(value.rank / 32 / (1 / 100))}%`,
                          backgroundColor: `#${teamData.team.alternateColor}`,
                        }}
                        className={`absolute bottom-0 w-full`}
                      ></div>
                    </div>
                  </Box> */}
                </Box>
              </>
            ))}
          </Box>

          {/* TEAM SCHEDULE */}
          <Box className="w-full h-full grid grid-cols-2 gap-5">
            {teamSchedule.events.map((game: any) => (
              <ScoreCard key={game.uuid} gameInfo={game} version={2} />
            ))}
          </Box>

          {/* RELATED ARTICLES */}
          <Box className="w-1/3 h-full p-3 flex flex-col rounded-xl bg-white drop-shadow-md">
            <Typography className="mb-2 font-semibold text-base opacity-80">
              {`${teamData.team.name} News`}
            </Typography>
            {teamNews.articles.map((article: any, index: number) => (
              <>
                <ArticleCard
                  key={article.dataSourceIdentifier}
                  article={article}
                />
                {index + 1 != teamNews.articles.length && (
                  <Divider
                    style={{
                      width: "100%",
                      color: "#edeef0",
                      backgroundColor: "#edeef0",
                      margin: "0.4rem 0rem 0.5rem 0 ",
                    }}
                  />
                )}
              </>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
