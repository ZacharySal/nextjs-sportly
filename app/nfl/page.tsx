import { Box, Divider, Typography } from "@mui/material";
import ArticleCard from "../_components/ArticleCard";
import TeamSideCard from "../_components/TeamSideCard";
import ScoreCard from "../_components/ScoreCard";
import { divisonTeams } from "../_lib/constants";

// we first need to fetch all NFL scores from espn api (current date)

async function getScoresOnWeek() {
  const response = await fetch(
    "https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50&week=4",
    { next: { revalidate: 30 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch scores");
  }

  return response.json();
}

async function getNewsArticles() {
  const response = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=50"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json();
}

export default async function Home() {
  const scores = await getScoresOnWeek();
  const news = await getNewsArticles();
  const teamEntries = Object.entries(divisonTeams);

  return (
    <main>
      {/* HEADER */}
      <Box
        sx={{ backgroundColor: "#013369" }}
        className="w-full h-40 flex-row flex justify-start items-center gap-6 pl-60"
      >
        <Box className="flex flex-row justify-center items-center gap-3">
          <img className="w-32 object-cover" src={`/nfl/nfl-logo.png`} />
          <Box className="flex flex-col text-white opacity-80">
            <Typography className="text-3xl opacity-70">
              National Football League
            </Typography>
            <Typography className="text-3xl font-bold">NFL</Typography>
          </Box>
        </Box>
      </Box>

      {/* CONTAINER BOXES */}
      <Box className="w-full h-full flex flex-row justify-center relative items-center">
        <Box
          sx={{
            "&::before": {
              content: `""`,
              borderLeft: `60px solid #013369`,
              borderRight: `60px solid #D50A0A`,
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
          {/* ALL TEAMS */}
          <Box className="w-3/12 h-full flex flex-col gap-3">
            {Object.entries(divisonTeams).map(([conference, teams]) => (
              <>
                <Box className="bg-white rounded-xl p-4 drop-shadow-md">
                  <h1 className="font-semibold text-sm opacity-80 mb-1">
                    {conference}
                  </h1>
                  <Divider flexItem />
                  {teams.map((team) => (
                    <TeamSideCard name={team} />
                  ))}
                </Box>
              </>
            ))}
          </Box>

          {/* Game Scores */}
          <Box className="w-full h-full grid grid-cols-2 gap-5">
            {scores.content.sbData.events.map((game: any) => (
              <ScoreCard gameInfo={game} version={1} />
            ))}
          </Box>

          {/* Related Articles*/}
          <Box className="w-1/4 h-full p-3 flex flex-col rounded-xl bg-white drop-shadow-md">
            <Typography className="mb-2 font-semibold text-sm opacity-80">
              {`NFL News`}
            </Typography>
            {news.articles.slice(0, 8).map((article: any, index: number) => (
              <>
                <ArticleCard
                  key={article.dataSourceIdentifier}
                  article={article}
                />
                {index + 1 != 8 && (
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
    </main>
  );
}
