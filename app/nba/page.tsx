import { Box, Divider, Typography } from "@mui/material";
import Articles from "../_components/Articles";
import TeamSideCard from "../_components/TeamSideCard";
import ContainerBox from "../_components/ContainerBox";
import Scoreboard from "../_components/Scoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import AllTeams from "../_components/AllTeams";
import { nbaDivisionTeams } from "../_lib/constants";

async function getNewsArticles() {
  const response = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?limit=50"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json();
}

async function getNbaWeeks() {
  const response = await fetch(
    "http://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/calendar/ondays?lang=en&region=us"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch NBA schedule");
  }

  const data = await response.json();

  let nbaWeeks: any[] = [];

  data.eventDate.dates.map((date: string) => nbaWeeks.push(date));

  return nbaWeeks;
}

export default async function Home() {
  const news = await getNewsArticles();
  const seasonWeeks = await getNbaWeeks();

  return (
    <main>
      <LeagueHeader backgroundColor="013369" league="nba" />
      <ContainerBox altColor="013369" mainColor="D50A0A">
        <AllTeams allTeams={nbaDivisionTeams} league="nba" />
        <Scoreboard seasonWeeks={seasonWeeks} league="nba" />
        <Articles title={`NBA News`} teamNews={news} articleLimit={10} />
      </ContainerBox>
    </main>
  );
}
