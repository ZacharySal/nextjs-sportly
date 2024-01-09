import Image from "next/image";

export default function MLBBoxscore({ data }: { data: any }) {
  return (
    <div className="w-full bg-white p-3 rounded-xl drop-shadow-md grid items-center text-center grid-cols-13 grid-rows-[0.25rem, 0.5rem, 0.5rem] gap-y-2 gap-x-0">
      <p className="text-sm font-semibold col-start-1 col-span-2 text-start">Box Score</p>
      <p className="text-sm opacity-60 col-start-4">1</p>
      <p className="text-sm opacity-60 col-start-5">2</p>
      <p className="text-sm opacity-60 col-start-6">3</p>
      <p className="text-sm opacity-60 col-start-7">4</p>
      <p className="text-sm opacity-60 col-start-8">5</p>
      <p className="text-sm opacity-60 col-start-9">6</p>
      <p className="text-sm opacity-60 col-start-10">7</p>
      <p className="text-sm opacity-60 col-start-11">8</p>
      <p className="text-sm opacity-60 col-start-12">9</p>
      <p className="text-sm opacity-60 col-start-13">T</p>

      <div className="col-span-3 row-start-2 flex flex-row justify-start items-center gap-2">
        <Image
          src={`/mlb/${data.awayTeam.team.name.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          alt="home team logo"
          className="w-8 object-contain"
        />
        <p className="text-sm md:text-base font-semibold">{data.awayTeam.team.name}</p>
        <p className="hidden md:block text-sm opacity-60">{data.awayTeam.record[0].displayValue}</p>
      </div>

      <div className="col-span-3 row-start-3 flex flex-row justify-start items-center gap-2">
        <Image
          src={`/mlb/${data.homeTeam.team.name.replace(" ", "").toLowerCase()}.png`}
          width={100}
          height={100}
          alt="home team logo"
          className="w-8 object-contain"
        />
        <p className="text-sm md:text-base font-semibold">{data.homeTeam.team.name}</p>
        <p className="hidden md:block text-sm opacity-60">{data.homeTeam.record[0].displayValue}</p>
      </div>

      <p className="text-sm md:text-base opacity-70 col-start-4 row-start-3">
        {data.homeTeam?.linescores[0]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-5 row-start-3">
        {data.homeTeam.linescores[1]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-6 row-start-3">
        {data.homeTeam.linescores[2]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-7 row-start-3">
        {data.homeTeam.linescores[3]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-8 row-start-3">
        {data.homeTeam.linescores[4]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-9 row-start-3">
        {data.homeTeam.linescores[5]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-10 row-start-3">
        {data.homeTeam.linescores[6]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-11 row-start-3">
        {data.homeTeam.linescores[7]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-12 row-start-3">
        {data.homeTeam.linescores[8]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base font-bold col-start-13 row-start-3">
        {data.homeTeam.score || ""}
      </p>

      <p className="text-sm md:text-base opacity-70 col-start-4 row-start-2">
        {data.awayTeam.linescores[0]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-5 row-start-2">
        {data.awayTeam.linescores[1]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-6 row-start-2">
        {data.awayTeam.linescores[2]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-7 row-start-2">
        {data.awayTeam.linescores[3]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-8 row-start-2">
        {data.awayTeam.linescores[4]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-9 row-start-2">
        {data.awayTeam.linescores[5]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-10 row-start-2">
        {data.awayTeam.linescores[6]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-11 row-start-2">
        {data.awayTeam.linescores[7]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base opacity-70 col-start-12 row-start-2">
        {data.awayTeam.linescores[8]?.displayValue || "-"}
      </p>
      <p className="text-sm md:text-base font-bold col-start-13 row-start-2">
        {data.awayTeam.score}
      </p>
    </div>
  );
}
