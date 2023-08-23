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

  const fullName: String = "New Orleans Saints";
  const parts = fullName.split(" ");
  const teamName = parts.pop();
  const location = parts.join(" ");

  return (
    <main>
      <Box className="w-full h-full flex flex-row justify-center items-center">
        <Box className="w-3/4 h-full flex gap-4 my-10">
          {/* All Teams */}
          <Box className="w-full h-full flex flex-col rounded-xl basis-1/4 bg-white">
            <Box className="p-3">
              <Typography className="text-base font-bold">
                Southwest Divison
              </Typography>
              <TeamSideCard />
              <Typography>Carolina Panthers</Typography>
              <Typography>Atlanta Falcons</Typography>
              <Typography>Tampa Bay Bucaneers</Typography>
            </Box>
          </Box>

          {/* Game Scores */}
          <Box className="w-full h-full grid basis-2/4 grid-cols-2 gap-2">
            <Box className="w-full col-span-2 flex justify-start items-center gap-2 mb-3">
              <img
                className="w-10 h-10 object-contain"
                src="nfl-logo.png"
              ></img>
              <Typography className="font-bold text-3xl">
                NFL Scoreboard
              </Typography>
            </Box>
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
          <Box className="w-full h-full flex flex-col rounded-xl basis-1/4 bg-white">
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
