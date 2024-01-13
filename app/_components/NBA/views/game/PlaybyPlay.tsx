"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import Articles from "@/app/_components/Articles";
import useMediaQuery from "@mui/material/useMediaQuery";
import GameUserSelection from "@/app/_components/GameUserSelection";
import MatchupPredictor from "@/app/_components/MatchupPredictor";
import NBAPlaybyPlay from "@/app/_components/NBA/NBAPlaybyPlay";
import SeasonSeries from "@/app/_components/SeasonSeries";

export default function PlaybyPlay({ data }: { data: any }) {
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const desktopView = () => (
    <>
      <div className="flex flex-col gap-3 basis-3/4">
        <NBAPlaybyPlay data={data} />
      </div>
      <div className="basis-1/4 flex flex-col gap-3">
        {data.gameData.predictor && <MatchupPredictor data={data} league="nba" />}
        <SeasonSeries data={data} league="nba" />
        <Articles title="NBA News" news={data.gameData.news.articles} limit={6} />
      </div>
    </>
  );

  const mobileView = () => <NBAPlaybyPlay data={data} />;

  return (
    <>
      <GameUserSelection userSelection={"playbyplay"} data={data} />
      <ContainerBox isDesktopScreen={isDesktopScreen}>
        {isDesktopScreen ? desktopView() : mobileView()}
      </ContainerBox>
    </>
  );
}
