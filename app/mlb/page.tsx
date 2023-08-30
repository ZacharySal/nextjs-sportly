import { Box, Container, Divider, Typography } from "@mui/material";
import ContainerBox from "../_components/ContainerBox";
import Articles from "../_components/Articles";
import AllTeams from "../_components/AllTeams";
import Scoreboard from "../_components/Scoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import { mlbDivisonTeams } from "../_lib/constants";

// we first need to fetch all NFL scores from espn api (current date)
async function getNewsArticles() {
  const response = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news?limit=50"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json();
}

async function getMLBWeeks() {
  const response = await fetch(
    "http://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/calendar/ondays?lang=en&region=us"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch MLB schedule");
  }

  const data = await response.json();

  let mlbWeeks: any[] = [];

  data.eventDate.dates.map((date: string) => mlbWeeks.push(date));

  return mlbWeeks;
}

export default async function Home() {
  const news = await getNewsArticles();
  const schedule = await getMLBWeeks();

  return (
    <main>
      <LeagueHeader backgroundColor="002D72" league="mlb" />

      <ContainerBox altColor="002D72" mainColor="D50A0A">
        <AllTeams allTeams={mlbDivisonTeams} league="mlb" />
        <Scoreboard seasonWeeks={schedule} league={"mlb"} />
        <Articles title={`MLB News`} teamNews={news} articleLimit={10} />
      </ContainerBox>
    </main>
  );
}
