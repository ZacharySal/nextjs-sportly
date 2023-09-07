import { Box, Typography, Divider } from "@mui/material";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function NFLScoringPlays({ data }: { data: any }) {
  function scoringPlays(allScoringPlays: any) {
    const plays = allScoringPlays.map((play: any) => {
      return (
        <Box
          key={uuidv4()}
          className="w-full flex flex-row justify-between items-center mb-1"
        >
          <Box className="flex flex-row items-center gap-2">
            <Image
              src={play.team.logo}
              width={100}
              height={100}
              alt="team logo"
              className="w-8 object-contain"
            />
            <Box className="flex flex-col">
              <Box className="text-sm font-bold">
                {play.type.text}
                <span className="pl-1 text-xs opacity-70">
                  {play.clock.displayValue}
                </span>
              </Box>
              <Box className="text-sm opacity-70">{play.text}</Box>
            </Box>
          </Box>
          <Box className="flex flex-row gap-6 pr-2">
            <Typography
              sx={{
                fontWeight:
                  play.team.displayName === data.homeTeam.team.displayName
                    ? "700"
                    : "400",
              }}
              className="w-4 text-center"
            >
              {play.homeScore}
            </Typography>
            <Typography
              sx={{
                fontWeight:
                  play.team.displayName === data.awayTeam.team.displayName
                    ? "700"
                    : "400",
              }}
              className="w-4 text-center"
            >
              {play.awayScore}
            </Typography>
          </Box>
        </Box>
      );
    });
    return plays;
  }

  function quarterHeader(text: string) {
    return (
      <Box className="w-full flex flex-row justify-between items-center mb-2">
        <Typography className="opacity-70 text-xs">{text}</Typography>
      </Box>
    );
  }

  return (
    <Box className="w-full bg-white rounded-xl drop-shadow-md flex flex-col justify-center items-center p-3">
      <Typography className=" w-full text-left text-sm opacity-70 font-semibold">
        Scoring Plays
      </Typography>
      <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
      {quarterHeader("1ST QUARTER")}
      {scoringPlays(data.firstQuarterScoringPlays)}
      <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
      {quarterHeader("2ND QUARTER")}
      {scoringPlays(data.secondQuarterScoringPlays)}
      <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
      {quarterHeader("3RD QUARTER")}
      {scoringPlays(data.thirdQuarterScoringPlays)}
      <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
      {quarterHeader("4TH QUARTER")}
      {scoringPlays(data.fourthQuarterScoringPlays)}
    </Box>
  );
}
