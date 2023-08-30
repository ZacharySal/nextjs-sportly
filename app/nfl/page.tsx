import { Box, Divider, Typography } from "@mui/material";
import Articles from "../_components/Articles";
import TeamSideCard from "../_components/TeamSideCard";
import ContainerBox from "../_components/ContainerBox";
import Scoreboard from "../_components/Scoreboard";
import LeagueHeader from "../_components/LeagueHeader";
import AllTeams from "../_components/AllTeams";
import { nflDivisonTeams } from "../_lib/constants";

async function getNewsArticles() {
  const response = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=50"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json();
}

async function getNflWeeks() {
  const response = await fetch(
    "https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50"
  );

  if (!response.ok) {
    throw new Error("Failed to get NFL weeks data");
  }

  const data = await response.json();

  let seasonInfo: any = [];
  let weeks: any;
  let finalWeeks: any = [];

  data.content.sbData.leagues[0].calendar.map(
    (week: any) => (
      (weeks = week.entries.map((weekEntry: any) => ({
        weekEndDate: weekEntry.endDate,
        weekStartDate: weekEntry.startDate,
        weekLabel: weekEntry.alternateLabel,
        weekDisplayDateRange: weekEntry.detail,
        weekValue: weekEntry.value,
        seasonValue: week.value,
      }))),
      seasonInfo.push({
        seasonStartDate: week.startDate,
        seasonEndDate: week.endDate,
        seasonLabel: week.label,
        seasonWeeks: weeks,
      }),
      (weeks = []),
      finalWeeks.push(seasonInfo)
    )
  );

  return finalWeeks[0];
}

export default async function Home() {
  const news = await getNewsArticles();
  const seasonWeeks = await getNflWeeks();

  return (
    <main>
      <LeagueHeader backgroundColor="013369" league="nfl" />
      <ContainerBox altColor="013369" mainColor="D50A0A">
        <AllTeams allTeams={nflDivisonTeams} league="nfl" />
        <Scoreboard seasonWeeks={seasonWeeks} league={"nfl"} />
        <Articles title={`NFL News`} teamNews={news} articleLimit={10} />
      </ContainerBox>
    </main>
  );
}
