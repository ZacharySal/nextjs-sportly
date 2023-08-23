import { Box, Divider, Typography } from "@mui/material";
import ScoreCard from "./components/ScoreCard";
import ArticleCard from "./components/ArticleCard";
import DateSelector from "./components/DateSelector";
import TeamSideCard from "./components/TeamSideCard";

export default function Home() {
  const newsData = {
    meta: {
      found: 7232,
      returned: 3,
      limit: 3,
      page: 1,
    },
    data: [
      {
        uuid: "1f38886b-a36e-4874-92b5-8545007f08f8",
        title: "New Orleans Saints 2023 NFL Draft Review",
        description:
          "The New Orleans Saints 2023 NFL Draft is in the books, which means it’s time to review the actual picks. While Saints general manager Mickey Loomis wasn’t q...",
        keywords: "",
        snippet:
          "The New Orleans Saints 2023 NFL Draft is in the books, which means it’s time to review the actual picks. While Saints general manager Mickey Loomis wasn’t q...",
        url: "https://www.yardbarker.com/nfl/articles/new_orleans_saints_2023_nfl_draft_review/s1_17198_38762865",
        image_url:
          "https://www.yardbarker.com/media/8/4/842fa0bfd1ae2d82e208cbbb38708bca82d19690/thumb_16x9/Saints-Draft-Review-1024x742.jpg?v=1",
        language: "en",
        published_at: "2023-04-30T20:45:11.000000Z",
        source: "yardbarker.com",
        categories: ["sports"],
        relevance_score: 57.516827,
      },
      {
        uuid: "17304fd8-2e43-49f3-94ac-44c6986e75a3",
        title: "2023 New Orleans Saints schedule analysis",
        description:
          "Per NFL Research, Saints opponents had a 122-164-3 record in 2022, making their 2023 schedule the second-easiest in the league.",
        keywords: "",
        snippet:
          "Circle the date: Week 2 at Panthers\n\nThe lone Monday night game on the Saints' 2023 schedule is an early battle for the NFC South crown. Two-time defending divi...",
        url: "https://www.yardbarker.com/nfl/articles/2023_new_orleans_saints_schedule_analysis/s1_13132_38804811",
        image_url:
          "https://www.yardbarker.com/media/9/e/9e26c0f3f021592f97b9c279305f46ea3648109f/thumb_16x9/2023-new-orleans-saints-schedule-analysis.jpg?v=1",
        language: "en",
        published_at: "2023-05-12T03:17:02.000000Z",
        source: "yardbarker.com",
        categories: ["sports"],
        relevance_score: 57.421936,
      },
      {
        uuid: "63f0bf7f-8db3-4f13-ae5e-2474d1542ba3",
        title: "2023 New Orleans Saints schedule analysis",
        description:
          "Per NFL Research, Saints opponents had a 122-164-3 record in 2022, making their 2023 schedule the second-easiest in the league.",
        keywords: "",
        snippet:
          "Circle the date: Week 2 at Panthers\n\nThe lone Monday night game on the Saints’ 2023 schedule is an early battle for the NFC South crown. Two-time defending di...",
        url: "https://footballorder.com/2023-new-orleans-saints-schedule-analysis/",
        image_url:
          "https://footballorder.com/wp-content/uploads/2023/05/2023-New-Orleans-Saints-schedule-analysis.jpg",
        language: "en",
        published_at: "2023-05-12T03:54:15.000000Z",
        source: "10ztalk.com",
        categories: ["sports"],
        relevance_score: 57.421936,
      },
    ],
  };

  const allTeams: string[] = [
    "Arizona Cardinals",
    "Atlanta Falcons",
    "Baltimore Ravens",
    "Buffalo Bills",
    "Carolina Panthers",
    "Chicago Bears",
    "Cincinnati Bengals",
    "Cleveland Browns",
    "Dallas Cowboys",
    "Denver Broncos",
    "Detroit Lions",
    "Green Bay Packers",
    "Houston Texans",
    "Indianapolis Colts",
    "Jacksonville Jaguars",
    "Kansas City Chiefs",
    "Las Vegas Raiders",
    "Los Angeles Chargers",
    "Los Angeles Rams",
    "Miami Dolphins",
    "Minnesota Vikings",
    "New England Patriots",
    "New Orleans Saints",
    "New York Giants",
    "New York Jets",
    "Philadelphia Eagles",
    "Pittsburgh Steelers",
    "San Francisco 49ers",
    "Seattle Seahawks",
    "Tampa Bay Buccaneers",
    "Tennessee Titans",
    "Washington Commanders",
  ];

  const divisonTeams = {
    "AFC East": [
      "Miami Dolphins",
      "Buffalo Bills",
      "New England Patriots",
      "New York Jets",
    ],
    "AFC North": [
      "Pittsburgh Steelers",
      "Cleveland Browns",
      "Baltimore Ravens",
      "Cincinnati Bengals",
    ],
    "AFC South": [
      "Jacksonville Jaguars",
      "Indianapolis Colts",
      "Houston Texans",
      "Tennessee Titans",
    ],
    "AFC West": [
      "Las Vegas Raiders",
      "Kansas City Chiefs",
      "Los Angeles Chargers",
      "Denver Broncos",
    ],
    "NFC East": [
      "Washington Commanders",
      "New York Giants",
      "Philadelphia Eagles",
      "Dallas Cowboys",
    ],
    "NFC North": [
      "Detroit Lions",
      "Chicago Bears",
      "Green Bay Packers",
      "Minnesota Vikings",
    ],
    "NFC South": [
      "New Orleans Saints",
      "Atlanta Falcons",
      "Tampa Bay Buccaneers",
      "Carolina Panthers",
    ],
    "NFC West": [
      "Seattle Seahawks",
      "San Francisco 49ers",
      "Arizona Cardinals",
      "Los Angeles Rams",
    ],
  };

  const teamEntries = Object.entries(divisonTeams);
  teamEntries.map(([conference, team]) => console.log(conference));

  const fullName: String = "New Orleans Saints";
  const parts = fullName.split(" ");
  const teamName = parts.pop();
  const location = parts.join(" ");

  return (
    <main>
      {/* Header */}
      <Box className="w-full flex justify-center items-center gap-3 mt-8">
        <img className="w-10 h-10 object-contain" src="nfl-logo.png"></img>
        <Typography className="font-bold text-3xl">NFL Scoreboard</Typography>
      </Box>

      <Box className="w-full h-full flex flex-row justify-center items-center mt-8 mb-8">
        <Box className="w-full h-full flex justify-center gap-8">
          {/* All Teams */}
          <Box className="w-auto h-full flex flex-col gap-3">
            {Object.entries(divisonTeams).map(([conference, teams]) => (
              <>
                <Box className="bg-white rounded p-3 drop-shadow-md">
                  <h1 className="font-semibold">{conference}</h1>
                  {teams.map((team) => (
                    <TeamSideCard name={team} />
                  ))}
                </Box>
              </>
            ))}
          </Box>

          {/* Game Scores */}
          <Box className="w-full h-full grid basis-2/4 grid-cols-2 gap-5">
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
          </Box>

          {/* Related Articles*/}
          <Box className="w-full h-full flex flex-col rounded-xl basis-1/6 bg-white">
            <Box className="p-3 py-0">
              <Typography className="my-3 font-bold"> NFL News</Typography>
              {newsData.data.map((data) => (
                <ArticleCard key={data.uuid} data={data} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
