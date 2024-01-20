import Image from "next/image";

export default function MLBBoxscore({ data }: { data: any }) {
  return (
    <div className="grid-cols-13 grid-rows-[0.25rem, 0.5rem, 0.5rem] grid w-full items-center gap-x-0 gap-y-2 rounded-xl bg-white p-3 text-center drop-shadow-md">
      <p className="col-span-2 col-start-1 text-start text-sm font-semibold">
        Box Score
      </p>
      <p className="col-start-4 text-sm opacity-60">1</p>
      <p className="col-start-5 text-sm opacity-60">2</p>
      <p className="col-start-6 text-sm opacity-60">3</p>
      <p className="col-start-7 text-sm opacity-60">4</p>
      <p className="col-start-8 text-sm opacity-60">5</p>
      <p className="col-start-9 text-sm opacity-60">6</p>
      <p className="col-start-10 text-sm opacity-60">7</p>
      <p className="col-start-11 text-sm opacity-60">8</p>
      <p className="col-start-12 text-sm opacity-60">9</p>
      <p className="col-start-13 text-sm opacity-60">T</p>

      <div className="col-span-3 row-start-2 flex flex-row items-center justify-start gap-2">
        <Image
          src={`/mlb/${data.awayTeam.team.name.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          alt="home team logo"
          className="w-8 object-contain"
        />
        <p className="text-sm font-semibold md:text-base">
          {data.awayTeam.team.name}
        </p>
        <p className="hidden text-sm opacity-60 md:block">
          {data.awayTeam.record[0].displayValue}
        </p>
      </div>

      <div className="col-span-3 row-start-3 flex flex-row items-center justify-start gap-2">
        <Image
          src={`/mlb/${data.homeTeam.team.name.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          alt="home team logo"
          className="w-8 object-contain"
        />
        <p className="text-sm font-semibold md:text-base">
          {data.homeTeam.team.name}
        </p>
        <p className="hidden text-sm opacity-60 md:block">
          {data.homeTeam.record[0].displayValue}
        </p>
      </div>

      <p className="col-start-4 row-start-3 text-sm opacity-70 md:text-base">
        {data.homeTeam?.linescores[0]?.displayValue || "-"}
      </p>
      <p className="col-start-5 row-start-3 text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[1]?.displayValue || "-"}
      </p>
      <p className="col-start-6 row-start-3 text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[2]?.displayValue || "-"}
      </p>
      <p className="col-start-7 row-start-3 text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[3]?.displayValue || "-"}
      </p>
      <p className="col-start-8 row-start-3 text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[4]?.displayValue || "-"}
      </p>
      <p className="col-start-9 row-start-3 text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[5]?.displayValue || "-"}
      </p>
      <p className="col-start-10 row-start-3 text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[6]?.displayValue || "-"}
      </p>
      <p className="col-start-11 row-start-3 text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[7]?.displayValue || "-"}
      </p>
      <p className="col-start-12 row-start-3 text-sm opacity-70 md:text-base">
        {data.homeTeam.linescores[8]?.displayValue || "-"}
      </p>
      <p className="col-start-13 row-start-3 text-sm font-bold md:text-base">
        {data.homeTeam.score || ""}
      </p>

      <p className="col-start-4 row-start-2 text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[0]?.displayValue || "-"}
      </p>
      <p className="col-start-5 row-start-2 text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[1]?.displayValue || "-"}
      </p>
      <p className="col-start-6 row-start-2 text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[2]?.displayValue || "-"}
      </p>
      <p className="col-start-7 row-start-2 text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[3]?.displayValue || "-"}
      </p>
      <p className="col-start-8 row-start-2 text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[4]?.displayValue || "-"}
      </p>
      <p className="col-start-9 row-start-2 text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[5]?.displayValue || "-"}
      </p>
      <p className="col-start-10 row-start-2 text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[6]?.displayValue || "-"}
      </p>
      <p className="col-start-11 row-start-2 text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[7]?.displayValue || "-"}
      </p>
      <p className="col-start-12 row-start-2 text-sm opacity-70 md:text-base">
        {data.awayTeam.linescores[8]?.displayValue || "-"}
      </p>
      <p className="col-start-13 row-start-2 text-sm font-bold md:text-base">
        {data.awayTeam.score}
      </p>
    </div>
  );
}
