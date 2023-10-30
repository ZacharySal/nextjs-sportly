import { Box, Typography, Divider } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function NBAGameLeaders({ data }: { data: any }) {
  const [selectedStat, setSelectedStat] = useState("points");
  const homePointsLeader = data.gameData.leaders[0].leaders[0].leaders[0];
  const homeAssistsLeader = data.gameData.leaders[0].leaders[1].leaders[0];
  const homeReboundsLeader = data.gameData.leaders[0].leaders[2].leaders[0];
  const awayPointsLeader = data.gameData.leaders[1].leaders[0].leaders[0];
  const awayAssistsLeader = data.gameData.leaders[1].leaders[1].leaders[0];
  const awayReboundsLeader = data.gameData.leaders[1].leaders[2].leaders[0];

  const pointsLeaders = [awayPointsLeader, homePointsLeader];
  const assistsLeaders = [awayAssistsLeader, homeAssistsLeader];
  const reboundsLeaders = [awayReboundsLeader, homeReboundsLeader];

  const getLeaderCategory = () => {
    if (selectedStat === "points") {
      return pointsLeaders;
    } else if (selectedStat === "assists") {
      return assistsLeaders;
    } else {
      return reboundsLeaders;
    }
  };

  return (
    <Box className="w-full bg-white rounded-xl p-3 pb-1">
      <Typography className="font-semibold opacity-70 text-sm">
        Game Leaders
      </Typography>
      <Box className="flex w-full justify-around items-center rounded-2xl h-8 mt-3 bg-white text-center testing sub-selector">
        <Box
          onClick={() => setSelectedStat("points")}
          className={`${
            selectedStat === "points" && "selection-active"
          } nav-selection flex-grow sub-selection`}
        >
          Points
        </Box>
        <Box
          onClick={() => setSelectedStat("assists")}
          className={`${
            selectedStat === "assists" && "selection-active"
          } nav-selection flex-grow sub-selection`}
        >
          Assists
        </Box>
        <Box
          onClick={() => setSelectedStat("rebounds")}
          className={`${
            selectedStat === "rebounds" && "selection-active"
          } nav-selection flex-grow sub-selection`}
        >
          Rebounds
        </Box>
      </Box>
      <Divider />
      <Box className="w-full flex flex-col p-2 pt-3 gap-3 items-center">
        {getLeaderCategory().map((leader: any) => (
          <Box
            key={uuidv4()}
            className="flex flex-row gap-2 pb-3 w-full items-center border-b border-[rgba(0,0,0,0.4)] border-dotted"
          >
            <Image
              width={100}
              height={100}
              src={leader.athlete.headshot.href}
              priority={true}
              alt={"player picture"}
              className="w-12 h-12 md:w-[40px] md:h-[40px] border rounded-full object-cover"
            />
            <Box className="flex flex-col w-full justify-start gap-1">
              <Typography className="text-xs font-semibold opacity-70">
                {leader.athlete.fullName}
              </Typography>
              <Box className="flex flex-row w-full justify-between">
                {leader.statistics.map((stat: any, i: number) => (
                  <Box key={uuidv4()} className="flex flex-col text-center">
                    <Typography className="text-xs font-semibold opacity-80">
                      {stat.displayValue}
                    </Typography>
                    <Typography className="text-xs opacity-60">
                      {stat.shortDisplayName}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}

        <Link
          href="boxscore"
          className="text-center w-full h-full text-xs text-[#06c] py-1 cursor-pointer font-semibold anchor-link"
        >
          Full Box Score
        </Link>
      </Box>
    </Box>
  );
}
