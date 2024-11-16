import Link from "next/link";
import Image from "next/image";
import { NFLGameData } from "@/types";
export default function NFLGameLeaders({ data }: { data: NFLGameData }) {
  if (
    data.gameData.leaders[0].leaders.length === 0 ||
    data.gameData.leaders[1].leaders.length === 0
  )
    return null;
  return (
    <div className="w-full rounded-xl bg-white p-3">
      <p className="mb-1 border-b border-dotted border-b-[rgba(0,0,0,0.2)] pb-2 text-start text-[14px] font-semibold">
        {data.isGameStarted ? "Game Leaders" : "Season Leaders"}
      </p>

      <div className="grid grid-cols-2 grid-rows-[auto,auto,auto,auto,auto,auto] items-center justify-between gap-x-2 gap-y-0">
        <div className="col-span-2 w-full">
          <p className="my-2 mb-[-0.5rem] text-center text-sm font-semibold">
            Passing Yards
          </p>
        </div>
        {/* AWAY TEAM PASSING LEADER */}
        <div className="grid-cols-[1fr, 3fr] relative my-2 grid grid-rows-2 place-items-end justify-center justify-between gap-x-2 gap-y-0">
          <div className="player-divider col-start-1 row-span-2 flex flex-col items-center justify-center gap-1">
            <Image
              src={
                data.gameData.leaders[1].leaders[0].leaders[0].athlete.headshot
                  ?.href
              }
              width={100}
              height={100}
              alt="player"
              className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
            />
            <p className="text-xs opacity-80">
              {data.gameData.leaders[1].team.abbreviation}
            </p>
          </div>
          <p className="col-start-2 row-start-1 pr-2 text-end text-xs font-semibold opacity-80">
            {data.gameData.leaders[1].leaders[0].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-2 row-start-2 flex h-full pr-2 text-end text-[10px] opacity-70">
            {data.gameData.leaders[1].leaders[0].leaders[0].displayValue}
          </p>
        </div>

        {/* HOME TEAM PASSING LEADER */}
        <div className="grid-cols-[1fr, 3fr] grid grid-rows-2 items-end justify-between gap-x-2 gap-y-0">
          <div className="col-start-2 row-span-2 flex flex-col items-center justify-center gap-1">
            <Image
              src={
                data.gameData.leaders[0].leaders[0].leaders[0].athlete.headshot
                  .href
              }
              width={100}
              height={100}
              alt="player"
              className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
            />
            <p className="text-xs opacity-80">
              {data.gameData.leaders[0].team.abbreviation}
            </p>
          </div>

          <p className="col-start-1 row-start-1 w-full pl-2 text-start text-xs font-semibold opacity-80">
            {data.gameData.leaders[0].leaders[0].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-1 row-start-2 flex h-full pl-2 text-start text-[10px] opacity-70">
            {data.gameData.leaders[0].leaders[0].leaders[0].displayValue}
          </p>
        </div>

        <div className="col-span-2 w-full">
          <p className="my-2 mb-[-0.5rem] border-t border-dotted border-t-[rgba(0,0,0,0.2)] pt-2 text-center text-sm font-semibold">
            Rushing Yards
          </p>
        </div>

        {/* AWAY TEAM RUSHING LEADER */}
        <div className="grid-cols-[1fr, 3fr] relative grid grid-rows-2 place-items-end justify-between gap-x-2 gap-y-0">
          <div className="player-divider col-start-1 row-span-2 flex flex-col items-center justify-center gap-1">
            <Image
              src={
                data.gameData.leaders[1].leaders[1].leaders[0].athlete.headshot
                  .href
              }
              width={100}
              height={100}
              alt="player"
              className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
            />
            <p className="text-xs opacity-80">
              {data.gameData.leaders[1].team.abbreviation}
            </p>
          </div>
          <p className="col-start-2 row-start-1 truncate pr-2 text-end text-xs font-semibold opacity-80">
            {data.gameData.leaders[1].leaders[1].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-2 row-start-2 flex h-full pr-2 text-end text-[10px] opacity-70">
            {data.gameData.leaders[1].leaders[1].leaders[0].displayValue}
          </p>
        </div>

        {/* HOME TEAM RUSHING LEADER */}
        <div className="grid-cols-[1fr, 3fr] my-2 grid grid-rows-2 items-end justify-between gap-x-2 gap-y-0">
          <div className="col-start-2 row-span-2 flex flex-col items-center justify-center gap-1">
            <Image
              src={
                data.gameData.leaders[0].leaders[1].leaders[0].athlete.headshot
                  .href
              }
              width={100}
              height={100}
              alt="player"
              className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
            />
            <p className="text-xs opacity-80">
              {data.gameData.leaders[0].team.abbreviation}
            </p>
          </div>

          <p className="col-start-1 row-start-1 w-full pl-2 text-start text-xs font-semibold opacity-80">
            {data.gameData.leaders[0].leaders[1].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-1 row-start-2 flex h-full pl-2 text-start text-[10px] opacity-70">
            {data.gameData.leaders[0].leaders[1].leaders[0].displayValue}
          </p>
        </div>

        <div className="col-span-2 w-full">
          <p className="my-2 mb-[-0.5rem] border-t border-dotted border-t-[rgba(0,0,0,0.1)] pt-2 text-center text-sm font-semibold">
            Recieving Yards
          </p>
        </div>

        {/* AWAY TEAM RECIEVING LEADER */}
        <div className="grid-cols-[1fr, 3fr] relative my-2 grid grid-rows-2 place-items-end justify-between gap-x-2 gap-y-0 pb-2">
          <div className="player-divider col-start-1 row-span-2 flex flex-col items-center justify-center gap-1">
            <Image
              src={
                data.gameData.leaders[1].leaders[2].leaders[0].athlete.headshot
                  .href
              }
              width={100}
              height={100}
              alt="player"
              className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
            />
            <p className="text-xs opacity-80">
              {data.gameData.leaders[1].team.abbreviation}
            </p>
          </div>
          <p className="col-start-2 row-start-1 pr-2 text-end text-xs font-semibold opacity-80">
            {data.gameData.leaders[1].leaders[2].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-2 row-start-2 flex h-full pr-2 text-end text-[10px] opacity-70">
            {data.gameData.leaders[1].leaders[2].leaders[0].displayValue}
          </p>
        </div>

        {/* HOME TEAM RECIEVING LEADER */}
        <div className="grid-cols-[1fr, 3fr] relative my-2 grid grid-rows-2 place-items-end justify-between gap-x-2 gap-y-0 pb-2">
          <div className="col-start-2 row-span-2 flex flex-col items-center justify-center gap-1">
            <Image
              src={
                data.gameData.leaders[0].leaders[2].leaders[0].athlete.headshot
                  .href
              }
              width={100}
              height={100}
              alt="player"
              className="h-12 w-12 rounded-full border object-cover md:h-[35px] md:w-[35px]"
            />
            <p className="text-xs opacity-80">
              {data.gameData.leaders[0].team.abbreviation}
            </p>
          </div>

          <p className="col-start-1 row-start-1 w-full pl-2 text-start text-xs font-semibold opacity-80">
            {data.gameData.leaders[0].leaders[2].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-1 row-start-2 flex h-full pl-2 text-start text-[10px] opacity-70">
            {data.gameData.leaders[0].leaders[2].leaders[0].displayValue}
          </p>
        </div>
      </div>
      <Link
        href="boxscore"
        className="border-t border-dotted border-t-[rgba(0,0,0,0.2)] pt-2"
      >
        <p className="h-full w-full cursor-pointer border-t border-dotted border-b-[rgba(0,0,0,0.4)] py-1 pt-2 text-center text-xs font-semibold text-[#06c]">
          Full Box Score
        </p>
      </Link>
    </div>
  );
}
