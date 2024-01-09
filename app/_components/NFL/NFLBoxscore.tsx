import Image from "next/image";

export default function NFLBoxscore({ data }: { data: any }) {
  return (
    <>
      <div className="w-full bg-white p-3 rounded-xl grid items-center text-center grid-cols-8 grid-rows-[0.25rem, 0.5rem, 0.5rem] gap-y-2">
        <p className="text-sm font-semibold  col-start-1 col-span-2 text-start">Score Recap</p>
        <p className="text-sm opacity-60 col-start-4">1</p>
        <p className="text-sm opacity-60 col-start-5">2</p>
        <p className="text-sm opacity-60 col-start-6">3</p>
        <p className="text-sm opacity-60 col-start-7">4</p>
        <p className="text-sm opacity-60 col-start-8">T</p>

        <div className="col-span-3 row-start-2 flex flex-row justify-start items-center gap-1 md:gap-2">
          <Image
            src={`/nfl/${data.gameData.header.competitions[0].competitors[0].team.name
              .replace(" ", "")
              .toLowerCase()}.png`}
            width={100}
            height={100}
            className="w-8 object-contain"
            alt="home team logo"
          />
          <p className="text-sm md:text-base font-semibold opacity-80">
            {data.gameData.header.competitions[0].competitors[0].team.name}
          </p>
          <p className="hidden md:block text-sm opacity-60">
            {data.gameData.header.competitions[0].competitors[0].record[0].displayValue}
          </p>
        </div>

        <div className="col-span-3 row-start-3 flex flex-row justify-start items-center gap-1 md:gap-2">
          <Image
            src={`/nfl/${data.gameData.header.competitions[0].competitors[1].team.name.toLowerCase()}.png`}
            width={100}
            height={100}
            alt="away team logo"
            className="w-8 object-contain"
          />
          <p className="text-sm md:text-base font-semibold opacity-80">
            {data.gameData.header.competitions[0].competitors[1].team.name}
          </p>
          <p className="hidden md:block text-sm opacity-60">
            {data.gameData.header.competitions[0].competitors[1].record[0].displayValue}
          </p>
        </div>

        <p className="text-sm md:text-base opacity-70 col-start-4 row-start-2">
          {data.homeTeam.linescores[0]?.displayValue || "-"}
        </p>
        <p className="text-sm md:text-base opacity-70 col-start-5 row-start-2">
          {data.homeTeam.linescores[1]?.displayValue || "-"}
        </p>
        <p className="text-sm md:text-base opacity-70 col-start-6 row-start-2">
          {data.homeTeam.linescores[2]?.displayValue || "-"}
        </p>
        <p className="text-sm md:text-base opacity-70 col-start-7 row-start-2">
          {data.homeTeam.linescores[3]?.displayValue || "-"}
        </p>
        <p className="text-sm md:text-base font-bold col-start-8 row-start-2">
          {data.gameData.header.competitions[0].competitors[0].score}
        </p>

        <p className="text-sm md:text-base opacity-70 col-start-4 row-start-3">
          {data.awayTeam.linescores[0]?.displayValue || "-"}
        </p>
        <p className="text-sm md:text-base opacity-70 col-start-5 row-start-3">
          {data.awayTeam.linescores[1]?.displayValue || "-"}
        </p>
        <p className="text-sm md:text-base opacity-70 col-start-6 row-start-3">
          {data.awayTeam.linescores[2]?.displayValue || "-"}
        </p>
        <p className="text-sm md:text-base opacity-70 col-start-7 row-start-3">
          {data.awayTeam.linescores[3]?.displayValue || "-"}
        </p>
        <p className="text-sm md:text-base  font-bold col-start-8 row-start-3">
          {data.gameData.header.competitions[0].competitors[1].score}
        </p>
      </div>
    </>
  );
}
