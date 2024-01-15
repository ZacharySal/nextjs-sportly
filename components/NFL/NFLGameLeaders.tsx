import Link from "next/link";
import Image from "next/image";
export default function NFLGameLeaders({ data }: { data: any }) {
  if (
    data.gameData.leaders[0].leaders.length === 0 ||
    data.gameData.leaders[1].leaders.length === 0
  )
    return null;
  return (
    <div className="w-full bg-white rounded-xl p-3">
      <p className="text-sm font-semibold text-start mb-1">
        {data.isGameStarted ? "Game Leaders" : "Season Leaders"}
      </p>

      <div className="grid grid-rows-[auto,auto,auto,auto,auto,auto] grid-cols-2 gap-x-2 gap-y-0 items-center justify-between">
        <div className="w-full col-span-2">
          <hr className="mt-2" />
          <p className="text-sm text-center opacity-70 mb-[-0.5rem] my-2">Passing Yards</p>
        </div>
        {/* AWAY TEAM PASSING LEADER */}
        <div className="grid place-items-end justify-center gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between relative my-2">
          <div className="flex col-start-1 flex-col row-span-2 justify-center items-center gap-1 player-divider">
            <Image
              src={data.gameData.leaders[1].leaders[0].leaders[0].athlete.headshot.href}
              width={100}
              height={100}
              alt="player"
              className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
            />
            <p className="text-xs opacity-80">{data.gameData.leaders[1].team.abbreviation}</p>
          </div>
          <p className="col-start-2 row-start-1 text-end text-xs opacity-80 font-bold pr-2">
            {data.gameData.leaders[1].leaders[0].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-2 row-start-2 flex h-full text-end text-[10px] opacity-70 pr-2">
            {data.gameData.leaders[1].leaders[0].leaders[0].displayValue}
          </p>
        </div>

        {/* HOME TEAM PASSING LEADER */}
        <div className="grid items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between">
          <div className="flex col-start-2 flex-col row-span-2 justify-center items-center gap-1">
            <Image
              src={data.gameData.leaders[0].leaders[0].leaders[0].athlete.headshot.href}
              width={100}
              height={100}
              alt="player"
              className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
            />
            <p className="text-xs opacity-80">{data.gameData.leaders[0].team.abbreviation}</p>
          </div>

          <p className="col-start-1 row-start-1 w-full text-start text-xs opacity-80 font-bold pl-2">
            {data.gameData.leaders[0].leaders[0].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-1 row-start-2 flex h-full text-start text-[10px] opacity-70 pl-2">
            {data.gameData.leaders[0].leaders[0].leaders[0].displayValue}
          </p>
        </div>

        <div className="w-full col-span-2">
          <hr className="mt-2" />
          <p className="text-sm text-center opacity-70 mb-[-0.5rem] my-2">Rushing Yards</p>
        </div>

        {/* AWAY TEAM RUSHING LEADER */}
        <div className="grid place-items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between relative">
          <div className="flex col-start-1 flex-col row-span-2 justify-center items-center gap-1 player-divider">
            <Image
              src={data.gameData.leaders[1].leaders[1].leaders[0].athlete.headshot.href}
              width={100}
              height={100}
              alt="player"
              className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
            />
            <p className="text-xs opacity-80">{data.gameData.leaders[1].team.abbreviation}</p>
          </div>
          <p className="col-start-2 row-start-1 truncate text-end text-xs opacity-80 font-bold pr-2">
            {data.gameData.leaders[1].leaders[1].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-2 row-start-2 flex h-full text-end text-[10px] opacity-70 pr-2">
            {data.gameData.leaders[1].leaders[1].leaders[0].displayValue}
          </p>
        </div>

        {/* HOME TEAM RUSHING LEADER */}
        <div className="grid items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between my-2">
          <div className="flex col-start-2 flex-col row-span-2 justify-center items-center gap-1">
            <Image
              src={data.gameData.leaders[0].leaders[1].leaders[0].athlete.headshot.href}
              width={100}
              height={100}
              alt="player"
              className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
            />
            <p className="text-xs opacity-80">{data.gameData.leaders[0].team.abbreviation}</p>
          </div>

          <p className="col-start-1 row-start-1 w-full text-start text-xs opacity-80 font-bold pl-2">
            {data.gameData.leaders[0].leaders[1].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-1 row-start-2 flex h-full text-start text-[10px] opacity-70 pl-2">
            {data.gameData.leaders[0].leaders[1].leaders[0].displayValue}
          </p>
        </div>

        <div className="w-full col-span-2">
          <hr className="mt-2" />
          <p className="text-sm text-center opacity-70 mb-[-0.5rem] my-2">Recieving Yards</p>
        </div>

        {/* AWAY TEAM RECIEVING LEADER */}
        <div className="grid place-items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between my-2 relative">
          <div className="flex col-start-1 flex-col row-span-2 justify-center items-center gap-1 player-divider">
            <Image
              src={data.gameData.leaders[1].leaders[2].leaders[0].athlete.headshot.href}
              width={100}
              height={100}
              alt="player"
              className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
            />
            <p className="text-xs opacity-80">{data.gameData.leaders[1].team.abbreviation}</p>
          </div>
          <p className="col-start-2 row-start-1 text-end text-xs opacity-80 font-bold pr-2">
            {data.gameData.leaders[1].leaders[2].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-2 row-start-2 flex h-full text-end text-[10px] opacity-70 pr-2">
            {data.gameData.leaders[1].leaders[2].leaders[0].displayValue}
          </p>
        </div>

        {/* HOME TEAM RECIEVING LEADER */}
        <div className="grid items-end gap-x-2 gap-y-0 grid-cols-[1fr, 3fr] grid-rows-2 justify-between">
          <div className="flex col-start-2 flex-col row-span-2 justify-center items-center gap-1">
            <Image
              src={data.gameData.leaders[0].leaders[2].leaders[0].athlete.headshot.href}
              width={100}
              height={100}
              alt="player"
              className="w-12 h-12 md:w-[35px] md:h-[35px] border rounded-full object-cover"
            />
            <p className="text-xs opacity-80">{data.gameData.leaders[0].team.abbreviation}</p>
          </div>

          <p className="col-start-1 row-start-1 w-full text-start text-xs opacity-80 font-bold pl-2">
            {data.gameData.leaders[0].leaders[2].leaders[0].athlete.shortName}
          </p>
          <p className="col-start-1 row-start-2 flex h-full text-start text-[10px] opacity-70 pl-2">
            {data.gameData.leaders[0].leaders[2].leaders[0].displayValue}
          </p>
        </div>
      </div>
      <hr className="my-2" />
      <Link href="boxscore">
        <p className="text-center w-full h-full text-xs text-[#06c] cursor-pointer py-1 font-semibold">
          Full Box Score
        </p>
      </Link>
    </div>
  );
}
