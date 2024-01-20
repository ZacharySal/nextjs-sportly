import Image from "next/image";

export default function NBABoxscore({ data }: { data: any }) {
  return (
    <div className="grid-rows-[0.25rem, 0.5rem, 0.5rem] grid w-full grid-cols-8 items-center gap-x-0 gap-y-2 rounded-xl bg-white p-3 text-center">
      <p className="col-span-2 col-start-1 text-start text-sm font-semibold">
        Score Recap
      </p>
      <p className="col-start-4 text-sm opacity-60">1</p>
      <p className="col-start-5 text-sm opacity-60">2</p>
      <p className="col-start-6 text-sm opacity-60">3</p>
      <p className="col-start-7 text-sm opacity-60">4</p>
      <p className="col-start-8 text-sm opacity-60">T</p>

      <div className="col-span-3 row-start-2 flex flex-row items-center justify-start gap-2">
        <Image
          src={`/nba/${data.homeTeam.team.name.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          className="w-8 object-contain"
          alt="home team logo"
        />
        <p className="text-sm font-semibold  md:text-base">
          {data.homeTeam.team.name}
        </p>
      </div>

      <div className="col-span-3 row-start-3 flex flex-row items-center justify-start gap-2">
        <Image
          src={`/nba/${data.awayTeam.team.name.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          className="w-8 object-contain"
          alt="away team logo"
        />
        <p className="text-sm font-semibold  md:text-base">
          {data.awayTeam.team.name}
        </p>
      </div>

      <p className="col-start-4 row-start-2  text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[0]?.displayValue || "-"}
      </p>
      <p className="col-start-5 row-start-2  text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[1]?.displayValue || "-"}
      </p>
      <p className="col-start-6 row-start-2  text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[2]?.displayValue || "-"}
      </p>
      <p className="col-start-7 row-start-2  text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[3]?.displayValue || "-"}
      </p>
      <p className="col-start-8 row-start-2 text-sm font-bold md:text-base">
        {data.homeTeam?.score || "0"}
      </p>

      <p className="col-start-4 row-start-3  text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[0]?.displayValue || "-"}
      </p>
      <p className="col-start-5 row-start-3  text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[1]?.displayValue || "-"}
      </p>
      <p className="col-start-6 row-start-3  text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[2]?.displayValue || "-"}
      </p>
      <p className="col-start-7 row-start-3  text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[3]?.displayValue || "-"}
      </p>
      <p className="col-start-8 row-start-3 text-sm font-bold md:text-base">
        {data.awayTeam?.score || "0"}
      </p>
    </div>
  );
}
