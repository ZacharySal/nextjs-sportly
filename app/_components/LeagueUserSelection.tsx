import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function LeagueUserSelection({
  userSelection,
  setUserSelection,
  league,
}: {
  userSelection: string;
  league:string;
  setUserSelection: React.Dispatch<React.SetStateAction<string>>;
}) {

  return (
    <Box className="md:hidden w-full max-w-full overflow-x-auto h-10 flex justify-start items-center gap-3 bg-white pl-2 drop-shadow-lg py-5 sticky top-[2.5rem] z-40">
      <Box className="relative flex-shrink-0 flex flex-row items-center gap-1">
      <Image
          src={`/${league}/${league}-logo.png`}
          width={500}
          height={500}
          alt="league logo"
          className=" w-8 md:w-32 object-cover"
        />
        <Typography className="user-selection-logo pr-3 text-sm font-semibold">{league.toUpperCase()}</Typography>
      </Box>
      <Typography
        onClick={() => setUserSelection("scoreboard")}
        className={`${userSelection === "scoreboard" && "selection-active"} h-full text-[rgba(0,0,0,0.7)] flex items-center relative text-sm`}
      >
        Scoreboard
      </Typography>
      <Typography
        onClick={() => setUserSelection("teams")}
        className={`${userSelection === "teams" && "selection-active"} h-full text-[rgba(0,0,0,0.7)] flex items-center relative text-sm`}
      >
        Teams
      </Typography>
      <Typography
        onClick={() => setUserSelection("standings")}
        className={`${userSelection === "standings" && "selection-active"} h-full text-[rgba(0,0,0,0.7)] flex items-center relative text-sm`}
      >
        Standings
      </Typography>
      <Typography
        onClick={() => setUserSelection("news")}
        className={`${userSelection === "news" && "selection-active"} h-full text-[rgba(0,0,0,0.7)] flex items-center relative text-sm`}
      >
        News
      </Typography>
    </Box>
  );
}
