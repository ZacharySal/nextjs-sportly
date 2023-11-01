import { Box, Typography, Divider } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ScoreCard from "./ScoreCard";

export default function SeasonSeries({ data }: { data: any }) {
  return (
    <Box className="bg-white p-3 rounded-xl">
      <Typography className="font-semibold opacity-70 text-sm">
        {data.gameData.seasonseries[0].title}
      </Typography>
      <Typography className="opacity-80 text-xs">
        {data.gameData.seasonseries[0].summary.replaceAll("series", "")}
      </Typography>
      {data.gameData.seasonseries[0].events.map((event: any, i: number) => (
        <Box key={uuidv4()}>
          <ScoreCard
            gameInfo={event}
            version={1}
            league={"mlb"}
            teamView={false}
          />
          {i !== data.gameData.seasonseries[0].events.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}
